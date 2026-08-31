import React from 'react';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const path = window.location.pathname;

  const renderPage = () => {
    if (path === '/about') return <About />;
    if (path === '/login') return <Login />;
    if (path === '/register') return <Register />;
    return <NotFound />;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {renderPage()}
    </div>
  );
}

export default App;