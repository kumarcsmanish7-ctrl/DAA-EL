package com.rubikscube;

import java.util.*;

/**
 * Solver for the Rubik's Cube using BFS with depth limit.
 */
public class Solver {
    private static final int MAX_DEPTH = 10; // Limit to avoid infinite time

    public static List<Move> solve(Cube cube) {
        if (cube.isSolved()) {
            return new ArrayList<>();
        }

        Set<String> visited = new HashSet<>();
        Queue<Node> queue = new LinkedList<>();

        String initialState = cube.getState();
        visited.add(initialState);
        queue.add(new Node(cube, new ArrayList<>()));

        while (!queue.isEmpty()) {
            Node current = queue.poll();
            if (current.moves.size() >= MAX_DEPTH) continue;

            for (Move move : Move.values()) {
                Cube newCube = new Cube(current.cube);
                newCube.applyMove(move);

                String state = newCube.getState();
                if (visited.contains(state)) continue;

                visited.add(state);
                List<Move> newMoves = new ArrayList<>(current.moves);
                newMoves.add(move);

                if (newCube.isSolved()) {
                    return newMoves;
                }

                queue.add(new Node(newCube, newMoves));
            }
        }

        return null; // No solution found within depth
    }

    private static class Node {
        Cube cube;
        List<Move> moves;

        Node(Cube cube, List<Move> moves) {
            this.cube = cube;
            this.moves = moves;
        }
    }
}