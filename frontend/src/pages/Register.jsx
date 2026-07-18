import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import AuthLayout, { AuthFooterLink, PasswordInput } from '../components/AuthLayout';
import { Spinner } from '../components/ui';

export default function Register() {
  const { register, isAuthenticated, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) {
      next.confirmPassword = 'Passwords do not match';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      addToast('Registration successful');
      navigate('/dashboard');
    } catch (err) {
      const detail = err.response?.data?.detail;
      let message = 'Registration failed';
      if (typeof detail === 'string') message = detail;
      else if (Array.isArray(detail)) message = detail.map((d) => d.msg).join(', ');
      addToast(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join TaskFlow and organize your work">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="label">
            Full name
          </label>
          <input
            id="name"
            name="name"
            className="input"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Doe"
          />
          {errors.name && <p className="mt-1.5 text-xs text-danger">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="input"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-danger">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Min. 6 characters"
            error={errors.password}
            autoComplete="new-password"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="label">
            Confirm password
          </label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat your password"
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="btn-primary w-full !py-3" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner className="h-4 w-4" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>

        <AuthFooterLink text="Already have an account?" linkText="Sign in" to="/login" />
      </form>
    </AuthLayout>
  );
}
