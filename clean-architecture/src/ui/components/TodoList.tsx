import { FC, useState, useContext } from 'react';
import { useAddTodoToList } from '../../adapters/ui/useAddTodoToList';
import { Context } from '../../adapters/services/stateService';

const TodoList: FC = () => {
  const { loading: isAddingTodo, error: addingTodoError, addTodoToList } = useAddTodoToList();
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const { state: { todoList } } = useContext(Context);

  const handleAddTodo: React.FormEventHandler = async (e) => {
    e.preventDefault();

    await addTodoToList(newTodoDescription);
    setNewTodoDescription('');
  }

  return (
    <section>
      <form onSubmit={handleAddTodo}>
        <input 
          type="text"
          placeholder="Descrição (ex: regar as plantas)"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
      </form>
      {isAddingTodo && <p>Loading...</p>}
      {addingTodoError && <p>{addingTodoError.message}</p>}
      <ul>
        {todoList.map(todo => <li key={todo.id}>{JSON.stringify(todo)}</li>)}
      </ul>
    </section>
  )
}

export default TodoList;
