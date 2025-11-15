import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { ConfirmationModal } from './components/ConfirmationModal';
import { AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import './App.css'; 

function App() {
  // 1. Hook para Tareas
  const [todos, setTodos] = useLocalStorage('todos', []);

  // 2. Hook para el Tema (NUEVO)
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // 3. Hook para el Modal
  // Guarda el tipo de modal ('add' o 'delete') y la data (el texto o el ID)
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    type: null,
    data: null,
  });

  // 4. Efecto para aplicar la clase al body (NUEVO)
  React.useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  }, [theme]);

  // 5. Función para cambiar el tema (NUEVO)
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  

  // --- Lógica de Tareas (Funciones Reales) ---
  // Esta función AÑADE de verdad la tarea
  const addTodo = (text) => {
    const newTodo = {
      id: uuidv4(),
      text: text,
      completed: false
    };
    setTodos([newTodo, ...todos]); 
  };

  // Esta función BORRA de verdad la tarea
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  
  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // --- Lógica de Modales (Funciones Intermedias) ---
  
  // Abre el modal para AÑADIR 
  const requestAddTodo = (text) => {
    setModalState({ isOpen: true, type: 'add', data: text });
  };

  // Abre el modal para BORRAR 
  const requestDeleteTodo = (id) => {
    setModalState({ isOpen: true, type: 'delete', data: id });
  };

  // Cierra cualquier modal 
  const handleModalClose = () => {
    setModalState({ isOpen: false, type: null, data: null });
  };

  // Maneja la confirmación del modal 
  const handleModalConfirm = () => {
    if (modalState.type === 'add') {
      addTodo(modalState.data); // Llama a la función real de añadir
    } else if (modalState.type === 'delete') {
      deleteTodo(modalState.data); // Llama a la función real de borrar
    }
    handleModalClose(); // Cierra el modal
  };

  // Mensajes dinámicos para el modal 
  const getModalInfo = () => {
    if (modalState.type === 'add') {
      return {
        title: 'Confirmar Tarea',
        message: `¿Estás seguro de que quieres añadir la tarea "${modalState.data}"?`,
        confirmText: 'Confirmar',
        confirmType: 'add',
      };
    }
    if (modalState.type === 'delete') {
      const todoText = todos.find(t => t.id === modalState.data)?.text || '';
      return {
        title: 'Confirmar Borrado',
        message: `¿Estás seguro de que quieres eliminar la tarea "${todoText}"? Esta acción no se puede deshacer.`,
        confirmText: 'Borrar',
        confirmType: 'delete',
      };
    }
    return {}; 
  };

  const modalInfo = getModalInfo();

  return (
    <div className="app-container">
      

      <h1>Lista de Tareas</h1>
      <p>Organiza tus tareas fácilmente y sin complicaciones.</p>

      {/* El formulario pide añadir */}
      <TodoForm requestAddTodo={requestAddTodo} />

      {/* La lista de tareas */}
      <ul className="todo-list">
        <AnimatePresence>
          {todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo}
              toggleComplete={toggleComplete}
              requestDeleteTodo={requestDeleteTodo} 
            />
          ))}
        </AnimatePresence>
      </ul>

      {/* Mensaje de lista vacía */}
      {todos.length === 0 && (
        <p className="empty-list-message">¡Genial! No tienes tareas pendientes.</p>
      )}

      {/* Modal de Confirmación */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title={modalInfo.title}
        message={modalInfo.message}
        confirmText={modalInfo.confirmText}
        confirmType={modalInfo.confirmType}
      />
      
      {/* Botón de Modo Oscuro */}
      <button className="theme-toggle" onClick={toggleTheme}>
        <h6>Tema</h6>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
}

export default App;