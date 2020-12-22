import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.items.push({
        text: action.payload,
        completed: false,
        id:
          state.items.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      });
    },
    deleteTodo(state, action) {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    },
    checkTodo(state, action) {
      return {
        ...state,
        items: state.items.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    },
    fetchTodos(state) {
      state.loading = true;
      state.error = null;
      state.items = [];
    },
    fetchTodosSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    },
    fetchTodosError(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.items = [];
    },
  },
});

const { fetchTodos, fetchTodosSuccess, fetchTodosError } = todoSlice.actions;

export const getTodos = () => {
  return async (dispatch) => {
    dispatch(fetchTodos());
    try {
      const response = await axios('http://localhost:3004/todos');
      dispatch(fetchTodosSuccess(response.data));
    } catch (error) {
      dispatch(fetchTodosError(error.toString()));
    }
  };
};

export const { addTodo, deleteTodo, checkTodo } = todoSlice.actions;

export default todoSlice.reducer;
