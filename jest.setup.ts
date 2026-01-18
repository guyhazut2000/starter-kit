// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter(): AppRouterInstance {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
      asPath: "/",
    } as AppRouterInstance;
  },
  usePathname(): string {
    return "/";
  },
  useSearchParams(): URLSearchParams {
    return new URLSearchParams();
  },
}));

// Mock environment variables for tests
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
(process.env as Record<string, string>).NODE_ENV = "test";
process.env.LOG_LEVEL = "error";
process.env.SKIP_ENV_VALIDATION = "true";
