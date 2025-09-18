# 🛠 Web App Build Instructions for LLM

This document explains the **tools, frameworks, and conventions** to use when building a **modern React-based web app**.

---

## **1. Core UI & State Libraries**

### **React**
- Use [React](https://react.dev) as the main UI library.
- Use **functional components** and **React Hooks** (`useState`, `useEffect`, `useMemo`, etc.).
- Prefer **React Server Components** if applicable.

---

## **2. Data, Routing & Tables**

### **TanStack**
Use [TanStack](https://tanstack.com) libraries for state, routing, and tables:

- **TanStack Query** for asynchronous data fetching, caching, and mutations.
- **TanStack Router** for client-side routing (if not using Next.js).
- **TanStack Table** for headless table logic (sorting, filtering, pagination).

**Guidelines:**
- Manage API calls via **TanStack Query** hooks (`useQuery`, `useMutation`).
- Keep UI presentation separate from logic (headless approach).

---

## **3. Build Tool**

### **Vite**
- Use [Vite](https://vite.dev) as the build tool and dev server.
- Must support:
  - React with JSX/TSX
  - Hot Module Reloading
  - TypeScript if required

---

## **4. Server (Optional)**

### **Hono**
If a backend/server is required:
- Use [Hono](https://hono.dev) as the server framework.
- Keep server minimal — handle only:
  - API endpoints
  - Authentication
  - Server-side rendering (if needed)
- Deployable to **Edge** (Cloudflare Workers, Vercel Edge Functions, etc.).

---

## **5. Styling**

### **Tailwind CSS 4**
- Use [Tailwind CSS](https://tailwindcss.com) version 4 for styling.
- Follow these guidelines:
  - Utility-first classes
  - Responsive design using Tailwind breakpoints
  - Use `@apply` only for grouping repeated styles
  - Avoid external CSS files unless necessary

---

## **6. Networking**

### **Native Fetch API**
- **Do NOT use Axios** — use the native `fetch()` API.
- Always handle:
  - Errors with `try/catch`
  - JSON parsing with `.json()`
  - Abort controllers for cancelable requests

Example:
```js
const res = await fetch('/api/data');
if (!res.ok) throw new Error('Network response was not ok');
const data = await res.json();

```

# 🎨 Design Guidelines – Fonts & Colors

## **Fonts**

- **Inter** – Main body font  
  *Weights:* 400, 500, 600, 700
- **Rubik** – Headings and titles  
  *Weights:* 400, 500, 600, 700, 800
- **Monaco / Consolas** – Monospace for code snippets

---

## **Colors**

| Name | Hex | Usage |
|------|-----|-------|
| **Primary Red** | `#e74c3c` | Main brand color |
| **Text Dark** | `#2c3e50` | Primary text |
| **Text Gray** | `#7f8c8d` | Secondary text |
| **Background White** | `#ffffff` | Page background |
| **Background Light** | `#f8f9fa` | Light gray background |
| **Border Light** | `#e9ecef` | Subtle borders |

---

## **Usage Guidelines**

- **Body text:** Inter font with `--text-dark` (`#2c3e50`)
- **Headings:** Rubik font with `--primary-red` (`#e74c3c`)
- **Secondary text:** Inter font with `--text-gray` (`#7f8c8d`)
- **Code blocks:** Monaco or Consolas monospace font
