

import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import saturnTexUrl from './assets/saturn-reference.png';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* ==========================================================================
   TRANSLATION ENGINE & DICTIONARY
   ========================================================================== */
const translations = {
  en: {
    loader_subtitle: "Initializing Digital Ecosystem...",
    nav_services: "Services",
    nav_ai: "AI Core",
    nav_results: "Results",
    nav_cases: "Case Studies",
    nav_why: "Why Us",
    nav_process: "Process",
    nav_cta: "Book Strategy Call",
    hero_badge: "Vision 2030 Digital Partner",
    hero_title: "Transform Your Business With AI & Digital Growth",
    hero_subheadline: "Helping Saudi businesses scale through Digital Marketing, AI Automation, SEO, Paid Advertising, and Growth Systems.",
    hero_cta_primary: "Book A Free Strategy Call",
    hero_cta_secondary: "View Success Stories",
    holo_leads_title: "Leads Generated",
    holo_this_month: "this month",
    holo_rev_title: "Revenue Scaled",
    holo_roi_title: "Avg 4.8x ROAS",
    holo_ai_title: "AI Automations",
    holo_efficiency: "Accuracy & Speed",
    services_tag: "Ecosystem",
    services_title: "Our Growth Services",
    services_subtitle: "A complete digital suite orbiting around AI execution and conversion rate optimization.",
    service_select_prompt: "Interactive Ecosystem",
    service_select_desc: "Hover or tap on the floating spheres in the digital core to view details of our specialized marketing & AI operations.",
    s_seo: "SEO & Organic Growth",
    s_ads: "Paid Acquisition (Google/Social)",
    s_design: "UX Design & Web Dev",
    s_automation: "AI Automations & Chatbots",
    s_agents: "AI Voice & Sales Agents",
    ai_tag: "The AI Core",
    ai_title: "AI That Works 24/7 To Grow Your Business",
    ai_desc: "Deploy advanced, custom-trained neural models that qualify leads, close deals, and run background processes automatically, removing human scaling limits.",
    ai_f1: "24/7 AI Chatbots & Multilingual Voice Agents",
    ai_f2: "Automated Lead Qualification & System Sync",
    ai_f3: "Dynamic Scheduling and Smart Follow-ups",
    terminal_title: "AI Core Live Console",
    results_tag: "Track Record",
    results_title: "Engineered For Performance",
    results_subtitle: "Hard metrics of revenue, leads, and systems deployed for premium enterprises across the GCC.",
    res_rev: "SAR Revenue Generated",
    res_leads: "Leads Generated",
    res_campaigns: "Successful Campaigns",
    res_retention: "Client Retention Rate",
    ind_tag: "Verticals",
    ind_title: "Tailored For Leading Sectors",
    ind_desc: "We design specific, regulatory-compliant AI workflows and high-converting performance systems for key growth industries driving Saudi Vision 2030.",
    ind_realestate: "Real Estate & Development",
    ind_healthcare: "Healthcare & Biotech",
    ind_government: "Government & Public Sector",
    ind_ecommerce: "E-commerce & Retail Brands",
    ind_hospitality: "Hospitality & Tourism",
    ind_finance: "Finance & Investment",
    ind_re_title: "Real Estate Growth Engines",
    ind_re_desc: "Connecting qualified premium property buyers with luxury developments using automated lead tracking and hyper-targeted advertising campaigns.",
    ind_re_stat_lbl: "Avg Lead Cost Reduction",
    cases_tag: "Case Studies",
    cases_title: "Proven Success Stories",
    cases_subtitle: "See how we took high-growth GCC companies to the next level of digital maturity.",
    case_1_tag: "Real Estate Enterprise",
    case_1_title: "Al-Nakheel Developments",
    case_1_desc: "Implemented AI Lead Qualification and automated multi-channel Google Search + Snapchat ads campaign for premium villas.",
    m_leads: "Lead Volume",
    m_roas: "Ads ROAS",
    case_2_tag: "E-Commerce Luxury",
    case_2_title: "Riyadh Oud & Perfumery",
    case_2_desc: "Built a hyper-optimized web checkout and integrated Meta Ads + TikTok Pixel automation with custom audience retargeting.",
    m_revenue: "Sales Revenue",
    m_cac: "Acquisition Cost",
    case_3_tag: "AI Automation",
    case_3_title: "Saudi Logistics Co.",
    case_3_desc: "Deployed multilingual AI Voice agents handling booking inquires, directly integrated with Salesforce CRM.",
    m_response: "Response Time",
    m_efficiency: "Booking Rate",
    why_tag: "Comparison",
    why_title: "The Growth Agency Paradigm Shift",
    why_subtitle: "Why elite brands choose an AI-integrated performance model over traditional marketing services.",
    why_col_trad: "Traditional Agency",
    why_col_ai: "Adonix AI Partner",
    why_trad_1: "Slow, human-limited turnaround (days/weeks)",
    why_trad_2: "Manual lead validation and spreadsheet exports",
    why_trad_3: "High operational overhead with rigid creative teams",
    why_trad_4: "Monthly static reporting templates with lagging data",
    why_ai_1: "Instant AI-supported execution (hours/minutes)",
    why_ai_2: "Automated lead calling & validation (under 1 minute)",
    why_ai_3: "Highly scalable, lean AI-driven creative workflows",
    why_ai_4: "Real-time live analytics console and system sync",
    test_tag: "Testimonials",
    test_title: "Trusted By Visionary Leaders",
    test_subtitle: "Hear from premium startup founders and C-Suite executives across the Riyadh business network.",
    t1_quote: '\"Adonix transformed our lead acquisition. Within 60 days of deploying their AI Lead Qualification system, our sales team\'s closing rate increased by 40% while ad costs dropped.\"',
    t1_name: "Eng. Khaled Al-Mutairi",
    t1_role: "VP of Marketing, Diriyah Estate",
    t2_quote: '\"Their 3D brand positioning and deep integration of Meta Ads APIs gave us an edge in Riyadh\'s competitive luxury retail market. Truly next-level engineering.\"',
    t2_name: "Sarah Al-Dosari",
    t2_role: "Founder, Aura Perfumes",
    proc_tag: "Playbook",
    proc_title: "Our Road To Dominance",
    proc_subtitle: "A five-step roadmap designed to systematically validate, construct, and scale GCC market leaders.",
    step1_title: "Discover",
    step1_desc: "Deep dive into current marketing performance, systems, and product-market fit metrics.",
    step2_title: "Strategize",
    step2_desc: "Create customized AI automation blueprints and target high-converting traffic channels.",
    step3_title: "Build",
    step3_desc: "Deploy custom landing pages, API-based tracking, and configure AI agent pipelines.",
    step4_title: "Optimize",
    step4_desc: "Perform rigorous A/B creative testing, audit server-side events, and train AI models.",
    step5_title: "Scale",
    step5_desc: "Aggressively scale advertising budgets and roll out company-wide workflow automations.",
    contact_tag: "Partner With Us",
    contact_title: "Ready To Lead The Future?",
    contact_sub: "Partner with Saudi Arabia's next-generation AI and digital growth agency. Secure your free audit call.",
    f_name: "Full Name / Company Name",
    f_email: "Work Email",
    f_phone: "Phone Number",
    f_service: "Primary Growth Goal",
    f_msg: "Project Requirements (Optional)",
    opt_select: "Select goal...",
    opt_1: "SEO & Paid Advertising Scaling",
    opt_2: "AI Conversational Agents Integration",
    opt_3: "Workflow Automation Consulting",
    opt_4: "Full Digital Growth Engine Deployment",
    submit_btn: "Book Your Free Growth Consultation",
    f_privacy: "Privacy Policy",
    f_terms: "Terms of Service"
  },
  ar: {
    loader_subtitle: "جاري تهيئة النظام الرقمي...",
    nav_services: "خدماتنا",
    nav_ai: "قلب الذكاء الاصطناعي",
    nav_results: "النتائج",
    nav_cases: "دراسات الحالة",
    nav_why: "لماذا نحن",
    nav_process: "خطوات العمل",
    nav_cta: "احجز استشارة مجانية",
    hero_badge: "شريك التحول الرقمي لرؤية 2030",
    hero_title: "ضاعف نمو أعمالك بالذكاء الاصطناعي والحلول الرقمية",
    hero_subheadline: "نساعد الشركات السعودية الكبرى والناشئة على التوسع السريع من خلال التسويق الرقمي المتقدم، وأتمتة العمليات، وأنظمة النمو الذكي.",
    hero_cta_primary: "احجز مكالمة استشارية مجانية",
    hero_cta_secondary: "شاهد قصص النجاح",
    holo_leads_title: "العملاء المحتملين الجدد",
    holo_this_month: "هذا الشهر",
    holo_rev_title: "الإيرادات المحققة",
    holo_roi_title: "معدل عائد إعلاني 4.8 ضعف",
    holo_ai_title: "عمليات الأتمتة بالذكاء الاصطناعي",
    holo_efficiency: "الدقة والسرعة الفائقة",
    services_tag: "منظومتنا الرقمية",
    services_title: "خدمات النمو المتكاملة",
    services_subtitle: "حلول رقمية متكاملة تتمحور حول تقنيات الذكاء الاصطناعي وتحسين معدلات التحويل.",
    service_select_prompt: "المنظومة التفاعلية",
    service_select_desc: "قم بتمرير المؤشر أو النقر على المجسمات ثلاثية الأبعاد في قلب النظام لاستعراض تفاصيل عملياتنا التقنية والتسويقية المتخصصة.",
    s_seo: "السيو والنمو العضوي",
    s_ads: "الحملات الإعلانية المدفوعة",
    s_design: "تصميم الواجهات وتطوير المواقع",
    s_automation: "أنظمة الأتمتة والمساعد الرقمي",
    s_agents: "وكلاء المبيعات والصوت الذكي",
    ai_tag: "قلب الذكاء الاصطناعي",
    ai_title: "ذكاء اصطناعي يعمل 24/7 لخدمة وتوسيع أعمالك",
    ai_desc: "نشر نماذج عصبية متطورة ومدربة خصيصاً لتأهيل العملاء، وإتمام الصفقات، وإدارة العمليات تلقائياً دون قيود تشغيلية بشرية.",
    ai_f1: "وكلاء صوت ومساعدين رقميين متعددي اللغات على مدار الساعة",
    ai_f2: "تأهيل العملاء المحتملين وربطهم مباشرة مع أنظمة إدارة العملاء CRM",
    ai_f3: "تنسيق مواعيد ذكي ومتابعات آلية فورية للعملاء",
    terminal_title: "لوحة التحكم الحية للذكاء الاصطناعي",
    results_tag: "سجل الإنجازات",
    results_title: "هندسة أداء فائقة الدقة",
    results_subtitle: "أرقام فعلية وموثقة للإيرادات والعملاء الجدد التي حققناها للشركات الكبرى في المملكة والخليج.",
    res_rev: "ريال سعودي إيرادات للعملاء",
    res_leads: "عملاء محتملين مستقطبين",
    res_campaigns: "حملة إعلانية ناجحة",
    res_retention: "معدل الاحتفاظ بالعملاء",
    ind_tag: "القطاعات المستهدفة",
    ind_title: "حلول مخصصة لقطاعات النمو الواعدة",
    ind_desc: "نصمم مسارات عمل ذكية وحملات تسويقية متوافقة مع الأنظمة المحلية لدعم القطاعات الرئيسية المحركة لرؤية السعودية 2030.",
    ind_realestate: "العقارات والتطوير العقاري",
    ind_healthcare: "الرعاية الصحية والتقنية الحيوية",
    ind_government: "القطاع الحكومي والعام",
    ind_ecommerce: "التجارة الإلكترونية والتجزئة",
    ind_hospitality: "الضيافة والسياحة والفنادق",
    ind_finance: "القطاع المالي والاستثماري",
    ind_re_title: "محركات النمو العقاري",
    ind_re_desc: "ربط مشتري العقارات الفاخرة مباشرة مع المطورين العقاريين الكبار باستخدام استهداف إعلاني دقيق وتصفية فورية للعملاء عبر الذكاء الاصطناعي.",
    ind_re_stat_lbl: "متوسط خفض تكلفة العميل المحتمل",
    cases_tag: "قصص النجاح",
    cases_title: "مشاريع حققت الريادة",
    cases_subtitle: "اكتشف كيف نقلنا أعمال شركائنا في الخليج إلى مستويات جديدة من النضج الرقمي والأرباح.",
    case_1_tag: "قطاع التطوير العقاري",
    case_1_title: "النخيل للتطوير العقاري",
    case_1_desc: "إطلاق نظام تأهيل عملاء بالذكاء الاصطناعي مع تشغيل حملات مكثفة على جوجل وسناب شات للفلل الفاخرة.",
    m_leads: "حجم العملاء الجدد",
    m_roas: "العائد على الإعلانات",
    case_2_tag: "التجارة الإلكترونية الفاخرة",
    case_2_title: "رياض للعود والعطور",
    case_2_desc: "بناء بوابة شراء فائقة السرعة مع ربط وحدات أتمتة إعلانات ميتا وتيك توك ببيانات متقدمة للمشترين.",
    m_revenue: "عوائد المبيعات",
    m_cac: "تكلفة الاستحواذ",
    case_3_tag: "أتمتة الأنظمة الذكية",
    case_3_title: "الشركة السعودية للخدمات اللوجستية",
    case_3_desc: "تفعيل وكلاء صوت ذكاء اصطناعي للرد على طلبات الشحن وتحديثها لحظياً في نظام Salesforce.",
    m_response: "سرعة الاستجابة",
    m_efficiency: "معدل الحجز المؤكد",
    why_tag: "المقارنة الحاسمة",
    why_title: "النقلة النوعية في منظومة نمو أعمالك",
    why_subtitle: "لماذا تختار الشركات الرائدة نموذج الأداء المدعوم بالذكاء الاصطناعي مقارنة بالوكالات التقليدية.",
    why_col_trad: "الوكالة التقليدية",
    why_col_ai: "شريك أدونيكس الذكي",
    why_trad_1: "تنفيذ بطيء مقيد بالقدرات البشرية (أيام/أسابيع)",
    why_trad_2: "فرز يدوي للعملاء ومتابعات متأخرة عبر الجداول المكتوبة",
    why_trad_3: "تكاليف تشغيلية مرتفعة مع فرق عمل تقليدية غير مرنة",
    why_trad_4: "تقارير شهرية جامدة ببيانات قديمة وغير تفاعلية",
    why_ai_1: "تنفيذ فوري مدعوم بالذكاء الاصطناعي (دقائق/ساعات)",
    why_ai_2: "اتصال آلي فوري وتأهيل للعميل في أقل من دقيقة واحدة",
    why_ai_3: "آليات عمل إبداعية ذكية ومرنة جداً بأقل التكاليف التشغيلية",
    why_ai_4: "لوحة تحكم حية ومباشرة لمراقبة الأرقام لحظة بلحظة",
    test_tag: "آراء شركائنا",
    test_title: "ثقة قادة الأعمال",
    test_subtitle: "ماذا يقول شركاؤنا من الرؤساء التنفيذيين ورواد الأعمال في مجتمع أعمال الرياض والخليج.",
    t1_quote: '\"أحدثت أدونيكس ثورة في طريقة استقطاب عملائنا. في غضون 60 يوماً فقط من تشغيل نظام التأهيل بالذكاء الاصطناعي، ارتفع معدل إغلاق المبيعات لدينا بنسبة 40% وانخفضت تكلفة الإعلانات.\"',
    t1_name: "المهندس خالد المطيري",
    t1_role: "نائب رئيس التسويق، عقارات الدرعية",
    t2_quote: '\"مكانة علامتنا التجارية وتكامل البيانات المتقدم عبر قنوات إعلانات ميتا منحنا تفوقاً حقيقياً في سوق العطور الفاخرة بالرياض. احترافية عالية جداً.\"',
    t2_name: "سارة الدوسري",
    t2_role: "مؤسسة عطور أورا",
    proc_tag: "دليل العمل",
    proc_title: "طريقنا الثابت نحو الريادة",
    proc_subtitle: "منهجية عمل خماسية الخطوات مصممة لتقييم وتأسيس وتوسيع نطاق أعمال الشركات في منطقة الخليج.",
    step1_title: "الاستكشاف",
    step1_desc: "دراسة دقيقة لأداء الأنظمة التسويقية الحالية وتحديد فجوات الأداء وملاءمة المنتج للسوق.",
    step2_title: "التخطيط والابتكار",
    step2_desc: "رسم خرائط الأتمتة المخصصة وصياغة خطط استهداف القنوات الإعلانية ذات التحويل العالي.",
    step3_title: "البناء والتكامل",
    step3_desc: "تطوير واجهات الهبوط الذكية، وتفعيل وحدات التتبع وتهيئة مسارات عملاء الذكاء الاصطناعي.",
    step4_title: "التحسين المستمر",
    step4_desc: "إجراء اختبارات مقارنة مكثفة للواجهات والمحتوى الإعلاني وتدريب وتطوير النماذج الذكية.",
    step5_title: "التوسع الإستراتيجي",
    step5_desc: "مضاعفة الميزانيات التسويقية الناجحة وتعميم أدوات أتمتة العمليات لكافة أقسام الشركة.",
    contact_tag: "ابدأ رحلتك معنا",
    contact_title: "هل أنت مستعد لقيادة المستقبل؟",
    contact_sub: "كن شريكاً لوكالة الجيل القادم للنمو الذكي والتحول الرقمي في المملكة العربية السعودية.",
    f_name: "الاسم الكامل / اسم الشركة",
    f_email: "البريد الإلكتروني للعمل",
    f_phone: "رقم الجوال",
    f_service: "الهدف الرئيسي للنمو",
    f_msg: "متطلبات المشروع (اختياري)",
    opt_select: "اختر الهدف...",
    opt_1: "مضاعفة حملات الإعلانات وجذب المشترين",
    opt_2: "تكامل وكلاء المبيعات والمساعدين الذكيين",
    opt_3: "استشارات أتمتة وتطوير مسارات العمل للشركة",
    opt_4: "تشغيل محرك النمو الرقمي الشامل للمؤسسة",
    submit_btn: "احجز استشارتك المجانية للنمو الآن",
    f_privacy: "سياسة الخصوصية",
    f_terms: "شروط الخدمة"
  }
};

