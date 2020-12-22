import React, { useEffect } from 'react';
import TodoList from './TodoList';
import { useDispatch, useSelector } from 'react-redux';
// import { getTodos } from '../redux/todo.slice';
import { getTodos } from '../redux/todo.slice';

const MainSection = () => {
  const loading = useSelector((state) => state.todos.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <section className="main">
      {loading ? (
        <div style={{ margin: '15px' }}>
          <i className="fa fa-spinner fa-spin fa-4x"></i>
        </div>
      ) : (
        <TodoList />
      )}
    </section>
  );
};

export default MainSection;
