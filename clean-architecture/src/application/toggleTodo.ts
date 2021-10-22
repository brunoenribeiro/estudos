import { IStateService } from "../adapters/services/stateService";
import { ITodoService } from "../adapters/services/todoService";
import { Todo, toggleDone } from "../domain/todo";
import { getTodo, updateTodo } from "../domain/todoList";

interface Dependencies {
  todoService: ITodoService;
  stateService: IStateService;
}

interface Payload {
  todoId: Todo['id'];
  done: Todo['done'];
}

type ToggleTodo = (dependencies: Dependencies, payload: Payload) => Promise<void>;

export const toggleTodoUseCase: ToggleTodo = async ({ todoService, stateService }, { todoId, done }) => {
  const { state: { todoList }, dispatch } = stateService;

  try {
    await todoService.toggleTodo(todoId, done);

    const todo = getTodo(todoList, todoId);
    if (!todo) throw new Error('Cannot find todo');

    const toggledTodo = toggleDone(todo, done);
    const updatedTodoList = updateTodo(todoList, toggledTodo);
    dispatch({ type: 'SET_TODO_LIST', payload: { todoList: updatedTodoList } });
  } catch (error) {
    
  }
}