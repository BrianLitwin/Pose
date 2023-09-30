
function drawCircle(x, y, ctx) {
    const circle = new Path2D();
    circle.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#3370d4"
    ctx.fill(circle);
    ctx.stroke(circle);
}

export function drawKeypoints(keypoints, ctx, confidence) {
    for (const kp of keypoints) {
        if (kp.score >= confidence) {
            drawCircle(kp.x, kp.y, ctx)
        }
    }
}


