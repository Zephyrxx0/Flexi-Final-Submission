# Flexi-Project

A modern React + TypeScript frontend with Express.js backend application.

## 🚀 Getting Started

To start the entire application, navigate to the frontend directory:

```bash
cd frontend
npm run dev
```

This will start both the frontend and backend servers concurrently:
- **Frontend**: http://localhost:5173 (Vite React app)
- **Backend**: http://localhost:3001 (Express.js server)

## 📁 Project Structure

```
flexi-project/
├── frontend/           # React TypeScript frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── Pages/       # Route pages
│   │   ├── utils/       # Auth & utilities
│   │   └── contexts/    # React contexts
│   ├── public/          # Static assets
│   └── package.json     # Frontend deps + orchestration scripts
└── backend/            # Express.js backend
    ├── server.js       # Main server file
    └── package.json    # Backend dependencies
```

## 🛠️ Development Commands

All commands should be run from the `frontend/` directory:

```bash
# Start both frontend and backend servers
npm run dev

# Start only frontend
npm run frontend:dev

# Start only backend  
npm run backend:dev

# Install all dependencies (frontend + backend)
npm run install:all

# Build frontend
npm run build

# Preview frontend build
npm run preview
```

## 🔧 Initial Setup

1. Clone the repository
2. Navigate to the frontend directory: `cd frontend`
3. Install all dependencies: `npm run install:all`
4. Start the development servers: `npm run dev`

## 🌟 Features

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS
- **Backend**: Express.js, MongoDB integration
- **Authentication**: JWT-based authentication system
- **Cart System**: Shopping cart functionality
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Radix UI components and animations

## React + TypeScript + Vite Original Template Info

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
