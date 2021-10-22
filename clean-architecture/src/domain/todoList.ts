import { Todo } from './todo';

export type TodoList = Todo[];

// ESTAS REGRAS DE NEGÓCIO COSTUMAM ESTAR DEFINIDAS NO BACK-END. PARA QUÊ REPETI-LAS AQUI NO FRONT?
// - SE A IDEIA É VALIDAR REGRAS P/ EVITAR COMUNICAÇÃO DESNECESSÁRIA COM O BACK-END, ISSO DEVERIA ACONTECER NOS ADAPTERS, POR SEREM ACOPLADOS AO BACK-END;
// - SE A IDEIA É IMPLEMENTAR REGRAS DE UI, ISSO TAMBÉM DEVERIA ACONTECER NOS ADAPTERS, POR SER REGRA DE UI

// NA MINHA OPINIÃO, É ESSA ÁREA DE DOMAIN QUE MOSTRA COMO CLEAN É MAIS ÚTIL NO BACK-END DO QUE NO FRONT

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