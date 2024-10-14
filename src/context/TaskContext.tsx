import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '../types/TaskTypes';

type TaskContextType = {
  tasks: Task[];
  addTask: (taskText: string) => void;
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
  filter: string;
  setFilter: (filter: string) => void;
  setSearchTerm: (term: string) => void; 
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

type TaskProviderProps = {
  children: ReactNode;
};

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState('all'); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText: string) => {
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks based on both the filter (all/completed/incomplete) and the search term
  const filteredTasks = tasks.filter(task => {
    const matchesSearchTerm = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'completed') return task.completed && matchesSearchTerm;
    if (filter === 'incomplete') return !task.completed && matchesSearchTerm;
    return matchesSearchTerm;
  });

  return (
    <TaskContext.Provider value={{ tasks: filteredTasks, addTask, toggleTaskCompletion, deleteTask, filter, setFilter, setSearchTerm }}>
      {children}
    </TaskContext.Provider>
  );
};
