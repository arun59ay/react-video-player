import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../src/index.css'; // shared styles

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
