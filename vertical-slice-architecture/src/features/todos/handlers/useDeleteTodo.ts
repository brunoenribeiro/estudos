import { useMutation, gql } from '@apollo/client';

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export function useDeleteTodo() {
  const [deleteTodo, { loading, error }] = useMutation(DELETE_TODO, {
    refetchQueries: ['GetTodos']
  });

  return {
    deleteTodo,
    loading,
    error,
  }
}