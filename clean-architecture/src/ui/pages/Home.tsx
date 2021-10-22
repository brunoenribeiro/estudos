import { FC } from 'react';
import { useAddTodoToList } from '../../adapters/ui/useAddTodoToList';
import { useDeleteTodoFromList } from '../../adapters/ui/useDeleteTodoFromList';
import { useToggleTodo } from '../../adapters/ui/useToggleTodo';
import { CreateTodo, TodoList } from '../components';

const Home: FC = () => {
  const { loading: isAddingTodo, addTodoToList } = useAddTodoToList();
  const { deleteTodoFromList } = useDeleteTodoFromList();
  const { toggleTodo } = useToggleTodo();

  const handleAddTodo = (description: string) => {
    return addTodoToList(description);
  }

  const handleTodoCheck = (todoId: string, checked: boolean) => {
    return toggleTodo(todoId, checked);
  }

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
