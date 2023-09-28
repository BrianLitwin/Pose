import { createRoot } from 'react-dom/client';
import React from 'react';
import {Video} from './video';

const App = () => {
 return (
        <div>
            <div>Hello</div>
            <Video/>
        </div>
    )
 };

 const domNode = document.getElementById('app');
 const root = createRoot(domNode);
 root.render(<App />);