import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import './Icons.css';
//import React, { useState } from 'react';
//import axios from 'axios';
import NoPage from './pages/NoPages';
import HomePage from './pages/HomePage';



//let refreshingCycle = false;

function App() {

  return (
      <div id="whole_site">
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="*" element={<NoPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}
export default App;