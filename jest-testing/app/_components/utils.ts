/**
 * Calculate the total of multiple numbers
 * @param numbers - An array of numbers to sum
 * @returns The total sum of all numbers
 */
export function calculateTotal(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}
