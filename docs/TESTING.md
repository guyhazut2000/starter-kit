# Testing Guide

## Purpose

This document describes our testing approach for this SaaS project. Our main branch must always be deployable. We use **GitHub Flow**: all work happens in feature branches; nothing merges into main unless it's safe, tested, and reviewed.

## Testing Philosophy

- **Test behavior, not implementation**: Focus on what users see and do
- **Test user-facing functionality**: Ensure features work as expected
- **Test error and edge cases**: Don't just test happy paths
- **Keep tests maintainable**: Tests should be easy to understand and update
- **Fast feedback**: Tests should run quickly for developer productivity
- **No undeployable code**: All tests must pass before merging to main

## Testing Stack

### Core Tools

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Additional DOM matchers

### Optional Tools (Future)

- **MSW (Mock Service Worker)**: API mocking for integration tests
- **Playwright** or **Cypress**: E2E testing (if needed)
- **@tanstack/react-query** testing utilities

## Test Types & Scope

| Test Type                | Goal                                                               | Examples / When to Write                                                               | Placement                                          |
| ------------------------ | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Unit Tests**           | Validate individual functions/classes in isolation. Fast feedback. | Business logic, validation rules, utilities. Write _before_ or alongside feature work. | Colocated with code: `lib/**/*.test.ts`            |
| **Component Tests**      | Verify React components render and interact correctly.             | UI components, forms, user interactions.                                               | Colocated: `features/**/_components/**/*.test.tsx` |
| **Integration Tests**    | Verify components working together: modules, DB, APIs.             | DB queries + data access; service-to-service calls; critical integrations.             | Colocated: `features/**/_actions/**/*.test.ts`     |
| **Server Action Tests**  | Validate server-side mutations and data operations.                | Form submissions, database operations, validation.                                     | Colocated: `features/**/_actions/**/*.test.ts`     |
| **Static & Lint Checks** | Catch syntax errors, enforce styles, find vulnerabilities.         | Always in CI, on PRs.                                                                  | N/A                                                |

## Test File Locations

### Colocated Tests (Recommended)

**Structure:**

```
features/
  products/
    _components/
      ProductCard.tsx
      ProductCard.test.tsx        # Colocated test
    _actions/
      product-actions.ts
      product-actions.test.ts     # Colocated test
    _hooks/
      useProducts.ts
      useProducts.test.ts         # Colocated test
    _lib/
      product-utils.ts
      product-utils.test.ts       # Colocated test
```

**Benefits:**

- Easy to find tests
- Tests stay with code
- Easy to delete when removing features

### Separate Test Directory (Alternative)

**Structure:**

```
__tests__/
  features/
    products/
      _components/
        ProductCard.test.tsx
```

**Use when:**

- Test files are very large
- Team prefers separate test directory
- Tests need special organization

## What to Test

### ✅ DO Test

**Server Components:**

- Data fetching and rendering
- Error handling and error boundaries
- Loading states
- Server-side logic and transformations

**Client Components:**

- User interactions (clicks, form submissions, input changes)
- State management and updates
- Event handlers
- Conditional rendering
- Accessibility (if applicable)

**Server Actions:**

- Input validation (Zod schema validation)
- Success cases
- Error handling
- Return values and formats
- Database operations (mocked)

**Hooks:**

- State updates
- Side effects
- Return values
- Error handling

**Utilities:**

- All utility functions
- Edge cases and boundary conditions
- Error handling
- Type transformations

**Forms:**

- Form submission
- Validation (client and server)
- Error display
- Success states
- Field interactions

**API Routes:**

- Request validation
- Response formats
- Status codes
- Error handling
- Authentication/authorization

### ❌ DON'T Test

- **Implementation details**: Internal state, private methods
- **Third-party libraries**: Don't test library functionality
- **Framework code**: Next.js, React internals
- **Styling**: CSS and visual appearance (unless critical)
- **Generated code**: Prisma Client, auto-generated types

## Running Tests

### Local Development

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended during development)
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test.file.tsx

# Run tests matching pattern
npm test -- --testNamePattern="renders"

# Run tests in verbose mode
npm test -- --verbose
```

### Before Creating PR

**Always run these commands before pushing:**

```bash
# 1. Run all tests
npm test

# 2. Check test coverage
npm test -- --coverage

# 3. Run linting
npm run lint

# 4. Type check
npx tsc --noEmit

