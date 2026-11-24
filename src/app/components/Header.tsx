import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Globe, LogOut, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'darija', name: 'الدارجة', flag: '🇲🇦' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Déconnexion réussie');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#00d9ff]/20 bg-[#0a0a1a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-6 h-6 text-[#00d9ff]" />
          <span
            className="text-2xl tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, #00d9ff 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Harmony AI
          </span>
        </motion.button>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Selector */}
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#00d9ff]/20 bg-[#0f0f23]/60 hover:bg-[#0f0f23]/80 transition-colors"
            >
              <Globe className="w-5 h-5 text-[#00d9ff]" />
              <span className="text-[#e8e9f3]" style={{ fontFamily: 'var(--font-body)' }}>
                {languages.find(l => l.code === i18n.language)?.flag}
              </span>
            </motion.button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2 rounded-xl border border-[#00d9ff]/20 bg-[#0f0f23]/95 backdrop-blur-xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-[#00d9ff]/20 text-[#00d9ff]'
                        : 'text-[#e8e9f3] hover:bg-[#00d9ff]/10'
                    }`}
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#ef4444]/30 bg-[#ef4444]/10 hover:bg-[#ef4444]/20 text-[#ef4444] transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <LogOut className="w-5 h-5" />
            <span>{t('logout')}</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
