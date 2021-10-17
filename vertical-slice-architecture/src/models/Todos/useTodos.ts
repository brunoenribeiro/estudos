import { Todo } from ".";
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      description
      done
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!, $done: Boolean!) {
    toggleTodo(id: $id, done: $done)
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export default function useTodos() {
  /*
    PONTOS À FAVOR DA ARQUITETURA:
    - Centralizar regras de negócio no hook ao invés do componente é excelente
    - Acomplamento vertical facilita tratar APIs diferentes para features diferentes

    PONTOS CONTRA A ARQUITETURA:
    - Dizem que Commands não deveriam retornar nada. Contudo é mto útil que retornem Promises, para UI dar feedback
  */
  const { data, loading, error } = useQuery<{ todos: Todo[] }>(GET_TODOS); 
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: ['GetTodos']
  });
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: ['GetTodos']
  });

  const todos = data?.todos || [];
  
  async function createTodoIfUnique(description: string) {
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
    toggleTodo,
    deleteTodo,
  }
}