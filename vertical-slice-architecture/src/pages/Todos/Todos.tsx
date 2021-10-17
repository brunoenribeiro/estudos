import { FC } from 'react';
import { CreateTodo, TodoList } from '../../presentation/Todos';
import { useTodos } from '../../models';

const Todos: FC = () => {
  /*
    PONTOS CONTRA A ARQUITETURA:
    - useTodos deveria requerir Todos, ao invés do componente pedir.
  */
  const { toggleTodo, deleteTodo, createTodoIfUnique } = useTodos();
  
  return (<div>
    <CreateTodo onCreate={(description) => createTodoIfUnique(description)} />

    <TodoList
      onCheck={(todoId, checked) => {
        toggleTodo({ variables: { id: todoId, done: checked } });
      }}
      onDelete={(todoId) => {
        deleteTodo({ variables: { id: todoId } });
      }}
    />
  </div>)
};

export default Todos;
