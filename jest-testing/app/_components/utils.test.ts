import { calculateTotal } from "./utils";

describe("calculateTotal function", () => {
    it("calculates the total of positive numbers", () => {
        expect(calculateTotal(5, 10, 15)).toBe(30);
        expect(calculateTotal(1, 2, 3, 4, 5)).toBe(15);
    });

    it("calculates the total with negative numbers", () => {
        expect(calculateTotal(-5, -10, -15)).toBe(-30);
        expect(calculateTotal(-1, -2, -3)).toBe(-6);
    });

    it("calculates the total with mixed positive and negative numbers", () => {
        expect(calculateTotal(10, -5, 15, -10)).toBe(10);
        expect(calculateTotal(100, -50, -25, 25)).toBe(50);
    });

    it("handles zero inputs correctly", () => {
        expect(calculateTotal(0)).toBe(0);
        expect(calculateTotal(0, 0, 0)).toBe(0);
        expect(calculateTotal(5, 0, 10)).toBe(15);
    });

    it("returns zero when no arguments are provided", () => {
        expect(calculateTotal()).toBe(0);
    });

    it("handles single number input", () => {
        expect(calculateTotal(42)).toBe(42);
        expect(calculateTotal(-42)).toBe(-42);
    });

    it("handles decimal numbers", () => {
        expect(calculateTotal(1.5, 2.5, 3.0)).toBe(7.0);
        expect(calculateTotal(0.1, 0.2)).toBeCloseTo(0.3); // Using toBeCloseTo for floating point precision
    });

    it("handles very large numbers", () => {
        expect(calculateTotal(1000000, 2000000, 3000000)).toBe(6000000);
    });
});
