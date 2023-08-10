import { For } from "solid-js";
import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

function createLocalStore<T extends object>(
  name: string,
  init: T,
): [Store<T>, SetStoreFunction<T>] {
  console.log("createLocalStore");

  const localState = localStorage.getItem(name);
  const [state, setState] = createStore<T>(
    localState ? (JSON.parse(localState) as T) : init,
  );

  // This does not re-rum when data changes if the app is wrapped in a <Suspense /> in src/root.tsx
  createEffect(() => {
    console.log("createEffect");

    localStorage.setItem(name, JSON.stringify(state));
  });
  return [state, setState];
}

const [todos, setTodos] = createLocalStore<{title: string}[]>("todos", []);

export default function Home() {

  const addTodo = () => {
    setTodos(todos.length, {
      title: Math.random().toString(),
    });
  };

  return (
    <>
      <button onClick={addTodo}>add</button>
      <For each={todos}>{(todo) => <div>{todo.title}</div>}</For>
    </>
  );
};
