package com.rubikscube;

/**
 * Enum representing the colors of the Rubik's Cube faces.
 */
public enum Color {
    WHITE('W'),
    RED('R'),
    BLUE('B'),
    ORANGE('O'),
    GREEN('G'),
    YELLOW('Y');

    private final char symbol;

    Color(char symbol) {
        this.symbol = symbol;
    }

    public char getSymbol() {
        return symbol;
    }

    @Override
    public String toString() {
        return String.valueOf(symbol);
    }
}