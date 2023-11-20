

import './App.css';


import Home from './components/Home'
 import Task from './components/Task';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
        
          <Route path={"/task"} element={<Task toast={toast} />} />

        </Routes>
      </BrowserRouter>




       
    </div>
  );
}

export default App;
