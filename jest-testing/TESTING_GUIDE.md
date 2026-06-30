# Jest Testing Guide for Next.js Application

This guide explains how to run and understand the tests in this Next.js application.

## Table of Contents

- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Component Tests](#component-tests)
- [Function Tests](#function-tests)
- [Snapshot Tests](#snapshot-tests)

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Run a Specific Test File

```bash
npm test Counter.test.tsx
```

## Test Coverage

Jest is configured to generate code coverage reports. When you run tests with the `--coverage` flag, Jest will:

1. Analyze which lines of code are executed during tests
2. Generate a coverage report in the terminal
3. Create an HTML coverage report in the `coverage/` directory

To view the detailed HTML coverage report:

```bash
npm test -- --coverage
# Then open coverage/lcov-report/index.html in your browser
```

**Coverage Goals:**

- **Statements:** Aim for 80%+ coverage
- **Branches:** Aim for 75%+ coverage
- **Functions:** Aim for 80%+ coverage
- **Lines:** Aim for 80%+ coverage

## Component Tests

### Counter Component (`Counter.tsx`)

The Counter component is a simple React component that demonstrates state management and user interactions.

**Test File:** `app/_components/Counter.test.tsx`

#### Test Cases:

1. **Initial Render Test**
    - **Purpose:** Verifies the component renders correctly with initial state
    - **Assertions:**
        - Checks that "Counter" heading is displayed
        - Verifies initial count displays as "Count: 0"
    - **Mock Implementation:** None required

2. **Increment Button Test**
    - **Purpose:** Ensures the increment button increases the counter
    - **Assertions:**
        - After clicking "+", count should display "Count: 1"
    - **Mock Implementation:** Uses `fireEvent` from Testing Library to simulate button clicks

3. **Decrement Button Test**
    - **Purpose:** Ensures the decrement button decreases the counter
    - **Assertions:**
        - After clicking "-", count should display "Count: -1"
    - **Mock Implementation:** Uses `fireEvent` to simulate button clicks

4. **Reset Button Test**
    - **Purpose:** Verifies the reset button returns counter to zero
    - **Assertions:**
        - After incrementing to 2 and clicking "Reset", count should return to "Count: 0"
    - **Mock Implementation:** Uses multiple `fireEvent` calls to test complex user flows

5. **Snapshot Test**
    - **Purpose:** Detects unexpected changes in component rendering
    - **Assertions:**
        - Component's rendered output matches the saved snapshot
    - **Implementation:** Uses `toMatchSnapshot()` matcher
    - **Note:** Run tests after intentional UI changes to update snapshots with `npm test -- -u`

## Function Tests

### calculateTotal Function (`utils.ts`)

A utility function that calculates the sum of multiple numbers.

**Test File:** `app/_components/utils.test.ts`

#### Test Cases:

1. **Positive Numbers Test**
    - **Purpose:** Verify function works with positive integers
    - **Input Examples:**
        - `calculateTotal(5, 10, 15)` → expects `30`
        - `calculateTotal(1, 2, 3, 4, 5)` → expects `15`
    - **Assertions:** Uses `toBe()` matcher for exact equality

2. **Negative Numbers Test**
    - **Purpose:** Ensure function handles negative numbers correctly
    - **Input Examples:**
        - `calculateTotal(-5, -10, -15)` → expects `-30`
    - **Assertions:** Verifies correct handling of negative values

3. **Mixed Numbers Test**
    - **Purpose:** Test with combination of positive and negative numbers
    - **Input Examples:**
        - `calculateTotal(10, -5, 15, -10)` → expects `10`
    - **Edge Case:** Tests cancellation of positive and negative values

4. **Zero Inputs Test**
    - **Purpose:** Verify function handles zero correctly
    - **Input Examples:**
        - `calculateTotal(0)` → expects `0`
        - `calculateTotal(5, 0, 10)` → expects `15`
    - **Edge Case:** Zero as both standalone and mixed values

5. **No Arguments Test**
    - **Purpose:** Test function behavior with no inputs
    - **Input:** `calculateTotal()` → expects `0`
    - **Edge Case:** Empty parameter list

6. **Single Number Test**
    - **Purpose:** Verify function works with single input
    - **Input Examples:**
        - `calculateTotal(42)` → expects `42`
    - **Edge Case:** Minimal input scenario

7. **Decimal Numbers Test**
    - **Purpose:** Ensure function handles floating-point numbers
    - **Input Examples:**
        - `calculateTotal(1.5, 2.5, 3.0)` → expects `7.0`
    - **Assertions:** Uses `toBeCloseTo()` for floating-point precision
    - **Note:** Important for avoiding floating-point arithmetic issues

8. **Large Numbers Test**
    - **Purpose:** Test function with very large values
    - **Input Examples:**
        - `calculateTotal(1000000, 2000000, 3000000)` → expects `6000000`
    - **Edge Case:** Verifies no overflow issues

## Snapshot Tests

Snapshot testing captures the rendered output of a component and saves it as a reference. On subsequent test runs, the current output is compared to the saved snapshot.

### How Snapshot Testing Works:

1. **First Run:** Jest creates a snapshot file (`.snap`) containing the component's rendered output
2. **Subsequent Runs:** Jest compares current output with the saved snapshot
3. **On Mismatch:** Test fails if output doesn't match (indicates a breaking change)
4. **Updating Snapshots:** Run `npm test -- -u` to update snapshots after intentional changes

### When to Use Snapshots:

✅ **Good Use Cases:**

- Testing component structure stability
- Catching unintended UI changes
- Verifying props render correctly

❌ **Avoid When:**

- Component output changes frequently
- Testing dynamic data (use mocks instead)
- As a replacement for specific assertions

### Reviewing Snapshot Changes:

Always review snapshot changes in your version control diff before committing:

- Ensure changes are intentional
- Verify no unexpected modifications
- Update snapshot only if changes are correct

## Test Configuration

### `jest.config.ts`

- Sets up Next.js-specific Jest configuration
- Uses `jsdom` environment for React testing
- Imports setup file for global test configuration

### `jest.setup.ts`

- Imports `@testing-library/jest-dom` for custom matchers
- Provides helpful assertions like `toBeInTheDocument()`

## Best Practices

1. **Descriptive Test Names:** Use clear, descriptive test names that explain what is being tested
2. **Arrange-Act-Assert:** Structure tests with clear setup, action, and verification phases
3. **Test Isolation:** Each test should be independent and not rely on other tests
4. **Mock External Dependencies:** Use mocks for API calls, external libraries, etc.
5. **Test User Behavior:** Focus on testing how users interact with your components
6. **Avoid Testing Implementation Details:** Test what the component does, not how it does it
7. **Keep Tests Maintainable:** Refactor tests when they become hard to understand
8. **Run Tests Frequently:** Integrate tests into your development workflow

## Troubleshooting

### Tests Failing After Component Changes

- Review what changed in the component
- Update assertions to match new behavior
- Update snapshots if UI changes are intentional: `npm test -- -u`

### Coverage Not Meeting Goals

- Identify untested code in coverage reports
- Add tests for edge cases and error scenarios
- Consider if 100% coverage is necessary for all files

### Slow Test Runs

- Run specific test files during development
- Use watch mode for faster feedback
- Consider splitting large test files

## Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)
