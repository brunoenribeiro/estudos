import { Todo } from "../../domain/todo";
import { TodoList } from "../../domain/todoList";
import { getGraphQLClient } from "../../infra/graphQLClient";

export interface ITodoService {
  getTodos(): Promise<TodoList>;
  addTodo(description: Todo['description']): Promise<Todo>;
  deleteTodo(id: Todo['id']): Promise<Todo['id']>;
  toggleTodo(id: Todo['id'], done: Todo['done']): Promise<Todo['id']>;
}

const TodoTestServerService: ITodoService = {
  getTodos: async () => {
    const { data } = await getGraphQLClient().query(
      `query GetTodos {
        todos {
          id
          description
          done
        }
      }`
    );

    return data.todos;
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
  },
  toggleTodo: async (id, done) => {
    const { data } = await getGraphQLClient().mutate(
      `mutation ToggleTodo($id: ID!, $done: Boolean!) {
        toggleTodo(id: $id, done: $done)
      }`,
      { id, done },
    );

    return data.toggleTodo;
  }
};

export const getTodoService = (): ITodoService => TodoTestServerService;