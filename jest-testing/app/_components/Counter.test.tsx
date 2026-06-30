import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "./Counter";

describe("Counter component", () => {
    it("renders the Counter component", () => {
        render(<Counter />);
        expect(screen.getByText("Counter")).toBeInTheDocument();
        expect(screen.getByText("Count: 0")).toBeInTheDocument();
    });

    it("increments the count when + button is clicked", () => {
        render(<Counter />);
        const incrementButton = screen.getByText("+");
        fireEvent.click(incrementButton);
        expect(screen.getByText("Count: 1")).toBeInTheDocument();
    });

    it("decrements the count when - button is clicked", () => {
        render(<Counter />);
        const decrementButton = screen.getByText("-");
        fireEvent.click(decrementButton);
        expect(screen.getByText("Count: -1")).toBeInTheDocument();
    });

    it("resets the count when Reset button is clicked", () => {
        render(<Counter />);
        fireEvent.click(screen.getByText("+")); // Increment to 1
        fireEvent.click(screen.getByText("+")); // Increment to 2
        expect(screen.getByText("Count: 2")).toBeInTheDocument();
        const resetButton = screen.getByText("Reset");
        fireEvent.click(resetButton);
        expect(screen.getByText("Count: 0")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
        const { container } = render(<Counter />);
        expect(container).toMatchSnapshot();
    });
});
