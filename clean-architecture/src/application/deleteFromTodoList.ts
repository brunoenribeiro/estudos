import { Todo } from "../domain/todo";
import { deleteTodo } from "../domain/todoList";
import { ITodoService } from '../adapters/services/todoService';
import { IStateService } from "../adapters/services/stateService";


interface Dependencies {
  todoService: ITodoService;
  stateService: IStateService;
}

interface Payload {
  todoId: Todo['id'];
}

export type DeleteFromTodoList = (dependencies: Dependencies, payload: Payload) => Promise<void>;

export const deleteFromTodoList: DeleteFromTodoList = async (
  { todoService, stateService },
  { todoId }
) => {
  const { state: { todoList }, dispatch } = stateService;

  try {
    await todoService.deleteTodo(todoId);
    
    const updatedTodoList = deleteTodo(todoList, todoId);
    dispatch({ type: 'SET_TODO_LIST', payload: { todoList: updatedTodoList }});
  } catch (error) {
    
  }
}