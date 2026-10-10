import {
  BrainCircuit,
  Server,
  Cloud,
  Terminal,
} from 'lucide-react';

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export const heroData = {
  name: "Siva Sudhamsh Gandikota",
  headline: "I build AI systems that ship — from model to API to interface.",
  title: "AI/ML & Full-Stack Developer",
  summary:
    "Computer Science undergraduate specializing in Artificial Intelligence with hands-on experience building reliable backend, full-stack, ML, and GenAI systems.",
  location: "Hyderabad, India",
  availabilityBadge: "B.Tech CSE (AI) • GRIET  ",
  metrics: [
    {
      value: "92%",
      label: "ML Accuracy",
      detail: "Evaluated on 50K records (Vishwam AI)",
    },
    {
      value: "360ms",
      label: "API Latency",
      detail: "Improved from 800ms via indexing & caching",
    },
    {
      value: "2+",
      label: "SaaS Apps Shipped",
      detail: "Delivered 2 weeks ahead of schedule",
    },
  ],
};

export const educationData = {
  institution: "Gokaraju Rangaraju Institute of Engineering and Technology (GRIET)",
  degree: "B.Tech in Computer Science Engineering (Artificial Intelligence Specialization)",
  period: "Sep 2023 - Jun 2027",
  cgpa: "7.85",
};

export const aboutData = {
  summary:
    "I'm an AI/ML and full-stack developer passionate about building reliable software end-to-end—from training and fine-tuning models to shipping secure, high-throughput microservices. I focus on clean architecture, performance optimization, and bridging the gap between machine learning pipelines and production engineering. Currently seeking Software Engineering and AI/ML internship opportunities for 2026.",
  bulletPoints: [
    "Machine Learning & Agentic Workflows: Building multi-agent systems with LangGraph, hybrid RAG pipelines, and real-time computer vision models (YOLO).",
    "High-Throughput Backends: Designing asynchronous microservices with FastAPI and Node.js, focused on query profiling, caching, and sub-second latency.",
    "Reliability & Security Rigor: Implementing zero-downtime database schemas, JWT/RBAC authentication, and reproducible ML pipelines with DVC.",
  ],
};

export const aboutMetrics = [
  { label: 'Vishwam AI', context: 'Prediction accuracy (50K records)', value: 92, suffix: '%' },
  { label: 'Freelance APIs', context: 'Response time (from 800ms)', value: 360, suffix: 'ms' },
  { label: 'GRIET Hackathon', context: 'Participants led (24h event)', value: 200, suffix: '+' },
  { label: 'Tech Summits', context: 'Working prototypes supported', value: 15, suffix: '+' },
];

export const currentlyBuilding = [
  {
    title: "Multi-Agent LangGraph Orchestrator",
    description: "Stateful agent graphs with hybrid RAG and memory for personal finance workflows.",
    tag: "LangGraph • RAG",
  },
  {
    title: "Edge YOLO Fault Detection",
    description: "Optimizing 20+ vehicle component segmentation models for low-latency web inference.",
    tag: "Computer Vision",
  },
  {
    title: "High-Throughput Microservice APIs",
    description: "Async FastAPI services with Redis caching, query profiling, and sub-100ms targets.",
    tag: "FastAPI • Redis",
  },
];

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  badgeType: string;
  featured: boolean;
  problem: string;
  built: string;
  highlights: string;
  tech: string[];
  links: {
    live?: string;
    github?: string;
  };
}

