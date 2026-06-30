import type {Config} from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    collectCoverageFrom: [
        "app/**/*.{js,jsx,ts,tsx}",
        "!app/**/*.d.ts",
        "!app/**/layout.tsx",
        "!app/**/page.tsx",
        "!**/*.config.{js,ts}",
        "!**/node_modules/**",
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 75,
            lines: 80,
            statements: 80,
        },
    },
    coverageReporters: ["text", "lcov", "html"],
};

export default createJestConfig(config);