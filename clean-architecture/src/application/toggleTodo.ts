import { Todo } from "../domain/todo";

export type ToggleTodo = (todoId: Todo['id'], done: Todo['done']) => Promise<void>;