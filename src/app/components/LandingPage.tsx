import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, TrendingUp, Languages, ArrowRight, Zap, Globe, Menu, X, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function SafeImage({ src, alt }) {
  const [error, setError] = useState(false);
  return error ? (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 dark:bg-[#1a1a3a] rounded-2xl">
      <Globe className="w-12 h-12 text-gray-400 dark:text-[#00d9ff]/50 mb-3" />
      <span className="text-gray-500 dark:text-[#9ca3af] text-sm text-center px-4 font-medium" style={{ fontFamily: 'var(--font-body)' }}>{alt}</span>
    </div>
  ) : (
    <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover rounded-2xl" onError={() => setError(true)} />
  );
}

const showcaseImages = [
  { src: "/images/tuntrust.jpg", alt: "Tuntrust Infrastructure" },
  { src: "/images/security.jpg", alt: "Sécurité Numérique" },
  { src: "/images/certificat.jpg", alt: "Certification Électronique" },
  { src: "/images/signature.jpg", alt: "Signature Électronique" },
  { src: "/images/pki.jpg", alt: "PKI Infrastructure" },
  { src: "/images/partenaires.jpg", alt: "Tuntrust Partenaires" }
];

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false); // <-- AJOUTÉ
  
  const maxSlide = showcaseImages.length - 3;

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  const languages = [
    { code: 'fr', name: 'FR', flag: '🇫🇷' },
    { code: 'ar', name: 'AR', flag: '🇸🇦' },
    { code: 'darija', name: 'MA', flag: '🇲🇦' }
  ];

  const features = [
    { icon: Brain, title: t('features.multiAgent.title'), description: t('features.multiAgent.description'), color: 'from-[#00d9ff] to-[#8b5cf6]', iconColor: '#00d9ff' },
    { icon: TrendingUp, title: t('features.analytics.title'), description: t('features.analytics.description'), color: 'from-[#8b5cf6] to-[#fbbf24]', iconColor: '#8b5cf6' },
    { icon: Zap, title: t('features.optimization.title'), description: t('features.optimization.description'), color: 'from-[#fbbf24] to-[#10b981]', iconColor: '#fbbf24' },
    { icon: Languages, title: t('features.multilingual.title'), description: t('features.multilingual.description'), color: 'from-[#10b981] to-[#00d9ff]', iconColor: '#10b981' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-[#0a0a1a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-[#00d9ff]/20 bg-white/80 dark:bg-[#0a0a1a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 cursor-pointer">
              <Sparkles className="w-6 h-6 text-cyan-600 dark:text-[#00d9ff]" />
              <span className="text-2xl tracking-tight" style={{ fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Harmony AI</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-800 dark:text-[#e8e9f3] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{t('featuresNav')}</button>
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-800 dark:text-[#e8e9f3] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{t('about')}</button>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-[#0f0f23]/60 border border-gray-200 dark:border-[#00d9ff]/20">
                  {languages.map((lang) => (
                    <button key={lang.code} onClick={() => i18n.changeLanguage(lang.code)} className={`px-3 py-1 rounded-lg text-sm transition-all ${i18n.language === lang.code ? 'bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-[#00d9ff] dark:to-[#8b5cf6] text-white dark:text-[#0a0a1a]' : 'text-gray-500 dark:text-[#9ca3af] hover:text-gray-800 dark:hover:text-[#e8e9f3]'}`} style={{ fontFamily: 'var(--font-body)' }}>{lang.flag}</button>
                  ))}
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/login')} className="px-6 py-2 rounded-xl border border-cyan-600 dark:border-[#00d9ff]/30 text-cyan-600 dark:text-[#00d9ff] hover:bg-cyan-50 dark:hover:bg-[#00d9ff]/10 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{t('login')}</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/register')} className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-[#00d9ff] dark:to-[#8b5cf6] text-white dark:text-[#0a0a1a] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{t('register')}</motion.button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-cyan-600 dark:text-[#00d9ff]">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden mt-4 pb-4 space-y-4">
              <button onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-800 dark:text-[#e8e9f3] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{t('featuresNav')}</button>
              <div className="flex gap-2">
                <button onClick={() => navigate('/login')} className="flex-1 px-4 py-2 rounded-xl border border-cyan-600 dark:border-[#00d9ff]/30 text-cyan-600 dark:text-[#00d9ff] text-center">{t('login')}</button>
                <button onClick={() => navigate('/register')} className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-[#00d9ff] dark:to-[#8b5cf6] text-white dark:text-[#0a0a1a] font-semibold text-center">{t('register')}</button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-white dark:bg-[#0a0a1a]" />
        <div className="absolute inset-0 opacity-0 dark:opacity-50" style={{ background: 'var(--gradient-mesh)' }} />
        <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{ backgroundImage: `linear-gradient(rgba(8, 145, 178, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(8, 145, 178, 0.3) 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
        <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-0 dark:opacity-30" style={{ background: 'radial-gradient(circle, #00d9ff 0%, transparent 70%)' }} animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-0 dark:opacity-30" style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-200 dark:border-[#00d9ff]/30 bg-cyan-50 dark:bg-[#00d9ff]/5 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-[#00d9ff]" />
                <span className="text-cyan-600 dark:text-[#00d9ff] text-sm tracking-wide">HARMONY AI plateform liée à TUNTRUST L'agence nationale de certification électronique </span>
              </div>
              <h1 className="text-7xl md:text-9xl mb-6 tracking-tight" style={{ fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 50%, #d97706 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t('hero.title')}</h1>
              <p className="text-2xl md:text-3xl text-gray-800 dark:text-[#e8e9f3] mb-4" style={{ fontFamily: 'var(--font-body)' }}>{t('hero.subtitle')}</p>
              <p className="text-lg md:text-xl text-gray-600 dark:text-[#9ca3af] max-w-3xl mx-auto mb-12" style={{ fontFamily: 'var(--font-body)' }}>{t('hero.description')}</p>
              <div className="flex items-center justify-center gap-6">
                <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(8, 145, 178, 0.5)' }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/register')} className="group px-8 py-4 rounded-xl text-lg font-semibold relative overflow-hidden" style={{ fontFamily: 'var(--font-body)', background: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)', color: '#ffffff' }}>
                  <span className="relative z-10 flex items-center gap-2">{t('hero.cta')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                </motion.button>
                
                {/* BOUTON MODIFIÉ POUR LA VIDÉO */}
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.98 }} 
                  onClick={() => setIsVideoOpen(true)} 
                  className="px-8 py-4 rounded-xl text-lg font-semibold border-2 border-cyan-600 dark:border-[#00d9ff] text-cyan-600 dark:text-[#00d9ff] hover:bg-cyan-50 dark:hover:bg-[#00d9ff]/10 transition-colors flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('hero.demo')}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Professionnelles */}
        <section id="features" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #0891b2 0%, #d97706 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t('featuresNav')}</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative p-8 md:p-10 rounded-3xl border border-gray-200/50 dark:border-white/[0.08] bg-white/80 dark:bg-[#0f0f23]/80 backdrop-blur-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 dark:hover:shadow-[#00d9ff]/5"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl scale-110" style={{ background: `linear-gradient(135deg, ${feature.color.replace('from-', '').replace('to-', ', ')})`, filter: 'blur(60px)' }} />
                  <div className="absolute top-6 right-8 text-7xl font-black text-gray-100 dark:text-white/[0.03] select-none pointer-events-none" style={{ fontFamily: 'var(--font-display)', lineHeight: 1 }}>0{index + 1}</div>
                  <div className="relative z-10">
                    <div className="relative w-14 h-14 mb-8 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-10 group-hover:opacity-20 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${feature.color.replace('from-', '').replace('to-', ', ')})` }} />
                      <feature.icon className="relative z-10 w-7 h-7 transition-transform duration-500 group-hover:scale-110" style={{ color: feature.iconColor }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>{feature.title}</h3>
                    <p className="text-gray-500 dark:text-[#8b8ba7] leading-relaxed text-[15px] mb-6" style={{ fontFamily: 'var(--font-body)' }}>{feature.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-300 dark:text-[#4b5563] group-hover:text-gray-700 dark:group-hover:text-[#e8e9f3] transition-colors duration-300">
                      <span style={{ fontFamily: 'var(--font-body)' }}>En savoir plus</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Slideshow 3 Images */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Sécurité & Confiance Numérique</h2>
              <p className="text-lg text-gray-600 dark:text-[#9ca3af] max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>Notre infrastructure certifiée protège les transactions les plus critiques</p>
            </motion.div>

            <div className="relative flex items-center">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevSlide} disabled={currentSlide === 0} className="absolute left-0 -translate-x-1/2 z-20 p-3 rounded-full bg-white dark:bg-[#0a0a1a] border border-gray-200 dark:border-[#00d9ff]/20 shadow-xl hover:border-cyan-500 dark:hover:border-[#00d9ff] transition-colors text-gray-700 dark:text-[#e8e9f3] disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <div className="w-full overflow-hidden rounded-3xl">
                <motion.div 
                  className="flex"
                  animate={{ x: `-${currentSlide * 33.333}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {showcaseImages.map((img, index) => (
                    <div key={index} className="w-1/3 flex-shrink-0 p-2 md:p-4">
                      <div className="relative h-[350px] rounded-2xl overflow-hidden border border-gray-200 dark:border-[#00d9ff]/20 shadow-lg group">
                        <SafeImage src={img.src} alt={img.alt} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <p className="text-white text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{img.alt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextSlide} disabled={currentSlide === maxSlide} className="absolute right-0 translate-x-1/2 z-20 p-3 rounded-full bg-white dark:bg-[#0a0a1a] border border-gray-200 dark:border-[#00d9ff]/20 shadow-xl hover:border-cyan-500 dark:hover:border-[#00d9ff] transition-colors text-gray-700 dark:text-[#e8e9f3] disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`transition-all duration-300 rounded-full ${currentSlide === index ? 'w-8 h-3 bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-[#00d9ff] dark:to-[#8b5cf6]' : 'w-3 h-3 bg-gray-300 dark:bg-[#3a3a5a] hover:bg-gray-400 dark:hover:bg-[#4a4a6a]'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="about" className="py-32 px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto relative p-12 rounded-3xl border border-gray-200 dark:border-[#00d9ff]/30 bg-gray-50 dark:bg-gradient-to-br dark:from-[#0f0f23]/80 dark:to-[#0f0f23]/40 backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 opacity-0 dark:opacity-20 blur-3xl" style={{ background: 'var(--gradient-1)' }} />
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #0891b2 0%, #d97706 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Prêt à Transformer Vos Données?</h2>
              <p className="text-xl text-gray-600 dark:text-[#9ca3af] mb-10 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>Rejoignez les entreprises qui optimisent leurs opérations avec Harmony AI</p>
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(8, 145, 178, 0.6)' }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/register')} className="px-10 py-5 rounded-xl text-xl font-bold" style={{ fontFamily: 'var(--font-body)', background: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)', color: '#ffffff' }}>Commencer Gratuitement</motion.button>
            </div>
          </motion.div>
        </section>

        {/* Footer Professionnel */}
        <footer className="border-t border-gray-200 dark:border-[#00d9ff]/20 pt-16 pb-8 px-6 bg-gray-50 dark:bg-[#060615]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-cyan-600 dark:text-[#00d9ff]" />
                  <span className="text-2xl tracking-tight" style={{ fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Harmony AI</span>
                </div>
                <p className="text-gray-600 dark:text-[#9ca3af] max-w-sm mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  Plateforme d'optimisation intelligente et autonome pour Tuntrust. Transformez vos données en décisions stratégiques.
                </p>
                <div className="space-y-4">
                  <a href="tel:+21670834600" className="flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#0f0f23] border border-gray-200 dark:border-[#00d9ff]/10 group-hover:border-cyan-500 dark:group-hover:border-[#00d9ff]/50 transition-colors">
                      <Phone className="w-4 h-4 text-gray-500 dark:text-[#9ca3af] group-hover:text-cyan-600 dark:group-hover:text-[#00d9ff] transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-[#e8e9f3]" style={{ fontFamily: 'var(--font-body)' }}>Téléphone</p>
                      <p className="text-sm text-gray-500 dark:text-[#6b7280]" style={{ fontFamily: 'var(--font-body)' }}>70 834 600</p>
                    </div>
                  </a>
                  <a href="mailto:tuntrust@tuntrust.tn" className="flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#0f0f23] border border-gray-200 dark:border-[#00d9ff]/10 group-hover:border-cyan-500 dark:group-hover:border-[#00d9ff]/50 transition-colors">
                      <Mail className="w-4 h-4 text-gray-500 dark:text-[#9ca3af] group-hover:text-cyan-600 dark:group-hover:text-[#00d9ff] transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-[#e8e9f3]" style={{ fontFamily: 'var(--font-body)' }}>Adresse e-mail</p>
                      <p className="text-sm text-gray-500 dark:text-[#6b7280]" style={{ fontFamily: 'var(--font-body)' }}>tuntrust@tuntrust.tn</p>
                    </div>
                  </a>
                  <a href="https://www.messenger.com/t/" target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#0f0f23] border border-gray-200 dark:border-[#00d9ff]/10 group-hover:border-cyan-500 dark:group-hover:border-[#00d9ff]/50 transition-colors">
                      <MessageCircle className="w-4 h-4 text-gray-500 dark:text-[#9ca3af] group-hover:text-cyan-600 dark:group-hover:text-[#00d9ff] transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-[#e8e9f3]" style={{ fontFamily: 'var(--font-body)' }}>Messenger</p>
                      <p className="text-xs text-gray-500 dark:text-[#6b7280] leading-tight" style={{ fontFamily: 'var(--font-body)' }}>Agence nationale de certification électronique</p>
                    </div>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-[#e8e9f3] font-semibold mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-body)' }}><div className="w-2 h-2 rounded-full bg-cyan-500"></div>Produit</h4>
                <ul className="space-y-4">
                  <li><button className="text-gray-600 dark:text-[#9ca3af] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors text-left" style={{ fontFamily: 'var(--font-body)' }}><span className="font-medium block">Fonctionnalités</span><span className="text-xs text-gray-400 dark:text-[#6b7280] block mt-0.5">Découvrir nos outils IA</span></button></li>
                  <li><button className="text-gray-600 dark:text-[#9ca3af] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors text-left" style={{ fontFamily: 'var(--font-body)' }}><span className="font-medium block">Tarifs</span><span className="text-xs text-gray-400 dark:text-[#6b7280] block mt-0.5">Plans adaptés à vos besoins</span></button></li>
                  <li><button className="text-gray-600 dark:text-[#9ca3af] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors text-left" style={{ fontFamily: 'var(--font-body)' }}><span className="font-medium block">Documentation</span><span className="text-xs text-gray-400 dark:text-[#6b7280] block mt-0.5">Guides techniques détaillés</span></button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-[#e8e9f3] font-semibold mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-body)' }}><div className="w-2 h-2 rounded-full bg-purple-500"></div>Support</h4>
                <ul className="space-y-4">
                  <li><button className="text-gray-600 dark:text-[#9ca3af] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors text-left" style={{ fontFamily: 'var(--font-body)' }}><span className="font-medium block">FAQ</span><span className="text-xs text-gray-400 dark:text-[#6b7280] block mt-0.5">Réponses aux questions fréquentes</span></button></li>
                  <li><button className="text-gray-600 dark:text-[#9ca3af] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors text-left" style={{ fontFamily: 'var(--font-body)' }}><span className="font-medium block">Support Technique</span><span className="text-xs text-gray-400 dark:text-[#6b7280] block mt-0.5">Assistance dédiée 24/7</span></button></li>
                  <li><button className="text-gray-600 dark:text-[#9ca3af] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors text-left" style={{ fontFamily: 'var(--font-body)' }}><span className="font-medium block">Statut des services</span><span className="text-xs text-gray-400 dark:text-[#6b7280] block mt-0.5">Vérifier la disponibilité</span></button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-[#e8e9f3] font-semibold mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-body)' }}><div className="w-2 h-2 rounded-full bg-amber-500"></div>Légal</h4>
                <ul className="space-y-4">
                  <li><button className="text-gray-600 dark:text-[#9ca3af] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors text-left" style={{ fontFamily: 'var(--font-body)' }}><span className="font-medium block">Confidentialité</span><span className="text-xs text-gray-400 dark:text-[#6b7280] block mt-0.5">Protection de vos données</span></button></li>
                  <li><button className="text-gray-600 dark:text-[#9ca3af] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors text-left" style={{ fontFamily: 'var(--font-body)' }}><span className="font-medium block">Conditions d'utilisation</span><span className="text-xs text-gray-400 dark:text-[#6b7280] block mt-0.5">Nos règles d'engagement</span></button></li>
                  <li><button className="text-gray-600 dark:text-[#9ca3af] hover:text-cyan-600 dark:hover:text-[#00d9ff] transition-colors text-left" style={{ fontFamily: 'var(--font-body)' }}><span className="font-medium block">Cookies</span><span className="text-xs text-gray-400 dark:text-[#6b7280] block mt-0.5">Gestion des préférences</span></button></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-200 dark:border-[#00d9ff]/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 dark:text-[#6b7280] text-sm" style={{ fontFamily: 'var(--font-body)' }}>© 2026 Harmony AI pour Tuntrust. Tous droits réservés.</p>
              <p className="text-gray-400 dark:text-[#4b5563] text-xs" style={{ fontFamily: 'var(--font-body)' }}>Conçu en Tunisie 🇹🇳 pour la certification électronique</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal Vidéo Professionnelle */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-gray-700"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Fermer <X className="w-5 h-5" />
              </button>

              <div className="aspect-video w-full">
              
                <video 
                  className="w-full h-full"
                  autoPlay
                  muted
                  controls
                  src="/videos/demo.mp4"
                />
              
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}