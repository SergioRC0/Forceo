'use client';
import { useState } from 'react';

export default function ExpandableText({ text, className = '', clamp = 2 }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const shouldShowToggle = text.length > 200;

  return (
    <div>
      <p
        className={`break-words text-gray-700 ${
          !expanded ? `line-clamp-${clamp}` : ''
        } ${className}`}
      >
        {text}
      </p>

      {shouldShowToggle && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-600 hover:underline mt-1"
        >
          {expanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </div>
  );
}
