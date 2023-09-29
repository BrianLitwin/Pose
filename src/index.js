import { createRoot } from 'react-dom/client';
import { useEffect } from "react";
import React from 'react';
import {Video, startVideo} from './video';
import { getDetector } from './detector';


// async function drawVideo() {
//     ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);
//     requestAnimationFrame(drawVideo) // loop
// }

// drawVideo()

async function start() {
    const {ctx, video} = await startVideo()
    const detector = await getDetector()

    async function drawVideo() {
        ctx.drawImage(video, 0, 0, video.width, video.height);
        const poses = await detector.estimatePoses(video, {flipHorizontal: false})

        console.log(poses)
        requestAnimationFrame(drawVideo) // loop
    }

    drawVideo()
}

const App = () => {

useEffect(() => {
    start()
})

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