import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';

const TaskList: React.FC = () => {
  const { tasks, toggleTaskCompletion, deleteTask, addTask, filter, setFilter } = useTasks();
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      addTask(newTaskText); 
      setNewTaskText(''); 
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="task-container">
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
          All
        </button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
          Completed
        </button>
        <button onClick={() => setFilter('incomplete')} className={filter === 'incomplete' ? 'active' : ''}>
          Incomplete
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'task-completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            {task.completed && <FaCheckCircle className="check-icon" />}
            <button onClick={() => deleteTask(task.id)} className="delete-button">
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>

      <div className="task-input-container">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Type something"
          className="task-input"
        />
        <button className="add-task-btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskList;
