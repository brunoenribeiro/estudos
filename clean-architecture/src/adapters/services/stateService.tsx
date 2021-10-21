import { createContext, FC, useContext, useReducer } from 'react';
import { TodoList } from '../../domain/todoList';

type State = {
  todoList: TodoList;
}

type Action = {
  type: string;
  payload: Partial<State>;
}

export interface IStateService {
  state: State;
  dispatch: (action: Action) => void;
}

const initialState: State = {
  todoList: [],
};

const reducer = (state: State, action: Action ): State => {
  switch(action.type) {
    case 'SET_TODO_LIST':
      return { ...state, todoList: action.payload.todoList! };
    default:
      return state;
  }
}

export const Context = createContext<IStateService>({
  state: initialState,
  dispatch: (action: Action) => {},
});

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateService: IStateService = { state, dispatch };

  return <Context.Provider value={stateService}>{children}</Context.Provider>
};
