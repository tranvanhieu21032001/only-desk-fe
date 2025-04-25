A reusable, customizable chatbot widget built with React, TypeScript, and styled-components. Easily embeddable into any website to enhance user support and engagement.

## 🚀 Tech Stack

- ⚛️ React 18 + Vite
- 🟦 TypeScript
- 💅 styled-components
- 📦 pnpm (preferred package manager)

## 📸 Preview

![ChatWidget Preview](./public/preview.png)

> The widget pops up as a floating button and expands into a modal when clicked.

## 🌱 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/chat-widget.git
cd chat-widget

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev
```

## 🔐 Environment Variables

Create a `.env` file in the root folder:

```env
VITE_API_URL=https://your-api.com
VITE_OPENAI_KEY=your-openai-key
```

You can duplicate `.env.example` if available.

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

The built widget can be embedded via `<script>` on any website (details in `/embed/README.md`).

## 📄 License

MIT © [Your Name or Org]