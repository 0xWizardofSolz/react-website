import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { observeWebVitals, logMemoryUsage } from './utils/performance';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for caching and performance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize performance monitoring
if (process.env.NODE_ENV === 'development') {
  observeWebVitals();
  // Log memory usage every 30 seconds in development
  setInterval(logMemoryUsage, 30000);
}

// Enhanced Web Vitals reporting with more metrics
reportWebVitals((metric) => {
  console.log('Web Vital:', metric);
  // You can send this to an analytics endpoint
});
