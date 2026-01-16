# Feature Review Checklist

Use this checklist to review your feature implementation before creating a pull request.

## ✅ Code Quality & Architecture

- [ ] **Feature Structure**: All code is properly organized in feature folders (`_actions/`, `_components/`, `_hooks/`, `_lib/`, `_schemas/`, `_types/`)
- [ ] **Naming Conventions**: Files and code follow project naming conventions (PascalCase for components, camelCase for utilities, kebab-case for actions/schemas)
- [ ] **Code Organization**: No code duplication, proper separation of concerns
- [ ] **Import Organization**: Imports follow the correct order (React → Third-party → Shared → Feature → Relative)
- [ ] **File Structure**: Components are not monolithic, logic is extracted appropriately

## ✅ TypeScript & Type Safety

- [ ] **Type Definitions**: All types/interfaces are defined in `_types/` folder
- [ ] **Type Annotations**: Functions have explicit return types (especially public APIs)
- [ ] **No `any` Types**: All types are properly defined, no `any` usage
- [ ] **Type Inference**: Types are derived from Zod schemas where applicable using `z.infer<>`
- [ ] **Component Props**: All component props are properly typed with interfaces

## ✅ Validation & Error Handling

- [ ] **Zod Schemas**: All validation schemas are in `_schemas/` folder
- [ ] **Server-Side Validation**: All Server Actions validate input with Zod schemas
- [ ] **Client-Side Validation**: Forms validate on client before submission
- [ ] **Error Handling**: Proper error handling in Server Actions, API routes, and components
- [ ] **Error Messages**: User-friendly error messages (no technical details exposed)
- [ ] **Error Boundaries**: Error boundaries implemented where needed (`error.tsx` files)

## ✅ Server Actions & API Routes

- [ ] **Server Actions Preferred**: Using Server Actions instead of API routes for internal operations
- [ ] **API Routes Only for Public**: API routes only used for public endpoints consumed by external services
- [ ] **Response Format**: Consistent response format (`{ success: true/false, data?, error? }`)
- [ ] **Revalidation**: Cache revalidation implemented after mutations (`revalidatePath`, `revalidateTag`)
- [ ] **FormData Handling**: FormData properly extracted and validated

## ✅ Components

- [ ] **Server Components Default**: Using Server Components by default
- [ ] **Client Components Only When Needed**: `"use client"` only used when necessary (hooks, browser APIs, interactivity)
- [ ] **Component Separation**: Components are small, focused, and reusable
- [ ] **Loading States**: Loading states implemented (`loading.tsx` or Suspense boundaries)
- [ ] **Error States**: Error states handled with error boundaries
- [ ] **Accessibility**: Components are accessible (proper ARIA labels, keyboard navigation)

## ✅ Data Fetching & Caching

- [ ] **Server-Side Fetching**: Data fetching in Server Components when possible
- [ ] **Caching Strategy**: Appropriate caching strategy implemented (force-cache, no-store, revalidation)
- [ ] **TanStack Query**: Used appropriately for client-side data fetching when needed
- [ ] **Cache Invalidation**: Cache properly invalidated after mutations

## ✅ Database & Prisma

- [ ] **Migrations Used**: Database changes use Prisma migrations (never direct edits)
- [ ] **Migration Created**: Migration created and tested: `npx prisma migrate dev --name migration_name`
- [ ] **Prisma Client**: Using single Prisma Client instance from `lib/prisma.ts`
- [ ] **Query Optimization**: Queries are optimized (select only needed fields, proper includes)
- [ ] **Error Handling**: Prisma errors are properly handled

## ✅ Testing

- [ ] **Tests Written**: Tests added for new functionality
- [ ] **Test Coverage**: Reasonable test coverage (aim for 80%+)
- [ ] **Tests Pass**: All tests pass locally
- [ ] **Test Organization**: Tests are colocated with code or in appropriate test directories

## ✅ Performance

- [ ] **Bundle Size**: No unnecessary client-side JavaScript
- [ ] **Code Splitting**: Dynamic imports used for heavy components when appropriate
- [ ] **Image Optimization**: Using `next/image` for images
- [ ] **No Console Logs**: No `console.log` statements in production code (use logger)

## ✅ Security

- [ ] **Input Validation**: All user inputs validated (client and server)
- [ ] **No Secrets Exposed**: No secrets or sensitive data in client code
- [ ] **Environment Variables**: Using environment variables for sensitive config
- [ ] **CSRF Protection**: Server Actions have built-in CSRF protection
- [ ] **Rate Limiting**: Rate limiting considered for sensitive operations

## ✅ Documentation & Code Comments

- [ ] **Self-Documenting Code**: Code is clear and self-documenting
- [ ] **Complex Logic Commented**: Complex business logic has comments explaining why
- [ ] **JSDoc Comments**: Public API functions have JSDoc comments
- [ ] **README Updated**: Feature documentation updated if needed

## ✅ Git & PR Preparation

- [ ] **Feature Branch**: Working on feature branch (not `main` or `master`)
- [ ] **Commit Messages**: Commit messages follow Conventional Commits format
- [ ] **Small Commits**: Commits are small and focused
- [ ] **Branch Up to Date**: Feature branch is synced with `main`
- [ ] **No Merge Conflicts**: No merge conflicts with `main`
- [ ] **Linting Passes**: `npm run lint` passes without errors
- [ ] **Type Check Passes**: `npx tsc --noEmit` passes without errors
- [ ] **Build Succeeds**: `npm run build` succeeds without errors
- [ ] **All Tests Pass**: `npm test` passes

## ✅ Final Review

- [ ] **Code Review**: Self-review completed (read through all changes)
- [ ] **Edge Cases**: Edge cases and error scenarios tested
- [ ] **User Experience**: User experience is smooth and intuitive
- [ ] **No Breaking Changes**: No breaking changes introduced (or documented if intentional)
- [ ] **Dependencies**: No unnecessary dependencies added
- [ ] **Migration Files**: Database migration files committed if schema changed

## 🔍 Common Issues to Check

- [ ] No unused imports
- [ ] No commented-out code
- [ ] No TODO comments without issue links
- [ ] No hardcoded values (use constants or config)
- [ ] No duplicate code
- [ ] Proper error handling in all async operations
- [ ] Loading states for all async operations
- [ ] Proper cleanup in useEffect hooks
- [ ] No memory leaks (event listeners, subscriptions)

---

## Review Process

1. **Complete Implementation**: Finish all feature work
2. **Run This Checklist**: Go through each item systematically
3. **Fix Issues**: Address any items that are not checked
4. **Re-review**: After fixes, review again to ensure everything is correct
5. **Create PR**: Once all items are checked, proceed to create pull request

## Notes

- If any item cannot be checked, document why in the PR description
- Some items may not apply to all features (e.g., database changes)
- When in doubt, refer to project documentation in `.cursor/rules/`
