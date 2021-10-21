import { Todo } from "../domain/todo";
import { addTodo } from "../domain/todoList";
import { ITodoService } from '../adapters/services/todoService';
import { IStateService } from "../adapters/services/stateService";

interface Dependencies {
  todoService: ITodoService;
  stateService: IStateService;
}

interface Payload {
  description: Todo['description'];
}

type AddToTodoList = (dependencies: Dependencies, payload: Payload) => Promise<void>;

export const addTodoToList: AddToTodoList = async (
  { todoService, stateService },
  { description }
) => {
  const { state: { todoList }, dispatch } = stateService;

  try {
    const todo = await todoService.addTodo(description);
    
    const updatedTodoList = addTodo(todoList, todo);
    dispatch({ type: 'SET_TODO_LIST', payload: { todoList: updatedTodoList }});
  } catch (error) {
    
  }
}