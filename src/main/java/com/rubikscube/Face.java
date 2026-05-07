package com.rubikscube;

/**
 * Enum representing the faces of the Rubik's Cube.
 */
public enum Face {
    UP(0),
    DOWN(1),
    LEFT(2),
    RIGHT(3),
    FRONT(4),
    BACK(5);

    private final int index;

    Face(int index) {
        this.index = index;
    }

    public int getIndex() {
        return index;
    }
}