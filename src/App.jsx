import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IndexRoutes from './routes/IndexRoutes';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import Preloader from './components/Preloader';

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path !== '/') {
      // Instantly set loading to complete for all non-root paths
      setLoadingComplete(true);
    }
  }, [path]);

  return (
    <SmoothScrollProvider>
      <div className="overflow-hidden bg-[#e5e5dd]">
        {path === '/' && !loadingComplete ? (
          <Preloader onComplete={() => setLoadingComplete(true)} />
        ) : (
          <IndexRoutes />
        )}
      </div>
    </SmoothScrollProvider>
  );
};

export default App;
