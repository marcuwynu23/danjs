# Contributing to DAN

Thank you for your interest in contributing to DAN (Data Advanced Notation)! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:

- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Your environment (Node.js version, OS, etc.)
- A minimal example that demonstrates the issue (if possible)

### Suggesting Features

We welcome feature suggestions! Please open an issue with:

- A clear description of the feature
- Use cases and examples
- Why this feature would be useful
- Any potential implementation considerations

### Pull Requests

1. **Fork the repository** and create a new branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards:
   - Write clear, readable code
   - Add comments for complex logic
   - Follow existing code style and formatting
   - Keep functions focused and modular

3. **Add tests** for new features or bug fixes:
   - Tests should be in the `tests/` directory
   - Use Node.js built-in test runner
   - Ensure all tests pass: `npm test`

4. **Update documentation** if needed:
   - Update README.md for user-facing changes
   - Update FEATURES.md for new features
   - Add examples if introducing new syntax

5. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git commit -m "Add feature: description of what you added"
   ```

6. **Push to your fork** and open a Pull Request:
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure CI tests pass

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/marcuwynu23/dan.git
   cd dan
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Run tests in watch mode during development:
   ```bash
   npm run test:watch
   ```

## Coding Standards

- Use ES6+ JavaScript features
- Follow existing code style (2-space indentation)
- Keep functions small and focused
- Add JSDoc comments for exported functions
- Ensure code is compatible with Node.js LTS versions

## Testing Guidelines

- Write tests for all new features
- Write tests for bug fixes to prevent regressions
- Test edge cases (empty inputs, malformed data, etc.)
- Ensure 100% test coverage for new code when possible

## Documentation

- Keep README.md up to date
- Document new features in FEATURES.md
- Add examples to the `examples/` directory
- Update TypeScript definitions if needed

## Review Process

- All pull requests require review before merging
- Maintainers will review code quality, tests, and documentation
- Be open to feedback and suggestions
- Address review comments promptly

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the `question` label
- Check existing issues and discussions

Thank you for contributing to DAN! 🎉

