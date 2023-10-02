import { createRoot } from 'react-dom/client';
import { useEffect, useState, useRef } from "react";
import React from 'react';
import {Video, startVideo} from './video';
import { getDetector } from './detector';
import { drawKeypoints, drawLine } from './draw';
import { Menu } from './menu';
// import { drawLine } from './draw';

const CONFIDENCE = 0.3

async function getConfig() {
    const {ctx, video} = await startVideo()
    const detector = await getDetector()
    return {ctx, video, detector}
}

async function draw(pose, {ctx, video, detector}) {
    const poses = await detector.estimatePoses(video, {flipHorizontal: false});
    ctx.drawImage(video, 0, 0, video.width, video.height);

    if (poses[0] && poses[0].keypoints.length > 0) {
        drawKeypoints(poses[0].keypoints, ctx, CONFIDENCE)
    }

    console.log(pose)
}

const App = () => {
    const [pose, setPose] = useState(null);
    const [config, setConfig] = useState(null)
    const poseRef = useRef(pose);
    const configRef = useRef(config)

    useEffect(() => {
        poseRef.current = pose;
    }, [pose]);

    const drawLoop = () => {
        draw(poseRef.current, configRef.current);
        requestAnimationFrame(drawLoop);
    };

    useEffect(() => {
        getConfig().then(config => {
            configRef.current = config
            requestAnimationFrame(drawLoop)
        })
    }, []);

    const makeMenuCheckbox = (desc) => {
        return {label: desc, onChange: () => setPose(desc), checked: pose === desc}
    }

    const menuProps = [
        makeMenuCheckbox("Ankle dorsiflexion"), makeMenuCheckbox("Hip flexion")
    ]

    return (
            <div>
                <div>{pose}</div>
                <Video />
                <Menu props={menuProps}/>
            </div>
        )
 };

 const domNode = document.getElementById('app');
 const root = createRoot(domNode);
 root.render(<App />);