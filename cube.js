// cube.js - Cube logic

const COLORS = {
    W: 0xffffff, // White
    R: 0xff0000, // Red
    B: 0x0000ff, // Blue
    O: 0xffa500, // Orange
    G: 0x00ff00, // Green
    Y: 0xffff00  // Yellow
};

const FACES = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    FRONT: 4,
    BACK: 5
};

const MOVES = {
    U: 'U',
    UP: 'U\'',
    D: 'D',
    DP: 'D\'',
    L: 'L',
    LP: 'L\'',
    R: 'R',
    RP: 'R\'',
    F: 'F',
    FP: 'F\'',
    B: 'B',
    BP: 'B\''
};

class Cube {
    constructor() {
        this.cube = Array(6).fill().map(() => Array(3).fill().map(() => Array(3).fill('')));
        this.initializeSolved();
    }

    initializeSolved() {
        // UP: White
        for (let i = 0; i < 3; i++) {
            this.cube[FACES.UP][i].fill('W');
        }
        // DOWN: Yellow
        for (let i = 0; i < 3; i++) {
            this.cube[FACES.DOWN][i].fill('Y');
        }
        // LEFT: Orange
        for (let i = 0; i < 3; i++) {
            this.cube[FACES.LEFT][i].fill('O');
        }
        // RIGHT: Red
        for (let i = 0; i < 3; i++) {
            this.cube[FACES.RIGHT][i].fill('R');
        }
        // FRONT: Green
        for (let i = 0; i < 3; i++) {
            this.cube[FACES.FRONT][i].fill('G');
        }
        // BACK: Blue
        for (let i = 0; i < 3; i++) {
            this.cube[FACES.BACK][i].fill('B');
        }
    }

