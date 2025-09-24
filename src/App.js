import React from 'react';
import { Outlet } from 'react-router-dom';
import Toast from './Components/Toast/Toast';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Expense Tracker</h1>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <Toast />
    </div>
  );
}

export default App;
