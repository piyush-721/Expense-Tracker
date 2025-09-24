import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import HomePage from './Pages/HomePage';
import { WalletProvider } from './Contexts/WalletContext';
import { ExpenseProvider } from './Contexts/ExpenseContext';
import { ToastProvider } from './Contexts/ToastContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider>
    <ExpenseProvider>
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes> 
        </BrowserRouter>
      </WalletProvider>
    </ExpenseProvider>
  </ToastProvider>
);
