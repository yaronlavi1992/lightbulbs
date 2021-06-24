import { useReducer, useContext, createContext } from 'react';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE_SCORE':
      return { ...state, score: state.score + 10 };
    case 'RESET_SCORE':
      return { ...state, score: 0 };
    case 'UPDATE_NAME':
      return { ...state, name: action.payload };
    case 'NEW_BEST_SCORE':
      return {
        ...state,
        bestScoresHistory: [...state.bestScoresHistory, action.payload],
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    score: 0,
    bestScoresHistory: [0],
  });
  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const useUser = () => useContext(UserStateContext);
export const useDispatchUser = () => useContext(UserDispatchContext);