# 5. Build (to ensure everything compiles)
npm run build
```

**Ensure:**

- All tests pass locally
- No skipped or disabled tests
- Test coverage meets requirements (minimum 70%)
- Tests run in reasonable time

## CI Workflow

Our GitHub Actions CI workflow automatically runs:

1. **On push to any branch:**
   - Linter / formatting checks
   - Static analysis / type checks
   - Unit tests
   - Component tests

2. **On pull request to main/master:**
   - All above checks
   - Integration tests
   - Test coverage report
   - Build verification

3. **After merge to main:**
   - Full test suite
   - Coverage reporting
   - Security audit

**CI will fail if:**

- Any test fails
- Coverage drops below 70%
- Linting errors exist
- Type errors exist
- Build fails

## Coverage & Quality

### Coverage Goals

- **Minimum**: 70% code coverage (branches, functions, lines, statements)
- **Target**: 80%+ code coverage
- **Critical paths**: 100% coverage
  - Authentication flows
  - Payment processing
  - Data mutations
  - Security-sensitive code

### Quality Principles

- **Focus on useful coverage**, not just high numbers
- **Test behavior you care about** (critical flows)
- **Avoid mock-heavy tests** unless necessary
- **Fix or remove flaky tests** - trust in CI is essential
- **Keep pipelines fast** (aim for under ~10 mins for pre-merge)

## Test Best Practices

### DO

- ✅ Write descriptive test names that explain what is being tested
- ✅ Use `screen.getByRole` and accessible queries first
- ✅ Test user-facing behavior, not implementation
- ✅ Keep tests isolated and independent
- ✅ Clean up after tests (reset mocks, clear state)
- ✅ Use `waitFor` for async operations
- ✅ Test error and edge cases
- ✅ Mock external dependencies (database, APIs, Server Actions)
- ✅ Use `userEvent` for user interactions
- ✅ Follow the AAA pattern: Arrange, Act, Assert
- ✅ **Always use TypeScript types** - no `any` types in tests

### DON'T

- ❌ Test implementation details
- ❌ Use `getByTestId` as first choice
- ❌ Test third-party library functionality
- ❌ Write tests that are too coupled to implementation
- ❌ Skip testing error cases
- ❌ Test multiple things in one test
- ❌ Use `act()` unnecessarily (React Testing Library handles it)
- ❌ Leave console.log in tests
- ❌ Write flaky tests (tests that sometimes pass, sometimes fail)
- ❌ Use `any` types - always specify proper TypeScript types

## Test Organization

### Test Structure

```typescript
describe("ComponentName", (): void => {
  // Setup (beforeEach, mocks, etc.)

  describe("rendering", (): void => {
    it("renders correctly", (): void => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe("interactions", (): void => {
    it("handles click", async (): Promise<void> => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe("error handling", (): void => {
    it("handles errors gracefully", (): void => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### Test Data

**Create test fixtures:**

```typescript
// features/products/_lib/__fixtures__/products.ts
export const mockProduct = {
  id: "1",
  name: "Test Product",
  price: 100,
  description: "Test description",
};

export const mockProducts = [mockProduct, { ...mockProduct, id: "2" }];
```

## Mocking Patterns

### Mock Server Actions

```typescript
jest.mock("@/features/products/_actions/cart-actions", () => ({
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
}));
```

### Mock Prisma

```typescript
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));
```

### Mock Next.js Modules

```typescript
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => "/current-path",
}));
```

## Phased Roll-Out

### Phase 1 (Current)

- ✅ Jest and React Testing Library setup
- ✅ CI integration with test execution
- ✅ Example tests for components and utilities
- ✅ Coverage reporting
- ✅ Test scripts in package.json

### Phase 2 (Next Steps)

- Add unit tests for newly added features
- Add integration tests for critical modules
- Add Server Action tests
- Add hook tests
- Improve coverage to 80%+

### Phase 3 (Future)

- Add E2E / smoke tests for top user flows
- Secure checks (vulnerability scanning) in CI
- Performance tests for critical endpoints
- Regular review of test suite health
- Retire/refactor tests when endpoints/behaviors evolve

## Example Tests

See the example tests in:

- `lib/__tests__/utils.test.ts` - Utility function example
- `app/__tests__/page.test.tsx` - Component test example

These demonstrate the testing patterns and best practices for this project.

## File Organization

**This file (`docs/TESTING.md`)** is developer-facing documentation in the `docs/` directory, alongside other project documentation like `PRD.md`.

**AI Agent Rules** are stored in `.cursor/rules/testing.mdc` and are automatically loaded by Cursor AI to guide code generation and assistance. The `.mdc` file contains more detailed technical patterns and is used by the AI, while this `.md` file provides a practical quick reference for developers.

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Next.js Testing Guide](https://nextjs.org/docs/app/building-your-application/testing)

## Questions?

If you have questions about testing, refer to:

- `.cursor/rules/testing.mdc` - Detailed AI agent testing guidelines and patterns
- `.cursor/rules/nextjs_architecture.mdc` - Architecture patterns
- `.cursor/rules/github_flow.mdc` - Workflow and PR guidelines