let currentLang = "en";

function setLanguage(lang) {
  currentLang = lang;
  const htmlEl = document.documentElement;
  htmlEl.setAttribute("lang", lang);
  htmlEl.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  
  // Set fonts based on language
  if (lang === "ar") {
    htmlEl.style.setProperty("--font-family", "var(--font-ar-primary)");
    htmlEl.style.setProperty("--font-display", "var(--font-ar-display)");
    document.getElementById("lang-toggle").innerText = "English";
  } else {
    htmlEl.style.setProperty("--font-family", "var(--font-en-primary)");
    htmlEl.style.setProperty("--font-display", "var(--font-en-display)");
    document.getElementById("lang-toggle").innerText = "العربية";
  }

  // Update DOM translation elements
  const translateElements = document.querySelectorAll("[data-translate]");
  translateElements.forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (translations[lang][key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translations[lang][key];
      } else if (el.tagName === "SELECT") {
        // Handle select default prompt
      } else {
        // Support buttons that might have child span structures, or keep it pure text
        const childArrow = el.querySelector(".btn-arrow");
        if (childArrow) {
          el.childNodes[0].textContent = translations[lang][key] + " ";
        } else {
          el.innerText = translations[lang][key];
        }
      }
    }
  });

  // Re-translate placeholder options in select
  const goalSelect = document.getElementById("form-service");
  if (goalSelect) {
    goalSelect.options[0].text = translations[lang].opt_select;
    goalSelect.options[1].text = translations[lang].opt_1;
    goalSelect.options[2].text = translations[lang].opt_2;
    goalSelect.options[3].text = translations[lang].opt_3;
    goalSelect.options[4].text = translations[lang].opt_4;
  }
}

// Language Toggle Action
document.getElementById("lang-toggle").addEventListener("click", () => {
  const nextLang = currentLang === "en" ? "ar" : "en";
  gsap.to("body", {
    opacity: 0,
    duration: 0.25,
    onComplete: () => {
      setLanguage(nextLang);
      gsap.to("body", { 
        opacity: 1, 
        duration: 0.25,
        onComplete: () => ScrollTrigger.refresh()
      });
    }
  });
});

/* ==========================================================================
   SMOOTH SCROLL (LENIS)
   ========================================================================== */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5,
});

// Update ScrollTrigger on Lenis Scroll
lenis.on('scroll', ScrollTrigger.update);

// Setup ScrollTrigger Proxy for Lenis
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value, { immediate: true });
    }
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  }
});

// Integrate Lenis raf with GSAP Ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


/* ==========================================================================
   1. CENTRAL CONFIGURATION SYSTEM
   ========================================================================== */
const CONFIG = {
  renderer: { antialias: true, alpha: true, powerPreference: "high-performance" },
  camera: { fov: 45, near: 0.1, far: 100, z: 5, driftX: 0.2, driftY: 0.15, driftAmp: 0.015 },
  lighting: { ambientColor: 0xffffff, ambientIntensity: 0.2, pointColor: 0x59F3FF, pointIntensity: 1.5, pointPos: [2, 2, 2] },
  background: { baseZ: -10, scale: 20 },
  aiCore: { scale: 1.4, baseRotSpeed: 0.015, breathSpeed: 1.2, breathAmp: 0.02 },
  particles: { count: 35, bgCount: 400, bgSize: 0.02 },
  streams: { fireChance: 0.02, fadeSpeed: 0.85 },
  pulse: { cycleTime: 7.0, duration: 2.0, maxScale: 4.0 },
  performance: { targetFPS: 60 },
  debug: { camera: false, shader: false, performance: false, ai: false, particles: false, timeline: false, scroll: false }
};

/* ==========================================================================
   2. MULTI-LAYER STATE SYSTEM
   ========================================================================== */
const STATE = {
  experience: { current: 'Hero', states: ['Hero', 'Services', 'AI', 'Industries', 'Portfolio', 'Contact'] },
  ai: { current: 'Awakening', states: ['Dormant', 'Awakening', 'Observation', 'Processing', 'Creation', 'Optimization', 'Completion'] },
  performance: { current: 'Desktop', profiles: ['Desktop', 'Laptop', 'Tablet', 'Mobile'] }
};

/* ==========================================================================
   3. SCENE HIERARCHY
   ========================================================================== */
const groups = {
  world: new THREE.Group(),
  background: new THREE.Group(),
  atmosphere: new THREE.Group(),
  ai: new THREE.Group(),
  aiCore: new THREE.Group(),
  aiGlass: new THREE.Group(),
  aiRings: new THREE.Group(),
  aiOrbitals: new THREE.Group(),
  aiPulse: new THREE.Group(),
  intelligence: new THREE.Group(),
  particles: new THREE.Group(),
  streams: new THREE.Group(),
  connections: new THREE.Group(),
  business: new THREE.Group(),
  holograms: new THREE.Group(),
  dashboards: new THREE.Group(),
  graphs: new THREE.Group(),
  funnels: new THREE.Group(),
  websites: new THREE.Group(),
  effects: new THREE.Group(),
  uiSync: new THREE.Group(),
  debug: new THREE.Group()
};

// Build tree
groups.world.add(groups.background, groups.atmosphere);
groups.ai.add(groups.aiCore, groups.aiGlass, groups.aiRings, groups.aiOrbitals, groups.aiPulse);
groups.intelligence.add(groups.particles, groups.streams, groups.connections);
groups.business.add(groups.holograms, groups.dashboards, groups.graphs, groups.funnels, groups.websites);

/* ==========================================================================
   4. OBJECT REFERENCES
   ========================================================================== */
const sceneRefs = {
  camera: null,
  renderer: null,
    sceneGroup: null, // Legacy ref for GSAP
  aiCore: null,     // Legacy ref for GSAP
  centralCore: null,// Legacy ref for GSAP
  outerShell: null, // Legacy ref for GSAP
  arcs: [],         // Legacy ref for GSAP
  particleSystem: null, // Legacy ref for GSAP
  pulseRing: null,
  microParticles: null,
  dataStream: null,
  holograms: [],
  uniforms: null
};

/* ======================================  // Calculate scroll progress (0.0 to 1.0)
  let progress = sceneRefs.uniforms ? Math.min(1.0, sceneRefs.uniforms.u_scroll.value / 10.0) : 0;
  
  if (isIdlePage) {
    // Add continuous subtle drifting to the progress after entrance to keep the page alive
    let idleDrift = 0;
    if (entranceComplete) {
      idleDrift = Math.sin(elapsedTime * 0.2) * 0.02; // Very slow organic shift
    }
    progress = currentIdleProgress + idleDrift;
    
    // Override uniform so shader matches
    if (sceneRefs.uniforms) {
       sceneRefs.uniforms.u_scroll.value = progress * 10.0;
    }
  }

  // Modular Update Pipeline
  UpdatePipeline.updateTime(elapsedTime);
  UpdatePipeline.updateCamera(elapsedTime, progress);
  
  const isPulsing = false;
  const pulseVal = 0;
  const cycleProgress = 0;
  UpdatePipeline.updateBlueprints(elapsedTime, progress);
  if(sceneRefs.aiCore) sceneRefs.aiCore.rotation.y += 0.001;
  if(sceneRefs.rings) sceneRefs.rings.rotation.z += 0.0005;
}

/* ==========================================================================
   5. PERFORMANCE & STATE MANAGERS
   ========================================================================== */
const PerformanceManager = {
  init() {
    const w = window.innerWidth;
    if (w < 768) STATE.performance.current = 'Mobile';
    else if (w < 1024) STATE.performance.current = 'Tablet';
    else if (w < 1440) STATE.performance.current = 'Laptop';
    else STATE.performance.current = 'Desktop';
    
    // Future: Use navigator.hardwareConcurrency & navigator.deviceMemory
  },
  getPixelRatio() {
    return STATE.performance.current === 'Mobile' ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
  }
};
PerformanceManager.init();

