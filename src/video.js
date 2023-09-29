import { useEffect, useState } from "react";
import React from 'react';

const WIDTH = 640
const HEIGHT = 480

const videoStyle = `
-webkit-transform: scaleX(-1);
transform: scaleX(-1);
visibility: hidden;
width: auto;
height: auto;
`

async function startVideo() {
    const video = document.getElementById('video'); // should you be using refs instead of getElementById ?
    video.style = videoStyle
    video.width = WIDTH
    video.height = HEIGHT

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    video.srcObject = stream
    video.play()

    const canvas = document.getElementById('canvas');
    canvas.width = WIDTH
    canvas.height = HEIGHT
    var ctx = canvas.getContext("2d");

    async function drawVideo() {
        ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);
        requestAnimationFrame(drawVideo) // loop
    }

    drawVideo()
}

export const Video = () => {
  const [inited, setInited] = useState(false)

  useEffect(() => {
    if (!inited) {
      startVideo()
      setInited(true)
    }
  })

    return (
        <div>
          <canvas id="canvas"></canvas>
          <video id="video"></video>
        </div>
    )
}