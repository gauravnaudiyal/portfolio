import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Feather } from 'lucide-react';

// --- RESUME DATA ---
const resumeData = {
  name: "Gaurav Naudiyal",
  role: "Backend & Full Stack Engineer",
  location: "Dublin, Ireland",
  auth: "Stamp 1G (Full-time work rights)",
  contact: "gauravn2211@gmail.com | +353 89 250 6483",
  summary: "Computer Science MSc graduate focusing on backend development, distributed systems, and RESTful APIs. I like building things that scale and work beautifully behind the scenes.",
  skills: {
    languages: "Java, Go, Python, TypeScript, SQL",
    backend: "Spring Boot, Node.js, Express, REST/WebSockets",
    infra: "PostgreSQL, MongoDB, Supabase, Docker, CI/CD"
  },
  experience: [
    {
      id: "EXP_01",
      company: "Hackveda",
      role: "Full Stack/Backend Intern",
      period: "Feb '24 - Sep '24",
      details: [
        "Built Node.js/Express pipelines for daily stock market data.",
        "Designed PostgreSQL/MongoDB schemas with composite indexing.",
        "Secured APIs with JWT & RBAC."
      ]
    },
    {
      id: "EXP_02",
      company: "Pratinik Infotech",
      role: "Data & Backend Intern",
      period: "Mar '23 - Sep '23",
      details: [
        "Optimized massive SQL queries (CTEs, window functions).",
        "Wrote Python ETL scripts for messy CSV/JSON ingestion."
      ]
    }
  ],
  projects: [
    {
      id: "PRJ_01",
      title: "Transport Booking Platform",
      tech: "Java Spring Boot, Go, PostgreSQL, Docker",
      description: "8-service microservices architecture with a Go API gateway handling routing and auth.",
      github: "https://github.com/gauravnaudiyal/distributed-transport-platform"
    },
    {
      id: "PRJ_02",
      title: "Hidden Identity Chess",
      tech: "Node.js, Socket.io, JavaScript",
      description: "Real-time multiplayer fog-of-war chess. Server filters hidden piece data to prevent cheating.",
      github: "https://github.com/gauravnaudiyal/hidden-identity-chess",
      live: "https://hidden-identity-chess.onrender.com/"
    },
    {
      id: "PRJ_03",
      title: "Multiplayer VR Gallery",
      tech: "Unity, PostgreSQL, Supabase",
      description: "Real-time RPC networking syncing VR player movements, secured by Supabase RLS.",
      github: "https://github.com/gauravnaudiyal/vr_art_gallery"
    },
    {
      id: "PRJ_04",
      title: "Boxing Punch Detector",
      tech: "Python, OpenCV, NumPy",
      description: "Live CV pipeline tracking upper-body landmarks to classify punches at 30+ FPS.",
      github: "https://github.com/gauravnaudiyal/boxing_puncher_detector"
    }
  ],
  education: [
    {
      institution: "Trinity College Dublin",
      degree: "MSc Computer Science",
      period: "2025 - 2026",
      details: "2:1 (Upper Second-Class Honours)."
    },
    {
      institution: "GGSIPU",
      degree: "BCA",
      period: "2022 - 2025",
      details: "GPA: 7.7/10.0"
    }
  ]
};

// --- AI SYSTEM PROMPT ---
const systemPrompt = `
You are an AI assistant representing Gaurav Naudiyal, embedded in his digital sketchbook portfolio.
You speak like a normal, down-to-earth computer science student. Be friendly, chill, and helpful. 
Do not use Shakespearean, mystical, or overly formal language. Keep it conversational and concise.
Use the following data to answer questions about Gaurav:
NAME: ${resumeData.name}
ROLE: ${resumeData.role}
LOC: ${resumeData.location}
SKILLS: ${JSON.stringify(resumeData.skills)}
EXPERIENCE: ${JSON.stringify(resumeData.experience)}
PROJECTS: ${JSON.stringify(resumeData.projects)}
EDUCATION: ${JSON.stringify(resumeData.education)}
GITHUB: https://github.com/gauravnaudiyal
`;

