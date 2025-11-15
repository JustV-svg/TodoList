// src/hooks/useLocalStorage.js

import { useState, useEffect } from 'react';

// Función auxiliar para obtener el valor inicial
function getSavedValue(key, initialValue) {
  // Intentamos leer del localStorage
  const savedValue = JSON.parse(localStorage.getItem(key));

  // Si encontramos un valor, lo retornamos
  if (savedValue) return savedValue;

  // Si el valor inicial es una función (para cálculos pesados), la ejecutamos
  if (initialValue instanceof Function) return initialValue();

  // Si no, solo retornamos el valor inicial
  return initialValue;
}

export function useLocalStorage(key, initialValue) {
  // usa la función auxiliar para inicializar el estado
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  // usa useEffect para actualizar localStorage CADA VEZ que 'value' cambie
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]); // 'key' está aquí por si cambia dinámicamente

  // retorna el estado y la función para actualizarlo, igual que useState
  return [value, setValue];
}