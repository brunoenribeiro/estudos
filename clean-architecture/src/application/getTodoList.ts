import { IStateService } from "../adapters/services/stateService";
import { ITodoService } from "../adapters/services/todoService";

interface Dependencies {
  todoService: ITodoService;
  stateService: IStateService;
}

type GetTodoList = (dependencies: Dependencies) => Promise<void>;

export const getTodoList: GetTodoList = async ({ todoService, stateService }) => {
  const { dispatch } = stateService;

  try {
    const todoList = await todoService.getTodos();
    dispatch({ type: 'SET_TODO_LIST', payload: { todoList } });
  } catch (error) {
    
  }
}