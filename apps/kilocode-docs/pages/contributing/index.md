---
title: "Contributing"
description: "Contribute to Ordinant.ai"
---

# Contributing Overview

Ordinant.ai is an open-source project that welcomes contributions from developers of all skill levels. This guide will help you get started with contributing to Ordinant.ai, whether you're fixing bugs, adding features, improving documentation, or sharing custom modes.

## Ways to Contribute

There are many ways to contribute to Ordinant.ai:

1. **Code Contributions**: Implement new features or fix bugs
2. **Documentation**: Improve existing docs or create new guides
3. **Marketplace Contributions**: Create and share custom modes, skills, and MCP servers via the [Ordinant.ai Marketplace](https://github.com/Ordinant-ai/ordinant-ai-marketplace)
4. **Bug Reports**: Report issues you encounter
5. **Feature Requests**: Suggest new features or improvements
6. **Community Support**: Help other users in the community

## Setting Up the Development Environment

Setting Up the Development Environment is described in details on the [Development Environment](/contributing/development-environment) page.

## Understanding the Architecture

Before diving into the code, we recommend reviewing the [Architecture Overview](architecture) to understand how the different components of Ordinant.ai fit together.

## Development Workflow

### Branching Strategy

- Create a new branch for each feature or bugfix
- Use descriptive branch names (e.g., `feature/new-tool-support` or `fix/browser-action-bug`)

```bash
git checkout -b your-branch-name
```

### Coding Standards

- Follow the existing code style and patterns
- Use TypeScript for new code
- Include appropriate tests for new features
- Update documentation for any user-facing changes

### Commit Guidelines

- Write clear, concise commit messages
- Reference issue numbers when applicable
- Keep commits focused on a single change

### Testing Your Changes

- Run the test suite:
    ```bash
    npm test
    ```
- Manually test your changes in the development extension

### Creating a Pull Request

1. Push your changes to your fork:

    ```bash
    git push origin your-branch-name
    ```

2. Go to the [Ordinant.ai repository](https://github.com/Ordinant-ai/ordinant-ai-extension)

3. Click "New Pull Request" and select "compare across forks"

4. Select your fork and branch

5. Fill out the PR template with:
    - A clear description of the changes
    - Any related issues
    - Testing steps
    - Screenshots (if applicable)

## Contributing to the Ordinant.ai Marketplace

The [Ordinant.ai Marketplace](https://github.com/Ordinant-ai/ordinant-ai-marketplace) is a community-driven repository of agent tooling that extends Ordinant.ai's capabilities. You can contribute:

- **Skills**: Modular workflows and domain expertise that teach agents how to perform specific tasks
- **MCP Servers**: Standardized integrations that connect agents to external tools and services
- **Modes**: Custom agent personalities and behaviors with tailored tool access

To contribute:

1. Follow the documentation for [Custom Modes](/agent-behavior/custom-modes), [Skills](/agent-behavior/skills), or [MCP Servers](/features/mcp/overview) to create your resource

2. Test your contribution thoroughly

3. Submit a pull request to the [Ordinant.ai Marketplace repository](https://github.com/Ordinant-ai/ordinant-ai-marketplace)

## Engineering Specs

For larger features, we write engineering specs to align on requirements before implementation. Check out the [Architecture](/contributing/architecture) section to see planned features and learn how to contribute specs.

## Documentation Contributions

Documentation improvements are highly valued contributions:

1. Follow the documentation style guide:

    - Use clear, concise language
    - Include examples where appropriate
    - Use absolute paths starting from `/docs/` for internal links
    - Don't include `.md` extensions in links

2. Test your documentation changes by running the docs site locally:

    ```bash
    cd apps/kilocode-docs
    pnpm install
    pnpm start
    ```

3. Submit a PR with your documentation changes

## Community Guidelines

When participating in the Ordinant.ai community:

- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers get started
- Follow the [Code of Conduct](https://github.com/Ordinant-ai/ordinant-ai-extension/blob/main/CODE_OF_CONDUCT.md)

## Getting Help

If you need help with your contribution:

- Join our [Discord community](https://ordinant.ai/discord) for real-time support
- Ask questions on [GitHub Discussions](https://github.com/Ordinant-ai/ordinant-ai-extension/discussions)
- Visit our [Reddit community](https://www.reddit.com/r/OrdinantAI)

## Recognition

All contributors are valued members of the Ordinant.ai community. Contributors are recognized in:

- Release notes
- The project's README
- The contributors list on GitHub

Thank you for contributing to Ordinant.ai and helping make AI-powered coding assistance better for everyone!
