import { FC, useContext } from 'react';
import { useAddTodoToList } from '../../adapters/ui/useAddTodoToList';
import { Context } from '../../adapters/services/stateService';
import { CreateTodo } from '../components';

const TodoList: FC = () => {
  const { loading: isAddingTodo, addTodoToList } = useAddTodoToList();
  const { state: { todoList } } = useContext(Context);

  const handleAddTodo = (description: string) => {
    return addTodoToList(description);
  }

  return (
    <section>
      <CreateTodo onCreate={handleAddTodo} />
      {isAddingTodo && <p>Loading...</p>}
      <ul>
        {todoList.map(todo => <li key={todo.id}>{JSON.stringify(todo)}</li>)}
      </ul>
    </section>
  )
}

export default TodoList;