// --- CYBERSIGILISM SVGS ---
const SigilCorner = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className={className}>
    <path d="M0,0 L25,35 L10,60 L45,45 L75,15 L95,65 L100,100" strokeWidth="0.2" className="opacity-40" />
    <path d="M10,10 L18,50 L40,28 L55,85 L85,35 L95,95" strokeWidth="0.8" />
    <path d="M5,20 L30,25 L45,5 L60,50 L95,45" strokeWidth="0.4" />
    <path d="M35,35 Q15,65 55,55 T85,85" strokeWidth="0.6" />
    <circle cx="55" cy="55" r="1.5" fill="currentColor" />
    <circle cx="18" cy="50" r="1" fill="currentColor" />
    <circle cx="85" cy="35" r="1" fill="currentColor" />
    <path d="M55,55 L50,70 L40,65 M55,55 L65,60 L60,75" strokeWidth="0.5" />
    <path d="M30,10 L40,20 L35,30 M70,80 L60,70 L65,60" strokeWidth="0.3" className="opacity-60" />
  </svg>
);

const SigilDivider = ({ className }) => (
  <svg viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="0.5" className={className}>
    <path d="M0,20 L75,20 L95,2 L105,38 L125,20 L200,20" strokeWidth="0.8" />
    <path d="M65,20 L85,10 L95,20 L85,30 Z" strokeWidth="0.3" className="opacity-50" />
    <path d="M115,20 L125,10 L135,20 L125,30 Z" strokeWidth="0.3" className="opacity-50" />
    <path d="M85,20 C60,-5 140,-5 115,20 C140,45 60,45 85,20 Z" strokeWidth="0.4" />
    <circle cx="100" cy="20" r="2" fill="currentColor" />
    <path d="M90,20 L110,20 M100,10 L100,30" strokeWidth="0.2" />
  </svg>
);

const CybersigilRune = ({ className }) => (
  <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <path d="M25,5 L25,45 M5,25 L45,25" strokeWidth="0.5" className="opacity-40" />
    <path d="M10,10 L25,5 L40,10 L45,25 L40,40 L25,45 L10,40 L5,25 Z" strokeWidth="0.5" />
    <path d="M15,15 L35,35 M15,35 L35,15" strokeWidth="1.5" />
    <path d="M25,15 L35,25 L25,35 L15,25 Z" strokeWidth="0.8" />
    <circle cx="25" cy="25" r="3" fill="currentColor" />
  </svg>
);

const Scribble = () => (
  <svg viewBox="0 0 100 10" className="w-24 h-2 text-slate-800 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M0,5 Q20,10 40,2 T60,8 T80,3 T100,7" strokeLinecap="round" />
  </svg>
);

// --- UNREAL ANIMATION COMPONENTS ---

const CustomCursor = ({ isInverted }) => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const requestRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      // Lerp for smooth spring effect
      current.current.x += (mouse.current.x - current.current.x) * 0.15;
      current.current.y += (mouse.current.y - current.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[99999] -ml-[6px] -mt-[6px] transition-all ease-out duration-75 shadow-md ${isInverted ? 'bg-[#F4F1EA]' : 'bg-[#1a1a1a]'}`}></div>
      <div ref={cursorRef} className={`fixed top-0 left-0 w-12 h-12 border-[2.5px] rounded-full pointer-events-none z-[99998] -ml-6 -mt-6 will-change-transform shadow-sm backdrop-blur-[1px] transition-colors duration-500 ${isInverted ? 'border-[#F4F1EA] bg-white/10' : 'border-[#1a1a1a] bg-black/5'}`}></div>
    </>
  );
};

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const xTo = (val) => el.style.setProperty('--tx', `${val}px`);
    const yTo = (val) => el.style.setProperty('--ty', `${val}px`);

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4); // Magnetic pull strength
      yTo(y * 0.4);
    };
    
    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };
    
    el.addEventListener('mousemove', mouseMove);
    el.addEventListener('mouseleave', mouseLeave);
    
    return () => {
      el.removeEventListener('mousemove', mouseMove);
      el.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  return React.cloneElement(children, {
    ref,
    style: { 
      transform: 'translate3d(var(--tx, 0), var(--ty, 0), 0)', 
      transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
    }
  });
};

const SplitText = ({ text, className = "" }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split('').map((char, i) => (
        <span key={i} className="reveal-wrap">
          <span className="reveal-char" style={{ transitionDelay: `${i * 0.04}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  );
};

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fade-up ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

