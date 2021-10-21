import { Todo } from "../domain/todo";
import { TodoList } from "../domain/todoList";

export type DeleteFromTodoList = (todoList: TodoList, todoId: Todo['id']) => Promise<void>;

export const deleteFromTodoList: DeleteFromTodoList = async (todoList, todoId) => {
  // Request API Adapter for todo deletion
  // Update local state with new todo list
}