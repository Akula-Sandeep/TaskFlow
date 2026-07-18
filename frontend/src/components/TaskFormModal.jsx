import { useEffect, useState } from 'react';
import { Spinner, toDateTimeInputValue, fromDateTimeInputValue } from './ui';

const emptyForm = {
  title: '',
  description: '',
  due_date: '',
  priority: 'Medium',
  status: 'Pending',
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function getDateTimeParts(value) {
  if (!value) {
    return { date: '', hour: '', minute: '', ampm: 'AM' };
  }

  const [datePart, timePart = '09:00'] = value.split('T');
  const [hour24 = '09', minute = '00'] = timePart.split(':');
  const hourValue = Number(hour24);
  const ampm = hourValue >= 12 ? 'PM' : 'AM';
  let hour12 = hourValue % 12;

  if (hour12 === 0) {
    hour12 = 12;
  }

  return {
    date: datePart || '',
    hour: pad(hour12),
    minute: pad(Number(minute) || 0),
    ampm,
  };
}

function buildDateTimeValue(date, hour, minute, ampm) {
  if (!date || !hour || !minute || !ampm) return '';

  let hourValue = Number(hour);
  if (ampm === 'PM' && hourValue < 12) hourValue += 12;
  if (ampm === 'AM' && hourValue === 12) hourValue = 0;

  return `${date}T${pad(hourValue)}:${pad(Number(minute) || 0)}`;
}

export default function TaskFormModal({ open, onClose, onSubmit, task, submitting }) {
  const [form, setForm] = useState(emptyForm);
  const [dueDate, setDueDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [errors, setErrors] = useState({});

  const isEdit = Boolean(task);

  useEffect(() => {
  if (!open) return;

  if (task) {
    const dateTime = toDateTimeInputValue(task.due_date);

    setForm({
      title: task.title || '',
      description: task.description || '',
      due_date: dateTime,
      priority: task.priority || 'Medium',
      status: task.status || 'Pending',
    });

    const { date, hour, minute, ampm } = getDateTimeParts(dateTime);

    setDueDate(date);
    setHour(hour);
    setMinute(minute);
    setAmpm(ampm);
  } else {
    setForm({ ...emptyForm, due_date: '' });

    setDueDate('');
    setHour('');
    setMinute('');
    setAmpm('AM');
  }

  setErrors({});
}, [open, task]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
    setErrors((prev) => ({ ...prev, due_date: undefined }));
  };

  const handleDueTimeChange = (e) => {
  setAmpm(e.target.value);
   };

 const validate = () => {
  const next = {};

  if (!form.title.trim()) {
    next.title = "Title is required";
  }

  if (!dueDate || !hour || !minute) {
    next.due_date = "Due date and time is required";
  } else {
    const hourNum = Number(hour);
    const minuteNum = Number(minute);

    if (hourNum < 1 || hourNum > 12) {
      next.due_date = "Hour must be between 1 and 12";
    } else if (minuteNum < 0 || minuteNum > 59) {
      next.due_date = "Minutes must be between 00 and 59";
    }
  }

  setErrors(next);
  return Object.keys(next).length === 0;
};

  const normalizeTimeSegment = (rawValue, maxValue) => {
    let value = rawValue.replace(/[^0-9]/g, '');
    if (value.length > 2) value = value.slice(-2);
    if (value === '') return '';
    if (value.length === 1) return `0${value}`;
    if (Number(value) > maxValue) {
      return String(maxValue).padStart(2, '0');
    }
    return value;
  };

  const handleHourChange = (e) => {
  let value = e.target.value.replace(/\D/g, "");

  // Allow clearing the field
  if (value === "") {
    setHour("");
    return;
  }

  // Max 2 digits
  if (value.length > 2) {
    return;
  }

  const num = Number(value);

  // Prevent values outside 1-12
  if (num < 1 || num > 12) {
    return;
  }

  setHour(value);
};

  const handleMinuteChange = (e) => {
  let value = e.target.value.replace(/\D/g, "");

  // Allow clearing the field
  if (value === "") {
    setMinute("");
    return;
  }

  // Max 2 digits
  if (value.length > 2) {
    return;
  }

  const num = Number(value);

  // Prevent values outside 0-59
  if (num < 0 || num > 59) {
    return;
  }

  setMinute(value);
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const finalDueDate = buildDateTimeValue(
    dueDate,
    hour,
    minute,
    ampm
  );

  await onSubmit({
    title: form.title.trim(),
    description: form.description.trim() || null,
    due_date: fromDateTimeInputValue(finalDueDate),
    priority: form.priority,
    status: form.status,
  });
};

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <div
        className="animate-scale-in w-full max-w-[30rem] rounded-t-3xl bg-surface-card shadow-card sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-3 py-3 sm:px-4">
          <div>
            <h2 id="task-form-title" className="text-xl font-bold tracking-tight text-text-primary">
              {isEdit ? 'Edit Task' : 'Create Task'}
            </h2>
            <p className="mt-0.5 text-sm text-text-secondary">
              {isEdit ? 'Update your task details' : 'Add a new task to your list'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost !rounded-xl !p-2"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="space-y-2 p-3 sm:p-4"
          > 
          <div>
            <label htmlFor="title" className="label">
              Title <span className="text-danger">*</span>
            </label>
            <input
              id="title"
              autoComplete="off"
              name="title"
              className="input !py-2"
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              autoFocus
            />
            {errors.title && <p className="mt-1.5 text-xs text-danger">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              id="description"
              autoComplete="off"
              name="description"
              rows={2}
              className="input resize-none !py-2"
              value={form.description}
              onChange={handleChange}
              placeholder="Add optional details..."
            />
          </div>

          <div className="flex-1">
            <label htmlFor="due_date" className="label">
              Due Date & Time <span className="text-danger">*</span>
            </label>
            <div className="space-y-2 rounded-xl border border-border bg-surface-elevated/50 p-2.5">
              <div className="flex items-center gap-4">
                <div>
                  
                  <input
                    id="due_date_date"
                    autoComplete="off"
                    name="due_date_date"
                    type="date"
                    className="input !py-2"
                    value={dueDate}
                    onChange={handleDueDateChange}
                  />
                </div>

                <div>
                  
                  <div className="mt-1 flex items-center gap-3">
                    <input
                      id="due_date_hours"
                      autoComplete="off"
                      name="hour"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={2}
                      aria-label="Hours"
                      className="input flex-1 text-center !py-2"
                      value={hour}
                      placeholder="00"
                      onChange={handleHourChange}
                    />
                    <span className="text-xl font-medium text-text-muted leading-none">:</span>
                    <input
                      id="due_date_minutes"
                      autoComplete="off"
                      name="minute"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={2}
                      aria-label="Minutes"
                      className="input flex-1 text-center !py-2"
                      value={minute}
                      placeholder="00"
                      onChange={handleMinuteChange}
                    />
                    <div className="relative">
  <select
    id="due_date_ampm"
    name="ampm"
    className="input flex-1 appearance-none cursor-pointer text-center pr-8 !py-2"
    value={ampm}
    onChange={handleDueTimeChange}
  >
    <option value="AM">AM</option>
    <option value="PM">PM</option>
  </select>

  <svg
    className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 9l-7 7-7-7"
    />
  </svg>
</div>
                  </div>
                </div>
              </div>
            </div>
            {errors.due_date && <p className="mt-1.5 text-xs text-danger">{errors.due_date}</p>}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="priority" className="label">
                Priority
              </label>
              <div className="relative">
                <select
                  id="priority"
                  name="priority"
                  className="input !cursor-pointer appearance-none pr-10 !py-2"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="status" className="label">
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  className="input !cursor-pointer appearance-none pr-10 !py-2"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-border pt-2.5">
            <button type="button" onClick={onClose} className="btn-secondary !px-3 !py-2.5" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn-primary !px-3 !py-2.5" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Saving...
                </>
              ) : isEdit ? (
                'Save Changes'
              ) : (
                'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
