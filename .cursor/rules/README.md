# Cursor Rules Documentation

This directory contains comprehensive rules and guidelines for the project. All files use the MDC format and are automatically loaded by Cursor AI agents.

## Rule Files

### Core Rules

1. **`github_flow.mdc`** - GitHub Flow workflow, branching, PRs, CI/CD, merge rules
2. **`pre-push-checks.mdc`** - **Mandatory local quality gates:** run formatting, linting, type check, testing, and build **before every push and before creating a PR**. Never push bad code.
3. **`nextjs_architecture.mdc`** - Next.js architecture, Server Actions, components, Prisma, Zod

### Project Context

4. **`project.mdc`** - Overall project context, tech stack, structure, build commands
5. **`stack.mdc`** - Technical stack specifics, versions, dependencies, configurations
6. **`coding-standards.mdc`** - Naming conventions, file organization, import ordering, error handling
7. **`testing.mdc`** - Testing conventions, frameworks, patterns, what to test
8. **`git.mdc`** - Git conventions, commit messages, branch naming, PR requirements
9. **`terminology.mdc`** - Domain terms, business concepts, acronyms, entity relationships
10. **`environment.mdc`** - Environment configs, deployment strategies, dev/stage/test/prod
11. **`dependencies.mdc`** - Dependency management, versioning, security, updates

## Quick Reference

- **Before every push or PR?** → Run `npm run prepush` (see `pre-push-checks.mdc`)
- **Starting a feature?** → See `nextjs_architecture.mdc` for structure
- **Writing code?** → See `coding-standards.mdc` for conventions
- **Creating a PR?** → See `github_flow.mdc`, `pre-push-checks.mdc`, and `git.mdc`
- **Adding tests?** → See `testing.mdc`
- **Deploying?** → See `environment.mdc`
- **Adding dependencies?** → See `dependencies.mdc`

## All Rules Apply Automatically

All rules in this directory have `alwaysApply: true`, meaning Cursor AI agents will automatically reference them in every conversation.
