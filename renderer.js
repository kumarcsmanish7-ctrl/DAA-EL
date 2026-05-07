// renderer.js - Three.js rendering and Cube3D class

class Cube3D {
    constructor(scene) {
        this.scene = scene;
        this.cubies = [];
        this.isAnimating = false;
        this.animationSpeed = 1;
        this.createCubies();
    }

    createCubies() {
        const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    const materials = this.createMaterials(x, y, z);
                    const cubie = new THREE.Mesh(geometry, materials);
                    cubie.position.set(x, y, z);
                    this.scene.add(cubie);
                    this.cubies.push({ mesh: cubie, x, y, z });
                }
            }
        }
    }

    createMaterials(x, y, z) {
        const materials = [];
        for (let i = 0; i < 6; i++) {
            materials.push(new THREE.MeshBasicMaterial({ color: 0x000000 }));
        }

        // Front
        if (z === 1) materials[0].color.setHex(COLORS.G);
        // Back
        if (z === -1) materials[1].color.setHex(COLORS.B);
        // Up
        if (y === 1) materials[2].color.setHex(COLORS.W);
        // Down
        if (y === -1) materials[3].color.setHex(COLORS.Y);
        // Right
        if (x === 1) materials[4].color.setHex(COLORS.R);
        // Left
        if (x === -1) materials[5].color.setHex(COLORS.O);

        return materials;
    }

    updateColors(cube) {
        this.cubies.forEach(cubie => {
            const { x, y, z } = cubie;
            const materials = cubie.mesh.material;

            // Map positions to faces
            // Front (z=1): FRONT face
            if (z === 1) {
                const face = cube.cube[FACES.FRONT];
                const i = 1 - y;
                const j = x + 1;
                materials[0].color.setHex(COLORS[face[i][j]]);
            }
            // Back (z=-1): BACK face
            if (z === -1) {
                const face = cube.cube[FACES.BACK];
                const i = 1 - y;
                const j = 1 - x;
                materials[1].color.setHex(COLORS[face[i][j]]);
            }
            // Up (y=1): UP face
            if (y === 1) {
                const face = cube.cube[FACES.UP];
                const i = 1 - z;
                const j = x + 1;
                materials[2].color.setHex(COLORS[face[i][j]]);
            }
            // Down (y=-1): DOWN face
            if (y === -1) {
                const face = cube.cube[FACES.DOWN];
                const i = z + 1;
                const j = x + 1;
                materials[3].color.setHex(COLORS[face[i][j]]);
            }
            // Right (x=1): RIGHT face
            if (x === 1) {
                const face = cube.cube[FACES.RIGHT];
                const i = 1 - y;
                const j = z + 1;
                materials[4].color.setHex(COLORS[face[i][j]]);
            }
            // Left (x=-1): LEFT face
            if (x === -1) {
                const face = cube.cube[FACES.LEFT];
                const i = 1 - y;
                const j = 1 - z;
                materials[5].color.setHex(COLORS[face[i][j]]);
            }
        });
    }

    animateMove(move, callback) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const axis = this.getAxisForMove(move);
        const layer = this.getLayerForMove(move);
        const angle = this.getAngleForMove(move);

        const rotatingCubies = this.cubies.filter(cubie => {
            switch (axis) {
                case 'x': return Math.abs(cubie.x - layer) < 0.1;
                case 'y': return Math.abs(cubie.y - layer) < 0.1;
                case 'z': return Math.abs(cubie.z - layer) < 0.1;
            }
        });

        const group = new THREE.Group();
        rotatingCubies.forEach(cubie => {
            this.scene.remove(cubie.mesh);
            group.add(cubie.mesh);
        });
        this.scene.add(group);

        const startTime = Date.now();
        const duration = 500 / this.animationSpeed;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentAngle = angle * progress;

            switch (axis) {
                case 'x': group.rotation.x = currentAngle; break;
                case 'y': group.rotation.y = currentAngle; break;
                case 'z': group.rotation.z = currentAngle; break;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                const tempVector = new THREE.Vector3();
                rotatingCubies.forEach(cubie => {
                    cubie.mesh.getWorldPosition(tempVector);
                    cubie.x = Math.round(tempVector.x);
                    cubie.y = Math.round(tempVector.y);
                    cubie.z = Math.round(tempVector.z);
                    cubie.mesh.position.copy(tempVector);
                    group.remove(cubie.mesh);
                    this.scene.add(cubie.mesh);
                });
                this.scene.remove(group);
                this.isAnimating = false;
                if (callback) callback();
            }
        };

        animate();
    }

    getAxisForMove(move) {
        switch (move) {
            case MOVES.U:
            case MOVES.UP:
            case MOVES.D:
            case MOVES.DP:
                return 'y';
            case MOVES.L:
            case MOVES.LP:
            case MOVES.R:
            case MOVES.RP:
                return 'x';
            case MOVES.F:
            case MOVES.FP:
            case MOVES.B:
            case MOVES.BP:
                return 'z';
        }
    }

    getLayerForMove(move) {
        switch (move) {
            case MOVES.U:
            case MOVES.UP:
                return 1;
            case MOVES.D:
            case MOVES.DP:
                return -1;
            case MOVES.L:
            case MOVES.LP:
                return -1;
            case MOVES.R:
            case MOVES.RP:
                return 1;
            case MOVES.F:
            case MOVES.FP:
                return 1;
            case MOVES.B:
            case MOVES.BP:
                return -1;
        }
    }

    getAngleForMove(move) {
        const isPrime = move.includes('\'');
        return isPrime ? -Math.PI / 2 : Math.PI / 2;
    }

    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
    }
}

class Renderer {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, (window.innerWidth - 250) / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth - 250, window.innerHeight);
        this.renderer.setClearColor(0x121212);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set(5, 5, 5);
        this.controls.update();

        this.cube3d = new Cube3D(this.scene);
        this.animate();

        window.addEventListener('resize', () => this.onWindowResize());
    }

    updateCubeColors(cube) {
        this.cube3d.updateColors(cube);
    }

    animateMove(move, callback) {
        this.cube3d.animateMove(move, callback);
    }

    setAnimationSpeed(speed) {
        this.cube3d.setAnimationSpeed(speed);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = (window.innerWidth - 250) / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth - 250, window.innerHeight);
    }
}