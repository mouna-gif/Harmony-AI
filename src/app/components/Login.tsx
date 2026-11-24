import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'; // Ajout de ArrowLeft
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../api/config';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await api.auth.login(formData.email, formData.password);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      toast.success(data.message || t('auth.loginSuccess'));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[#9ca3af] hover:text-[#00d9ff] transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>
          Retour à l'accueil
        </span>
      </button>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a1a]" />
        <div className="absolute inset-0 opacity-50" style={{ background: 'var(--gradient-mesh)' }} />

        <motion.div
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #00d9ff 0%, transparent 70%)' }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="p-8 rounded-3xl border border-[#00d9ff]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/70 backdrop-blur-xl">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-[#00d9ff]" />
              <h1
                className="text-4xl tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: 'linear-gradient(135deg, #00d9ff 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Harmony AI
              </h1>
            </div>
            <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>
              {t('auth.login')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                className="block text-sm mb-2 text-[#e8e9f3]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('auth.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00d9ff]/60" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#9ca3af]/50 focus:border-[#00d9ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/20 transition-all"
                  style={{ fontFamily: 'var(--font-body)' }}
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm mb-2 text-[#e8e9f3]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('auth.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00d9ff]/60" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#9ca3af]/50 focus:border-[#00d9ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/20 transition-all"
                  style={{ fontFamily: 'var(--font-body)' }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#00d9ff] hover:text-[#00d9ff]/80 transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('auth.forgotPassword')}
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl font-semibold text-[#0a0a1a] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'var(--font-body)',
                background: 'linear-gradient(135deg, #00d9ff 0%, #8b5cf6 100%)'
              }}
            >
              {loading ? (
                t('loading')
              ) : (
                <>
                  {t('auth.login')}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>
              {t('auth.noAccount')}{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-[#00d9ff] hover:text-[#00d9ff]/80 font-semibold transition-colors"
              >
                {t('auth.register')}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}