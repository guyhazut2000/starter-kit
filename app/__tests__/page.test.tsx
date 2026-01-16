/**
 * Example component test
 * This demonstrates how to write tests for Next.js Server Components
 */

import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import type { ImageProps } from "next/image";
import Home from "../page";

// Mock Next.js Image component
// In tests, we use a simple img tag instead of Next.js Image for simplicity
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps): ReactElement => {
    // Convert Next.js ImageProps to standard img props for testing
    const { src, alt, width, height, ...restProps } = props;
    const imgSrc: string = typeof src === "string" ? src : "";

    // Using img in test mocks is acceptable - this is intentional for testing
    // We're mocking Next.js Image component, so using native img is appropriate
    // Test files are excluded from Next.js img element linting rules (see eslint.config.mjs)
    return (
      <img
        src={imgSrc}
        alt={alt ?? ""}
        width={width}
        height={height}
        {...(restProps as Record<string, unknown>)}
      />
    );
  },
}));

describe("Home Page", () => {
  it("renders the main heading", (): void => {
    render(<Home />);
    const heading = screen.getByText(/To get started, edit the page.tsx file/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders navigation links", (): void => {
    render(<Home />);
    const deployLink = screen.getByText(/Deploy Now/i);
    const docsLink = screen.getByText(/Documentation/i);

    expect(deployLink).toBeInTheDocument();
    expect(docsLink).toBeInTheDocument();
  });

  it("renders with correct structure", (): void => {
    const { container } = render(<Home />);
    const main: HTMLElement | null = container.querySelector("main");
    expect(main).toBeInTheDocument();
  });
});
