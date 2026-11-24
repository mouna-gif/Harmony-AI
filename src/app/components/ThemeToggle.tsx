import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  // Initialiser le thème au chargement
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    
    if (savedTheme === 'light') {
      html.classList.add('light');
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      html.classList.remove('light');
      setIsDark(true);
    }
  }, []);

  // Basculer le thème
  const toggleTheme = () => {
    const html = document.documentElement;
    const newIsDark = !isDark;
    
    setIsDark(newIsDark);
    
    if (newIsDark) {
      html.classList.remove('light');
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-300"
      style={{
        backgroundColor: isDark ? 'rgba(15, 15, 35, 0.6)' : 'rgba(237, 232, 245, 0.7)',
        border: isDark ? '1px solid rgba(0, 217, 255, 0.2)' : '1px solid rgba(107, 70, 193, 0.25)',
      }}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 360 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="flex items-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-[#fbbf24]" />
        ) : (
          <Moon className="w-4 h-4 text-[#6b46c1]" />
        )}
      </motion.div>

      <span className="text-xs font-semibold" style={{
        color: isDark ? '#e8e9f3' : '#1a1a2e',
        fontFamily: 'var(--font-body)'
      }}>
        {isDark ? 'Mode Sombre' : 'Mode Clair'}
      </span>

      {isDark && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.15)' }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}