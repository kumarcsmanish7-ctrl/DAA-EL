# Rubik's Cube Solver

A Java implementation of a 3x3 Rubik's Cube solver using BFS (Breadth-First Search) algorithm.

## Features

- 3x3 Rubik's Cube representation
- All standard moves (U, D, L, R, F, B and their primes)
- Random scrambling
- BFS solver with depth limit
- Text-based visualization

## Requirements

- Java 11 or higher
- Maven

## Building and Running

1. Compile the project:
   ```
   mvn compile
   ```

2. Run the application:
   ```
   mvn exec:java -Dexec.mainClass="com.rubikscube.Main"
   ```

## Usage

- Choose to auto-generate a scrambled cube by specifying the number of scramble moves.
- The solver will attempt to find a solution using BFS.
- If a solution is found within the depth limit (10 moves), it will be displayed.
- The solved cube will be shown for verification.

## Limitations

- BFS is limited to a depth of 10 moves to prevent excessive computation time.
- For more complex scrambles, a full beginner method implementation would be needed.

## Code Structure

- `Color.java`: Enum for cube colors
- `Face.java`: Enum for cube faces
- `Move.java`: Enum for possible moves
- `Cube.java`: Cube representation and move operations
- `Solver.java`: BFS solver implementation
- `Main.java`: Main application entry point