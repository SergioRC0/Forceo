'use client';
import { useState } from 'react';
import { MoreVertical } from 'lucide-react';

export default function ActionMenu({ actions = [], className = '' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${open ? 'z-50' : 'z-0'} ${className}`}>
      <button onClick={() => setOpen(prev => !prev)} className="p-1 text-gray-600 hover:text-black">
        <MoreVertical className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute z-50 right-0 mt-2 w-36 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
          {actions.map((action, index) =>
            !action.hidden ? (
              <button
                key={index}
                onClick={() => {
                  setOpen(false);
                  action.onClick();
                }}
                className={`w-full px-4 py-2 text-left text-sm ${action.className || ''}`}
              >
                {action.label}
              </button>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