const Parallax = ({ children, speed = 0.5, className = "" }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const y = window.scrollY * speed;
        ref.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>;
};

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hey! I'm Gaurav's AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const [isInverted, setIsInverted] = useState(false);
  const experienceRef = useRef(null);

  useEffect(() => {
    // Lock scroll during CSS preloading phase
    document.body.style.overflow = 'hidden';
    
    // Unlock scroll after the 3.5s CSS animation finishes
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (experienceRef.current) {
        const rect = experienceRef.current.getBoundingClientRect();
        // Trigger the inversion when the top of the Experience section is past 60% of the screen height
        setIsInverted(rect.top < window.innerHeight * 0.6);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to catch initial scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', text: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = newMessages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const payload = {
        contents: chatHistory,
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("API_ERR");
      const result = await response.json();
      const reply = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        setMessages(prev => [...prev, { role: 'model', text: reply }]);
      } else {
        throw new Error("EMPTY_RES");
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Oops, connection failed. Try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Caveat:wght@400;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        
        .font-sketch { font-family: 'Caveat', cursive; }
        .font-code { font-family: 'Space Mono', monospace; }
        .font-signature { font-family: 'Alex Brush', cursive; }
        
        /* Ultra-premium smooth scroll & hide default cursor */
        html { scroll-behavior: smooth; }
        body, a, button, input { cursor: none !important; }
        
        .paper-bg {
          background-color: #F4F1EA;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        
        .drawn-box {
          border: 1.5px solid #1a1a1a;
          border-radius: 2px 255px 3px 25px / 255px 5px 225px 3px;
          background: rgba(255, 255, 255, 0.4);
        }
        
        .drawn-box-alt {
          border: 1.5px solid #1a1a1a;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
        }

        /* Animation Utility Classes */
        .reveal-wrap { overflow: hidden; display: inline-flex; }
        .reveal-char { display: inline-block; transform: translateY(110%); transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); will-change: transform; }
        .is-visible .reveal-char { transform: translateY(0); }
        
        .fade-up { opacity: 0; transform: translateY(60px); transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1); will-change: opacity, transform; }
        .is-visible.fade-up { opacity: 1; transform: translateY(0); }
        
        /* Pure CSS Preloader Animations */
        .preloader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          animation: hideOverlay 3.5s ease-out forwards;
          pointer-events: none;
        }
        
        .preloader-text {
          position: absolute;
          font-family: 'Alex Brush', cursive;
          font-size: 80px;
          color: #1a1a1a;
          white-space: nowrap;
          animation: preloaderMove 3s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        @media (min-width: 768px) {
          .preloader-text { font-size: 130px; }
        }

        @keyframes preloaderMove {
          0% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.5); clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); }
          40% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.5); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          50% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.5); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          100% { 
            top: 128px; 
            left: max(24px, calc((100vw - 896px) / 2 + 24px)); 
            transform: translate(0, 0) scale(1); 
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); 
          }
        }
        
        @media (min-width: 768px) {
          @keyframes preloaderMove {
            0% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.5); clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); }
            40% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.5); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
            50% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.5); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
            100% { 
              top: 128px; 
              left: max(72px, calc((100vw - 896px) / 2 + 72px)); 
              transform: translate(0, 0) scale(1); 
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); 
            }
          }
        }

        @keyframes hideOverlay {
          0%, 85% { opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }

        .stagger-content { 
          opacity: 0; 
          animation: fadeInStagger 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; 
          animation-delay: 2.8s; 
        }
        
        @keyframes fadeInStagger {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes handwriteReveal {
          0% { clip-path: inset(0 100% 0 0); opacity: 0; }
          1% { clip-path: inset(0 100% 0 0); opacity: 1; }
          100% { clip-path: inset(0 0 0 0); opacity: 1; }
        }
        
        .handwrite-anim {
          opacity: 0;
          animation: handwriteReveal 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 3.2s; 
        }
      `}</style>

      <CustomCursor isInverted={isInverted} />

      {/* Pure CSS Preloader Background Overlay */}
      <div className="preloader-overlay paper-bg">
        <div className="preloader-text">
          Gaurav Naudiyal
        </div>
      </div>

      {/* Inversion Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9000] transition-opacity duration-1000 ease-in-out"
        style={{
          backdropFilter: 'invert(1) hue-rotate(180deg)',
          WebkitBackdropFilter: 'invert(1) hue-rotate(180deg)',
          opacity: isInverted ? 1 : 0
        }}
      />

      <div className="min-h-screen paper-bg text-[#1a1a1a] overflow-x-hidden relative pb-32">
        {/* Vertical Cryptic Tech Text */}
        <div className="fixed top-1/2 left-4 -translate-y-1/2 -rotate-90 origin-left font-code text-[10px] tracking-[0.4em] text-slate-400 opacity-60 z-0 pointer-events-none whitespace-nowrap">
          // SYS.INIT // 0xDF // CORE_ROUTINE // CYBERSIGIL_LINK_ESTABLISHED //
        </div>
        <div className="fixed top-1/2 right-4 -translate-y-1/2 rotate-90 origin-right font-code text-[10px] tracking-[0.4em] text-slate-400 opacity-60 z-0 pointer-events-none whitespace-nowrap">
          // MEM_ALLOC: 4096MB // THREAD_01_ACTIVE // AWAITING_INPUT //
        </div>

        {/* Parallax Background Sigils */}
        <Parallax speed={0.15} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <SigilCorner className="absolute top-0 left-0 w-80 h-80 text-slate-400 opacity-20 -translate-x-1/4 -translate-y-1/4" />
          <SigilCorner className="absolute top-1/3 right-10 w-40 h-40 text-slate-400 opacity-10 rotate-45" />
        </Parallax>
        
        <Parallax speed={-0.1} className="fixed bottom-0 right-0 w-full h-full pointer-events-none z-0">
          <SigilCorner className="absolute bottom-0 right-0 w-[500px] h-[500px] text-slate-400 opacity-20 translate-x-1/3 translate-y-1/3 rotate-180" />
          <SigilCorner className="absolute bottom-1/4 left-10 w-32 h-32 text-slate-400 opacity-15 -rotate-45" />
        </Parallax>

        <main className="max-w-4xl mx-auto px-6 pt-32 relative z-10">
          
          {/* HERO */}
          <header className="relative mb-32 md:ml-12">
            <Parallax speed={0.2} className="absolute -top-10 -left-12 w-24 h-24 border border-slate-300 rounded-full opacity-50"></Parallax>
            
            <div className="w-full max-w-2xl origin-center mb-12 relative cursor-none">
              <h1 className="font-signature text-[80px] md:text-[130px] leading-none text-[#1a1a1a] whitespace-nowrap">
                Gaurav Naudiyal
              </h1>
            </div>
            
            <div className="stagger-content">
              <FadeUp delay={0.1} className="mt-12 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
                <div className="font-code text-sm font-bold bg-[#1a1a1a] text-[#F4F1EA] px-4 py-2 drawn-box-alt rotate-2 hover:-rotate-1 transition-transform">
                  {resumeData.role}
                </div>
                <div className="font-sketch text-3xl text-slate-600 flex flex-col">
                  <span>{resumeData.location}</span>
                  <Scribble />
                </div>
              </FadeUp>

              <div className="mt-12 handwrite-anim inline-block">
                <p className="font-sketch text-4xl text-slate-700 max-w-2xl leading-relaxed -rotate-1">
                  " {resumeData.summary} "
                </p>
              </div>
            </div>
          </header>

          <FadeUp>
            <SigilDivider className="w-48 mx-auto text-slate-300 my-24 opacity-50" />
          </FadeUp>

          {/* EXPERIENCE */}
          <section className="mb-32" ref={experienceRef}>
            <FadeUp>
              <h2 className="font-code text-sm tracking-[0.3em] uppercase mb-12 ml-4">
                <SplitText text="[ 01_Experience ]" />
              </h2>
            </FadeUp>
            
            <div className="space-y-16">
              {resumeData.experience.map((exp, i) => (
                <FadeUp key={exp.id} delay={i * 0.1}>
                  <Magnetic>
                    <div className={`relative p-8 md:p-10 drawn-box max-w-2xl transition-all duration-500 hover:bg-white/50 ${i % 2 === 0 ? 'ml-0 md:ml-8 rotate-1' : 'ml-auto mr-0 md:mr-8 -rotate-1'}`}>
                      <div className="absolute -top-4 -right-4 font-sketch text-2xl text-slate-500 bg-[#F4F1EA] px-3 py-1 drawn-box-alt rotate-3">
                        {exp.period}
                      </div>
                      <h3 className="font-sketch text-5xl font-bold mb-2">{exp.company}</h3>
                      <div className="font-code text-sm font-bold mb-6 text-slate-600">{exp.role}</div>
                      <ul className="space-y-3">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="font-code text-sm text-slate-700 flex items-start gap-4 leading-relaxed">
                            <span className="font-sketch text-2xl text-slate-400 mt-[-6px]">*</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Magnetic>
                </FadeUp>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section className="mb-32 relative">
            <Parallax speed={-0.15} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-slate-200 -z-10 flex justify-center items-center">
              <SigilCorner className="w-96 h-96 opacity-30" />
            </Parallax>

            <FadeUp>
              <h2 className="font-code text-sm tracking-[0.3em] uppercase mb-12 ml-4 text-right">
                <SplitText text="[ 02_Projects ]" />
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {resumeData.projects.map((project, i) => (
                <FadeUp key={project.id} delay={i * 0.1} className={i === 1 || i === 2 ? 'md:mt-16' : ''}>
                  <Magnetic>
                    <div className="p-8 drawn-box-alt bg-[#F4F1EA]/80 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:bg-white cursor-none h-full flex flex-col justify-between">
                      <div>
                        <h3 className="font-sketch text-4xl font-bold mb-4">{project.title}</h3>
                        <div className="font-code text-xs bg-slate-100 p-2 mb-6 inline-block border border-dashed border-slate-300">
                          {project.tech}
                        </div>
                      </div>
                      <div>
                        <p className="font-code text-sm text-slate-700 leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <div className="flex gap-4 font-code text-sm font-bold">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" className="underline decoration-wavy decoration-slate-300 hover:decoration-slate-800 transition-colors z-20 relative">
                              [ GitHub ]
                            </a>
                          )}
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer" className="underline decoration-wavy decoration-slate-300 hover:decoration-slate-800 transition-colors z-20 relative">
                              [ Live Demo ]
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Magnetic>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.4}>
              <div className="mt-16 text-center z-20 relative">
                <a href="https://github.com/gauravnaudiyal" target="_blank" rel="noreferrer" className="font-sketch text-3xl text-slate-600 hover:text-[#1a1a1a] underline decoration-wavy transition-colors cursor-none inline-block">
                  See more projects on my GitHub ~
                </a>
              </div>
            </FadeUp>
          </section>

          <FadeUp>
            <SigilDivider className="w-48 mx-auto text-slate-300 my-24 opacity-50" />
          </FadeUp>

          {/* EDUCATION & SKILLS */}
          <section className="grid md:grid-cols-2 gap-16 mb-20">
            <FadeUp>
              <div>
                <h2 className="font-code text-sm tracking-[0.3em] uppercase mb-8">
                  <SplitText text="[ 03_Education ]" />
                </h2>
                <div className="space-y-8">
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="pl-6 border-l-2 border-[#1a1a1a] border-dashed relative">
                      <div className="absolute -left-[5px] top-2 w-2 h-2 bg-[#1a1a1a] rounded-full"></div>
                      <h3 className="font-sketch text-4xl font-bold">{edu.institution}</h3>
                      <div className="font-code text-sm font-bold my-2">{edu.degree}</div>
                      <div className="font-code text-xs text-slate-500">{edu.period} • {edu.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <div className="relative">
                <h2 className="font-code text-sm tracking-[0.3em] uppercase mb-8">
                  <SplitText text="[ 04_Skills_Matrix ]" />
                </h2>
                <Magnetic>
                  <div className="drawn-box p-8 rotate-1 bg-white/50 backdrop-blur-sm">
                    {Object.entries(resumeData.skills).map(([key, val]) => (
                      <div key={key} className="mb-6 last:mb-0">
                        <span className="font-sketch text-3xl capitalize text-slate-500 mr-3 block md:inline">{key}:</span>
                        <span className="font-code text-sm leading-relaxed">{val}</span>
                      </div>
                    ))}
                  </div>
                </Magnetic>
              </div>
            </FadeUp>
          </section>

        </main>

        {/* AI CHATBOT (Summoning Circle / Notes aesthetic) */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
          {isChatOpen && (
            <div className="mb-6 w-[90vw] sm:w-[420px] h-[550px] drawn-box-alt bg-[#F4F1EA] shadow-2xl flex flex-col origin-bottom-right animate-in fade-in zoom-in-95 duration-300">
              
              {/* Chat Header */}
              <div className="border-b border-[#1a1a1a] border-dashed p-5 flex justify-between items-center relative overflow-hidden">
                <SigilDivider className="absolute top-0 left-0 w-full h-full text-slate-200 opacity-50 -z-10" />
                <div className="font-sketch text-3xl font-bold flex items-center gap-3">
                  <CybersigilRune className="w-6 h-6" />
                  <span>Echoes_of_Gaurav</span>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="hover:rotate-90 transition-transform duration-300 p-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-8">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`font-sketch text-2xl max-w-[85%] ${
                      msg.role === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {msg.role === 'model' && <span className="font-code text-xs text-slate-400 block mb-2">AI Assistant:</span>}
                      {msg.role === 'user' && <span className="font-code text-xs text-slate-400 block mb-2">You:</span>}
                      <span className={`${msg.role === 'model' ? 'text-slate-800' : 'text-slate-500'} leading-relaxed`}>
                        {msg.text}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="font-sketch text-2xl text-slate-400 animate-pulse ml-2">
                    Thinking...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSend} className="border-t border-[#1a1a1a] p-4 flex items-center gap-3 bg-white/50 rounded-b-[15px]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inscribe a question..."
                  className="flex-1 bg-transparent border-none outline-none font-sketch text-3xl placeholder-slate-400 cursor-none"
                  disabled={isLoading}
                  autoFocus
                />
                <Magnetic>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="p-3 hover:bg-slate-200 rounded-full transition-colors disabled:opacity-50 cursor-none"
                  >
                    <Send size={20} strokeWidth={1.5} />
                  </button>
                </Magnetic>
              </form>
            </div>
          )}

          {/* Toggle Button */}
          <Magnetic>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="w-20 h-20 rounded-full bg-[#1a1a1a] text-[#F4F1EA] flex items-center justify-center transition-all duration-300 shadow-2xl relative group cursor-none"
            >
              <SigilCorner className="absolute inset-0 w-full h-full text-white opacity-20 p-2 pointer-events-none group-hover:rotate-180 transition-transform duration-1000 ease-in-out" />
              {isChatOpen ? <X size={32} /> : <CybersigilRune className="w-10 h-10" />}
            </button>
          </Magnetic>
        </div>
      </div>
    </>
  );
}