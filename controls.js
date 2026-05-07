// controls.js - UI controls and interactions

class Controls {
    constructor(cube, renderer) {
        this.cube = cube;
        this.renderer = renderer;
        this.solution = null;
        this.currentStep = 0;

        this.initButtons();
        this.initSpeedControl();
    }

    initButtons() {
        document.getElementById('scramble').addEventListener('click', () => this.scramble());
        document.getElementById('reset').addEventListener('click', () => this.reset());
        document.getElementById('solver').addEventListener('click', () => this.solve());
        document.getElementById('animateU').addEventListener('click', () => this.animateU());
        // Other buttons can be implemented later
    }

    initSpeedControl() {
        const speedSlider = document.getElementById('speed');
        speedSlider.addEventListener('input', (e) => {
            this.renderer.setAnimationSpeed(parseFloat(e.target.value));
        });
    }

    scramble() {
        this.cube.scramble(10);
        this.renderer.updateCubeColors(this.cube);
        document.getElementById('status').textContent = 'Scrambled';
    }

    reset() {
        this.cube.initializeSolved();
        this.renderer.updateCubeColors(this.cube);
        document.getElementById('status').textContent = 'Reset';
    }

    solve() {
        this.solution = Solver.solve(this.cube);
        if (this.solution) {
            this.currentStep = 0;
            document.getElementById('status').textContent = `Solving: ${this.solution.length} moves`;
            this.animateSolution();
        } else {
            document.getElementById('status').textContent = 'No solution found';
        }
    }

    animateU() {
        this.renderer.animateMove(MOVES.U, () => {
            this.cube.applyMove(MOVES.U);
            this.renderer.updateCubeColors(this.cube);
            document.getElementById('status').textContent = 'U move completed';
        });
    }
}

// Initialize everything
const cube = new Cube();
const renderer = new Renderer(document.getElementById('canvas-container'));
renderer.updateCubeColors(cube);
const controls = new Controls(cube, renderer);