/* ==========================================================================
   6. RESIZE MANAGER
   ========================================================================== */
const ResizeManager = {
  subscribers: [],
  subscribe(fn) { this.subscribers.push(fn); },
  trigger() { this.subscribers.forEach(fn => fn(window.innerWidth, window.innerHeight)); }
};
window.addEventListener('resize', () => ResizeManager.trigger());

/* ==========================================================================
   7. UPDATE PIPELINE
   ========================================================================== */
const PulseState = {
  nextPulseTime: 2.0,
  isPulsing: false,
  startTime: 0,
  duration: 2.0,
  maxScale: 4.0
};

const UpdatePipeline = {
  // Helper for staggered animations
  remap(val, min, max) {
    return Math.max(0, Math.min(1, (val - min) / (max - min)));
  },
  updateTime(elapsedTime) {
    if(sceneRefs.uniforms) sceneRefs.uniforms.u_time.value = elapsedTime;
  if (sceneRefs.planetShader) sceneRefs.planetShader.uniforms.u_time.value = elapsedTime;
  if (sceneRefs.ringMat) sceneRefs.ringMat.uniforms.u_time.value = elapsedTime;
  if (sceneRefs.spaceDust) sceneRefs.spaceDust.rotation.y = elapsedTime * 0.01;
  },
  updateCamera(elapsedTime, progress) {
    if(sceneRefs.camera) {
      // Microscopic synchronized drift linked to breathing cycle
      const driftCycle = (Math.sin(elapsedTime * 1.2) * 0.6) + (Math.sin(elapsedTime * 0.8) * 0.3);
      // Amplitude increased by 20%
      sceneRefs.camera.position.x = Math.sin(elapsedTime * CONFIG.camera.driftX) * (CONFIG.camera.driftAmp * 1.2) + (driftCycle * 0.006);
      sceneRefs.camera.position.y = Math.cos(elapsedTime * CONFIG.camera.driftY) * (CONFIG.camera.driftAmp * 1.2) + (driftCycle * 0.006);
      
      // Subtle forward drift as it awakens
      // Digital Genesis: smoothly widen the composition with an organic curve
      const locRemap = (val, min, max) => Math.max(0, Math.min(1, (val - min) / (max - min)));
      const widenCurve = Math.pow(locRemap(progress, 0.6, 1.0), 2);
      const zWiden = widenCurve * 3.5;
      sceneRefs.camera.position.z = CONFIG.camera.z - (progress * 0.8) + zWiden;
    }
  },
  updatePulse(elapsedTime, progress) {
    // Event-driven pulse instead of mechanical timer
    let pulseVal = 0;
    let cycleProgress = 0;
    
    if (!PulseState.isPulsing && elapsedTime > PulseState.nextPulseTime) {
      PulseState.isPulsing = true;
      PulseState.startTime = elapsedTime;
      PulseState.duration = 1.5 + Math.random() * 1.5; // Variation in expansion speed/recovery
      PulseState.maxScale = 3.5 + Math.random() * 1.5; // Variation in glow/intensity
    }

    if (PulseState.isPulsing) {
      const pulseElapsed = elapsedTime - PulseState.startTime;
      if (pulseElapsed < PulseState.duration) {
        cycleProgress = pulseElapsed / PulseState.duration; // 0 to 1
        pulseVal = Math.sin(cycleProgress * Math.PI); // 0 -> 1 -> 0
        
        const pScale = 1.0 + cycleProgress * PulseState.maxScale;
        if (sceneRefs.pulseRing) {
          sceneRefs.pulseRing.scale.set(pScale, pScale, pScale);
          sceneRefs.pulseRing.material.opacity = (1.0 - cycleProgress) * (0.15 + (PulseState.maxScale * 0.02));
        }
        if (cycleProgress > 0.3 && cycleProgress < 0.8) {
          document.querySelectorAll('.holo-card').forEach(c => c.classList.add('ai-pulsing'));
        } else {
          document.querySelectorAll('.holo-card').forEach(c => c.classList.remove('ai-pulsing'));
        }
      } else {
        PulseState.isPulsing = false;
        // Subtle variation in pulse interval (5 to 10 seconds)
        PulseState.nextPulseTime = elapsedTime + 5.0 + Math.random() * 5.0; 
        if(sceneRefs.pulseRing) sceneRefs.pulseRing.material.opacity = 0;
        document.querySelectorAll('.holo-card').forEach(c => c.classList.remove('ai-pulsing'));
      }
    }
    
    const pFocus = this.remap(progress, 0.4, 1.0); // Pulse focus delays until 40%
    if(sceneRefs.uniforms) sceneRefs.uniforms.u_pulse.value = pulseVal + (pFocus * 0.4 * pulseVal); // Deliberate pulse instead of simply brighter
    return { isPulsing: PulseState.isPulsing, pulseVal, cycleProgress };
  },
  updateCore(elapsedTime, pulseVal, progress) {
    if (sceneRefs.aiCore) {
      sceneRefs.aiCore.rotation.y = elapsedTime * CONFIG.aiCore.baseRotSpeed * (1.0 - progress * 0.5);
      
      // Segmented Arcs - organic independent calibration into engineered positions
      if (sceneRefs.arcs && sceneRefs.arcs.length === 3) {
        const arcProgress = this.remap(progress, 0.3, 0.8); // Arcs lock between 30% and 80%
        // Easing to give a deliberate snap at the end
        const arcEase = Math.pow(arcProgress, 2.0); 

        // Occasionally slow down, accelerate, pause briefly.
        const arc1Speed = Math.max(0, Math.sin(elapsedTime * 0.4 + 1.0)) * 0.04;
        const arc2Speed = Math.max(-0.01, Math.cos(elapsedTime * 0.5 + 2.0)) * 0.03;
        const arc3Speed = Math.max(0, Math.sin(elapsedTime * 0.3 + 3.0)) * 0.05;
        
        // As progress increases, blend rotation to fixed structural angles (0, PI/2, etc)
        const targetRot0 = Math.PI * 0.5;
        const targetRot1 = 0;
        const targetRot2 = Math.PI;
        
        sceneRefs.arcs[0].rotation.z += arc1Speed * (1.0 - arcEase);
        sceneRefs.arcs[1].rotation.x += arc2Speed * (1.0 - arcEase);
        sceneRefs.arcs[2].rotation.y += arc3Speed * (1.0 - arcEase);
        
        sceneRefs.arcs[0].rotation.z = sceneRefs.arcs[0].rotation.z * (1.0 - arcEase) + targetRot0 * arcEase;
        sceneRefs.arcs[1].rotation.x = sceneRefs.arcs[1].rotation.x * (1.0 - arcEase) + targetRot1 * arcEase;
        sceneRefs.arcs[2].rotation.y = sceneRefs.arcs[2].rotation.y * (1.0 - arcEase) + targetRot2 * arcEase;
      }
      
      if (sceneRefs.centralCore && sceneRefs.outerShell) {
        // Layered oscillation breathing rhythm
        const masterBreath = (Math.sin(elapsedTime * 1.2) * 0.6) + 
                             (Math.sin(elapsedTime * 0.8) * 0.3) + 
                             (Math.sin(elapsedTime * 2.1) * 0.1);
                             
        // Energy settling after every pulse
        const afterPulseSettle = (pulseVal * 0.08);
        
        const coreProgress = this.remap(progress, 0.4, 0.9);
        const breath = 1.0 + masterBreath * CONFIG.aiCore.breathAmp + afterPulseSettle;
        sceneRefs.centralCore.scale.set(breath, breath, breath);
        sceneRefs.centralCore.material.emissiveIntensity = 0.5 + (pulseVal * 1.2) + (coreProgress * 0.8);
        
        // Progressive Transformation: Shell slowly separates as progress increases
        const rawShellProgress = this.remap(progress, 0.2, 0.7); 
        // Mechanical hesitation: slow start, fast middle, heavy settle
        const shellEase = rawShellProgress < 0.5 ? 2 * rawShellProgress * rawShellProgress : 1 - Math.pow(-2 * rawShellProgress + 2, 2) / 2;
        
        const shellSeparation = shellEase * 0.35; 
        const shellBreath = 1.0 + (masterBreath * 0.015) + (pulseVal * 0.03) + shellSeparation;
        sceneRefs.outerShell.scale.set(shellBreath, shellBreath, shellBreath);
      }
    }
  },
  updateParticles(elapsedTime, pulseVal, progress) {
    if (sceneRefs.microParticles && typeof microParticleData !== 'undefined') {
      const positions = sceneRefs.microParticles.geometry.attributes.position.array;
      const orbitalProgress = this.remap(progress, 0.1, 0.6); 
      for (let i = 0; i < microParticleData.length; i++) {
        const data = microParticleData[i];
        const phaseOffset = i * 0.13;
        const proceduralDrift = Math.sin(elapsedTime * 0.5 + phaseOffset) * 0.01;
        
        const currentSpeed = data.baseSpeed * (1.0 + Math.sin(elapsedTime * data.speedVar + phaseOffset));
        data.angle += (currentSpeed * 0.005) + proceduralDrift;
        
        const currentInclY = data.inclY * (1.0 - orbitalProgress);
        const currentInclZ = data.inclZ * (1.0 - orbitalProgress);
        
        const pulsePush = pulseVal * 0.05 * Math.sin(i);
        const r = data.radius + Math.sin(elapsedTime * 1.5 + phaseOffset) * 0.03 + pulsePush + (orbitalProgress * 0.5);
        
        positions[i*3] = r * Math.cos(data.angle);
        positions[i*3+1] = r * Math.sin(data.angle) * Math.sin(currentInclY);
        positions[i*3+2] = r * Math.sin(data.angle) * Math.cos(currentInclZ);
      }
      sceneRefs.microParticles.geometry.attributes.position.needsUpdate = true;
    }
    
    // Sprint 3B & 3C logic
    if (sceneRefs.particleSystem && sceneRefs.networkEdges) {
      const bgProgress = this.remap(progress, 0.5, 1.0); 
      sceneRefs.particleSystem.rotation.y = elapsedTime * 0.02 * (1.0 - bgProgress); 
      
      const pos = sceneRefs.particleSystem.geometry.attributes.position.array;
      for (let i=0; i<pos.length; i+=3) {
         const origX = originalParticlePositions[i];
         const origY = originalParticlePositions[i+1];
         const origZ = originalParticlePositions[i+2];
         
         const gridX = Math.round(origX / 0.5) * 0.5;
         const gridY = Math.round(origY / 0.5) * 0.5;
         const gridZ = Math.round(origZ / 0.5) * 0.5;
         
         const easeBg = 1 - Math.pow(1 - bgProgress, 3);
         
         pos[i] = origX * (1.0 - easeBg) + gridX * easeBg;
         pos[i+1] = origY * (1.0 - easeBg) + gridY * easeBg;
         pos[i+2] = origZ * (1.0 - easeBg) + gridZ * easeBg;
      }
      sceneRefs.particleSystem.geometry.attributes.position.needsUpdate = true;

      // Dynamic Edge Assembly
      const linePos = sceneRefs.lineSystem.geometry.attributes.position.array;
      const assembleProgress = this.remap(progress, 0.4, 0.8);
      for(let e = 0; e < sceneRefs.networkEdges.length; e++) {
        const edge = sceneRefs.networkEdges[e];
        const srcX = pos[edge.src * 3];
        const srcY = pos[edge.src * 3 + 1];
        const srcZ = pos[edge.src * 3 + 2];
        const dstX = pos[edge.dst * 3];
        const dstY = pos[edge.dst * 3 + 1];
        const dstZ = pos[edge.dst * 3 + 2];

        // Animate destination vertex stretching from source to dst
        const edgeT = this.remap(assembleProgress, edge.assemblyOffset * 0.5, 0.5 + edge.assemblyOffset * 0.5);
        const easeT = 1 - Math.pow(1 - edgeT, 3);

        linePos[e*6] = srcX;
        linePos[e*6+1] = srcY;
        linePos[e*6+2] = srcZ;
        linePos[e*6+3] = srcX * (1 - easeT) + dstX * easeT;
        linePos[e*6+4] = srcY * (1 - easeT) + dstY * easeT;
        linePos[e*6+5] = srcZ * (1 - easeT) + dstZ * easeT;
      }
      sceneRefs.lineSystem.geometry.attributes.position.needsUpdate = true;

      // Data Signals Logic
      if (sceneRefs.signals && sceneRefs.signalSystem) {
        const sigPos = sceneRefs.signalSystem.geometry.attributes.position.array;
        const globalRhythm = Math.sin(elapsedTime * 0.5); // Slow breathing rhythm for bursts
        const allowBursts = progress > 0.6 && globalRhythm > 0.8; // Synchronization periods
        
        for (let s = 0; s < sceneRefs.signals.length; s++) {
          const sig = sceneRefs.signals[s];
          if (!sig.active) {
            // Spawn new signal if allowed
            if (allowBursts && Math.random() < 0.1) {
              const coreNodes = sceneRefs.networkNodes.filter(n => n.role === 'CORE');
              if (coreNodes.length > 0) {
                const startNode = coreNodes[Math.floor(Math.random() * coreNodes.length)];
                if (startNode.edges.length > 0) {
                  sig.active = true;
                  sig.src = startNode.index;
                  sig.dst = startNode.edges[Math.floor(Math.random() * startNode.edges.length)];
                  sig.progress = 0;
                  sig.speed = 0.02 + Math.random() * 0.04;
                  sig.pause = 0;
                }
              }
            } else {
               sigPos[s*3] = 0; sigPos[s*3+1] = 0; sigPos[s*3+2] = 0;
            }
          } else {
            // Processing pauses at nodes
            // Continuous evolution: pauses gently decrease, speed gently increases over the entire scroll
            const evolutionPace = this.remap(progress, 0.3, 0.9);
            const currentSpeed = sig.speed * (1.0 + evolutionPace * 0.5); // Max 50% increase, perfectly smooth
            
            if (sig.pause > 0) {
               // Eat through pauses faster as AI intelligence matures
               sig.pause -= (1 + Math.floor(evolutionPace * 2));
            } else {
               sig.progress += currentSpeed;
               if (sig.progress >= 1.0) {
                 // Reached destination, decide next hop or die
                 const node = sceneRefs.networkNodes[sig.dst];
                 
                 // Spawning moved to deterministic choreographer in updateBlueprints

                 if (node.edges.length > 0 && Math.random() < 0.7) {
                   sig.src = sig.dst;
                   sig.dst = node.edges[Math.floor(Math.random() * node.edges.length)];
                   sig.progress = 0;
                   sig.pause = Math.floor(Math.random() * 30); // Pause for up to 30 frames
                 } else {
                   sig.active = false;
                 }
               }
            }

            if (sig.active) {
               const srcX = pos[sig.src * 3];
               const srcY = pos[sig.src * 3 + 1];
               const srcZ = pos[sig.src * 3 + 2];
               const dstX = pos[sig.dst * 3];
               const dstY = pos[sig.dst * 3 + 1];
               const dstZ = pos[sig.dst * 3 + 2];
               
               sigPos[s*3] = srcX * (1 - sig.progress) + dstX * sig.progress;
               sigPos[s*3+1] = srcY * (1 - sig.progress) + dstY * sig.progress;
               sigPos[s*3+2] = srcZ * (1 - sig.progress) + dstZ * sig.progress;
            } else {
               sigPos[s*3] = 0; sigPos[s*3+1] = 0; sigPos[s*3+2] = 0;
            }
          }
        }
        sceneRefs.signalSystem.geometry.attributes.position.needsUpdate = true;
      }
    }
  },
  updateBlueprints(elapsedTime, progress) {
    if (!sceneRefs.blueprintSystem || !sceneRefs.networkNodes) return;
    
    // Decay the global blueprint pulse
    if (sceneRefs.blueprintPulse > 0) {
      sceneRefs.blueprintPulse = Math.max(0, sceneRefs.blueprintPulse - 0.02);
    }
    if (sceneRefs.uniforms) {
      sceneRefs.uniforms.u_blueprint.value = sceneRefs.blueprintPulse;
    }

    const pos = sceneRefs.blueprintSystem.geometry.attributes.position.array;
    const nodePos = sceneRefs.particleSystem.geometry.attributes.position.array;
    const parentScale = sceneRefs.particleSystem.scale.x; // Retrieve exact world scale at this frame

    // Deterministic Choreography (No Random Spawning)
    // Overlap begins gently at 0.40
    if (progress > 0.40) {
      const activationProgress = Math.pow(this.remap(progress, 0.40, 0.90), 1.5);
      const targetActiveCount = Math.floor(activationProgress * sceneRefs.blueprints.length);
      const coreNodes = sceneRefs.networkNodes.filter(n => n.role === 'CORE' || n.role === 'RELAY');
      
      for(let b=0; b<targetActiveCount; b++) {
        const bp = sceneRefs.blueprints[b];
        if (!bp.active) {
           bp.active = true;
           const targetNode = coreNodes[(b * 3) % coreNodes.length]; // Deterministic spread
           bp.nodeIdx = targetNode.index;
           bp.progress = 0;
           bp.settled = false;
           
           const sX = nodePos[targetNode.index*3] * 2.0; // Assume final scale for target calculation
           const sY = nodePos[targetNode.index*3+1] * 2.0;
           const sZ = nodePos[targetNode.index*3+2] * 2.0;
           
           if (b % 2 === 0 && progress > 0.75) {
              bp.type = (b % 3) + 2; // UI type (2,3,4)
              bp.gridTargetX = Math.round(sX / 4.0) * 4.0 + ((b%2) - 0.5) * 2.0;
              bp.gridTargetY = Math.round(sY / 3.0) * 3.0 + ((b%3) - 1.0) * 1.5;
              bp.gridTargetZ = Math.round(sZ / 4.0) * 4.0 + ((b%2) - 0.5) * 2.0;
           } else {
              bp.type = b % 2; // Engineering type (0,1)
              bp.gridTargetX = sX;
              bp.gridTargetY = sY;
              bp.gridTargetZ = sZ;
           }
        }
      }
    }

    // Helper for padding templates up to 36 lines (72 vertices, 216 floats)
    const padTemplate = (arr) => {
      const full = new Float32Array(216);
      full.set(arr);
      return full;
    };

    // 0: Engineering Box
    const boxTemplate = padTemplate([
      -1,-1,-1,  1,-1,-1,   1,-1,-1,  1, 1,-1,   1, 1,-1, -1, 1,-1,  -1, 1,-1, -1,-1,-1,
      -1,-1, 1,  1,-1, 1,   1,-1, 1,  1, 1, 1,   1, 1, 1, -1, 1, 1,  -1, 1, 1, -1,-1, 1,
      -1,-1,-1, -1,-1, 1,   1,-1,-1,  1,-1, 1,   1, 1,-1,  1, 1, 1,  -1, 1,-1, -1, 1, 1
    ]);
    
    // 1: Anchor Crosshairs
    const crossTemplate = padTemplate([
      -1.5,0,0,  1.5,0,0,   0,-1.5,0,  0,1.5,0,   0,0,-1.5,  0,0,1.5,
      -1,1,0, -1,1.5,0,  1,-1,0, 1,-1.5,0
    ]);

    // 2: Modular UI Card (header line, image box, text lines)
    const cardTemplate = padTemplate([
      -1,-1.5,0,  1,-1.5,0,   1,-1.5,0,  1,1.5,0,   1,1.5,0, -1,1.5,0,  -1,1.5,0, -1,-1.5,0, // outer border
      -1,1.0,0,   1,1.0,0, // header line
      -0.8,0.8,0,  0.8,0.8,0,  0.8,0.8,0, 0.8,-0.2,0,  0.8,-0.2,0, -0.8,-0.2,0,  -0.8,-0.2,0, -0.8,0.8,0, // image box
      -0.8,-0.5,0, 0.8,-0.5,0, // text line 1
      -0.8,-0.8,0, 0.5,-0.8,0, // text line 2
      -0.8,-1.1,0, 0.3,-1.1,0  // text line 3
    ]);

    // 3: Responsive Columns (Three parallel wireframe pillars)
    const columnsTemplate = padTemplate([
      -1.5,-1,0, -0.5,-1,0,  -0.5,-1,0, -0.5,1,0,  -0.5,1,0, -1.5,1,0,  -1.5,1,0, -1.5,-1,0, // Col 1
      -0.4,-1,0,  0.4,-1,0,   0.4,-1,0,  0.4,1,0,   0.4,1,0, -0.4,1,0,  -0.4,1,0, -0.4,-1,0, // Col 2
       0.5,-1,0,  1.5,-1,0,   1.5,-1,0,  1.5,1,0,   1.5,1,0,  0.5,1,0,   0.5,1,0,  0.5,-1,0  // Col 3
    ]);

    // 4: Navigation Rails (Horizontal lines with vertical stops)
    const navTemplate = padTemplate([
      -2,0,0, 2,0,0,
      -1.5,-0.2,0, -1.5,0.2,0,
      -0.5,-0.2,0, -0.5,0.2,0,
       0.5,-0.2,0,  0.5,0.2,0,
       1.5,-0.2,0,  1.5,0.2,0
    ]);

    const templates = [boxTemplate, crossTemplate, cardTemplate, columnsTemplate, navTemplate];

    for(let b = 0; b < sceneRefs.blueprints.length; b++) {
      const bp = sceneRefs.blueprints[b];
      const offset = b * 36 * 6; // 36 lines * 2 verts * 3 coords
      
      if (!bp.active) {
        for(let i=0; i<216; i++) pos[offset + i] = 0;
      } else {
        const nIdx = bp.nodeIdx;
        // AUDIT FIX: Translate local node positions to world-aligned positions
        const cX = nodePos[nIdx*3] * parentScale;
        const cY = nodePos[nIdx*3+1] * parentScale;
        const cZ = nodePos[nIdx*3+2] * parentScale;
        
        // Assemble progress with Evaluation Phase (subtle shrinking/growing before lock)
        if (bp.progress < 1.0) {
          bp.progress += 0.003; // Smooth, continuous base speed
          if (bp.progress >= 1.0) {
            bp.progress = 1.0;
            if (!bp.settled) {
              bp.settled = true;
              sceneRefs.blueprintPulse = 1.0; 
            }
          }
        }

        const t = elapsedTime * 0.5 + bp.timeOffset;

        // Stability & Evaluation Logic
        let stabilityScale = bp.scale;
        let stabilityX = 0, stabilityY = 0, stabilityZ = 0;
        let evalWarp = 1.0;

        if (!bp.settled) {
          // Evaluation Phase: Visible design decisions (resizing, rebalancing)
          // Uses sin wave decaying as progress nears 1.0
          const decay = 1.0 - bp.progress;
          evalWarp = 1.0 + Math.sin(t * 10.0) * 0.1 * decay;
        } else {
          // Microscopic breathing and calibration shifts (Responsive testing)
          stabilityScale += Math.sin(t * 2.0) * 0.02;
          stabilityX = Math.sin(t * 0.8) * 0.05;
          stabilityY = Math.cos(t * 0.9) * 0.05;
          stabilityZ = Math.sin(t * 1.1) * 0.05;
        }

        // Modular Assembly: Lerp center towards Grid Target as it assembles
        // Instead of anchoring purely to the node, UI structures pull towards the organized layout grid.
                // Modular Assembly: Lerp center towards Grid Target
        // SIGNATURE REVEAL: Instead of speeding up time, the emotional impact comes from all active
        // systems organically and simultaneously aligning into the layout grid as progress hits 0.8.
        const globalSyncEase = Math.pow(this.remap(progress, 0.60, 0.85), 2);
        const mergeEase = Math.max(Math.pow(bp.progress, 2), globalSyncEase); // Lock-in via synchronization
        
        const finalCX = cX * (1 - mergeEase) + bp.gridTargetX * mergeEase;
        const finalCY = cY * (1 - mergeEase) + bp.gridTargetY * mergeEase;
        const finalCZ = cZ * (1 - mergeEase) + bp.gridTargetZ * mergeEase;

        const template = templates[bp.type];
        
        const easeProg = 1 - Math.pow(1 - bp.progress, 3);
        const currentScale = stabilityScale * easeProg * evalWarp;

        for(let l = 0; l < 36; l++) {
          const lOff = offset + (l * 6);
          const tOff = l * 6;
          
          if (template[tOff] === 0 && template[tOff+1] === 0 && template[tOff+2] === 0 && template[tOff+3] === 0) {
             // Blank line padding
             for(let i=0; i<6; i++) pos[lOff+i] = 0;
             continue;
          }

          // Living Interface Micro-Adjustments (only on X axis, simulating responsive columns sliding)
          let liveResponsiveX = 0;
          if (bp.settled && bp.type >= 2) {
            // Apply slight horizontal shifts to internal lines (responsive testing)
            liveResponsiveX = Math.sin(t * 1.5 + l) * 0.03;
          }

          const srcX = template[tOff] * currentScale + stabilityX + liveResponsiveX;
          const srcY = template[tOff+1] * currentScale + stabilityY;
          const srcZ = template[tOff+2] * currentScale + stabilityZ;
          const dstX = template[tOff+3] * currentScale + stabilityX + liveResponsiveX;
          const dstY = template[tOff+4] * currentScale + stabilityY;
          const dstZ = template[tOff+5] * currentScale + stabilityZ;

          pos[lOff] = finalCX + srcX;
          pos[lOff+1] = finalCY + srcY;
          pos[lOff+2] = finalCZ + srcZ;
          // FIXED: Extrusion lerp math from src to dst
          pos[lOff+3] = finalCX + srcX * (1 - easeProg) + dstX * easeProg; 
          pos[lOff+4] = finalCY + srcY * (1 - easeProg) + dstY * easeProg;
          pos[lOff+5] = finalCZ + srcZ * (1 - easeProg) + dstZ * easeProg;
        }
      }
    }
    sceneRefs.blueprintSystem.geometry.attributes.position.needsUpdate = true;
  },
  updateStreams(elapsedTime, isPulsing) {
    if (sceneRefs.holograms.length > 0 && sceneRefs.dataStream) {
      groups.holograms.rotation.y = elapsedTime * 0.02 + Math.sin(elapsedTime * 0.5) * 0.03;
      groups.holograms.rotation.z = Math.cos(elapsedTime * 0.3) * 0.02;
      
      // Fire streams only when NOT actively pulsing (simulating processing post-pulse)
      if (Math.random() < CONFIG.streams.fireChance && !isPulsing) {
        const target = sceneRefs.holograms[Math.floor(Math.random() * sceneRefs.holograms.length)];
        const pos = sceneRefs.dataStream.geometry.attributes.position;
        target.updateMatrixWorld();
        const targetPos = new THREE.Vector3().setFromMatrixPosition(target.matrixWorld);
        if(sceneRefs.aiCore) sceneRefs.aiCore.worldToLocal(targetPos);
        pos.setXYZ(1, targetPos.x, targetPos.y, targetPos.z);
        pos.needsUpdate = true;
        sceneRefs.dataStream.material.opacity = 0.5;
      } else {
        sceneRefs.dataStream.material.opacity *= CONFIG.streams.fadeSpeed;
      }
    }
  }
};

