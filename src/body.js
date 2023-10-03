export function toBodyparts(keypoints) {
    return {
      nose: keypoints[0],
      leftEye: keypoints[1],
      rightEye: keypoints[2],
      leftEar: keypoints[3],
      rightEar: keypoints[4],
      leftShoulder: keypoints[5],
      rightShoulder: keypoints[6],
      leftElbow: keypoints[7],
      rightElbow: keypoints[8],
      leftWrist: keypoints[9],
      rightWrist: keypoints[10],
      leftHip: keypoints[11],
      rightHip: keypoints[12],
      leftKnee: keypoints[13],
      rightKnee: keypoints[14],
      leftAnkle: keypoints[15],
      rightAnkle: keypoints[16],
    }
}