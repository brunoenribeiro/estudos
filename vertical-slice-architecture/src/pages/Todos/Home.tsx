import { FC } from 'react';
import { CreateTodo, TodoList } from '../../presentation/Todos';
import { useTodos } from '../../models';

const Home: FC = () => {
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

export default Home;