/* ==========================================================================
   THREE.JS SCENE CREATION (WebGL)
   ========================================================================== */
const canvas = document.getElementById("webgl-canvas");
const scene = new THREE.Scene();

// Camera setup - Changed to PerspectiveCamera for 3D depth
const camera = new THREE.PerspectiveCamera(CONFIG.camera.fov, window.innerWidth / window.innerHeight, CONFIG.camera.near, CONFIG.camera.far);
camera.position.set(0, 0, CONFIG.camera.z);
sceneRefs.camera = camera;

// Renderer setup
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  ...CONFIG.renderer
});
renderer.setPixelRatio(PerformanceManager.getPixelRatio());
renderer.setSize(window.innerWidth, window.innerHeight);
sceneRefs.renderer = renderer;

// --- CINEMATIC POST-PROCESSING (Bloom & Atmosphere Glow) ---
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.45, // Bloom strength (luxurious cinematic glow)
  0.3,  // Bloom radius
  0.65  // Bloom threshold (only glow bright rims, rings, and dust crystals)
);
composer.addPass(bloomPass);
sceneRefs.composer = composer;

// Register Resize
ResizeManager.subscribe((w, h) => {
  renderer.setSize(w, h);
  renderer.setPixelRatio(PerformanceManager.getPixelRatio());
  if (camera.type === 'PerspectiveCamera') {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  if (sceneRefs.composer) sceneRefs.composer.setSize(w, h);
});

// Lighting & Atmosphere (Context Aware)
let ambIntensity = 1.5;
let pointColor = 0x59F3FF;
let pointIntensity = 1.5;

if (typeof document !== 'undefined' && document.body.dataset.scenePreset) {
  const preset = document.body.dataset.scenePreset;
  if (preset === 'ABOUT') {
    ambIntensity = 1.6;
    pointIntensity = 2.0;
    pointColor = 0x2266CC; // Deep neural blue
  } else if (preset === 'SERVICES') {
    ambIntensity = 1.8;
    pointIntensity = 2.5;
    pointColor = 0xFFFFFF; // Bright engineering white
  } else if (preset === 'CONTACT') {
    ambIntensity = 1.4;
    pointIntensity = 1.0;
    pointColor = 0xFF3366; // Urgent active transmission red tint
  }
}

const ambientLight = new THREE.AmbientLight(0xffffff, ambIntensity);
scene.add(ambientLight);
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xdddddd, 1.5);
scene.add(hemiLight);
const pointLight = new THREE.PointLight(pointColor, pointIntensity, 20);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 3, 5);
scene.add(dirLight);

