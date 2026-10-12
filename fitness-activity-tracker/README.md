# FitTrack — Fitness Activity Tracker

A simple React + Vite fitness dashboard that displays daily steps, distance, active minutes, and estimated calories burned. Add an activity using the form and the dashboard updates instantly.

## Run locally

1. Install Node.js (LTS) from https://nodejs.org if it is not installed.
2. Open this folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Build check

```bash
npm run build
```

## GitHub

Create an empty repository on GitHub, then run these commands in this project folder (replace the URL with your repository URL):

```bash
git init
git add .
git commit -m "Create fitness activity tracker"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Calories are estimates for demonstration, not medical measurements. Activity entries remain in React state and reset when the page reloads.
