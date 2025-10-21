import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format, isWithinInterval, addDays, parseISO } from 'date-fns';
import { GripVertical, Trash2, Edit2, Save, X } from 'lucide-react';

export const GanttTask = ({ task, startDate, days, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 'auto',
  };

  // Calcular posición y ancho de la barra de tarea
  const calculateBarStyle = () => {
    const start = parseISO(task.startDate);
    const end = parseISO(task.endDate);
    const projectStart = new Date(startDate);
    
    const dayWidth = 64; // Ancho de cada día en píxeles
    const daysFromStart = Math.floor((start - projectStart) / (1000 * 60 * 60 * 24));
    const taskDuration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      left: `${daysFromStart * dayWidth}px`,
      width: `${taskDuration * dayWidth}px`,
      backgroundColor: task.color || '#3b82f6',
    };
  };

  const handleSave = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onUpdateTask({ ...task, deleted: true });
  };

  const barStyle = calculateBarStyle();
  
  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className="flex items-center h-16 border-b border-gray-200 relative group hover:bg-gray-50 transition-colors"
    >
      {/* Columna de nombre de tarea */}
      <div className="w-64 p-2 flex items-center border-r border-gray-200 h-full">
        <button 
          {...attributes}
          {...listeners}
          className="p-1 mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
        >
          <GripVertical size={16} />
        </button>
        
        {isEditing ? (
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) => setEditedTask({...editedTask, name: e.target.value})}
            className="flex-1 border rounded px-2 py-1 text-sm"
            autoFocus
          />
        ) : (
          <div className="flex-1">
            <div className="font-medium">{task.name}</div>
            <div className="text-xs text-gray-500">{task.responsible}</div>
          </div>
        )}
        
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
                title="Guardar"
              >
                <Save size={16} />
              </button>
              <button 
                onClick={() => {
                  setEditedTask({ ...task });
                  setIsEditing(false);
                }}
                className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                title="Cancelar"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              title="Editar"
            >
              <Edit2 size={16} />
            </button>
          )}
          
          {showDeleteConfirm ? (
            <div className="absolute right-2 top-10 bg-white shadow-lg rounded-md p-2 border border-red-200 z-10">
              <p className="text-sm text-gray-700 mb-2">¿Eliminar tarea?</p>
              <div className="flex space-x-2">
                <button 
                  onClick={handleDelete}
                  className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Sí
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              title="Eliminar"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Línea de tiempo */}
      <div className="relative flex-1 h-full">
        <div 
          className="absolute h-8 rounded-md top-1/2 -translate-y-1/2 flex items-center px-3 text-white text-sm font-medium"
          style={barStyle}
        >
          {task.name}
        </div>
      </div>
    </div>
  );
};
