function degrees(radians) {
    return radians * 180 / Math.PI;
  }

  function createVector(x1, y1, x2, y2) {
    return [x2 - x1, y2 - y1];
  }

  export function angleBetweenLines(line1, line2) {
    const v1 = createVector(line1.start.x, line1.start.y, line1.end.x, line1.end.y)
    const v2 = createVector(line2.start.x, line2.start.y, line2.end.x, line2.end.y)
    const dot = v1[0] * v2[0] + v1[1] * v2[1];
    const norm1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
    const norm2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
    const rad = Math.acos(dot / (norm1 * norm2));
    return degrees(rad)
}