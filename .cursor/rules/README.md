# Cursor Rules Documentation

This directory contains comprehensive rules and guidelines for the project. All files use the MDC format and are automatically loaded by Cursor AI agents.

## Rule Files

### Core Rules

1. **`github_flow.mdc`** - GitHub Flow workflow, branching, PRs, CI/CD, testing, linting
2. **`nextjs_architecture.mdc`** - Next.js architecture, Server Actions, components, Prisma, Zod

### Project Context

3. **`project.mdc`** - Overall project context, tech stack, structure, build commands
4. **`stack.mdc`** - Technical stack specifics, versions, dependencies, configurations
5. **`coding-standards.mdc`** - Naming conventions, file organization, import ordering, error handling
6. **`testing.mdc`** - Testing conventions, frameworks, patterns, what to test
7. **`git.mdc`** - Git conventions, commit messages, branch naming, PR requirements
8. **`terminology.mdc`** - Domain terms, business concepts, acronyms, entity relationships
9. **`environment.mdc`** - Environment configs, deployment strategies, dev/stage/test/prod
10. **`dependencies.mdc`** - Dependency management, versioning, security, updates

## Quick Reference

- **Starting a feature?** → See `nextjs_architecture.mdc` for structure
- **Writing code?** → See `coding-standards.mdc` for conventions
- **Creating a PR?** → See `github_flow.mdc` and `git.mdc`
- **Adding tests?** → See `testing.mdc`
- **Deploying?** → See `environment.mdc`
- **Adding dependencies?** → See `dependencies.mdc`

## All Rules Apply Automatically

All rules in this directory have `alwaysApply: true`, meaning Cursor AI agents will automatically reference them in every conversation.
