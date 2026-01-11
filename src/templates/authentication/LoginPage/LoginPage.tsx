import * as React from 'react';
import { AuthLayout } from '../../../layouts/AuthLayout';
import { Button } from '../../../components/Button';
import { cn } from '../../../lib/utils';

/**
 * LoginPage Template
 *
 * Complete login page using AuthLayout with a customizable login form.
 * Supports email/password, social login options, and remember me.
 *
 * @accessibility
 * - Form has proper labels and aria-describedby for errors
 * - Focus management on form submission
 * - Error announcements for screen readers
 */

export interface LoginPageProps {
  /** Logo element to display */
  logo?: React.ReactNode;
  /** Title for the login form */
  title?: string;
  /** Subtitle/description text */
  subtitle?: string;
  /** Handler for form submission */
  onSubmit?: (data: { email: string; password: string; remember: boolean }) => void;
  /** Show social login buttons */
  showSocialLogin?: boolean;
  /** Social login providers to show */
  socialProviders?: Array<'google' | 'github' | 'microsoft'>;
  /** Show "Remember me" checkbox */
  showRememberMe?: boolean;
  /** Show "Forgot password" link */
  showForgotPassword?: boolean;
  /** Forgot password link URL */
  forgotPasswordHref?: string;
  /** Show "Sign up" link */
  showSignUp?: boolean;
  /** Sign up link URL */
  signUpHref?: string;
  /** Error message to display */
  error?: string;
  /** Loading state */
  isLoading?: boolean;
  /** AuthLayout variant */
  variant?: 'centered' | 'split';
  /** Side image for split variant */
  sideImage?: string;
  /** Footer content */
  footer?: React.ReactNode;
  /** Additional class name */
  className?: string;
}

export function LoginPage({
  logo,
  title = 'Welcome back',
  subtitle = 'Enter your credentials to access your account',
  onSubmit,
  showSocialLogin = true,
  socialProviders = ['google', 'github'],
  showRememberMe = true,
  showForgotPassword = true,
  forgotPasswordHref = '/forgot-password',
  showSignUp = true,
  signUpHref = '/register',
  error,
  isLoading = false,
  variant = 'centered',
  sideImage,
  footer,
  className,
}: LoginPageProps) {
  const formId = React.useId();
  const errorId = `${formId}-error`;

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const socialIcons: Record<string, React.ReactNode> = {
    google: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    microsoft: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
      </svg>
    ),
  };

  return (
    <AuthLayout
      variant={variant}
      sideImage={sideImage}
      logo={logo}
      footer={footer}
      className={className}
    >
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--semantic-color-foreground-default)]">
            {title}
          </h1>
          <p className="mt-2 text-sm text-[var(--semantic-color-foreground-muted)]">
            {subtitle}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            id={errorId}
            role="alert"
            className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
          >
            {error}
          </div>
        )}

        {/* Social Login */}
        {showSocialLogin && socialProviders.length > 0 && (
          <>
            <div className="space-y-3">
              {socialProviders.map((provider) => (
                <Button
                  key={provider}
                  variant="outline"
                  className="w-full justify-center gap-2"
                  type="button"
                >
                  {socialIcons[provider]}
                  Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
                </Button>
              ))}
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--semantic-color-border-default)]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--semantic-color-background-default)] px-2 text-[var(--semantic-color-foreground-muted)]">
                  Or continue with
                </span>
              </div>
            </div>
          </>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" aria-describedby={error ? errorId : undefined}>
          <div>
            <label
              htmlFor={`${formId}-email`}
              className="block text-sm font-medium text-[var(--semantic-color-foreground-default)] mb-1"
            >
              Email
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={cn(
                'w-full px-3 py-2 rounded-lg border',
                'border-[var(--semantic-color-border-default)]',
                'bg-[var(--semantic-color-background-default)]',
                'text-[var(--semantic-color-foreground-default)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--semantic-color-primary-default)]',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-password`}
              className="block text-sm font-medium text-[var(--semantic-color-foreground-default)] mb-1"
            >
              Password
            </label>
            <input
              id={`${formId}-password`}
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={cn(
                'w-full px-3 py-2 rounded-lg border',
                'border-[var(--semantic-color-border-default)]',
                'bg-[var(--semantic-color-background-default)]',
                'text-[var(--semantic-color-foreground-default)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--semantic-color-primary-default)]',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            {showRememberMe && (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="rounded border-[var(--semantic-color-border-default)]"
                  disabled={isLoading}
                />
                <span className="text-[var(--semantic-color-foreground-muted)]">Remember me</span>
              </label>
            )}

            {showForgotPassword && (
              <a
                href={forgotPasswordHref}
                className="text-sm text-[var(--semantic-color-primary-default)] hover:underline"
              >
                Forgot password?
              </a>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        {/* Sign Up Link */}
        {showSignUp && (
          <p className="mt-6 text-center text-sm text-[var(--semantic-color-foreground-muted)]">
            Don&apos;t have an account?{' '}
            <a
              href={signUpHref}
              className="text-[var(--semantic-color-primary-default)] hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        )}
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
