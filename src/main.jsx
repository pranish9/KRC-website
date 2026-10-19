import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

// Hash routing is used only for the preview build (hosts without page-refresh rewrites).
const Router = import.meta.env.VITE_HASH_ROUTER === '1' ? HashRouter : BrowserRouter

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </React.StrictMode>
)

// Prerendered pages (see scripts/prerender.mjs) already contain the HTML: attach to it.
// Anything else (dev server, app.html fallback, hash-router preview) renders from scratch.
const root = document.getElementById('root')
if (root.hasChildNodes() && Router === BrowserRouter) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)
