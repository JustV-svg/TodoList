import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Variante de animación para el fondo
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Variante de animación para el modal
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
};

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText, confirmType = 'add' }) {
  
  // Determina la clase del botón de confirmación
  const confirmButtonClass = `modal-button confirm-${confirmType}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Cierra el modal si se hace clic fuera
        >
          <motion.div
            className="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal cierre el overlay
          >
            <h3>{title}</h3>
            <p>{message}</p>
            <div className="modal-buttons">
              <button className="modal-button cancel" onClick={onClose}>
                Cancelar
              </button>
              <button className={confirmButtonClass} onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}