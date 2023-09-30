import { createRoot } from 'react-dom/client';
import { useEffect, useState } from "react";
import React from 'react';
import {Video, startVideo} from './video';
import { getDetector } from './detector';
import { drawKeypoints } from './draw';
import { Menu } from './menu';

const CONFIDENCE = 0.3

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
    const [selectedPose, setSelectedPose] = useState(null);

    useEffect(() => {
        start()
    })

    const makeMenuCheckbox = (desc) => {
        return {label: desc, onChange: () => setSelectedPose(desc), checked: selectedPose === desc}
    }

    const menuProps = [
        makeMenuCheckbox("Ankle dorsiflexion"), makeMenuCheckbox("Hip flexion")
    ]

    return (
            <div>
                <div>{selectedPose}</div>
                <Video/>
                <Menu props={menuProps}/>
            </div>
        )
 };

 const domNode = document.getElementById('app');
 const root = createRoot(domNode);
 root.render(<App />);