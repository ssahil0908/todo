import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { debounce } from '../utils/debounce';

const TaskSearch: React.FC = () => {
  const { setSearchTerm } = useTasks();
  const [searchTermInput, setSearchTermInput] = useState('');

  useEffect(() => {
    const handler = debounce(() => {
      setSearchTerm(searchTermInput);
    }, 300);

    handler();

    return () => {
      // Cleanup
    };
  }, [searchTermInput, setSearchTerm]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTermInput}
        onChange={(e) => setSearchTermInput(e.target.value)}
        placeholder="Search tasks..."
        className="search-input"
      />
    </div>
  );
};

export default TaskSearch;
