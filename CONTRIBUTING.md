# Contributing to streamx24

Thank you for helping improve **streamx24**.

## Ways to Contribute

- Report bugs with clear reproduction steps and relevant logs
- Propose focused feature requests
- Improve docs and developer setup
- Submit code changes with tests

## Before You Start

- Check existing issues and pull requests before opening a new one
- For larger changes, open an issue first to align on scope

## Development Setup

```bash
git clone https://github.com/rohitbhure65/streamx24.git
cd streamx24
npm install
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Pull Request Guidelines

- Keep pull requests focused on a single concern
- Add or update tests for any changed behaviour
- Update `CHANGELOG.md` under `[Unreleased]` for user-visible changes
- Run linting and tests locally before pushing

## Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org):

```
feat: add new feature
fix: handle edge case gracefully
docs: update setup instructions
chore: upgrade dependencies
refactor: extract logic into helper
test: add unit tests for module
```

## Contribution Licensing

By submitting a contribution, you agree that your work will be licensed under
the repository's MIT License.