// 3D Objects Group
const sceneGroup = new THREE.Group();
scene.add(sceneGroup);
sceneRefs.sceneGroup = sceneGroup;
// Add architectural groups to sceneGroup so GSAP scroll still works perfectly
sceneGroup.add(groups.world, groups.ai, groups.intelligence, groups.business, groups.effects, groups.uiSync, groups.debug);

// 1. Premium AI Core (Replacing the generic sphere)
const aiCore = new THREE.Group();
groups.aiCore.add(aiCore);
sceneRefs.aiCore = aiCore;

// --- PLANET & RINGS (Saturn-Style) ---

// 1. MASTERPIECE PROCEDURAL GAS GIANT (Swirling Simplex Storms + Luxury Palette)
const planetGeo = new THREE.SphereGeometry(1, 128, 128); // High-res for seamless shader detail

const planetShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_time;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    // Simplex noise helper
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i); 
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.zzzz);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      // Swirling bands coordinate
      vec3 coord = vPosition * 2.5;
      float n1 = snoise(vec3(coord.x, coord.y * 5.0 + u_time * 0.08, coord.z));
      float n2 = snoise(vec3(coord.x * 2.0 - u_time * 0.05, coord.y * 12.0, coord.z * 2.0));
      
      float band = sin(vPosition.y * 15.0 + n1 * 1.5 + n2 * 0.5) * 0.5 + 0.5;
      
      // Luxury Color Palette (Adonix Brand: Obsidian #0b1020, Gold #d4af37, Electric Blue #4a8cff)
      vec3 colObsidian = vec3(0.25, 0.28, 0.32); // Shimmering platinum charcoal
      vec3 colAmber = vec3(0.55, 0.60, 0.68); // Pearl silver
      vec3 colGold = vec3(0.85, 0.88, 0.92); // Bright silver
      vec3 colChampagne = vec3(1.0, 1.0, 1.0); // Pure diamond white
      vec3 colAIBlue = vec3(0.92, 0.96, 1.0); // Ice white aurora

      vec3 surfaceColor = mix(colObsidian, colAmber, smoothstep(0.1, 0.5, band));
      surfaceColor = mix(surfaceColor, colGold, smoothstep(0.5, 0.85, band));
      surfaceColor = mix(surfaceColor, colChampagne, smoothstep(0.85, 0.98, band));

      // Add subtle polar aurora blue storms at top and bottom
      float polar = smoothstep(0.6, 1.0, abs(vPosition.y));
      surfaceColor = mix(surfaceColor, colAIBlue, polar * (0.5 + 0.5 * sin(u_time + vPosition.x * 10.0)));

      // 3D Lighting & Fresnel Rim Glow
      vec3 lightDir = normalize(vec3(5.0, 3.0, 5.0));
      float diff = max(dot(vNormal, lightDir), 0.45); // Always bright and visible across entire sphere // Never pure black
      
      float fresnel = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
      fresnel = pow(fresnel, 3.0);
      vec3 rimColor = mix(colGold, colAIBlue, 0.3) * fresnel * 2.5;

      gl_FragColor = vec4(surfaceColor * diff + rimColor, 1.0);
    }
  `,
  uniforms: {
    u_time: { value: 0 },
    u_reveal: { value: 1.0 }
  }
};

const planetMat = new THREE.ShaderMaterial(planetShader);
const planet = new THREE.Mesh(planetGeo, planetMat);
aiCore.add(planet);
sceneRefs.planet = planet;
sceneRefs.planetShader = planetShader;

// Atmosphere / Rim Light Glow (Outer Halo Shell)
const rimGeo = new THREE.SphereGeometry(1.04, 64, 64);
const rimMat = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_rimIntensity;
    varying vec3 vNormal;
    void main() {
      float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
      rim = smoothstep(0.5, 1.0, rim);
      vec3 rimColor = vec3(0.9, 0.95, 1.0) * rim * u_rimIntensity; 
      gl_FragColor = vec4(rimColor, rim * 0.6 * u_rimIntensity);
    }
  `,
  uniforms: {
    u_rimIntensity: { value: 1.5 }
  },
  transparent: true,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
  depthWrite: false
});
const rimMesh = new THREE.Mesh(rimGeo, rimMat);
planet.add(rimMesh);
sceneRefs.rimMat = rimMat;

// Increase studio lighting for debris shimmer
const dirLight2 = new THREE.DirectionalLight(0xfff5e6, 2.5);
dirLight2.position.set(5, 3, 5);
scene.add(dirLight2);

const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight2);

// 2. MULTI-LAYERED VOLUMETRIC RINGS & INSTANCED DEBRIS BELT
const ringGeo = new THREE.RingGeometry(1.4, 2.8, 128);
const ringVertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const ringFragmentShader = `
  uniform float u_flare;
  uniform float u_time;
  uniform float u_reveal;
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    float dist = length(vPos);
    float normDist = (dist - 1.4) / 1.4; 
    
    // Staggered Ring Arc Sweep Reveal
    float angle = atan(vPos.y, vPos.x); // -3.14159 to 3.14159
    float normAngle = (angle + 3.14159265) / (2.0 * 3.14159265); // 0.0 to 1.0
    if (normAngle > u_reveal) {
      discard;
    }
    
    float alpha = sin(normDist * 40.0) * 0.5 + 0.5;
    alpha *= sin(normDist * 15.0 + u_time * 0.2) * 0.5 + 0.5;
    
    if (normDist > 0.55 && normDist < 0.6) alpha *= 0.05; // Cassini division gap
    if (normDist > 0.8 && normDist < 0.85) alpha *= 0.1;
    
    alpha *= smoothstep(0.0, 0.08, normDist) * smoothstep(1.0, 0.88, normDist);
    
    vec3 ringColor = mix(vec3(0.7, 0.75, 0.8), vec3(1.0, 1.0, 1.0), u_flare * 0.5);
    ringColor = mix(ringColor, vec3(1.0, 1.0, 1.0), smoothstep(0.4, 0.5, normDist) * u_flare);
    
    // Bright diamond laser tip at the leading edge as the ring draws itself open
    if (u_reveal < 0.99 && abs(normAngle - u_reveal) < 0.03) {
      ringColor += vec3(1.0, 1.0, 1.0) * 2.5;
      alpha = max(alpha, 0.95);
    }
    
    gl_FragColor = vec4(ringColor, alpha * (0.6 + u_flare * 0.6));
  }
`;
const ringMat = new THREE.ShaderMaterial({
  vertexShader: ringVertexShader,
  fragmentShader: ringFragmentShader,
  uniforms: {
    u_flare: { value: 0 },
    u_time: { value: 0 },
    u_reveal: { value: 1.0 }
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false
});

const rings = new THREE.Mesh(ringGeo, ringMat);
rings.rotation.x = Math.PI / 2 - 0.02; 
aiCore.add(rings);
sceneRefs.rings = rings;
sceneRefs.ringMat = ringMat;

// --- INSTANCED ASTEROID DEBRIS BELT (1,500 Shimmering Crystals) ---
const debrisCount = 1500;
const debrisGeo = new THREE.OctahedronGeometry(0.015, 0);
const debrisMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  emissiveIntensity: 3.5, // Cranked up so crystals are blinding white, never grey!
  roughness: 0.0,
  metalness: 0.1 // Low metalness avoids reflecting dark sky void
});
const debrisBelt = new THREE.InstancedMesh(debrisGeo, debrisMat, debrisCount);
const dummy = new THREE.Object3D();

for(let i = 0; i < debrisCount; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 1.45 + Math.random() * 1.3;
  const height = (Math.random() - 0.5) * 0.08;
  dummy.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
  dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
  const scale = 0.5 + Math.random() * 1.5;
  dummy.scale.set(scale, scale, scale);
  dummy.updateMatrix();
  debrisBelt.setMatrixAt(i, dummy.matrix);
}
rings.add(debrisBelt);
sceneRefs.debrisBelt = debrisBelt;

// 3. DEEP SPACE STARLIGHT & DUST FIELD (2,000 Floating Particles)
const dustCount = 2000;
const dustGeo = new THREE.BufferGeometry();
const dustPositions = new Float32Array(dustCount * 3);
const dustColors = new Float32Array(dustCount * 3);

