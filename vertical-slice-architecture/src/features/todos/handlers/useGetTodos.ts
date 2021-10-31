import { useMemo } from "react";
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import { Todo } from "../models/Todo";

interface GetTodosResult {
  todos: Array<{
    id: Todo['id'];
    description: Todo['description'];
    done: Todo['done'];
  }>
}

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      description
      done
    }
  }
`;

export function useGetTodos() {
  const { data, loading, error } = useQuery<GetTodosResult>(GET_TODOS);
  const todos = useMemo(() => data?.todos || [], [data]);

  return {
    todos,
    loading,
    error,
  }
}

export function useGetTodosAsync() {
  const [getTodosAsync, { data, loading, error }] = useLazyQuery<GetTodosResult>(GET_TODOS);
  const todos = useMemo(() => data?.todos || [], [data]);

  return {
    getTodosAsync,
    todos,
    loading,
    error,
  }
}