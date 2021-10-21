export type Description = string;
export type DoneStatus = boolean;
export type Todo = {
  id: UniqueId;
  description: Description;
  done: DoneStatus;
};

export function toggleDone(todo: Todo, done: DoneStatus): Todo {
  return { ...todo, done };
}
