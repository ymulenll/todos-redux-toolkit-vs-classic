import {
  ADD_TODO,
  DELETE_TODO,
  CHECK_TODO,
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
} from './todo.types';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        items: [
          ...state.items,
          {
            text: action.payload,
            completed: false,
            id:
              state.items.reduce(
                (maxId, todo) => Math.max(todo.id, maxId),
                -1
              ) + 1,
          },
        ],
      };
    case DELETE_TODO:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case CHECK_TODO:
      return {
        ...state,
        items: state.items.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case FETCH_TODOS:
      return {
        ...state,
        loading: true,
        error: null,
        items: [],
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.payload,
      };
    case FETCH_TODOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      };

    default:
      return state;
  }
}
