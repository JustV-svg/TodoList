import React from 'react';
import { motion } from 'framer-motion';

// Variantes de animación para cada item
const itemVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, x: -100, transition: { duration: 0.2 } },
};

// recibe 'requestDeleteTodo'
export function TodoItem({ todo, toggleComplete, requestDeleteTodo }) {

  // Clases dinámicas para el item completado
  const itemClasses = `todo-item ${todo.completed ? 'completed' : ''}`;

  return (
    <motion.li
      className={itemClasses}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout // la lista se reordena suavemente
    >
      {/* Checkbox para marcar como completada */}
      <input
        type="checkbox"
        className="todo-item-checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      {/* Texto de la tarea */}
      <span className="todo-item-text">{todo.text}</span>

      {/* Botón para borrar */}
      <button
        onClick={() => requestDeleteTodo(todo.id)}
        className="todo-item-delete-btn"
      >
        Borrar
      </button>
    </motion.li>
  );
}