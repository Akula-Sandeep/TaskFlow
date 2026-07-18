import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, Logo } from './ui';
import { useTheme } from '../context/ThemeContext';

export default function AuthLayout({ title, subtitle, children }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-auth-gradient px-4 py-4">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-primary/5 blur-[80px]" />

      <button
        type="button"
        onClick={toggleDarkMode}
        className="btn-secondary absolute right-5 top-5 z-10 !px-3 !py-2"
        aria-label="Toggle theme"
      >
        {darkMode ? (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <div className="relative w-full max-w-[420px]">
        <div className="mb-8 text-center animate-fade-in">
          <div className="mx-auto mb-5 flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">{title}</h1>
          <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>
        </div>

        <div className="glass-card animate-scale-in p-8">{children}</div>
      </div>
    </div>
  );
}

export function AuthFooterLink({ text, linkText, to }) {
  return (
    <p className="mt-6 text-center text-sm text-text-secondary">
      {text}{' '}
      <Link to={to} className="font-semibold text-primary transition-colors hover:text-primary-hover">
        {linkText}
      </Link>
    </p>
  );
}

export function PasswordInput({ id, name, value, onChange, placeholder, error, autoComplete }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          className="input pr-11"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-secondary"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}
