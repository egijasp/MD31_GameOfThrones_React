import React from 'react';
import './App.scss';
import { Link, Route, Routes } from 'react-router-dom';
import Houses from './pages/Houses';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import CharacterPage from './pages/CharacterPage';

const App = () => (
  <div className="">
    <header className="header">
      <nav className="nav__links">
        <Link className="links links-header" to="/houses">Houses</Link>
        <Link className="links links-header" to="/">Home</Link>
      </nav>
    </header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/houses" element={<Houses />} />
      <Route path="/characters/:slug" element={<CharacterPage />} />
      <Route path="404" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
