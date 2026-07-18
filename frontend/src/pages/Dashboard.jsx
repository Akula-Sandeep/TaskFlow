import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTasks } from '../hooks/useTasks';
import Sidebar from '../components/Sidebar';
import GreetingSection from '../components/GreetingSection';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import StatCard, { CompletedIcon, PendingIcon, PriorityIcon, TotalIcon } from '../components/StatCard';
import { TaskSkeletonGrid } from '../components/TaskSkeleton';
import { RotatingTagline } from '../components/RotatingText';
import { Logo } from '../components/ui';
import { PRODUCT_TAGLINES } from '../constants/quotes';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const {
    tasks,
    stats,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    addTask,
    editTask,
    removeTask,
    markCompleted,
  } = useTasks();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const firstName = user?.name?.split(' ')[0] || user?.name;

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully');
    navigate('/login');
  };

  const openCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editingTask) {
        await editTask(editingTask.id, payload);
      } else {
        await addTask(payload);
      }
      setModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      const detail = err.response?.data?.detail;
      addToast(typeof detail === 'string' ? detail : 'Failed to save task', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async (task) => {
    try {
      await markCompleted(task.id);
    } catch (err) {
      addToast(err.response?.data?.detail || 'Failed to update task', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await removeTask(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      addToast(err.response?.data?.detail || 'Failed to delete task', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onLogout={handleLogout}
        stats={stats}
      />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-[195px]">
        <header className="border-b border-border bg-surface-card">
          <div className="navbar-grid px-3 py-2.5 lg:px-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="btn-ghost !p-2 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Logo size="sm" />
              <span className="text-base font-semibold tracking-tight text-text-primary">TaskFlow</span>
            </div>

            <RotatingTagline
              items={PRODUCT_TAGLINES}
              className="hidden px-3 text-sm text-text-secondary sm:block lg:text-base"
            />

            <div className="flex items-center justify-end">
              <button type="button" onClick={openCreate} className="btn-primary shrink-0 !px-2.5 !py-1.5 text-sm">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New Task
              </button>
            </div>
          </div>

          <div className="border-t border-border px-5 py-3 sm:hidden">
            <RotatingTagline items={PRODUCT_TAGLINES} className="text-sm text-text-secondary" />
          </div>
        </header>

        <main className="flex flex-1 flex-col px-4 py-2 lg:px-6">
          <section className="mb-4">
            <GreetingSection firstName={firstName} />
          </section>

          <section className="mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Tasks" value={stats.total} icon={TotalIcon} accent="primary" />
            <StatCard label="Pending" value={stats.pending} icon={PendingIcon} accent="warning" />
            <StatCard label="Completed" value={stats.completed} icon={CompletedIcon} accent="success" />
            <StatCard label="High Priority" value={stats.highPriority} icon={PriorityIcon} accent="accent" />
          </section>

          <section className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                className="input !h-11 !rounded-xl !py-2.5 pl-11"
                placeholder="Search tasks by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search tasks"
              />
            </div>
            <div className="relative sm:w-48">
              <select
                className="input !h-11 w-full !cursor-pointer appearance-none !rounded-xl !py-2.5 pl-4 pr-10"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by status"
              >
                <option value="All">All tasks</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </section>

          {loading ? (
            <TaskSkeletonGrid count={6} />
          ) : tasks.length === 0 ? (
            <div className="flex flex-1 items-center justify-center py-0.5">
              <EmptyState onAdd={openCreate} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task, i) => (
                <div key={task.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <TaskCard
                    task={task}
                    onView={setViewingTask}
                    onEdit={openEdit}
                    onDelete={setDeleteTarget}
                    onComplete={handleComplete}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <TaskFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        task={editingTask}
        submitting={submitting}
      />

      <TaskDetailsModal
        open={Boolean(viewingTask)}
        onClose={() => setViewingTask(null)}
        task={viewingTask}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete task?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