for(let i = 0; i < dustCount; i++) {
  dustPositions[i*3] = (Math.random() - 0.5) * 25;
  dustPositions[i*3+1] = (Math.random() - 0.5) * 25;
  dustPositions[i*3+2] = (Math.random() - 0.5) * 25;

  // Mix of luxury gold and AI cyan starlight
  if (Math.random() > 0.3) {
    dustColors[i*3] = 1.0; dustColors[i*3+1] = 1.0; dustColors[i*3+2] = 1.0; // Gold
  } else {
    dustColors[i*3] = 0.85; dustColors[i*3+1] = 0.9; dustColors[i*3+2] = 0.95;  // AI Blue
  }
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

const dustMat = new THREE.PointsMaterial({
  size: 0.04,
  vertexColors: true,
  transparent: true,
  opacity: 0.85, blending: THREE.AdditiveBlending
});
const spaceDust = new THREE.Points(dustGeo, dustMat);
scene.add(spaceDust);
sceneRefs.spaceDust = spaceDust;

aiCore.scale.set(0.5, 0.5, 0.5);

// 2. Sprint 3B & 3C: Topological Intelligence Network
const particleCount = 400;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const originalParticlePositions = new Float32Array(particleCount * 3);

// Topological Graph Data
const networkNodes = [];
const networkEdges = [];

for(let i = 0; i < particleCount; i++) {
  // Random points in a sphere radius - INCREASED SCALE FOR VISUAL READABILITY
  const r = 6.0 * Math.cbrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos(2 * Math.random() - 1);
  
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);
  
  particlePositions[i*3] = x;
  particlePositions[i*3+1] = y;
  particlePositions[i*3+2] = z;
  
  originalParticlePositions[i*3] = x;
  originalParticlePositions[i*3+1] = y;
  originalParticlePositions[i*3+2] = z;

  // Assign Hierarchical Roles
  const randomVal = Math.random();
  let role = 'EDGE';
  if (randomVal < 0.05) role = 'CORE';
  else if (randomVal < 0.25) role = 'RELAY';

  networkNodes.push({ index: i, role, pos: new THREE.Vector3(x, y, z), edges: [] });
}

// Build Meaningful Connections
for(let i = 0; i < particleCount; i++) {
  const node = networkNodes[i];
  const candidates = [];
  
  for(let j = 0; j < particleCount; j++) {
    if (i === j) continue;
    const target = networkNodes[j];
    const distSq = node.pos.distanceToSquared(target.pos);
    candidates.push({ index: j, role: target.role, distSq });
  }
  
  candidates.sort((a, b) => a.distSq - b.distSq);
  
  let connectsTo = [];
  if (node.role === 'EDGE') {
    connectsTo = candidates.filter(c => c.role === 'RELAY').slice(0, 1);
  } else if (node.role === 'RELAY') {
    connectsTo = candidates.filter(c => c.role === 'CORE').slice(0, 1);
    const otherRelays = candidates.filter(c => c.role === 'RELAY').slice(0, 2);
    connectsTo.push(...otherRelays);
  } else if (node.role === 'CORE') {
    connectsTo = candidates.filter(c => c.role === 'CORE').slice(0, 2);
  }

  connectsTo.forEach(c => {
    // Avoid duplicate bidirectional edges
    const exists = networkEdges.some(e => (e.src === i && e.dst === c.index) || (e.src === c.index && e.dst === i));
    if (!exists) {
      networkEdges.push({ src: i, dst: c.index, assemblyOffset: Math.random() });
      node.edges.push(c.index);
      networkNodes[c.index].edges.push(i);
    }
  });
}

// Line Buffers
const linePositions = new Float32Array(networkEdges.length * 6);
const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.05,
  transparent: true,
  opacity: 0, // GSAP controls opacity
  blending: THREE.AdditiveBlending
});
const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
particleSystem.scale.set(0.1, 0.1, 0.1); 

const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xaaaaaa, // Slightly darker, distinct neural pathway color
  transparent: true,
  opacity: 0, // GSAP controls opacity
  blending: THREE.AdditiveBlending
});
const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
particleSystem.add(lineSystem);

sceneGroup.add(particleSystem);
sceneRefs.particleSystem = particleSystem;
sceneRefs.lineSystem = lineSystem;
sceneRefs.networkNodes = networkNodes;
sceneRefs.networkEdges = networkEdges;

// Sprint 3C: Signal Pool
const signalCount = 50;
const signalGeo = new THREE.BufferGeometry();
const signalPos = new Float32Array(signalCount * 3);
signalGeo.setAttribute('position', new THREE.BufferAttribute(signalPos, 3));
const signalMat = new THREE.PointsMaterial({
  color: 0xFFFFFF,
  size: 0.15,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});
const signalSystem = new THREE.Points(signalGeo, signalMat);
particleSystem.add(signalSystem); // Add relative to particle system
sceneRefs.signalSystem = signalSystem;
sceneRefs.signals = Array.from({length: signalCount}, () => ({ active: false, src: -1, dst: -1, progress: 0, speed: 0, pause: 0 }));

// Sprint 4A: Blueprint Engine
const maxBlueprints = 25; // Increased active count
const linesPerBP = 36; // Expanded for complex UI wireframes
const bpGeo = new THREE.BufferGeometry();
const bpPos = new Float32Array(maxBlueprints * linesPerBP * 6); // 2 vertices per line, 3 coords per vertex
bpGeo.setAttribute('position', new THREE.BufferAttribute(bpPos, 3));
const bpMat = new THREE.LineBasicMaterial({
  color: 0xFFFFFF, // Crisp engineering stark white
  transparent: true,
  opacity: 0.8, // Explicitly strong opacity
  blending: THREE.AdditiveBlending,
  depthTest: false, // Prevents Z-fighting and hiding behind background
  depthWrite: false
});
const blueprintSystem = new THREE.LineSegments(bpGeo, bpMat);
sceneGroup.add(blueprintSystem); // AUDIT FIX: Detached from local particle system constraint
sceneRefs.blueprintSystem = blueprintSystem;
sceneRefs.blueprints = Array.from({length: maxBlueprints}, () => ({
  active: false,
  nodeIdx: -1,
  type: 0,
  progress: 0,
  scale: 1.0 + Math.random() * 1.5, // 250-400% INCREASE
  timeOffset: Math.random() * 100,
  settled: false,
  gridTargetX: 0,
  gridTargetY: 0,
  gridTargetZ: 0
}));
sceneRefs.blueprintPulse = 0;




// --- Custom WebGL Fluid Shader (Axiom Style) ---
const uniforms = {
  // sceneRefs attached below
  u_time: { value: 0.0 },
  u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  u_scroll: { value: 0.0 },
  u_pulse: { value: 0.0 },
  u_blueprint: { value: 0.0 }
};
sceneRefs.uniforms = uniforms;

ResizeManager.subscribe((w, h) => {
  sceneRefs.uniforms.u_resolution.value.set(w, h);
});

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_scroll;
  uniform float u_pulse;
  uniform float u_blueprint;
  varying vec2 vUv;

  // Generic 2D Hash
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // 2D Noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  // FBM (Fractal Brownian Motion)
  float fbm(vec2 p) {
    float f = 0.0;
    float w = 0.5;
    for(int i = 0; i < 5; i++) {
      f += w * noise(p);
      p *= 2.0;
      w *= 0.5;
    }
    return f;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Core influence: Gravitational field warp with Pulse spike
    float coreDist = length(vUv - 0.5);
    float pulseEffect = 1.0 + u_pulse * 6.0;
    
    // As scroll progresses, bend space more intensely, but delay until 60% scroll
    float progress = clamp(u_scroll / 10.0, 0.0, 1.0);
    float plasmaProgress = clamp((progress - 0.6) / 0.4, 0.0, 1.0);
    
    float warpIntensity = smoothstep(0.6, 0.0, coreDist) * 0.03 * (1.0 + 0.2 * sin(u_time * 1.5)) * pulseEffect;
    warpIntensity += plasmaProgress * 0.08 * smoothstep(0.8, 0.0, coreDist); // Additional bending delayed
    warpIntensity += u_blueprint * 0.15 * smoothstep(1.0, 0.0, coreDist); // Blueprint completion ripple
    
    vec2 warpedSt = st + normalize(vUv - 0.5) * warpIntensity;

    // Time and Scroll influence (Slower, calmer field)
    float t = u_time * 0.05 + u_scroll * 0.8;

    // Domain warping (Reduced distortion & noise)
    vec2 q = vec2(0.);
    q.x = fbm(warpedSt + 0.00 * t);
    q.y = fbm(warpedSt + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm(warpedSt + 0.5 * q + vec2(1.7, 9.2) + 0.08 * t);
    r.y = fbm(warpedSt + 0.5 * q + vec2(8.3, 2.8) + 0.06 * t);

    float f = fbm(warpedSt + r);

    // Colors mimicking calm digital energy / intelligent field
    vec3 color1 = vec3(0.0, 0.0, 0.0); // True Obsidian Black // Deep space dark
    vec3 color2 = vec3(0.008, 0.008, 0.008); // Barely perceptible charcoal wave // Deep navy/cyan
    vec3 color3 = vec3(0.0, 0.0, 0.0); // Pure void   // Pure void
    vec3 color4 = vec3(0.004, 0.004, 0.004); // Deep black // Subtle violet

    vec3 color = mix(color1, color2, clamp((f * f) * 3.0, 0.0, 1.0));
    color = mix(color, color3, clamp(length(q), 0.0, 1.0));
    color = mix(color, color4, clamp(length(r.x), 0.0, 1.0));
    
    // Apply core influence (very subtle glow)
    color += vec3(0.01, 0.01, 0.01) * smoothstep(0.5, 0.0, coreDist);

    // Vignette
    vec2 center = vUv - 0.5;
    float vignette = 1.0 - smoothstep(0.4, 1.0, length(center));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
  depthWrite: false,
  depthTest: false
});

const planeGeometry = new THREE.PlaneGeometry(2, 2);
const backgroundMesh = new THREE.Mesh(planeGeometry, shaderMaterial);
// We use a separate scene or just scale it massive for Perspective camera to simulate orthographic bg
backgroundMesh.position.z = -10;
backgroundMesh.scale.set(20, 20, 1);
scene.add(backgroundMesh);


/* ==========================================================================
   SCROLL ANIMATION & TIMELINE (GSAP + ScrollTrigger)
   ========================================================================== */

// Section Fade Ins
const sections = document.querySelectorAll('.scroll-section');
sections.forEach((sec, idx) => {
  if (idx === 0) return; 
  gsap.fromTo(sec.querySelector('.container'),
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sec,
        start: "top 75%",
        end: "bottom 25%", // keep it active until the bottom of the section passes
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

// Main 3D Scroll Timeline (Choreographed Staggered Reveal + Parallax Orbit)
const main3DTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.2, // Smooth cinematic scrubbing
  }
});

// Set initial baseline states at time 0 (start of scroll reveal)
main3DTimeline.set(aiCore.scale, { x: 0.85, y: 0.85, z: 0.85 }, 0)
  .set(camera.position, { x: 0, y: 0, z: 5.2 }, 0)
  .set(sceneRefs.planet.scale, { x: 0.65, y: 0.65, z: 0.65 }, 0)
  .set(sceneRefs.planet.rotation, { x: 0.1, y: 0, z: 0 }, 0)
  .set(sceneRefs.ringMat.uniforms.u_reveal, { value: 0.0 }, 0) // Rings initially drawn closed!
  .set(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.05, y: 0, z: 0 }, 0) // Edge-on tilt!
  .set(sceneRefs.debrisBelt.scale, { x: 0.01, y: 0.01, z: 0.01 }, 0)
  .set(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 0.2 }, 0)
  .set(sceneRefs.ringMat.uniforms.u_flare, { value: 0.1 }, 0)
  .set(sceneRefs.spaceDust.position, { z: -8 }, 0);

// --- PHASE 1: PLANET BODY REVEAL & 3D ROTATION (0.00 -> 0.11 : 0% to ~40% of reveal range) ---
// Planet scales up independently with back.out overshoot while rotating in 3D space toward camera
main3DTimeline.to(sceneRefs.planet.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.11, ease: "back.out(1.2)" }, 0.00)
  .to(sceneRefs.planet.rotation, { x: 0.3, y: Math.PI * 0.5, duration: 0.11, ease: "power3.out" }, 0.00)
  .to(camera.position, { z: 4.2, y: 0.3, duration: 0.11, ease: "power2.out" }, 0.00);

// --- PHASE 2: RING ARC SWEEP & 3D TILT (0.08 -> 0.20 : staggered after planet start) ---
// Ring draws itself open via u_reveal clip while tilting from edge-on to full 3D viewing angle
main3DTimeline.to(sceneRefs.ringMat.uniforms.u_reveal, { value: 1.0, duration: 0.12, ease: "power3.out" }, 0.08)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.55, y: -0.25, duration: 0.12, ease: "power3.out" }, 0.08)
  .to(sceneRefs.debrisBelt.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.12, ease: "back.out(1.1)" }, 0.08);

// --- PHASE 3: RIM GLOW & STARLIGHT DUST SETTLE (0.16 -> 0.28 : final settling phase) ---
// Atmosphere halo blooms to full cyber-luxury brilliance and starlight field glides forward into focus
main3DTimeline.to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 3.0, duration: 0.12, ease: "expo.out" }, 0.16)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 1.5, duration: 0.12, ease: "power2.out" }, 0.16)
  .to(sceneRefs.spaceDust.position, { z: 0, duration: 0.12, ease: "power3.out" }, 0.16);

