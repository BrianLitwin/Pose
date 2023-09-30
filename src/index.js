import { createRoot } from 'react-dom/client';
import { useEffect } from "react";
import React from 'react';
import {Video, startVideo} from './video';
import { getDetector } from './detector';
import { drawKeypoints } from './draw'

const CONFIDENCE = 0.3

function drawCircle(x, y, ctx) {
    const circle = new Path2D();
    circle.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#3370d4"
    ctx.fill(circle);
    ctx.stroke(circle);
}

export function drawLine(start, end, ctx) {
    const color = "#3370d4"
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 5
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}

async function start() {
    const {ctx, video} = await startVideo()
    const detector = await getDetector()

    async function drawVideo() {

        // getting the poses before drawing the image is important
        const poses = await detector.estimatePoses(video, {flipHorizontal: false});
        ctx.drawImage(video, 0, 0, video.width, video.height);

        if (poses[0] && poses[0].keypoints.length > 0) {
            drawKeypoints(poses[0].keypoints, ctx, CONFIDENCE)
        }

        requestAnimationFrame(drawVideo)
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