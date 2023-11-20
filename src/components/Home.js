import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Header from './Header';


const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
   
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const markComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'black';
    }
  };

  const getCategoryImage = (category) => {
    switch (category) {
      case 'home':
        return 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/house-icon.png';
     
      case 'college':
        return 'https://cdn-icons-png.flaticon.com/512/8074/8074794.png';
      case 'personal':
        return 'https://cdn-icons-png.flaticon.com/512/6323/6323090.png';
      case 'fitness':
        return 'https://cdn.pixabay.com/photo/2018/08/23/20/27/gym-3626589_1280.png';
      default:
        return '';
    }
  };

  const saveTasksToLocalStorage = (updatedTasks) => {

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <>
      <Header />
      <div className="home">
        {tasks.length > 0 ? (
          <div className="task-list">
            {tasks.map((task, index) => (
              <div key={index} className={task.completed ? 'completed-task' : 'task'}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Due Date: {task.dueDate}</p>
                <p style={{ color: getPriorityColor(task.priority) }}>Priority: {task.priority}</p>
                <div className="category-image">
                  <img src={getCategoryImage(task.category)} alt={task.category} />
                  <p>Category: {task.category}</p>
                </div>
                {!task.completed && (
                  <button onClick={() => markComplete(index)}>Mark Complete</button>
                )}
                <button onClick={() => deleteTask(index)}>Delete Task</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="info">
            <p>You don't have any tasks yet</p>
            <p>Click on the + button to add one</p>
          </div>
        )}

        <div className="actions">
          <button className="add-task-button">
            <Link to={'/task'}>+</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
