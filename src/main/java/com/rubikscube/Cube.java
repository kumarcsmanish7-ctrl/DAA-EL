package com.rubikscube;

import java.util.Arrays;
import java.util.Random;

/**
 * Represents a 3x3 Rubik's Cube.
 */
public class Cube {
    private Color[][][] cube;

    public Cube() {
        cube = new Color[6][3][3];
        initializeSolved();
    }

    private void initializeSolved() {
        // UP: WHITE
        for (int i = 0; i < 3; i++) {
            Arrays.fill(cube[Face.UP.getIndex()][i], Color.WHITE);
        }
        // DOWN: YELLOW
        for (int i = 0; i < 3; i++) {
            Arrays.fill(cube[Face.DOWN.getIndex()][i], Color.YELLOW);
        }
        // LEFT: ORANGE
        for (int i = 0; i < 3; i++) {
            Arrays.fill(cube[Face.LEFT.getIndex()][i], Color.ORANGE);
        }
        // RIGHT: RED
        for (int i = 0; i < 3; i++) {
            Arrays.fill(cube[Face.RIGHT.getIndex()][i], Color.RED);
        }
        // FRONT: GREEN
        for (int i = 0; i < 3; i++) {
            Arrays.fill(cube[Face.FRONT.getIndex()][i], Color.GREEN);
        }
        // BACK: BLUE
        for (int i = 0; i < 3; i++) {
            Arrays.fill(cube[Face.BACK.getIndex()][i], Color.BLUE);
        }
    }

