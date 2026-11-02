# 🔍 GitHub Finder

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Open_App-success?style=for-the-badge)](https://github-finder-git-main-amirmohammad017s-projects.vercel.app/)

> 🌐 **Live Demo:** https://github-finder-git-main-amirmohammad017s-projects.vercel.app/

A fast and clean GitHub user search app. Search developers, view their profiles, and follow or unfollow them, all from one place.

---

## ✨ Features

- 🔎 **Search users** with live suggestions while you type
- 👤 **Profile view** with avatar, name, public repositories, and followers
- ➕ **Follow / Unfollow** users directly from the app
- ⌨️ **Keyboard shortcut**: press `⌘ K` (macOS) or `Ctrl + K` (Windows/Linux) to focus the search bar
- 🕘 **Recent searches**: recently viewed users are saved in your browser
- 🔔 **Toast notifications** for actions and errors
- 📱 **Responsive** layout for desktop and mobile
- 🔐 **Authenticated requests** with a GitHub token for higher API rate limits

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚛️ [React](https://react.dev/) | UI library |
| 🟦 [TypeScript](https://www.typescriptlang.org/) | Type safety |
| ⚡ [Vite](https://vitejs.dev/) | Build tool and dev server |
| 🔄 [TanStack Query](https://tanstack.com/query) | Data fetching, caching, and mutations |
| 🍞 [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| 🐙 [GitHub REST API](https://docs.github.com/en/rest) | User data source |
| ▲ [Vercel](https://vercel.com/) | Hosting and deployment |

---
github-finder/
├── src/
│   ├── api/          # GitHub API requests (searchUsers, getUser, follow, ...)
│   ├── components/   # SearchBar and other UI components
│   ├── hooks/        # useRecentUsers, useGithubMutations, ...
│   └── main.tsx      # App entry point
├── index.html
├── vite.config.ts
└── package.json

---

## 🚀 Getting Started

### 📋 Prerequisites

- 🟢 [Node.js](https://nodejs.org/) 18 or newer
- 📦 npm
- 🔑 A GitHub [fine-grained personal access token](https://github.com/settings/personal-access-tokens) (optional, but recommended)

### 📥 Installation
```bash
# 1. Clone the repository
git clone https://github.com/amirmohammad017/github-finder.git

# 2. Enter the project folder
cd github-finder

# 3. Install dependencies
npm install
```
### ▶️ Run Locally
```bash
npm run dev
```
Then open http://localhost:5173 in your browser.

### 🏗️ Build for Production
```bash
npm run build
npm run preview
```
## 🧭 How to Use

1. 🔤 Type a GitHub username (at least 2 characters).
2. 🖱️ Pick a user from the suggestion list.
3. 👀 View the profile and click **Follow** or **Unfollow**.

---

## 🗺️ Roadmap

- [ ] 📄 Pagination for repositories and followers
- [ ] 🌙 Dark / light theme toggle
- [ ] 🔒 Move API requests to a serverless backend to hide the token
- [ ] 🧪 Unit and end-to-end tests

---

## 🤝 Contributing

Contributions are welcome! 🎉

1. 🍴 Fork the repository
2. 🌿 Create a feature branch: `git checkout -b feature/my-feature`
3. 💾 Commit your changes: `git commit -m "Add my feature"`
4. 📤 Push the branch: `git push origin feature/my-feature`
5. 🔃 Open a Pull Request

---

## 📄 License

This project is open source. Add a license file (for example, MIT) if you want to define the terms of use.

---

## 👨‍💻 Author

**Amir Mohammad** · [@amirmohammad017](https://github.com/amirmohammad017)

If you like this project, give it a ⭐ on GitHub!
