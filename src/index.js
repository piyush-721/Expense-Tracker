import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import HomePage from './Pages/HomePage';
// import { WalletProvider } from './WalletContext';
import { WalletProvider } from './Contexts/WalletContext';
// import { ExpenseProvider } from './ExpenseContext';
import { ExpenseProvider } from './Contexts/ExpenseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ExpenseProvider>
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes> 
      </BrowserRouter>
    </WalletProvider>
  </ExpenseProvider>
);


