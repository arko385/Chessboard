import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Chessboard from './component/Chessboard';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements,Redirect, Routes ,BrowserRouter} from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="chessboard" element={<Chessboard />} />
    </Routes>
  </BrowserRouter>
  
);