// --- PHASE 4: SERVICES PARALLAX SWEEP (0.28 -> 0.46) ---
// Fully assembled celestial system glides majestically to the right side of the screen to stand beside Services cards
main3DTimeline.to(aiCore.position, { x: 2.3, y: -0.3, z: 0.3, duration: 0.18, ease: "power2.inOut" }, 0.28)
  .to(camera.position, { x: 1.5, y: -0.2, z: 2.6, duration: 0.18, ease: "power2.inOut" }, 0.28)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.35, y: -0.15, duration: 0.18, ease: "power2.inOut" }, 0.28)
  .to(aiCore.rotation, { y: Math.PI * 1.6, duration: 0.18, ease: "power1.inOut" }, 0.28)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 3.2, duration: 0.18, ease: "none" }, 0.28);

// --- SLIDES 3 to 6 (AI, RESULTS, CASES, CONTACT: 0.46 -> 1.0) --- CALM BACKGROUND PRESENCE
main3DTimeline.to(aiCore.position, { x: 1.2, y: 0.2, z: 0.0, duration: 0.18, ease: "power1.inOut" }, 0.46)
  .to(camera.position, { x: 1.0, y: 0.0, z: 3.2, duration: 0.18, ease: "power1.inOut" }, 0.46)
  .to(aiCore.scale, { x: 0.85, y: 0.85, z: 0.85, duration: 0.18, ease: "power1.inOut" }, 0.46)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 1.8, duration: 0.18, ease: "none" }, 0.46);

main3DTimeline.to(aiCore.position, { x: 1.6, y: 0.0, z: -0.5, duration: 0.18, ease: "power1.inOut" }, 0.64)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.25, duration: 0.18, ease: "power1.inOut" }, 0.64)
  .to(aiCore.rotation, { y: Math.PI * 2.2, duration: 0.18, ease: "none" }, 0.64);

main3DTimeline.to(aiCore.position, { x: 0, y: 0.5, z: -2.5, duration: 0.18, ease: "power2.inOut" }, 0.82)
  .to(camera.position, { x: 0, y: 0, z: 5.5, duration: 0.18, ease: "power2.inOut" }, 0.82)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 0.8, duration: 0.18, ease: "none" }, 0.82)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.1, duration: 0.18, ease: "none" }, 0.82);

// 3. Add Continuous Self-Rotation in tick()
// Trigger results counters & bars animation when reaching results section
ScrollTrigger.create({
  trigger: "#results",
  start: "top 50%",
  onEnter: () => {
    const resEl = document.getElementById("results"); if (resEl) resEl.classList.add("active-anim");
    animateCounters();
  }
});

/* ==========================================================================
   INTERACTIVE DETAILS
   ========================================================================== */

// Counters Animation
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((cnt) => {
    const target = parseFloat(cnt.getAttribute("data-target"));
    const isLeads = cnt.closest("#holo-leads") || cnt.innerText.includes(",");
    
    gsap.fromTo(cnt, 
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          // Format with commas or SAR
          let val = Math.floor(this.targets()[0].textContent);
          if (cnt.id === "holo-leads" || isLeads) {
            cnt.innerText = val.toLocaleString();
          } else if (cnt.closest("#holo-revenue")) {
            cnt.innerText = val + "M+ SAR";
          } else if (cnt.closest("#holo-ai")) {
            cnt.innerText = val + "%";
          } else if (cnt.closest(".result-card")) {
            if (target === 500) {
              cnt.innerText = val;
            } else if (target === 10) {
              cnt.innerText = val;
            } else if (target === 300) {
              cnt.innerText = val;
            } else {
              cnt.innerText = val;
            }
          }
        }
      }
    );
  });
}
// Trigger early counts for Hero loading
animateCounters();

// Cursor Follow Animation
const cursor = document.getElementById("custom-cursor");
const cursorRing = document.getElementById("custom-cursor-ring");

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.05 });
  gsap.to(cursorRing, { x: e.clientX, y: e.clientY, duration: 0.15 });
  // Store normalized mouse coordinates for 3D Magnetic Parallax
  window.mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
  window.mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Cursor Hover Effects
const interactiveEls = document.querySelectorAll("a, button, select, input, textarea, .service-item, .ind-btn");
interactiveEls.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    cursorRing.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    cursorRing.classList.remove("hover");
  });
});

// Mobile Menu Navigation
const mobileToggle = document.getElementById("mobile-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (mobileToggle && mobileMenu) {
  const mobileLinks = document.querySelectorAll(".mobile-nav-links a");

  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });
}

// High-Resolution Spotlight & 3D Parallax Tilt for all interactive cards
const premiumCards = document.querySelectorAll(".holo-card, .service-item, .industry-showcase-card, .metric-item, .test-card, .result-card");
premiumCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set variables for radial CSS gradient spotlight
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    
    // Smooth 3D Perspective Tilt
    const tiltX = (rect.height / 2 - y) / 18;
    const tiltY = (x - rect.width / 2) / 18;
    
    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 1.02,
      duration: 0.25,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  });
});

// Live AI Console Logs terminal
const terminalLogs = document.getElementById("terminal-logs");
const logMessages = [
  { text: "ADONIX CORE // Initializing connection to KSA regional nodes...", type: "system" },
  { text: "Status Check: Riyadh Data Server [ONLINE] ping 4ms", type: "cmd" },
  { text: "Status Check: AI Orchestrator [ACTIVE] Node v3.5", type: "cmd" },
  { text: "System ready. Listening for pipeline triggers...", type: "system" },
  { text: ">> INCOMING TRANSMISSION: lead_qualification_pipeline", type: "alert" },
  { text: "Analyzing query from: CEO, Al-Ajlan Holding Group", type: "system" },
  { text: "Lead data extracted. Context: CRM migration and SEO automation", type: "cmd" },
  { text: "AI Decision: Auto-qualified. Priority level: ENTERPRISE [98.4% Confidence]", type: "alert" },
  { text: "Executing lead sync webhook to Salesforce CRM... SUCCESS.", type: "system" },
  { text: "Scheduling AI voice follow-up appointment call... Triggered.", type: "system" },
  { text: ">> PIPELINE SUCCESS: Lead qualified & processed in 12.8s", type: "alert" },
  { text: "Optimization module check: Server-side tracking GTM active", type: "cmd" },
  { text: "Ad-spend optimization engine running: Target CPA reduced by 31%", type: "system" }
];

let logIndex = 0;
function appendTerminalLog() {
  if (!terminalLogs) return;
  
  const log = logMessages[logIndex];
  const p = document.createElement("p");
  p.className = `terminal-line ${log.type}`;
  p.innerText = `[${new Date().toLocaleTimeString()}] ${log.text}`;
  
  terminalLogs.appendChild(p);
  terminalLogs.scrollTop = terminalLogs.scrollHeight;
  
  logIndex = (logIndex + 1) % logMessages.length;
}

// Tick terminal logs
setInterval(appendTerminalLog, 3000);
// Add first few instantly
for (let i = 0; i < 4; i++) {
  appendTerminalLog();
}

// Services panel interaction
const serviceDetails = [
  {
    title: { en: "SEO & Organic Growth", ar: "السيو والنمو العضوي" },
    desc: { en: "Dominate search engine results in the GCC. We combine advanced semantic research, structural crawls, and premium link acquisitions to build stable organic search pipelines.", ar: "تصدر نتائج محركات البحث في الخليج. ندمج بين الكلمات البحثية المتقدمة، تحسين سرعة الأكواد، وبناء الروابط القوية لخلق تدفق مستدام للمشترين." },
    icon: "🔍",
    metrics: [
      { val: "+320%", lbl: { en: "Traffic Growth", ar: "نمو الزوار" } },
      { val: "100%", lbl: { en: "Ethical SEO", ar: "سيو متوافق" } }
    ]
  },
  {
    title: { en: "Paid Acquisition (Google/Social)", ar: "الحملات الإعلانية المدفوعة" },
    desc: { en: "Hyper-focused Google Search, YouTube, Meta, TikTok, and Snapchat campaigns targeted to regional demographics. Engineered for ROI, scale, and customer acquisition efficiency.", ar: "حملات فائقة الاستهداف على جوجل، يوتيوب، ميتا، تيك توك وسناب شات مصممة للوصول لشرائح المشترين المناسبة بالمنطقة. نركز على أعلى عائد بأقل كلفة." },
    icon: "📊",
    metrics: [
      { val: "4.8x", lbl: { en: "Average ROAS", ar: "متوسط العائد الإعلاني" } },
      { val: "500M+ SAR", lbl: { en: "Managed Budget", ar: "ميزانيات مدارة" } }
    ]
  },
  {
    title: { en: "UX Design & Web Dev", ar: "تصميم الواجهات وتطوير المواقع" },
    desc: { en: "Stunning, high-performance web applications built for premium GCC brands. We combine glassmorphism, WebGL interactive flows, and SEO structural engineering.", ar: "تطوير تطبيقات ومواقع ويب متميزة وفائقة السرعة للعلامات الرائدة بالخليج. ندمج المؤثرات ثلاثية الأبعاد مع هندسة الأكواد السريعة المتوافقة مع محركات البحث." },
    icon: "💻",
    metrics: [
      { val: "< 1.2s", lbl: { en: "Load Time", ar: "سرعة التحميل" } },
      { val: "99.9%", lbl: { en: "Uptime", ar: "استقرار التشغيل" } }
    ]
  },
  {
    title: { en: "AI Automations & Chatbots", ar: "أنظمة الأتمتة والمساعد الرقمي" },
    desc: { en: "Automate core operations, customer handling, and CRM entries. Deploy custom NLP bots qualified to answer complex enterprise requests in English and Arabic.", ar: "أتمتة العمليات الأساسية للمؤسسة، والرد الفوري على العملاء. تفعيل مساعدين ذكيين مدربين على الإجابة على استفسارات العملاء بدقة باللغتين العربية والإنجليزية." },
    icon: "🤖",
    metrics: [
      { val: "24/7", lbl: { en: "Availability", ar: "متاح على مدار الساعة" } },
      { val: "90%", lbl: { en: "Cost Reduction", ar: "توفير التكلفة التشغيلية" } }
    ]
  },
  {
    title: { en: "AI Voice & Sales Agents", ar: "وكلاء المبيعات والصوت الذكي" },
    desc: { en: "Intelligent voice agents mimicking human tones, trained to handle client qualification, outbound calls, and system appointments automatically and securely.", ar: "وكلاء صوت ذكي يحاكون نبرة صوت طبيعية، مدربين على تأهيل المتصلين الجدد وجدولة المواعيد مع فريق مبيعاتك تلقائياً وبأمان تام." },
    icon: "📞",
    metrics: [
      { val: "< 1s", lbl: { en: "Response Delay", ar: "تأخير الاستجابة" } },
      { val: "Arabic/English", lbl: { en: "Bilingual Supported", ar: "دعم كامل للغتين" } }
    ]
  }
];

const serviceItems = document.querySelectorAll(".service-item");
const displayTitle = document.getElementById("service-detail-title");
const displayDesc = document.getElementById("service-detail-desc");
const displayIcon = document.getElementById("service-detail-icon");
const displayMetrics = document.getElementById("service-detail-metrics");

serviceItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove active class
    serviceItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    const index = parseInt(item.getAttribute("data-index"));
    const data = serviceDetails[index];

    // Glow effect trigger in ThreeJS (change light colors or pulse core)
    gsap.fromTo(aiCoreGroup.rotation, { y: aiCoreGroup.rotation.y }, { y: aiCoreGroup.rotation.y + Math.PI / 2, duration: 0.8 });
    
    // Animate HTML text update
    gsap.to([displayTitle, displayDesc, displayMetrics], {
      opacity: 0,
      y: -10,
      duration: 0.25,
      onComplete: () => {
        displayTitle.innerText = data.title[currentLang];
        displayDesc.innerText = data.desc[currentLang];
        displayIcon.innerText = data.icon;
        
        // Render dynamic metrics
        displayMetrics.innerHTML = data.metrics.map(m => `
          <div class="metric-item">
            <span class="metric-val">${m.val}</span>
            <span class="metric-lbl">${m.lbl[currentLang]}</span>
          </div>
        `).join('');

        gsap.to([displayTitle, displayDesc, displayMetrics], {
          opacity: 1,
          y: 0,
          duration: 0.25
        });
      }
    });
  });
});

