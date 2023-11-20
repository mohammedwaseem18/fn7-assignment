import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
 import './Task.css';
import { useNavigate } from 'react-router-dom';



import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const Task = ({toast}) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    category: 'home',
  });

  useEffect(() => {
 
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    const updatedTasks = [...tasks, { ...newTask, completed: false }];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);

    toast.success('Task added successfully!', {
        position: toast.POSITION.TOP_CENTER,
         autoClose: 1000,
    });

    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'low',
      category: 'home',
    });
setTimeout(() => {
    
    navigate('/');
}, 500);
  };

 const taskFormConfig = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', label: 'Task Name', scope: '#/properties/title' },
    { type: 'Control', label: 'Task Description', scope: '#/properties/description', options: { multiline: true } },
    { type: 'Control', label: 'Due Date', scope: '#/properties/dueDate', options: { format: 'date' } },
    { type: 'Control', label: 'Priority', scope: '#/properties/priority', options: { enumOptions: [{ value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }] } },
    { type: 'Control', label: 'Category', scope: '#/properties/category', options: { enumOptions: [{ value: 'home', label: 'Home' }, { value: 'college', label: 'College' }, { value: 'personal', label: 'Personal' }, { value: 'fitness', label: 'Fitness' }] } },
  ],
};

  return (
    <>
      <Header />
      <div className='Task'>
        <div className="task-manager-container">
          <h1>Add New Task</h1>
          <div className="task-inputs">
          
            <JsonForms
              data={newTask}
              schema={{
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  dueDate: { type: 'string',  },
                  priority: { type: 'string', enum: ['high', 'medium', 'low'] },
                  category: { type: 'string', enum: ['home', 'college', 'personal', 'fitness'] },
                },
                required: ['title'],
              }}
              uischema={taskFormConfig}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data }) => setNewTask(data)}
            />
             <button
              onClick={addTask}
              style={{
                backgroundColor: 'rgb(40, 27, 87)',  
                color: 'white',              
                padding: '10px 20px',       
                fontSize: '16px',            
                cursor: 'pointer',          
                borderRadius: '10px',         
                          
                marginTop: '20px', 
              }}
            >
              Add Task
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Task;
