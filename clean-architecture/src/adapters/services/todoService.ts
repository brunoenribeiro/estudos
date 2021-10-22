import { Todo } from "../../domain/todo";
import { TodoList } from "../../domain/todoList";
import { getGraphQLClient } from "../../infra/graphQLClient";

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
    const { data } = await getGraphQLClient().mutate(
      `mutation CreateTodo($input: CreateTodoInput!) {
        createTodo(input: $input) {
          id
        }
      }`,
      { input: { description } }
    );

    return {
      id: data.createTodo.id,
      description,
      done: false,
    };
  },
  deleteTodo: async (id) => {
    const { data } = await getGraphQLClient().mutate(
      `mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id)
      }`,
      { id }
    );

    return data.deleteTodo;
  }
};

export const getTodoService = (): ITodoService => TodoTestServerService;