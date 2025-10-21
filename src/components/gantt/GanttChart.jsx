import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { GanttTask } from './GanttTask';
import { format, addDays } from 'date-fns';

export const GanttChart = ({ tasks, onTasksUpdate }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      
      onTasksUpdate(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  // Calcular el rango de fechas
  const startDate = new Date();
  const endDate = addDays(startDate, 30); // 30 días de timeline
  
  // Generar días para el encabezado
  const days = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        {/* Encabezado de la línea de tiempo */}
        <div className="flex border-b border-gray-200">
          <div className="w-64 border-r border-gray-200 p-2 font-medium">Tarea</div>
          <div className="flex">
            {days.map((day, index) => (
              <div 
                key={index} 
                className={`w-16 text-xs text-center p-2 border-r border-gray-200 ${index === 0 ? 'border-l' : ''} ${[0, 6].includes(day.getDay()) ? 'bg-gray-50' : ''}`}
              >
                <div className="font-medium">{format(day, 'dd')}</div>
                <div className="text-gray-500">{format(day, 'EEE')}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Lista de tareas */}
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={tasks}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <GanttTask 
                key={task.id} 
                task={task} 
                startDate={startDate}
                days={days.length}
                onUpdateTask={(updatedTask) => {
                  onTasksUpdate(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
                }}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
