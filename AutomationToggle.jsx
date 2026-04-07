@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Global Styles ─────────────────────────────────────────── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background: #020810;
  color: #e2e8f0;
  overflow-x: hidden;
}

/* ─── Glassmorphism Utilities ───────────────────────────────── */
@layer components {
  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .glass-strong {
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .glass-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    transition: all 0.3s ease;
  }

  .glass-card:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(10, 132, 255, 0.12);
  }

  /* ZAIN gradient text */
  .gradient-text {
    background: linear-gradient(135deg, #0A84FF 0%, #00FFB2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-text-alt {
    background: linear-gradient(135deg, #00FFB2 0%, #0A84FF 50%, #00FFB2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Gradient borders */
  .gradient-border {
    position: relative;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, #0A84FF, #00FFB2);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  /* Glow effects */
  .glow-blue {
    box-shadow: 0 0 20px rgba(10, 132, 255, 0.3), 0 0 60px rgba(10, 132, 255, 0.1);
  }

  .glow-green {
    box-shadow: 0 0 20px rgba(0, 255, 178, 0.3), 0 0 60px rgba(0, 255, 178, 0.1);
  }

  .glow-brand {
    box-shadow: 0 0 20px rgba(10, 132, 255, 0.2), 0 0 60px rgba(0, 255, 178, 0.1);
  }

  /* Gradient button */
  .btn-gradient {
    background: linear-gradient(135deg, #0A84FF 0%, #0070e0 100%);
    color: white;
    padding: 12px 32px;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  }

  .btn-gradient:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(10, 132, 255, 0.4);
  }

  .btn-gradient-green {
    background: linear-gradient(135deg, #00FFB2 0%, #00bf87 100%);
    color: #020810;
  }

  .btn-gradient-brand {
    background: linear-gradient(135deg, #0A84FF 0%, #00FFB2 100%);
  }

  /* Shimmer loading effect */
  .shimmer {
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%);
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
  }
}

/* ─── Custom Scrollbar ──────────────────────────────────────── */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #040d1a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #0A84FF, #00FFB2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #1a8cff, #0A84FF);
}

/* ─── Selection Color ───────────────────────────────────────── */
::selection {
  background: rgba(10, 132, 255, 0.4);
  color: white;
}

/* ─── Page Background Glow ──────────────────────────────────── */
.page-glow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse at 20% 20%, rgba(10, 132, 255, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(0, 255, 178, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(10, 132, 255, 0.03) 0%, transparent 50%);
}

/* ─── Chat message styles ───────────────────────────────────── */
.chat-message-ai {
  white-space: pre-wrap;
}

.chat-message-ai strong {
  color: #80bfff;
}