export const projects: ProjectItem[] = [
  {
    id: "myfi-ai",
    name: "MYFI.AI",
    tagline: "AI-Powered Personal Finance Assistant",
    badgeType: "AI Agents & GenAI",
    featured: true,
    problem:
      "Users struggle to track scattered transactions, detect anomalies, and receive contextual financial advisory grounded in exact personal spending records without hallucinations.",
    built:
      "Built a modular multi-agent application combining transaction processing, ML-based categorization, anomaly detection, and RAG. Developed a hybrid retrieval pipeline using Sentence Transformers, ChromaDB, and PostgreSQL to ground queries in personal finance data. Implemented Monitor, Explainer, and Recommender agents using LangGraph conditional routing and shared state, exposed via FastAPI APIs.",
    highlights: "Multi-agent LangGraph orchestration • Hybrid RAG retrieval • Real-time anomaly detection",
    tech: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Ollama",
      "ChromaDB",
      "PostgreSQL",
      "Sentence Transformers",
      "RAG",
    ],
    links: {
      github: "https://github.com/Nithin7king/finagent.git",
    },
  },
  {
    id: "autotuning-ai",
    name: "AutoTuning.AI",
    tagline: "AI Vehicle Diagnostics Platform",
    badgeType: "Computer Vision & Edge AI",
    featured: true,
    problem:
      "Manual vehicle inspection and fault diagnostics take over 30 minutes, relying on expensive specialized hardware and resulting in delayed maintenance alerts.",
    built:
      "Built a cloud-native diagnostics platform integrating computer vision, machine learning, REST APIs, Docker, and AWS for automated fault detection. Designed modular backend services with FastAPI and Node.js that reduced diagnostic turnaround from 30+ minutes to under 2 minutes. Integrated YOLO-based component analysis across 20+ vehicle parts, achieving 92% mAP for automated defect inspection.",
    highlights: "92% mAP across 20+ parts (held-out test set) • 87% fault accuracy • <2min turnaround",
    tech: ["Next.js", "Node.js", "FastAPI", "YOLO", "MongoDB", "Docker", "AWS"],
    links: {
      live: "https://frontend-1-2yx1.vercel.app/",
      github: "https://github.com/Sudhamsh22/AutoTuning.AI.git",
    },
  },
  {
    id: "kl-radio",
    name: "KL Radio",
    tagline: "Real-time broadcasting dashboard with live stream telemetry",
    badgeType: "Real-Time Systems",
    featured: false,
    problem:
      "Broadcast station operators lacked live listener telemetry, stream health analytics, and zero-downtime audio failover.",
    built:
      "Engineered an interactive broadcasting control cockpit with live WebSocket telemetry, real-time listener tracking, and automatic audio stream switching.",
    highlights: "500+ concurrent listeners • 99.8% uptime • Zero broadcast interruption",
    tech: ["React", "Node.js", "WebSockets", "MongoDB", "Express"],
    links: {
      live: "https://www.klradio.in/",
      github: "https://github.com/Bhanutejanallamothu/Klradio.git",
    },
  },
  {
    id: "govconnect",
    name: "GovConnect",
    tagline: "Unified public services portal connecting 20+ government departments",
    badgeType: "Full-Stack System",
    featured: false,
    problem:
      "Citizens face fragmented municipal websites, while interdepartmental public inquiries remain delayed in administrative silos.",
    built:
      "Constructed a unified public administration gateway integrating 20+ government service APIs with cross-department inquiry dispatch and citizen status tracking.",
    highlights: "20+ public services interconnected • Centralized cross-department workflow",
    tech: ["React", "Node.js", "MongoDB", "Express", "REST APIs"],
    links: {
      live: "https://gov-connect-three.vercel.app/",
      github: "https://github.com/Sudhamsh22/Gov-Connect.git",
    },
  },
  {
    id: "ybs-industries",
    name: "YBS Industries Platform",
    tagline: "Corporate software landing page with optimized mobile performance",
    badgeType: "Client Engineering",
    featured: false,
    problem:
      "A Hyderabad software solutions firm needed a performant, modern responsive brand presence to showcase services and capture B2B inquiries.",
    built:
      "Engineered a responsive web portal with optimized Core Web Vitals, accessible UI components, and modern brand design.",
    highlights: "85% mobile load latency reduction • Clean responsive design",
    tech: ["React", "Next.js", "Tailwind CSS"],
    links: {
      live: "https://www.ybsindustriesllp.com/",
      github: "https://github.com/Sudhamsh22/YBS.git",
    },
  },
  {
    id: "samardhya-landing-page",
    name: "Samardhya Platform",
    tagline: "Interactive skill discovery and student aptitude assessment platform",
    badgeType: "Client Engineering",
    featured: false,
    problem:
      "Student skill discovery needed an engaging digital interface for aptitude profiling and career guidance workflows.",
    built:
      "Developed an interactive web application featuring module assessments, clear progress milestones, and responsive form validation.",
    highlights: "Modular student skill assessment • Interactive UI flows",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    links: {
      live: "https://samardhya-landing-page.vercel.app/",
      github: "https://github.com/Sudhamsh22/Samardhya_Landing-page.git",
    },
  },
];

