import { useMutation, gql } from '@apollo/client';
import { useGetTodosAsync } from './useGetTodos';

const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
    }
  }
`;

export function useCreateTodo() {
  const { getTodosAsync, todos } = useGetTodosAsync();
  const [createTodo, { loading, error }] = useMutation(CREATE_TODO, {
    refetchQueries: ['GetTodos']
  });
  
  async function createTodoIfUnique(description: string) {
    await getTodosAsync();

    if (todos.some(todo => todo.description === description)) {
      return Promise.reject(new Error('Uma tarefa com essa descrição já existe'));
    }

    return createTodo({ variables: { input: { description } } });
  }

  return {
    todos,
    loading,
    error,
    createTodoIfUnique,
  }
}