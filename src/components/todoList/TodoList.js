import React from 'react';
import './todoList.css';
import Todo from '../todo/Todo';

export default function TodoList({ todos, removeTodo, completeTodo, toggleEditMode, editTodo, editTodoId, onChange, onSubmit }) {

  const renderTodos = () => {
    if (todos.length > 0) {
      return todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            completeTodo={completeTodo}
            toggleEditMode={toggleEditMode}
            editTodo={editTodo}
            editTodoId={editTodoId}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        );
      });
    }
    return <p className='errMessage'>There is no Todos.</p>;
  };

  return (
    <div className='todoList-container'>
      {renderTodos()}
    </div>
  );
};