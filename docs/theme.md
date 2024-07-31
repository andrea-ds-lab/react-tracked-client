Switching themes in a Vite project using TypeScript and CSS can be a smooth process. Here's a step-by-step guide to implement theme switching:

### 1. Define Themes in CSS

Create a CSS file (e.g., `themes.css`) where you define the themes using CSS custom properties (variables). For example:

```css
/* themes.css */

/* Default theme */
:root {
  --primary-color: #3498db;
  --background-color: #ecf0f1;
}

/* Dark theme */
[data-theme="dark"] {
  --primary-color: #2c3e50;
  --background-color: #34495e;
}

/* Light theme */
[data-theme="light"] {
  --primary-color: #3498db;
  --background-color: #ecf0f1;
}
```

### 2. Import CSS in Your Project

Import the CSS file in your main entry file (e.g., `main.ts`):

```typescript
import './themes.css';
```

### 3. Add Theme Switching Logic

In your TypeScript code, you can implement a function to switch themes. For example:

```typescript
// themeSwitcher.ts

function switchTheme(theme: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', theme);
}

// Example usage
const themeSwitcherButton = document.getElementById('theme-switcher');
themeSwitcherButton?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  switchTheme(newTheme);
});
```

### 4. Add Theme Switcher Button to Your HTML

Include a button or some UI element to trigger the theme switch in your HTML file:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Theme Switcher</title>
</head>
<body>
  <button id="theme-switcher">Switch Theme</button>
  <script src="/path/to/main.ts" type="module"></script>
</body>
</html>
```

### 5. Persist the Theme (Optional)

If you want to persist the user's theme choice across sessions, you can use `localStorage`:

```typescript
// themeSwitcher.ts

function switchTheme(theme: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light'; // default to light
  switchTheme(savedTheme);
}

// Load the saved theme on page load
loadTheme();

// Example usage
const themeSwitcherButton = document.getElementById('theme-switcher');
themeSwitcherButton?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  switchTheme(newTheme);
});
```

### 6. Include `themeSwitcher.ts` in Your Main Entry File

Ensure that `themeSwitcher.ts` is imported in your main entry file (`main.ts`):

```typescript
import './themes.css';
import './themeSwitcher.ts'; // Import theme switcher logic
```

### Summary

1. **Define themes** using CSS custom properties.
2. **Import** the CSS file in your main TypeScript entry file.
3. **Implement** theme switching logic with TypeScript.
4. **Add** a UI element to trigger theme switching.
5. **Persist** the user's theme choice using `localStorage` (optional).

This setup should help you smoothly switch between themes in your Vite project. If you need more customization or run into issues, let me know!