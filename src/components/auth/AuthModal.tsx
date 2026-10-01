import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Dumbbell, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode,
    login,
    signup,
    loginWithGoogle
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (authModalMode === 'login') {
        const res = await login(email, password, rememberMe);
        if (!res.success) {
          setErrorMessage(res.error || 'Login failed.');
        }
      } else if (authModalMode === 'signup') {
        const res = await signup(name, email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Signup failed.');
        }
      } else if (authModalMode === 'forgot') {
        if (!email) {
          setErrorMessage('Please enter your email address.');
        } else {
          setResetSent(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Splash Brand Header */}
        <div className="relative bg-gradient-to-br from-emerald-600 to-teal-800 px-6 py-8 text-center text-white">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-3 shadow-inner">
            <Dumbbell className="w-7 h-7 text-white stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight font-['Outfit']">FitLife</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-xs mx-auto">
            Your personalized mobile fitness & wellness sanctuary
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {resetSent ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Password Reset Link Sent</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                We have sent instructions to <strong className="text-slate-700 dark:text-slate-300">{email}</strong> to reset your password.
              </p>
              <button
                onClick={() => { setResetSent(false); setAuthModalMode('login'); }}
                className="mt-5 w-full py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              {/* Mode Tabs */}
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => { setAuthModalMode('login'); setErrorMessage(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    authModalMode === 'login'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthModalMode('signup'); setErrorMessage(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    authModalMode === 'signup'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {authModalMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dhruv Sharma"
                        required
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dhruvva75@gmail.com"
                      required
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {authModalMode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      {authModalMode === 'login' && (
                        <button
                          type="button"
                          onClick={() => { setAuthModalMode('forgot'); setErrorMessage(''); }}
                          className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-9 pr-9 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {authModalMode === 'login' && (
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-400">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                      />
                      <span>Remember me</span>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>
                    {authModalMode === 'login' ? 'Sign In' : authModalMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                  <span className="bg-white dark:bg-slate-900 px-3 text-slate-400">or continue with</span>
                </div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2.5 px-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
