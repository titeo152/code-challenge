# Problem 1: Sum to N

This problem demonstrates three different approaches to calculate the sum of numbers from 1 to n.

## Solutions

### 1. While Loop Approach
```typescript
export function sum_to_n_loop(n: number): number {
  let sum = 0
  let i = 1
  while (i <= n) {
    sum += i
    i++
  }
  return sum
}
```

### 2. Recursion Approach
```typescript
export function sum_to_n_recursion(n: number): number {
  if (n === 0) return 0
  return n + sum_to_n_recursion(n - 1)
}
```

### 3. Mathematical Formula Approach
```typescript
export function sum_to_n_formula(n: number): number {
  return (n * (n + 1)) / 2
}
```

## Usage
Each function takes a number `n` and returns the sum of all integers from 1 to n.

## Performance Comparison
- **Formula**: O(1) - Most efficient
- **Loop**: O(n) - Linear time
- **Recursion**: O(n) - Linear time but with stack overhead 