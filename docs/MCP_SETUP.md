# MCP Server Configuration Guide

This document describes the Model Context Protocol (MCP) servers configured for this Next.js project.

## What is MCP?

Model Context Protocol (MCP) is an open protocol that allows AI assistants and tools to securely connect to external data sources, APIs, and tools. It enables AI agents to access real-time information, perform actions, and interact with various services.

## Configured MCP Servers

### Core Development Tools

#### Prisma-Local

- **Purpose**: Database operations, migrations, and schema management
- **Command**: `npx -y prisma mcp`
- **Use Cases**:
  - Run database migrations
  - Check migration status
  - Inspect database schema
  - Generate Prisma Client

#### Prisma-Remote

- **Purpose**: Remote Prisma MCP server for shared/production environments
- **Command**: `npx -y mcp-remote https://mcp.prisma.io/mcp`
- **Use Cases**: Production database operations via remote server

### UI & Component Libraries

#### Shadcn

- **Purpose**: Shadcn UI component registry
- **Command**: `npx shadcn@latest mcp`
- **Use Cases**:
  - Browse available components
  - Get component props and documentation
  - Install components into your project
  - View component examples and variants

### Next.js Integration

#### Next-DevTools

- **Purpose**: Next.js DevTools integration
- **Command**: `npx -y next-devtools-mcp@latest`
- **Use Cases**:
  - Fetch route information from running dev server
  - Access Next.js logs and metadata
  - Inspect build information
- **Requirements**: Next.js 16+

### Version Control & Collaboration

#### GitHub

- **Purpose**: GitHub API access
- **Command**: `npx -y @modelcontextprotocol/server-github`
- **Environment Variables**:
  - `GITHUB_PERSONAL_ACCESS_TOKEN`: Your GitHub personal access token
- **Use Cases**:
  - Search code across repositories
  - Fetch issues and pull requests
  - Access repository information
  - Perform code reviews

### File System & Development

#### Filesystem

- **Purpose**: File system access
- **Command**: `npx -y @modelcontextprotocol/server-filesystem`
- **Environment Variables**:
  - `ALLOWED_DIRECTORIES`: Comma-separated list of allowed directories (default: ".")
- **Use Cases**:
  - Read and write files
  - Navigate directory structure
  - Manage project files

### Web & Search

#### Brave-Search

