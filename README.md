# Only Chat Widget

A reusable, customizable chatbot widget built with React, TypeScript, and styled-components. Easily embeddable into any website to enhance user support and engagement.

## 🚀 Tech Stack

- ⚛️ React 18 + Vite
- 🟦 TypeScript
- 💅 styled-components
- 📦 pnpm or yarn (preferred package manager)

## 📸 Preview

![ChatWidget Preview](./public/preview.png)

> The widget pops up as a floating button and expands into a modal when clicked.

## 🌱 Getting Started

```bash
# 1. Clone the repo
git clone https://gitlab.com/minhtruong315/only-chat-fe
cd only-chat

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev
```

## 🔐 Environment Variables

Create a `.env` for run local:

```env
VITE_API_SERVER=https://api.sombes.com/api
VITE_GRAPHQL_ENDPOINT=https://api.sombes.com/graphql
VITE_SOCKET_API_URL=https://api.sombes.com/chat
```

You can duplicate `.env.dev` if available.

## 🔁 Git Workflow

We use a lightweight Git flow:

```text
main        → production-ready code
dev         → staging branch
feature/*   → individual features
fix/*       → bug fixes
```

### 👨‍💻 How to Contribute

```bash
# create a feature branch
git checkout -b feature/your-feature-name

# after changes
git add .
git commit -m "feat: add feature X"

# push and create a PR
git push origin feature/your-feature-name
```

## 📝 Commit Convention (Conventional Commits)

- `feat`: A new feature
- `fix`: A bug fix
- `chore`: Maintenance
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `docs`: Documentation only changes
- `test`: Adding or updating tests

```bash
# example
git commit -m "fix: prevent modal from closing on backdrop click"
```

## 📦 Build

```bash
pnpm build
```

### ⚠️ Notes Before Pushing a PR

- Ensure all errors and warnings are fixed:
  - Run `pnpm lint` to check for linting issues.
  - Run `pnpm test` to ensure all tests pass.
- Verify the build:
  - Run `pnpm build` to confirm the project builds without errors.
- Double-check your changes:
  - Ensure your code follows the project's coding standards.
  - Update or add relevant documentation if necessary.
- Rebase your branch with the latest `dev` branch:
  ```bash
  git checkout dev
  git pull origin dev
  git checkout feature/your-feature-name
  git rebase dev
  ```
- Test your feature thoroughly in a local environment.
- Add meaningful commit messages following the [Commit Convention](#-commit-convention-conventional-commits).
- Review your code before creating the pull request.
- Tag relevant reviewers when submitting the PR.
- Include a clear description of the changes in the PR.
