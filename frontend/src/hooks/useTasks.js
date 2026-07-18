import { useCallback, useEffect, useState } from 'react';
import * as taskService from '../services/taskService';
import { useToast } from '../context/ToastContext';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, highPriority: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { addToast } = useToast();

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await taskService.getTasks({});
      setStats({
        total: data.length,
        pending: data.filter((t) => t.status === 'Pending').length,
        completed: data.filter((t) => t.status === 'Completed').length,
        highPriority: data.filter((t) => t.priority === 'High').length,
      });
    } catch {
      /* stats are non-critical */
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter && statusFilter !== 'All') params.status = statusFilter;
      const { data } = await taskService.getTasks(params);
      setTasks(data);
      await fetchStats();
    } catch (err) {
      addToast(
        err.response?.data?.detail || 'Failed to load tasks',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, addToast, fetchStats]);

  useEffect(() => {
    const timer = setTimeout(fetchTasks, 250);
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const addTask = async (payload) => {
    const { data } = await taskService.createTask(payload);
    setTasks((prev) => [data, ...prev]);
    await fetchStats();
    addToast('Task created successfully');
    return data;
  };

  const editTask = async (id, payload) => {
    const { data } = await taskService.updateTask(id, payload);
    setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    await fetchStats();
    addToast('Task updated successfully');
    return data;
  };

  const removeTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await fetchStats();
    addToast('Task deleted successfully');
  };

  const markCompleted = async (id) => {
    const { data } = await taskService.updateTask(id, { status: 'Completed' });
    setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    await fetchStats();
    addToast('Task marked as completed');
    return data;
  };

  return {
    tasks,
    stats,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    markCompleted,
  };
}
