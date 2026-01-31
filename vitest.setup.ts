// Learn more: https://github.com/testing-library/jest-dom
// Vitest-specific entrypoint ensures matchers are added to Vitest's expect
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter(): AppRouterInstance {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
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

// Mock environment variables for tests. With Vitest's Node environment,
// we can assign directly to process.env instead of redefining properties.
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
process.env.NODE_ENV = "test";
process.env.LOG_LEVEL = "error";
process.env.SKIP_ENV_VALIDATION = "true";
