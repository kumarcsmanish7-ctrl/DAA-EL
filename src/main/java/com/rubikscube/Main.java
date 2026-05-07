package com.rubikscube;

import java.util.List;
import java.util.Scanner;

/**
 * Main class for the Rubik's Cube Solver application.
 */
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Cube cube = new Cube();

        System.out.println("Rubik's Cube Solver");
        System.out.println("1. Auto-generate scrambled cube");
        System.out.println("2. Input scrambled cube (not implemented yet)");
        System.out.print("Choose option: ");
        int choice = scanner.nextInt();

        if (choice == 1) {
            System.out.print("Enter number of scramble moves: ");
            int moves = scanner.nextInt();
            cube.scramble(moves);
            System.out.println("Scrambled Cube:");
            System.out.println(cube);
        } else {
            System.out.println("Manual input not implemented. Using solved cube.");
        }

        System.out.println("Solving...");
        List<Move> solution = Solver.solve(cube);
        if (solution != null) {
            System.out.println("Solution found:");
            for (Move move : solution) {
                System.out.print(move + " ");
            }
            System.out.println();
            // Apply moves to verify
            Cube solvedCube = new Cube(cube);
            for (Move move : solution) {
                solvedCube.applyMove(move);
            }
            System.out.println("Solved Cube:");
            System.out.println(solvedCube);
            System.out.println("Is solved: " + solvedCube.isSolved());
        } else {
            System.out.println("No solution found within depth limit.");
        }

        scanner.close();
    }
}