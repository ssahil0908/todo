import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export const AddTask: React.FC = () => {
  const { addTask } = useTasks();
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    addTask(taskText);
    setTaskText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};
