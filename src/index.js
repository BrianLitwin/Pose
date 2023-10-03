import { createRoot } from 'react-dom/client';
import { useEffect, useState, useRef } from "react";
import React from 'react';
import {Video, startVideo} from './video';
import { getDetector } from './detector';
import { drawKeypoints, drawLine } from './draw';
import { Menu } from './menu';
import { toBodyparts } from './body'
import { angleBetweenLines } from './angles';

const CONFIDENCE = 0.3

async function getConfig() {
    const {ctx, video} = await startVideo()
    const detector = await getDetector()
    return {ctx, video, detector}
}

const App = () => {
    const [pose, setPose] = useState(null);
    const [config, setConfig] = useState(null)
    const poseRef = useRef(pose);
    const configRef = useRef(config)
    const [measure, setMeasure] = useState(null)

    useEffect(() => {
        poseRef.current = pose;
    }, [pose]);

    const drawLoop = async () => {
        const pose = poseRef.current
        const {ctx, video, detector} = configRef.current
        const poses = await detector.estimatePoses(video, {flipHorizontal: false})
        ctx.drawImage(video, 0, 0, video.width, video.height);

        const CONF = 0.4

        if (poses[0] && poses[0].keypoints.length > 0) {
            const body = toBodyparts(poses[0].keypoints)

            if (pose === "Ankle dorsiflexion") {
                const start = body.rightAnkle
                const end = body.rightKnee
                if (start.score > CONF & end.score > CONF) {
                    drawLine(start, end, ctx)
                    const angle = angleBetweenLines(
                        {start, end},
                        {start, end: {x: start.x, y: start.y - 150}} // horizontal line
                    )
                    drawLine(start, {x: start.x, y: start.y - 150}, ctx)
                    setMeasure(Math.round(angle))
                }
            }

            if (pose === "Hip flexion") {
                const start = body.rightHip
                const end = body.rightKnee
                if (start.score > CONF & end.score > CONF) {
                    drawLine(start, end, ctx)
                    const angle = angleBetweenLines(
                        {start, end},
                        {start, end: {x: start.x, y: start.y + 150}} // vertical line
                    )
                    drawLine(start, {x: start.x, y: start.y + 150}, ctx)
                    setMeasure(Math.round(angle))
                }
            }

            if (pose == "Right hip rotation") {
                const start = body.rightKnee
                const end = body.rightAnkle
                if (start.score > CONF & end.score > CONF) {
                    drawLine(start, end, ctx)
                    const angle = angleBetweenLines(
                        {start, end},
                        {start, end: {x: start.x, y: start.y + 150}} // vertical line
                    )
                    drawLine(start, {x: start.x, y: start.y + 150}, ctx)
                    setMeasure(Math.round(angle))
                }
            }

            if (pose == "Left hip rotation") {
                const start = body.leftKnee
                const end = body.leftAnkle
                if (start.score > CONF & end.score > CONF) {
                    drawLine(start, end, ctx)
                    const angle = angleBetweenLines(
                        {start, end},
                        {start, end: {x: start.x, y: start.y + 150}} // vertical line
                    )
                    drawLine(start, {x: start.x, y: start.y + 150}, ctx)
                    setMeasure(Math.round(angle))
                }
            }

            // drawKeypoints(poses[0].keypoints, ctx, CONFIDENCE)
        }

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
        makeMenuCheckbox("Ankle dorsiflexion"),
        makeMenuCheckbox("Hip flexion"),
        makeMenuCheckbox("Right hip rotation"),
        makeMenuCheckbox("Left hip rotation"),
    ]

    return (
        <div>
            <div>{pose}</div>
            <div style={{ fontSize: '125px' }}>{measure}</div>
            <Video />
            <Menu props={menuProps}/>
        </div>
    )
 };

 const domNode = document.getElementById('app');
 const root = createRoot(domNode);
 root.render(<App />);