- **Purpose**: Web search capabilities
- **Command**: `npx -y @modelcontextprotocol/server-brave-search`
- **Environment Variables**:
  - `BRAVE_API_KEY`: Your Brave Search API key (get from [brave.com/search/api](https://brave.com/search/api))
- **Use Cases**:
  - Search the web
  - Get real-time information
  - Research topics

#### Fetch

- **Purpose**: HTTP fetch capabilities
- **Command**: `npx -y @modelcontextprotocol/server-fetch`
- **Use Cases**:
  - Make HTTP requests
  - Fetch resources from URLs
  - Interact with APIs

#### Puppeteer

- **Purpose**: Browser automation
- **Command**: `npx -y @modelcontextprotocol/server-puppeteer`
- **Use Cases**:
  - Take screenshots of web pages
  - Scrape web content
  - Automate browser interactions
  - Test web applications

### Database

#### PostgreSQL

- **Purpose**: Direct PostgreSQL database access
- **Command**: `npx -y @modelcontextprotocol/server-postgres`
- **Environment Variables**:
  - `POSTGRES_CONNECTION_STRING`: PostgreSQL connection string
- **Use Cases**:
  - Direct database queries
  - Data analysis
  - Database management
- **Note**: Use with caution in production. Prefer Prisma for application code.

#### SQLite

- **Purpose**: SQLite database access
- **Command**: `npx -y @modelcontextprotocol/server-sqlite`
- **Environment Variables**:
  - `SQLITE_DB_PATH`: Path to SQLite database file (default: "./data/database.db")
- **Use Cases**:
  - Lightweight database operations
  - Local data storage
  - Development databases

### Containerization & DevOps

#### Docker

- **Purpose**: Docker operations
- **Command**: `npx -y @modelcontextprotocol/server-docker`
- **Use Cases**:
  - Manage Docker containers
  - Build and manage images
  - Docker Compose operations
  - Container orchestration

### Package Management

#### npm

- **Purpose**: npm registry access
- **Command**: `npx -y @modelcontextprotocol/server-npm`
- **Use Cases**:
  - Search npm packages
  - Get package information
  - Check package versions
  - View package documentation

### Memory & Storage

#### Memory

- **Purpose**: Persistent memory storage
- **Command**: `npx -y @modelcontextprotocol/server-memory`
- **Use Cases**:
  - Store information across sessions
  - Remember context and preferences
  - Maintain conversation history

### Third-Party Services

#### Stripe

- **Purpose**: Stripe payment operations
- **Command**: `npx -y @modelcontextprotocol/server-stripe`
- **Environment Variables**:
  - `STRIPE_API_KEY`: Your Stripe API key
- **Use Cases**:
  - Manage payments
  - Handle subscriptions
  - Process invoices
  - Payment analytics

#### Figma

- **Purpose**: Figma API access
- **Command**: `npx -y @modelcontextprotocol/server-figma`
- **Environment Variables**:
  - `FIGMA_ACCESS_TOKEN`: Your Figma access token
- **Use Cases**:
  - Read design data
  - Access component libraries
  - Sync design tokens
  - Generate code from designs

## Setup Instructions

### 1. Install Required Dependencies

Most MCP servers are run via `npx`, so no installation is required. However, some may need additional setup:

```bash
# No installation needed - servers run via npx
```

### 2. Configure Environment Variables

Create or update your `.env.local` file with the required API keys and tokens:

```env
# GitHub
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here

# Brave Search
BRAVE_API_KEY=your_brave_api_key_here

# PostgreSQL (if using direct access)
POSTGRES_CONNECTION_STRING=postgresql://user:password@localhost:5432/dbname

# Stripe
STRIPE_API_KEY=your_stripe_api_key_here

# Figma
FIGMA_ACCESS_TOKEN=your_figma_token_here
```

### 3. MCP Configuration Location

The MCP configuration file is located at `.cursor/mcp.json` in this project.

For Cursor IDE:

- Project-level: `.cursor/mcp.json` (this file)
- User-level: `~/.cursor/mcp.json` (your home directory)

### 4. Restart Cursor

After updating the MCP configuration, restart Cursor IDE to load the new servers.

## Security Considerations

1. **API Keys**: Never commit API keys or tokens to version control. Use `.env.local` and ensure it's in `.gitignore`.

2. **Filesystem Access**: The filesystem MCP server has access to your project directory. Be cautious with destructive operations.

3. **Database Access**: Direct database access (PostgreSQL, SQLite) should be used carefully, especially in production environments.

4. **GitHub Token**: Use a personal access token with minimal required permissions.

5. **Rate Limits**: Be aware of API rate limits for services like GitHub, Brave Search, and Stripe.

## Recommended Servers for Next.js Projects

For a typical Next.js project, we recommend starting with:

1. **Prisma-Local** - Essential for database operations
2. **Shadcn** - UI component library integration
3. **Next-DevTools** - Next.js-specific tooling
4. **Filesystem** - File operations
5. **GitHub** - Version control integration

Add other servers as needed based on your project requirements.

## Troubleshooting

### Server Not Loading

1. Check that the server package exists and is available on npm
2. Verify the command and args in `mcp.json` are correct
3. Check Cursor's MCP server logs for errors
4. Ensure required environment variables are set

### Permission Errors

1. Verify API keys and tokens are valid
2. Check file system permissions for filesystem server
3. Ensure Docker daemon is running for Docker server

### Performance Issues

1. Disable unused MCP servers to reduce overhead
2. Use local servers instead of remote when possible
3. Monitor API rate limits

## Additional Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Prisma MCP Server](https://www.prisma.io/docs/postgres/integrations/mcp-server)
- [Shadcn UI MCP](https://ui.shadcn.com/docs/mcp)
- [Next.js MCP Integration](https://nextjs.org/docs/app/guides/mcp)

## Notes

- Some MCP servers require API keys or tokens. Set these in your environment variables.
- Not all servers need to be enabled at once. Enable only what you need.
- MCP servers run locally via `npx`, so they require an internet connection to download packages on first use.
