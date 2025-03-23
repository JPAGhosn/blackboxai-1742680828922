import * as THREE from 'three';

class Bot {
    constructor(scene, modelPath) {
        this.scene = scene;
        this.modelPath = modelPath;
        this.mesh = null;
        this.position = new THREE.Vector3();
        this.speed = 0.1; // Speed of the bot
        this.direction = new THREE.Vector3();
    }

    async loadModel() {
        const loader = new THREE.GLTFLoader();
        const gltf = await loader.loadAsync(this.modelPath);
        this.mesh = gltf.scene;
        this.scene.add(this.mesh);
        console.log("Bot model loaded:", this.mesh); // Log when the model is loaded
    }

    update(playerPosition) {
        if (this.mesh) {
            // Simple AI to move towards the player
            this.direction.copy(playerPosition).sub(this.position).normalize();
            this.position.add(this.direction.multiplyScalar(this.speed));
            this.mesh.position.copy(this.position);
        }
    }
}

export default Bot;