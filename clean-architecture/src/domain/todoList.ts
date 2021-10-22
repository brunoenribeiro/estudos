import { Todo } from './todo';

export type TodoList = Todo[];

export function getTodo(todoList: TodoList, todoId: Todo['id']): Todo | undefined {
  return todoList.find((todo) => todo.id === todoId);
}

export function addTodo(todoList: TodoList, todo: Todo): TodoList {
  return [...todoList, todo];
}

export function deleteTodo(todoList: TodoList, todoId: Todo['id']): TodoList {
  return todoList.filter(t => t.id !== todoId);
}

export function updateTodo(todoList: TodoList, todo: Todo): TodoList {
  const clonedTodoList = [...todoList];
  const todoIndex = clonedTodoList.findIndex(t => t.id === todo.id);
  if (todoIndex < 0) throw new Error('Cannot find todo in list');

  clonedTodoList[todoIndex] = todo;
  return clonedTodoList;
}