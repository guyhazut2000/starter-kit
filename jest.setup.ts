// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter(): AppRouterInstance {
    return {
      push: jest.fn<AppRouterInstance["push"]>(),
      replace: jest.fn<AppRouterInstance["replace"]>(),
      prefetch: jest.fn<AppRouterInstance["prefetch"]>(),
      back: jest.fn<AppRouterInstance["back"]>(),
      forward: jest.fn<AppRouterInstance["forward"]>(),
      refresh: jest.fn<AppRouterInstance["refresh"]>(),
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
process.env.NODE_ENV = "test";
process.env.LOG_LEVEL = "error";
process.env.SKIP_ENV_VALIDATION = "true";