export interface SkillCategory {
  category: string;
  icon: typeof BrainCircuit;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages & Core CS",
    icon: Terminal,
    description: "Core programming languages and computer science fundamentals",
    skills: [
      "Python",
      "Java",
      "C",
      "SQL",
      "DSA & Problem Solving",
      "OOP & System Design",
    ],
  },
  {
    category: "AI/ML & GenAI",
    icon: BrainCircuit,
    description: "Model development, multi-agent frameworks, RAG, and computer vision",
    skills: [
      "Scikit-learn",
      "PyTorch",
      "XGBoost",
      "YOLO",
      "LangGraph",
      "AI Agents",
      "RAG & Embeddings",
      "Sentence Transformers",
      "ChromaDB",
      "Ollama",
      "LLMs",
    ],
  },
  {
    category: "Backend & Databases",
    icon: Server,
    description: "High-throughput APIs, authentication, microservices, and persistence",
    skills: [
      "FastAPI",
      "Node.js",
      "Express",
      "REST APIs",
      "Microservices",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "JWT & RBAC",
    ],
  },
  {
    category: "Cloud, DevOps & Tools",
    icon: Cloud,
    description: "Containerization, cloud infrastructure, and engineering workflows",
    skills: [
      "AWS",
      "Azure",
      "Docker",
      "Podman",
      "Linux",
      "Git & GitHub",
      "CI/CD & Testing",
      "DVC",
      "Query Optimization",
    ],
  },
];

export const experience = [
  {
    role: "Freelance Full-Stack Developer",
    company: "SaaS Clients",
    duration: "Mar 2025 - Present",
    description: [
      "Worked directly with clients to translate requirements into scalable features; delivered <strong>2 SaaS applications 2 weeks ahead of schedule</strong>.",
      "Engineered REST APIs handling <strong>1K+ daily requests</strong>, improving response time from <strong>800ms to 360ms</strong> through query optimization.",
      "Strengthened reliability and security for <strong>200+ user accounts</strong> using JWT authentication, role-based access control (RBAC), and authorization checks.",
    ],
  },
  {
    role: "AI Intern",
    company: "Vishwam AI",
    duration: "Jun 2025 - Oct 2025",
    description: [
      "Collaborated with a <strong>4-member engineering team</strong> to standardize reproducible ML training workflows using DVC versioning.",
      "Optimized Python preprocessing pipelines, reducing processing time from <strong>45 to 23 minutes</strong> through profiling and iterative engineering.",
      "Improved prediction accuracy from <strong>84% to 92%</strong> on <strong>50K+ records</strong> using feature engineering, systematic evaluation, and hyperparameter optimization.",
    ],
  },
];

export const leadershipAndAchievements = [
  {
    title: "Vice-President & PR — Free Software Wing",
    category: "Leadership Role",
    organization: "GRIET",
    description:
      "Led the chapter executive committee, coordinated public relations, and organized technical summits to foster open-source development across the campus.",
  },
  {
    title: "24-Hour National Hackathon Director",
    category: "Event Scale",
    organization: "200+ Participants",
    description:
      "Directed end-to-end planning, mentor coordination, and judging pipelines resulting in 15+ functional prototype submissions across AI and software tracks.",
  },
  {
    title: "₹100,000+ Corporate Sponsorships",
    category: "Industry Partnerships",
    organization: "Funding Secured",
    description:
      "Pitched and secured strategic sponsorships from industry partners to fund developer prizes, hardware tracks, and student software initiatives.",
  },
  {
    title: "Technical Workshops Organizer",
    category: "Community Mentorship",
    organization: "6 Hands-on Sessions",
    description:
      "Delivered interactive technical workshops on Python, Git/GitHub, open-source contribution, and machine learning fundamentals for 200+ students.",
  },
];

export const certifications = [
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "2025",
    type: "Cloud & AI",
    credentialUrl: "https://aws.amazon.com/verification",
  },
  {
    name: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "2024",
    type: "Cloud Architecture",
    credentialUrl: "https://learn.microsoft.com/credentials",
  },
  {
    name: "Machine Learning Certificate",
    issuer: "DeepLearning.AI & Coursera",
    date: "2024",
    type: "Machine Learning",
    credentialUrl: "https://www.coursera.org/verify/specialization",
  },
];

export const socialLinks = {
  github: "https://github.com/Sudhamsh22",
  linkedin: "https://linkedin.com/in/sivasudhamsh",
  email: "sivasudhamsh2005@gmail.com",
  location: "Hyderabad, India",
  website: "https://sivasudhamsh.dev",
};
