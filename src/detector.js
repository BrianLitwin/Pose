import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';


export async function getDetector() {
    const config = {
        modelType: poseDetection.movenet.modelType.MULTIPOSE_THUNDER,
        enableTracking: false, // does this matter? want bounding box enable?
        maxPoses: 1
    };
    await tf.ready()
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, config);
    return detector
}