    public Cube(Cube other) {
        cube = new Color[6][3][3];
        for (int f = 0; f < 6; f++) {
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    cube[f][i][j] = other.cube[f][i][j];
                }
            }
        }
    }

    public void applyMove(Move move) {
        switch (move) {
            case U:
                rotateU();
                break;
            case UP:
                rotateUPrime();
                break;
            case D:
                rotateD();
                break;
            case DP:
                rotateDPrime();
                break;
            case L:
                rotateL();
                break;
            case LP:
                rotateLPrime();
                break;
            case R:
                rotateR();
                break;
            case RP:
                rotateRPrime();
                break;
            case F:
                rotateF();
                break;
            case FP:
                rotateFPrime();
                break;
            case B:
                rotateB();
                break;
            case BP:
                rotateBPrime();
                break;
        }
    }

    private void rotateU() {
        // Rotate UP face clockwise
        rotateFaceClockwise(Face.UP);
        // Move edges: FRONT top -> RIGHT top, RIGHT top -> BACK top, BACK top -> LEFT top, LEFT top -> FRONT top
        Color[] temp = Arrays.copyOf(cube[Face.FRONT.getIndex()][0], 3);
        System.arraycopy(cube[Face.RIGHT.getIndex()][0], 0, cube[Face.FRONT.getIndex()][0], 0, 3);
        System.arraycopy(cube[Face.BACK.getIndex()][0], 0, cube[Face.RIGHT.getIndex()][0], 0, 3);
        System.arraycopy(cube[Face.LEFT.getIndex()][0], 0, cube[Face.BACK.getIndex()][0], 0, 3);
        System.arraycopy(temp, 0, cube[Face.LEFT.getIndex()][0], 0, 3);
    }

    private void rotateUPrime() {
        // Rotate UP face counterclockwise
        rotateFaceCounterclockwise(Face.UP);
        // Move edges: FRONT top -> LEFT top, LEFT top -> BACK top, BACK top -> RIGHT top, RIGHT top -> FRONT top
        Color[] temp = Arrays.copyOf(cube[Face.FRONT.getIndex()][0], 3);
        System.arraycopy(cube[Face.LEFT.getIndex()][0], 0, cube[Face.FRONT.getIndex()][0], 0, 3);
        System.arraycopy(cube[Face.BACK.getIndex()][0], 0, cube[Face.LEFT.getIndex()][0], 0, 3);
        System.arraycopy(cube[Face.RIGHT.getIndex()][0], 0, cube[Face.BACK.getIndex()][0], 0, 3);
        System.arraycopy(temp, 0, cube[Face.RIGHT.getIndex()][0], 0, 3);
    }

    private void rotateD() {
        rotateFaceClockwise(Face.DOWN);
        // FRONT bottom -> LEFT bottom, LEFT bottom -> BACK bottom, BACK bottom -> RIGHT bottom, RIGHT bottom -> FRONT bottom
        Color[] temp = Arrays.copyOf(cube[Face.FRONT.getIndex()][2], 3);
        System.arraycopy(cube[Face.LEFT.getIndex()][2], 0, cube[Face.FRONT.getIndex()][2], 0, 3);
        System.arraycopy(cube[Face.BACK.getIndex()][2], 0, cube[Face.LEFT.getIndex()][2], 0, 3);
        System.arraycopy(cube[Face.RIGHT.getIndex()][2], 0, cube[Face.BACK.getIndex()][2], 0, 3);
        System.arraycopy(temp, 0, cube[Face.RIGHT.getIndex()][2], 0, 3);
    }

    private void rotateDPrime() {
        rotateFaceCounterclockwise(Face.DOWN);
        // FRONT bottom -> RIGHT bottom, RIGHT bottom -> BACK bottom, BACK bottom -> LEFT bottom, LEFT bottom -> FRONT bottom
        Color[] temp = Arrays.copyOf(cube[Face.FRONT.getIndex()][2], 3);
        System.arraycopy(cube[Face.RIGHT.getIndex()][2], 0, cube[Face.FRONT.getIndex()][2], 0, 3);
        System.arraycopy(cube[Face.BACK.getIndex()][2], 0, cube[Face.RIGHT.getIndex()][2], 0, 3);
        System.arraycopy(cube[Face.LEFT.getIndex()][2], 0, cube[Face.BACK.getIndex()][2], 0, 3);
        System.arraycopy(temp, 0, cube[Face.LEFT.getIndex()][2], 0, 3);
    }

    private void rotateL() {
        rotateFaceClockwise(Face.LEFT);
        // UP left column -> FRONT left column, FRONT left -> DOWN left, DOWN left -> BACK right (reversed), BACK right -> UP left
        Color[] temp = new Color[3];
        for (int i = 0; i < 3; i++) {
            temp[i] = cube[Face.UP.getIndex()][i][0];
            cube[Face.UP.getIndex()][i][0] = cube[Face.BACK.getIndex()][2 - i][2];
            cube[Face.BACK.getIndex()][2 - i][2] = cube[Face.DOWN.getIndex()][i][0];
            cube[Face.DOWN.getIndex()][i][0] = cube[Face.FRONT.getIndex()][i][0];
            cube[Face.FRONT.getIndex()][i][0] = temp[i];
        }
    }

    private void rotateLPrime() {
        rotateFaceCounterclockwise(Face.LEFT);
        // Reverse of L
        Color[] temp = new Color[3];
        for (int i = 0; i < 3; i++) {
            temp[i] = cube[Face.UP.getIndex()][i][0];
            cube[Face.UP.getIndex()][i][0] = cube[Face.FRONT.getIndex()][i][0];
            cube[Face.FRONT.getIndex()][i][0] = cube[Face.DOWN.getIndex()][i][0];
            cube[Face.DOWN.getIndex()][i][0] = cube[Face.BACK.getIndex()][2 - i][2];
            cube[Face.BACK.getIndex()][2 - i][2] = temp[i];
        }
    }

    private void rotateR() {
        rotateFaceClockwise(Face.RIGHT);
        // UP right -> BACK left (reversed), BACK left -> DOWN right, DOWN right -> FRONT right, FRONT right -> UP right
        Color[] temp = new Color[3];
        for (int i = 0; i < 3; i++) {
            temp[i] = cube[Face.UP.getIndex()][i][2];
            cube[Face.UP.getIndex()][i][2] = cube[Face.FRONT.getIndex()][i][2];
            cube[Face.FRONT.getIndex()][i][2] = cube[Face.DOWN.getIndex()][i][2];
            cube[Face.DOWN.getIndex()][i][2] = cube[Face.BACK.getIndex()][2 - i][0];
            cube[Face.BACK.getIndex()][2 - i][0] = temp[i];
        }
    }

    private void rotateRPrime() {
        rotateFaceCounterclockwise(Face.RIGHT);
        // Reverse
        Color[] temp = new Color[3];
        for (int i = 0; i < 3; i++) {
            temp[i] = cube[Face.UP.getIndex()][i][2];
            cube[Face.UP.getIndex()][i][2] = cube[Face.BACK.getIndex()][2 - i][0];
            cube[Face.BACK.getIndex()][2 - i][0] = cube[Face.DOWN.getIndex()][i][2];
            cube[Face.DOWN.getIndex()][i][2] = cube[Face.FRONT.getIndex()][i][2];
            cube[Face.FRONT.getIndex()][i][2] = temp[i];
        }
    }

    private void rotateF() {
        rotateFaceClockwise(Face.FRONT);
        // UP bottom -> RIGHT left, RIGHT left -> DOWN top, DOWN top -> LEFT right, LEFT right -> UP bottom
        Color[] temp = Arrays.copyOf(cube[Face.UP.getIndex()][2], 3);
        for (int i = 0; i < 3; i++) {
            cube[Face.UP.getIndex()][2][i] = cube[Face.LEFT.getIndex()][2 - i][2];
            cube[Face.LEFT.getIndex()][2 - i][2] = cube[Face.DOWN.getIndex()][0][2 - i];
            cube[Face.DOWN.getIndex()][0][2 - i] = cube[Face.RIGHT.getIndex()][i][0];
            cube[Face.RIGHT.getIndex()][i][0] = temp[i];
        }
    }

    private void rotateFPrime() {
        rotateFaceCounterclockwise(Face.FRONT);
        // Reverse
        Color[] temp = Arrays.copyOf(cube[Face.UP.getIndex()][2], 3);
        for (int i = 0; i < 3; i++) {
            cube[Face.UP.getIndex()][2][i] = cube[Face.RIGHT.getIndex()][i][0];
            cube[Face.RIGHT.getIndex()][i][0] = cube[Face.DOWN.getIndex()][0][2 - i];
            cube[Face.DOWN.getIndex()][0][2 - i] = cube[Face.LEFT.getIndex()][2 - i][2];
            cube[Face.LEFT.getIndex()][2 - i][2] = temp[i];
        }
    }

    private void rotateB() {
        rotateFaceClockwise(Face.BACK);
        // UP top -> LEFT left, LEFT left -> DOWN bottom, DOWN bottom -> RIGHT right, RIGHT right -> UP top
        Color[] temp = Arrays.copyOf(cube[Face.UP.getIndex()][0], 3);
        for (int i = 0; i < 3; i++) {
            cube[Face.UP.getIndex()][0][i] = cube[Face.RIGHT.getIndex()][i][2];
            cube[Face.RIGHT.getIndex()][i][2] = cube[Face.DOWN.getIndex()][2][2 - i];
            cube[Face.DOWN.getIndex()][2][2 - i] = cube[Face.LEFT.getIndex()][2 - i][0];
            cube[Face.LEFT.getIndex()][2 - i][0] = temp[i];
        }
    }

    private void rotateBPrime() {
        rotateFaceCounterclockwise(Face.BACK);
        // Reverse
        Color[] temp = Arrays.copyOf(cube[Face.UP.getIndex()][0], 3);
        for (int i = 0; i < 3; i++) {
            cube[Face.UP.getIndex()][0][i] = cube[Face.LEFT.getIndex()][2 - i][0];
            cube[Face.LEFT.getIndex()][2 - i][0] = cube[Face.DOWN.getIndex()][2][2 - i];
            cube[Face.DOWN.getIndex()][2][2 - i] = cube[Face.RIGHT.getIndex()][i][2];
            cube[Face.RIGHT.getIndex()][i][2] = temp[i];
        }
    }

    private void rotateFaceClockwise(Face face) {
        int f = face.getIndex();
        Color temp = cube[f][0][0];
        cube[f][0][0] = cube[f][2][0];
        cube[f][2][0] = cube[f][2][2];
        cube[f][2][2] = cube[f][0][2];
        cube[f][0][2] = temp;
        temp = cube[f][0][1];
        cube[f][0][1] = cube[f][1][0];
        cube[f][1][0] = cube[f][2][1];
        cube[f][2][1] = cube[f][1][2];
        cube[f][1][2] = temp;
    }

    private void rotateFaceCounterclockwise(Face face) {
        int f = face.getIndex();
        Color temp = cube[f][0][0];
        cube[f][0][0] = cube[f][0][2];
        cube[f][0][2] = cube[f][2][2];
        cube[f][2][2] = cube[f][2][0];
        cube[f][2][0] = temp;
        temp = cube[f][0][1];
        cube[f][0][1] = cube[f][1][2];
        cube[f][1][2] = cube[f][2][1];
        cube[f][2][1] = cube[f][1][0];
        cube[f][1][0] = temp;
    }

    public void scramble(int moves) {
        Random rand = new Random();
        Move[] allMoves = Move.values();
        for (int i = 0; i < moves; i++) {
            applyMove(allMoves[rand.nextInt(allMoves.length)]);
        }
    }

    public boolean isSolved() {
        for (int f = 0; f < 6; f++) {
            Color center = cube[f][1][1];
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    if (cube[f][i][j] != center) return false;
                }
            }
        }
        return true;
    }

    public String getState() {
        StringBuilder sb = new StringBuilder();
        for (int f = 0; f < 6; f++) {
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    sb.append(cube[f][i][j].getSymbol());
                }
            }
        }
        return sb.toString();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        // UP
        sb.append("   ").append(cube[0][0][0]).append(cube[0][0][1]).append(cube[0][0][2]).append("\n");
        sb.append("   ").append(cube[0][1][0]).append(cube[0][1][1]).append(cube[0][1][2]).append("\n");
        sb.append("   ").append(cube[0][2][0]).append(cube[0][2][1]).append(cube[0][2][2]).append("\n");
        // LEFT FRONT RIGHT BACK
        for (int i = 0; i < 3; i++) {
            sb.append(cube[2][i][0]).append(cube[2][i][1]).append(cube[2][i][2]).append(" ");
            sb.append(cube[4][i][0]).append(cube[4][i][1]).append(cube[4][i][2]).append(" ");
            sb.append(cube[3][i][0]).append(cube[3][i][1]).append(cube[3][i][2]).append(" ");
            sb.append(cube[5][i][0]).append(cube[5][i][1]).append(cube[5][i][2]).append("\n");
        }
        // DOWN
        sb.append("   ").append(cube[1][0][0]).append(cube[1][0][1]).append(cube[1][0][2]).append("\n");
        sb.append("   ").append(cube[1][1][0]).append(cube[1][1][1]).append(cube[1][1][2]).append("\n");
        sb.append("   ").append(cube[1][2][0]).append(cube[1][2][1]).append(cube[1][2][2]).append("\n");
        return sb.toString();
    }
}