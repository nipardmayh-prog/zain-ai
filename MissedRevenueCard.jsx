// =============================================================
// EditableField — Click-to-edit field for admin panel
// =============================================================
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function EditableField({ value, onSave, label, type = 'text' }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onSave(type === 'number' ? Number(editValue) : editValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type={type}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="bg-white/10 border border-nexus-500/50 rounded-lg px-3 py-1.5 text-white text-sm w-full focus:outline-none focus:ring-1 focus:ring-nexus-500/30"
        />
      </div>
    );
  }

  return (
    <motion.button
      onClick={() => setIsEditing(true)}
      whileHover={{ scale: 1.02 }}
      className="text-left w-full cursor-pointer group"
    >
      <p className="text-white text-sm font-medium group-hover:text-nexus-300 transition-colors">
        {value}
        <span className="text-gray-600 text-xs ml-2 opacity-0 group-hover:opacity-100 transition-opacity">✏️ edit</span>
      </p>
    </motion.button>
  );
}
