'use client';
import { useEffect, useRef } from 'react';

export default function AutoResizeTextarea({ value, onChange, name, placeholder, ...props }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reinicia
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full
        border border-gray-300 rounded
        p-3 text-black bg-white
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        resize-none overflow-hidden
        transition
      `}
      style={{ lineHeight: '1.5', minHeight: '6rem' }}
      {...props}
    />
  );
}
