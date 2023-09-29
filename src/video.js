import React from 'react'; // didn't think this had to be here


const WIDTH = 640
const HEIGHT = 480

const videoStyle = `
-webkit-transform: scaleX(-1);
transform: scaleX(-1);
visibility: hidden;
width: auto;
height: auto;
`

export async function startVideo() {
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

    return {ctx, video}
}

export const Video = () => {
    return (
        <div>
          <canvas id="canvas"></canvas>
          <video id="video"></video>
        </div>
    )
}