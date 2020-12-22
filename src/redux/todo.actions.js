import {
  ADD_TODO,
  DELETE_TODO,
  CHECK_TODO,
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
} from './todo.types';
import axios from 'axios';

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const checkTodo = (id) => ({
  type: CHECK_TODO,
  payload: id,
});

export const getTodos = () => {
  return async (dispatch) => {
    dispatch(fetchTodos());
    try {
      const response = await axios('http://localhost:3004/todos');
      dispatch(fetchTodosSuccess(response));
    } catch (error) {
      dispatch(fetchTodosError(error));
    }
  };
};

const fetchTodosError = (error) => ({
  type: FETCH_TODOS_ERROR,
  payload: error,
});

const fetchTodosSuccess = (response) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: response.data,
});

const fetchTodos = () => ({
  type: FETCH_TODOS,
});
