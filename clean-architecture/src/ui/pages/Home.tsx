import { FC } from 'react';
import { useAddTodoToList } from '../../adapters/ui/useAddTodoToList';
import { useDeleteTodoFromList } from '../../adapters/ui/useDeleteTodoFromList';
import { CreateTodo, TodoList } from '../components';

const Home: FC = () => {
  const { loading: isAddingTodo, addTodoToList } = useAddTodoToList();
  const { loading: isDeletingTodo, deleteTodoFromList } = useDeleteTodoFromList();

  const handleAddTodo = (description: string) => {
    return addTodoToList(description);
  }

  const handleTodoCheck = () => {}
  const handleTodoDelete = (todoId: string) => {
    return deleteTodoFromList(todoId);
  }

  return (
    <section>
      <CreateTodo onCreate={handleAddTodo} />
      {isAddingTodo && <p>Loading...</p>}
      <TodoList onCheck={handleTodoCheck} onDelete={handleTodoDelete} />
    </section>
  )
}

export default Home;
