import { Todo } from "../../domain/todo";
import { TodoList } from "../../domain/todoList";

export interface ITodoService {
  getTodos(): Promise<TodoList>;
  addTodo(description: Todo['description']): Promise<Todo>;
  deleteTodo(id: Todo['id']): Promise<Todo['id']>;
}

const TodoTestServerService: ITodoService = {
  getTodos: async () => {
    // TODO: IMPLEMENT API REQUEST
    return [];
  },
  addTodo: async (description) => {
    // TODO: IMPLEMENT API REQUEST
    return {
      id: description,
      description,
      done: false,
    };
  },
  deleteTodo: async (id) => {
    // TODO: IMPLEMENT API REQUEST
    return 'bar';
  }
};

export const getTodoService = (): ITodoService => TodoTestServerService;