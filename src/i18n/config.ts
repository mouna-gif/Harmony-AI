import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      // Navigation
      home: 'Accueil',
      featuresNav: 'Fonctionnalités',
      about: 'À Propos',
      login: 'Connexion',
      register: "S'inscrire",
      logout: 'Déconnexion',

      // Landing Page
      hero: {
        title: 'Harmony AI',
        subtitle: 'Plateforme d\'Optimisation Intelligente et Autonome',
        description: 'Transformez vos données en décisions stratégiques avec notre système multi-agents alimenté par l\'IA',
        cta: 'Commencer Maintenant',
        demo: 'Voir la Démo',
      },

      // Features
      features: {
        multiAgent: {
          title: 'Système Multi-Agents',
          description: 'Quatre agents IA spécialisés travaillant en synergie pour optimiser vos processus'
        },
        analytics: {
          title: 'Analyses Prédictives',
          description: 'Anticipez les tendances et prenez des décisions basées sur des données précises'
        },
        optimization: {
          title: 'Optimisation Mathématique',
          description: 'Allocation optimale des ressources via des algorithmes avancés'
        },
        multilingual: {
          title: 'Support Multilingue',
          description: 'Interface et agents en Français, Arabe et Darija'
        }
      },

      // Auth
      auth: {
        email: 'Email',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        fullName: 'Nom complet',
        company: 'Entreprise',
        login: 'Se connecter',
        register: "S'inscrire",
        forgotPassword: 'Mot de passe oublié?',
        noAccount: 'Pas de compte?',
        hasAccount: 'Déjà un compte?',
        loginSuccess: 'Connexion réussie',
        registerSuccess: 'Inscription réussie',
      },

      // Dashboard
      dashboard: {
        welcome: 'Bienvenue',
        overview: 'Vue d\'ensemble',
        agents: 'Agents',
        analytics: 'Analyses',
        monitoring: 'Monitoring',
        settings: 'Paramètres',
      },

      // Agents
      agents: {
        analyst: {
          name: 'Analyste',
          description: 'Analyse les données historiques et identifie les tendances'
        },
        predictor: {
          name: 'Prédicteur',
          description: 'Prédit les événements futurs avec précision'
        },
        optimizer: {
          name: 'Optimiseur',
          description: 'Optimise l\'allocation des ressources'
        },
        critic: {
          name: 'Critique',
          description: 'Évalue et améliore les recommandations'
        }
      },

      // Common
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      delete: 'Supprimer',
    }
  },
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      featuresNav: 'المميزات',
      about: 'عن المنصة',
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      logout: 'تسجيل الخروج',

      // Landing Page
      hero: {
        title: 'هارموني AI',
        subtitle: 'منصة التحسين الذكي والمستقل',
        description: 'حول بياناتك إلى قرارات استراتيجية مع نظام الوكلاء المتعددين المدعوم بالذكاء الاصطناعي',
        cta: 'ابدأ الآن',
        demo: 'شاهد العرض التوضيحي',
      },

      // Features
      features: {
        multiAgent: {
          title: 'نظام الوكلاء المتعددين',
          description: 'أربعة وكلاء ذكاء اصطناعي متخصصين يعملون بتآزر لتحسين عملياتك'
        },
        analytics: {
          title: 'التحليلات التنبؤية',
          description: 'توقع الاتجاهات واتخذ قرارات مبنية على بيانات دقيقة'
        },
        optimization: {
          title: 'التحسين الرياضي',
          description: 'توزيع أمثل للموارد عبر خوارزميات متقدمة'
        },
        multilingual: {
          title: 'دعم متعدد اللغات',
          description: 'الواجهة والوكلاء بالفرنسية والعربية والدارجة'
        }
      },

      // Auth
      auth: {
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور',
        fullName: 'الاسم الكامل',
        company: 'الشركة',
        login: 'تسجيل الدخول',
        register: 'التسجيل',
        forgotPassword: 'نسيت كلمة المرور؟',
        noAccount: 'ليس لديك حساب؟',
        hasAccount: 'لديك حساب بالفعل؟',
        loginSuccess: 'تم تسجيل الدخول بنجاح',
        registerSuccess: 'تم التسجيل بنجاح',
      },

      // Dashboard
      dashboard: {
        welcome: 'مرحبا',
        overview: 'نظرة عامة',
        agents: 'الوكلاء',
        analytics: 'التحليلات',
        monitoring: 'المراقبة',
        settings: 'الإعدادات',
      },

      // Agents
      agents: {
        analyst: {
          name: 'المحلل',
          description: 'يحلل البيانات التاريخية ويحدد الاتجاهات'
        },
        predictor: {
          name: 'المتنبئ',
          description: 'يتنبأ بالأحداث المستقبلية بدقة'
        },
        optimizer: {
          name: 'المحسن',
          description: 'يحسن توزيع الموارد'
        },
        critic: {
          name: 'الناقد',
          description: 'يقيم ويحسن التوصيات'
        }
      },

      // Common
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجاح',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      save: 'حفظ',
      delete: 'حذف',
    }
  },
  darija: {
    translation: {
      // Navigation
      home: 'الداخل',
      featuresNav: 'الميزات',
      about: 'علينا',
      login: 'دخول',
      register: 'تسجيل',
      logout: 'خروج',

      // Landing Page
      hero: {
        title: 'هارموني AI',
        subtitle: 'منصة التحسين الذكي',
        description: 'بدل الداطا ديالك لقرارات استراتيجية بنظام الوكلاء المتعددين',
        cta: 'ابدا دابا',
        demo: 'شوف الديمو',
      },

      // Features
      features: {
        multiAgent: {
          title: 'نظام الوكلاء',
          description: 'أربعة وكلاء ذكاء اصطناعي كيخدمو معا باش يحسنو العمليات ديالك'
        },
        analytics: {
          title: 'التحليلات',
          description: 'توقع الاتجاهات وخذ قرارات مبنية على داطا صحيحة'
        },
        optimization: {
          title: 'التحسين',
          description: 'توزيع محسن للموارد'
        },
        multilingual: {
          title: 'لغات متعددة',
          description: 'الواجهة بالفرنسية والعربية والدارجة'
        }
      },

      // Auth
      auth: {
        email: 'الإيميل',
        password: 'الموت دوباس',
        confirmPassword: 'أكد الموت دوباس',
        fullName: 'الاسم الكامل',
        company: 'الشركة',
        login: 'دخول',
        register: 'تسجيل',
        forgotPassword: 'نسيتي الموت دوباس؟',
        noAccount: 'ماعندكش حساب؟',
        hasAccount: 'عندك حساب؟',
        loginSuccess: 'دخلتي بنجاح',
        registerSuccess: 'تسجلتي بنجاح',
      },

      // Dashboard
      dashboard: {
        welcome: 'مرحبا',
        overview: 'نظرة عامة',
        agents: 'الوكلاء',
        analytics: 'التحليلات',
        monitoring: 'المراقبة',
        settings: 'الإعدادات',
      },

      // Agents
      agents: {
        analyst: {
          name: 'المحلل',
          description: 'كيحلل الداطا القديمة وكيشوف الاتجاهات'
        },
        predictor: {
          name: 'المتنبئ',
          description: 'كيتوقع الأحداث الجاية بدقة'
        },
        optimizer: {
          name: 'المحسن',
          description: 'كيحسن توزيع الموارد'
        },
        critic: {
          name: 'الناقد',
          description: 'كيقيم ويحسن التوصيات'
        }
      },

      // Common
      loading: 'كيتحمل...',
      error: 'غلط',
      success: 'نجاح',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      save: 'حفظ',
      delete: 'حذف',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;