// Industries panel interaction
const industryDetails = {
  realestate: {
    title: { en: "Real Estate Growth Engines", ar: "محركات النمو العقاري" },
    desc: { en: "Connecting qualified premium property buyers with luxury developments using automated lead tracking and hyper-targeted advertising campaigns.", ar: "ربط مشتري العقارات الفاخرة مباشرة مع المطورين العقاريين الكبار باستخدام استهداف إعلاني دقيق وتصفية فورية للعملاء عبر الذكاء الاصطناعي." },
    statVal: "-42%",
    statLbl: { en: "Avg Lead Cost Reduction", ar: "متوسط خفض تكلفة العميل" }
  },
  healthcare: {
    title: { en: "Healthcare & Biotech Scaling", ar: "توسيع الرعاية الطبية الحيوية" },
    desc: { en: "Managing HIPPA-compliant marketing funnels that route patient inquiries to top specialists, utilizing AI scheduling integrations to remove front-desk friction.", ar: "إدارة مسارات جذب المرضى وتوجيههم للأخصائيين مع تفعيل الحجز التلقائي بالذكاء الاصطناعي لرفع كفاءة العيادات والمشافي." },
    statVal: "+88%",
    statLbl: { en: "Appt Booking Rate", ar: "معدل تأكيد المواعيد" }
  },
  government: {
    title: { en: "Government Digital Services", ar: "الخدمات الحكومية الرقمية" },
    desc: { en: "Supporting Vision 2030 agency portals with secure, high-tech customer satisfaction funnels, digital dashboards, and modern layout optimization.", ar: "دعم الهيئات والمنصات الحكومية التابعة للرؤية بمسارات آمنة لاستطلاع رضا المواطنين، ولوحات معلومات ذكية وواجهات حديثة." },
    statVal: "100%",
    statLbl: { en: "Regulatory Compliance", ar: "التوافق مع الأنظمة الحكومية" }
  },
  ecommerce: {
    title: { en: "E-Commerce Luxury Scaling", ar: "التجارة الإلكترونية الفاخرة" },
    desc: { en: "Driving digital sales for elite GCC perfume, retail, and lifestyle brands via pixel server-side events, catalog syncs, and retention CRM flows.", ar: "مضاعفة مبيعات منتجات التجزئة الفاخرة بالخليج من خلال ربط الخوادم بالأكواد البرمجية مباشرة ومتابعات الرسائل المهيأة للشراء." },
    statVal: "6.2x",
    statLbl: { en: "Max Campaign ROAS", ar: "أعلى عائد حملة إعلانية" }
  },
  hospitality: {
    title: { en: "Hospitality & Tourism Scaling", ar: "السياحة والضيافة الفاخرة" },
    desc: { en: "Building premium booking experiences for boutique resorts and cultural assets, connecting high-net-worth individuals to global travel destinations.", ar: "بناء منصات حجز فاخرة للمنتجعات والمزارات الثقافية، وجذب السياح وأصحاب الملاءة المالية المرتفعة محلياً ودولياً." },
    statVal: "+150%",
    statLbl: { en: "Direct Hotel Bookings", ar: "الحجوزات الفندقية المباشرة" }
  },
  finance: {
    title: { en: "Finance & Fintech Growth", ar: "نمو قطاع الفينتك والاستثمار" },
    desc: { en: "Deploying high-security marketing funnels focused on lead acquisition for investment portals, asset managers, and financial startups across KSA.", ar: "بناء مسارات ترويجية آمنة عالية التشفير لاستقطاب المستثمرين لشركات التقنية المالية وإدارة الأصول في المملكة." },
    statVal: "-35%",
    statLbl: { en: "Acquisition Cost (CPA)", ar: "خفض تكلفة العميل المكتسب" }
  }
};

const indBtns = document.querySelectorAll(".ind-btn");
if (indBtns.length > 0) {
  const indDisplayTitle = document.getElementById("ind-display-title");
  const indDisplayDesc = document.getElementById("ind-display-desc");
  const indDisplayVal = document.getElementById("ind-display-val");
  const indDisplayLbl = document.querySelector(".stat-lbl");

  indBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      indBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-ind");
      const data = industryDetails[key];

      // Dynamic rotation of miniature industry worlds on click
      const indIndex = Array.from(indBtns).indexOf(btn);
      gsap.to(industryWorlds[indIndex].group.rotation, { y: industryWorlds[indIndex].group.rotation.y + Math.PI, duration: 1.2, ease: "power2.out" });

      // Animate text transition
      gsap.to(".industry-showcase-card", {
        opacity: 0,
        scale: 0.98,
        duration: 0.25,
        onComplete: () => {
          indDisplayTitle.innerText = data.title[currentLang];
          indDisplayDesc.innerText = data.desc[currentLang];
          indDisplayVal.innerText = data.statVal;
          indDisplayLbl.innerText = data.statLbl[currentLang];
          
          gsap.to(".industry-showcase-card", {
            opacity: 1,
            scale: 1,
            duration: 0.25
          });
        }
      });
    });
  });
}

// Process steps progress indicator
if (document.querySelector(".process-section")) {
  ScrollTrigger.create({
  trigger: ".process-section",
  start: "top 40%",
  end: "bottom 60%",
  scrub: true,
  onUpdate: (self) => {
    // Fill the progress bar
    document.getElementById("process-progress-indicator").style.width = (self.progress * 100) + "%";
    
    // Light up step items sequentially based on percentage
    const stepCount = 5;
    for (let i = 1; i <= stepCount; i++) {
      const stepEl = document.getElementById(`step-${i}`);
      const triggerThreshold = (i - 1) / stepCount;
      if (self.progress >= triggerThreshold) {
        stepEl.classList.add("active");
      } else {
        stepEl.classList.remove("active");
      }
    }
  }
});
}

// Contact Form submission feedback animation
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");
const submitBtn = document.getElementById("submit-btn");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Lock submit button
    submitBtn.disabled = true;
    formFeedback.className = "form-feedback-message";
    formFeedback.innerText = currentLang === "en" ? "Transmitting information securely..." : "جاري إرسال البيانات بشكل آمن...";
    
    // Simulate API pipeline transmission
    setTimeout(() => {
      formFeedback.className = "form-feedback-message success";
      formFeedback.innerText = currentLang === "en" 
        ? "✓ Strategic consult request received. Our AI voice agent will call you in 1 minute." 
        : "✓ تم استقبال طلب الاستشارة بنجاح. سيتصل بك المساعد الصوتي الذكي خلال دقيقة واحدة.";
      
      // Reset form
      contactForm.reset();
      submitBtn.disabled = false;
      
      // Remove success message after a while
      setTimeout(() => {
        formFeedback.innerText = "";
      }, 5000);
    }, 1500);
  });
}

// Update year in footer
const yearEl = document.getElementById("year"); if (yearEl) yearEl.innerText = new Date().getFullYear();

/* ==========================================================================
   SEMANTIC SCENE PRESETS
   ========================================================================== */
const scenePreset = document.body.dataset.scenePreset || 'HOME';
const isIdlePage = scenePreset !== 'HOME';
let targetProgress = 0;
if (scenePreset === 'ABOUT') targetProgress = 0.30;
if (scenePreset === 'SERVICES') targetProgress = 0.85;
if (scenePreset === 'CONTACT') targetProgress = 0.75;

let currentIdleProgress = 0.0;
let entranceComplete = false;

// 1.5s Cinematic Entrance Tween
if (isIdlePage) {
  gsap.to({ p: 0.0 }, {
    p: targetProgress,
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: function() {
      currentIdleProgress = this.targets()[0].p;
    },
    onComplete: () => { entranceComplete = true; }
  });
}

/* ==========================================================================
   ANIMATION TICK LOOP
   ========================================================================== */
const clock = new THREE.Clock();

// Add camera idle drift base variables
let cameraBaseX = 0;
let cameraBaseY = 0;

function tick() {
  const elapsedTime = clock.getElapsedTime();

  // Update Shader Uniforms
  uniforms.u_time.value = elapsedTime;
  
  // Continuous rotation for objects
  if (sceneGroup) {
    if (typeof aiCore !== 'undefined') {
      // Continuous slow self-rotation on the planet's axis
      if (sceneRefs.planet) {
        sceneRefs.planet.rotation.y = elapsedTime * 0.05;
        
      }
      // Slower independent ring rotation
      if (sceneRefs.rings) {
        sceneRefs.rings.rotation.z = elapsedTime * -0.02;
      }
    }

    particleSystem.rotation.y = elapsedTime * 0.02;
  }
  
  // High-Resolution Magnetic 3D Mouse Parallax
  if (typeof window.mouseNormX !== 'undefined' && typeof aiCore !== 'undefined' && aiCore) {
    aiCore.rotation.x += (window.mouseNormY * 0.18 - aiCore.rotation.x) * 0.05;
    aiCore.rotation.z += (-window.mouseNormX * 0.18 - aiCore.rotation.z) * 0.05;
    
    // Opposite parallax depth layer for starlight field
    if (sceneRefs.spaceDust) {
      sceneRefs.spaceDust.position.x += (-window.mouseNormX * 0.5 - sceneRefs.spaceDust.position.x) * 0.05;
      sceneRefs.spaceDust.position.y += (-window.mouseNormY * 0.5 - sceneRefs.spaceDust.position.y) * 0.05;
    }
  }

  // Extremely subtle camera drift
  camera.position.x = cameraBaseX + Math.sin(elapsedTime * 0.2) * 0.015;
  camera.position.y = cameraBaseY + Math.cos(elapsedTime * 0.15) * 0.015;

  // Render Scene
  if (sceneRefs.composer) {
    sceneRefs.composer.render();
  } else {
    renderer.render(scene, camera);
  }

  // Next frame
  requestAnimationFrame(tick);
}

// Start ThreeJS loop
tick();

/* ==========================================================================
   RESIZE DELEGATED TO RESIZEMANAGER
   ========================================================================== */

/* ==========================================================================
   CINEMATIC LOADER TIMER & ENTRANCE DROP ANIMATION
   ========================================================================== */
function triggerEntranceAnimation() {
  if (typeof aiCore === 'undefined' || !aiCore) return;
  
  console.log('🚀 Triggering Saturn Drop Entrance Animation!');
  
  // Set initial drop start positions (high above and deep in space)
  aiCore.position.set(0, 7.5, -4);
  aiCore.scale.set(0.1, 0.1, 0.1);
  if (sceneRefs.rings) sceneRefs.rings.rotation.set(Math.PI / 2 + 0.8, 0.5, 0);
  if (sceneRefs.ringMat) sceneRefs.ringMat.uniforms.u_flare.value = 2.0;

  // Drop animation into Hero center
  gsap.to(aiCore.position, {
    x: 0,
    y: 0,
    z: 0,
    duration: 2.4,
    ease: "power3.out"
  });
  gsap.to(aiCore.scale, {
    x: 0.85,
    y: 0.85,
    z: 0.85,
    duration: 2.4,
    ease: "elastic.out(1, 0.75)"
  });
  if (sceneRefs.rings) {
    gsap.to(sceneRefs.rings.rotation, {
      x: Math.PI / 2 - 0.2,
      y: 0,
      z: 0,
      duration: 2.6,
      ease: "power3.out"
    });
  }
  if (sceneRefs.ringMat) {
    sceneRefs.ringMat.uniforms.u_reveal.value = 0.0;
    gsap.to(sceneRefs.ringMat.uniforms.u_reveal, { value: 1.0, duration: 2.2, ease: "power3.out", delay: 0.4 });
    gsap.to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.2, duration: 2.0, ease: "power2.out" });
  }

  // Animate Hero UI elements dropping in smoothly
  if (document.querySelector(".main-headline")) {
    gsap.fromTo(".main-headline, .subheadline, .hero-actions, .hologram-dashboards",
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.4 }
    );
  }
}
const loader = document.getElementById("loader");
const loaderBar = document.getElementById("loader-bar");
const loaderPercent = document.getElementById("loader-percent");

if (loader && loaderBar && loaderPercent) {
  if (sessionStorage.getItem('adonix_initialized')) {
    loader.style.display = 'none';
    loader.classList.add("loaded");
    setTimeout(() => triggerEntranceAnimation(), 100);
    if (document.body) {
      gsap.fromTo(document.body, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
    }
  } else {
    let progressVal = 0;
    const loaderInterval = setInterval(() => {
      progressVal += Math.floor(Math.random() * 8) + 2;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(loaderInterval);
        sessionStorage.setItem('adonix_initialized', 'true');
        setTimeout(() => loader.classList.add("loaded"), 300);
      }
      loaderBar.style.width = progressVal + "%";
      loaderPercent.innerText = progressVal + "%";
    }, 35);
  }
}

/* ==========================================================================
   SMOOTH INTERNAL NAVIGATION
   ========================================================================== */
document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    // Only intercept internal page links
    if (href && (href.endsWith('.html') || href === '/')) {
      e.preventDefault();
      
      let navigated = false;
      const executeNavigation = () => {
        if (!navigated) {
          navigated = true;
          window.location.assign(href);
        }
      };

      // Fade out current page before navigating
      gsap.to(document.body, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: executeNavigation
      });
      
      // Fallback: If GSAP transition fails or is blocked, force navigation
      setTimeout(executeNavigation, 700);
    }
  });
});


/* ==========================================================================
   MICRO-ANIMATIONS: 3D GLASS TILT & CYBER SCRAMBLE
   ========================================================================== */

// 1. 3D Glass Card Tilt Effect
document.querySelectorAll('.glass').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-10 to +10 degrees max)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'none';
    
    // Add subtle glare follow
    card.style.boxShadow = `${(centerX - x) / 5}px ${(centerY - y) / 5}px 30px rgba(212, 175, 55, 0.1)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
    card.style.boxShadow = 'none';
  });
});
