package com.rubikscube;

/**
 * Enum representing the possible moves on the Rubik's Cube.
 */
public enum Move {
    U, UP, D, DP, L, LP, R, RP, F, FP, B, BP;

    @Override
    public String toString() {
        return name();
    }
}