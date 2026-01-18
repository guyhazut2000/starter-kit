# Feature Development Workflow

This document outlines the workflow for developing new features, including the review process before creating a pull request.

## Development Process

### 1. Start Feature Development

1. Create a feature branch from `main`:

   ```bash
   git checkout -b feature/feature-name
   ```

2. Set up feature structure:
   - Use the existing folders: `_actions/`, `_components/`, `_hooks/`, `_lib/`, `_schemas/`, `_types/`
   - Follow the naming conventions and architecture patterns

### 2. Implement Feature

- Write code following project conventions
- Add tests as you develop
- Commit frequently with clear messages
- Keep commits small and focused

### 3. Complete Implementation

When you think the feature is complete:

1. **Stop and Review**: Don't immediately create a PR
2. **Run Quality Checks**: Ensure all checks pass
3. **Use Review Checklist**: Go through `FEATURE_REVIEW_CHECKLIST.md` systematically

### 4. Review Process

#### Step 1: Automated Checks

Run these commands and ensure they all pass:

```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Build
npm run build

# Tests
npm test
```

#### Step 2: Manual Review Checklist

Open `FEATURE_REVIEW_CHECKLIST.md` and go through each section:

- ✅ Code Quality & Architecture
- ✅ TypeScript & Type Safety
- ✅ Validation & Error Handling
- ✅ Server Actions & API Routes
- ✅ Components
- ✅ Data Fetching & Caching
- ✅ Database & Prisma
- ✅ Testing
- ✅ Performance
- ✅ Security
- ✅ Documentation & Code Comments
- ✅ Git & PR Preparation
- ✅ Final Review

#### Step 3: Fix Issues

If you find any issues:

1. **Document the Issue**: Note what needs to be fixed
2. **Fix the Issue**: Make the necessary changes
3. **Re-run Checks**: Run automated checks again
4. **Re-review**: Go through the checklist again

#### Step 4: Iterate

Repeat Step 3 until:

- All automated checks pass
- All checklist items are checked
- You're confident the feature is correct

### 5. Create Pull Request

Once everything is reviewed and fixed:

1. **Sync with Main**: Ensure your branch is up to date

   ```bash
   git fetch origin
   git merge main
   # or
   git rebase main
   ```

2. **Final Verification**: Run checks one more time

3. **Create PR**: Create pull request following PR guidelines
   - Use conventional commit format for PR title
   - Include comprehensive PR description
   - Link related issues
   - Reference the review checklist completion

## Review Checklist Location

The review checklist is located at:

```
features/example-feature/FEATURE_REVIEW_CHECKLIST.md
```

When working on a new feature, copy this checklist to your feature folder or reference it from the example-feature folder.

## Common Issues to Watch For

### Architecture Issues

- Code not organized in feature folders
- Mixing server and client components unnecessarily
- Using API routes instead of Server Actions

### Type Safety Issues

- Missing type definitions
- Using `any` type
- Not deriving types from Zod schemas

### Validation Issues

- Missing server-side validation
- Not using Zod schemas
- Exposing technical error details to users

### Performance Issues

- Unnecessary client-side JavaScript
- Missing loading states
- Not using appropriate caching strategies

### Security Issues

- Exposing secrets in client code
- Missing input validation
- Not handling errors properly

## Best Practices

1. **Review Early**: Don't wait until the end to review
2. **Fix Immediately**: Fix issues as you find them
3. **Document Decisions**: If something can't be checked, document why
4. **Ask for Help**: If unsure about something, ask before creating PR
5. **Be Thorough**: Take time to review properly - it saves time later

## Automation

Consider setting up pre-commit hooks or CI checks for:

- Linting
- Type checking
- Tests
- Build verification

This helps catch issues early, but manual review is still essential.
