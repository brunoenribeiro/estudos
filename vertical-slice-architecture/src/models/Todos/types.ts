export interface Todo {
  id: string;
  description: string;
  done: boolean;
}

export type CreateTodoInput = Pick<Todo, 'description' | 'done'>;