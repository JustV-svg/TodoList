import React, { useState } from 'react';

// recibe 'requestAddTodo' que ABRIRÁ el modal
export function TodoForm({ requestAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    requestAddTodo(inputValue); // llama a la función que abre el modal
    setInputValue(''); // limpia el input inmediatamente
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Añadir una nueva tarea..."
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        Añadir
      </button>
    </form>
  );
}