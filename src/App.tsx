import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskSearch from './components/TaskSearch';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="container">
        <h1 className="title">Today</h1>
        <TaskSearch />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;
