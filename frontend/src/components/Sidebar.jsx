import { useTheme } from '../context/ThemeContext';
import SidebarWisdom from './SidebarWisdom';

export default function Sidebar({ open, onClose, user, onLogout, stats }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[195px] flex-col border-r border-border bg-surface-sidebar transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col px-3 py-4">
            <SidebarWisdom stats={stats} />
          </div>

          <div className="flex-shrink-0 px-3 py-4">
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-primary">{user?.name}</p>
                <p className="truncate text-xs text-text-muted">{user?.email}</p>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <button type="button" onClick={toggleDarkMode} className="btn-ghost w-full justify-start !rounded-xl">
                {darkMode ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="btn-ghost w-full justify-start !rounded-xl text-danger hover:!bg-danger/10 hover:!text-danger"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
