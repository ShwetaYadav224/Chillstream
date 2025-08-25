import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Details from './pages/Details';
import SearchResults from './pages/SearchResults';
import Watch from './pages/Watch';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/');
    }
  };

  const handleItemClick = (type: 'movie' | 'tv', id: number) => {
    navigate(`/${type}/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      {!location.pathname.startsWith('/watch') && <Header onSearch={handleSearch} />}
      <main>
        <Routes>
          <Route path="/" element={<Home onItemClick={handleItemClick} />} />
          <Route 
            path="/movie/:id" 
            element={
              <Details 
                type="movie" 
                id={parseInt(location.pathname.split('/')[2])} 
                onBack={handleBack} 
              />
            } 
          />
          <Route 
            path="/tv/:id" 
            element={
              <Details 
                type="tv" 
                id={parseInt(location.pathname.split('/')[2])} 
                onBack={handleBack} 
              />
            } 
          />
          <Route 
            path="/search" 
            element={
              <SearchResults 
                query={new URLSearchParams(location.search).get('q') || ''}
                onBack={handleBack}
                onItemClick={handleItemClick}
              />
            }
          />
          <Route
            path="/watch/:type/:id"
            element={<Watch />}
          />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