    copy() {
        let newCube = new Cube();
        for (let f = 0; f < 6; f++) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    newCube.cube[f][i][j] = this.cube[f][i][j];
                }
            }
        }
        return newCube;
    }

    applyMove(move) {
        switch (move) {
            case MOVES.U: this.rotateU(); break;
            case MOVES.UP: this.rotateUPrime(); break;
            case MOVES.D: this.rotateD(); break;
            case MOVES.DP: this.rotateDPrime(); break;
            case MOVES.L: this.rotateL(); break;
            case MOVES.LP: this.rotateLPrime(); break;
            case MOVES.R: this.rotateR(); break;
            case MOVES.RP: this.rotateRPrime(); break;
            case MOVES.F: this.rotateF(); break;
            case MOVES.FP: this.rotateFPrime(); break;
            case MOVES.B: this.rotateB(); break;
            case MOVES.BP: this.rotateBPrime(); break;
        }
    }

    rotateU() {
        this.rotateFaceClockwise(FACES.UP);
        let temp = [...this.cube[FACES.FRONT][0]];
        this.cube[FACES.FRONT][0] = [...this.cube[FACES.RIGHT][0]];
        this.cube[FACES.RIGHT][0] = [...this.cube[FACES.BACK][0]];
        this.cube[FACES.BACK][0] = [...this.cube[FACES.LEFT][0]];
        this.cube[FACES.LEFT][0] = temp;
    }

    rotateUPrime() {
        this.rotateFaceCounterclockwise(FACES.UP);
        let temp = [...this.cube[FACES.FRONT][0]];
        this.cube[FACES.FRONT][0] = [...this.cube[FACES.LEFT][0]];
        this.cube[FACES.LEFT][0] = [...this.cube[FACES.BACK][0]];
        this.cube[FACES.BACK][0] = [...this.cube[FACES.RIGHT][0]];
        this.cube[FACES.RIGHT][0] = temp;
    }

    rotateD() {
        this.rotateFaceClockwise(FACES.DOWN);
        let temp = [...this.cube[FACES.FRONT][2]];
        this.cube[FACES.FRONT][2] = [...this.cube[FACES.LEFT][2]];
        this.cube[FACES.LEFT][2] = [...this.cube[FACES.BACK][2]];
        this.cube[FACES.BACK][2] = [...this.cube[FACES.RIGHT][2]];
        this.cube[FACES.RIGHT][2] = temp;
    }

    rotateDPrime() {
        this.rotateFaceCounterclockwise(FACES.DOWN);
        let temp = [...this.cube[FACES.FRONT][2]];
        this.cube[FACES.FRONT][2] = [...this.cube[FACES.RIGHT][2]];
        this.cube[FACES.RIGHT][2] = [...this.cube[FACES.BACK][2]];
        this.cube[FACES.BACK][2] = [...this.cube[FACES.LEFT][2]];
        this.cube[FACES.LEFT][2] = temp;
    }

    rotateL() {
        this.rotateFaceClockwise(FACES.LEFT);
        let temp = [];
        for (let i = 0; i < 3; i++) {
            temp[i] = this.cube[FACES.UP][i][0];
            this.cube[FACES.UP][i][0] = this.cube[FACES.BACK][2 - i][2];
            this.cube[FACES.BACK][2 - i][2] = this.cube[FACES.DOWN][i][0];
            this.cube[FACES.DOWN][i][0] = this.cube[FACES.FRONT][i][0];
            this.cube[FACES.FRONT][i][0] = temp[i];
        }
    }

    rotateLPrime() {
        this.rotateFaceCounterclockwise(FACES.LEFT);
        let temp = [];
        for (let i = 0; i < 3; i++) {
            temp[i] = this.cube[FACES.UP][i][0];
            this.cube[FACES.UP][i][0] = this.cube[FACES.FRONT][i][0];
            this.cube[FACES.FRONT][i][0] = this.cube[FACES.DOWN][i][0];
            this.cube[FACES.DOWN][i][0] = this.cube[FACES.BACK][2 - i][2];
            this.cube[FACES.BACK][2 - i][2] = temp[i];
        }
    }

    rotateR() {
        this.rotateFaceClockwise(FACES.RIGHT);
        let temp = [];
        for (let i = 0; i < 3; i++) {
            temp[i] = this.cube[FACES.UP][i][2];
            this.cube[FACES.UP][i][2] = this.cube[FACES.FRONT][i][2];
            this.cube[FACES.FRONT][i][2] = this.cube[FACES.DOWN][i][2];
            this.cube[FACES.DOWN][i][2] = this.cube[FACES.BACK][2 - i][0];
            this.cube[FACES.BACK][2 - i][0] = temp[i];
        }
    }

    rotateRPrime() {
        this.rotateFaceCounterclockwise(FACES.RIGHT);
        let temp = [];
        for (let i = 0; i < 3; i++) {
            temp[i] = this.cube[FACES.UP][i][2];
            this.cube[FACES.UP][i][2] = this.cube[FACES.BACK][2 - i][0];
            this.cube[FACES.BACK][2 - i][0] = this.cube[FACES.DOWN][i][2];
            this.cube[FACES.DOWN][i][2] = this.cube[FACES.FRONT][i][2];
            this.cube[FACES.FRONT][i][2] = temp[i];
        }
    }

    rotateF() {
        this.rotateFaceClockwise(FACES.FRONT);
        let temp = [...this.cube[FACES.UP][2]];
        for (let i = 0; i < 3; i++) {
            this.cube[FACES.UP][2][i] = this.cube[FACES.LEFT][2 - i][2];
            this.cube[FACES.LEFT][2 - i][2] = this.cube[FACES.DOWN][0][2 - i];
            this.cube[FACES.DOWN][0][2 - i] = this.cube[FACES.RIGHT][i][0];
            this.cube[FACES.RIGHT][i][0] = temp[i];
        }
    }

    rotateFPrime() {
        this.rotateFaceCounterclockwise(FACES.FRONT);
        let temp = [...this.cube[FACES.UP][2]];
        for (let i = 0; i < 3; i++) {
            this.cube[FACES.UP][2][i] = this.cube[FACES.RIGHT][i][0];
            this.cube[FACES.RIGHT][i][0] = this.cube[FACES.DOWN][0][2 - i];
            this.cube[FACES.DOWN][0][2 - i] = this.cube[FACES.LEFT][2 - i][2];
            this.cube[FACES.LEFT][2 - i][2] = temp[i];
        }
    }

    rotateB() {
        this.rotateFaceClockwise(FACES.BACK);
        let temp = [...this.cube[FACES.UP][0]];
        for (let i = 0; i < 3; i++) {
            this.cube[FACES.UP][0][i] = this.cube[FACES.RIGHT][i][2];
            this.cube[FACES.RIGHT][i][2] = this.cube[FACES.DOWN][2][2 - i];
            this.cube[FACES.DOWN][2][2 - i] = this.cube[FACES.LEFT][2 - i][0];
            this.cube[FACES.LEFT][2 - i][0] = temp[i];
        }
    }

    rotateBPrime() {
        this.rotateFaceCounterclockwise(FACES.BACK);
        let temp = [...this.cube[FACES.UP][0]];
        for (let i = 0; i < 3; i++) {
            this.cube[FACES.UP][0][i] = this.cube[FACES.LEFT][2 - i][0];
            this.cube[FACES.LEFT][2 - i][0] = this.cube[FACES.DOWN][2][2 - i];
            this.cube[FACES.DOWN][2][2 - i] = this.cube[FACES.RIGHT][i][2];
            this.cube[FACES.RIGHT][i][2] = temp[i];
        }
    }

    rotateFaceClockwise(face) {
        let temp = this.cube[face][0][0];
        this.cube[face][0][0] = this.cube[face][2][0];
        this.cube[face][2][0] = this.cube[face][2][2];
        this.cube[face][2][2] = this.cube[face][0][2];
        this.cube[face][0][2] = temp;
        temp = this.cube[face][0][1];
        this.cube[face][0][1] = this.cube[face][1][0];
        this.cube[face][1][0] = this.cube[face][2][1];
        this.cube[face][2][1] = this.cube[face][1][2];
        this.cube[face][1][2] = temp;
    }

    rotateFaceCounterclockwise(face) {
        let temp = this.cube[face][0][0];
        this.cube[face][0][0] = this.cube[face][0][2];
        this.cube[face][0][2] = this.cube[face][2][2];
        this.cube[face][2][2] = this.cube[face][2][0];
        this.cube[face][2][0] = temp;
        temp = this.cube[face][0][1];
        this.cube[face][0][1] = this.cube[face][1][2];
        this.cube[face][1][2] = this.cube[face][2][1];
        this.cube[face][2][1] = this.cube[face][1][0];
        this.cube[face][1][0] = temp;
    }

    scramble(moves) {
        let allMoves = Object.values(MOVES);
        for (let i = 0; i < moves; i++) {
            this.applyMove(allMoves[Math.floor(Math.random() * allMoves.length)]);
        }
    }

    isSolved() {
        for (let f = 0; f < 6; f++) {
            let center = this.cube[f][1][1];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.cube[f][i][j] !== center) return false;
                }
            }
        }
        return true;
    }

    getState() {
        let state = '';
        for (let f = 0; f < 6; f++) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    state += this.cube[f][i][j];
                }
            }
        }
        return state;
    }
}

class Solver {
    static solve(cube) {
        if (cube.isSolved()) {
            return [];
        }

        const MAX_DEPTH = 10;
        let visited = new Set();
        let queue = [];

        let initialState = cube.getState();
        visited.add(initialState);
        queue.push({ cube: cube.copy(), moves: [] });

        while (queue.length > 0) {
            let current = queue.shift();
            if (current.moves.length >= MAX_DEPTH) continue;

            for (let move of Object.values(MOVES)) {
                let newCube = current.cube.copy();
                newCube.applyMove(move);

                let state = newCube.getState();
                if (visited.has(state)) continue;

                visited.add(state);
                let newMoves = [...current.moves, move];

                if (newCube.isSolved()) {
                    return newMoves;
                }

                queue.push({ cube: newCube, moves: newMoves });
            }
        }

        return null;
    }
}