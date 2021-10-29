import { useMutation, gql } from '@apollo/client';

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!, $done: Boolean!) {
    toggleTodo(id: $id, done: $done)
  }
`;

export function useToggleTodo() {
  const [toggleTodo, { loading, error }] = useMutation(TOGGLE_TODO);

  return {
    toggleTodo,
    loading,
    error,
  }
}