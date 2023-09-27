import { createRoot } from 'react-dom/client';
import React from 'react';
const App = () => {
 return <h1>Hello</h1>;
 }
 const domNode = document.getElementById('app');
 const root = createRoot(domNode);
 root.render(<App />);