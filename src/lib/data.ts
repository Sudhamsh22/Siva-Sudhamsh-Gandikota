import { Code, BrainCircuit, Server, Database, Cloud } from 'lucide-react';

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export const heroData = {
  name: "Siva Sudhamsh Gandikota",
  title: "AI Engineer | Full-Stack Developer",
  animatedTexts: [
    "Building Intelligent Systems",
    "Fine-tuning ML Models to 92% Accuracy",
    "Serving 500+ Concurrent Users",
    "Deploying Scalable Microservices"
  ],
};

export const aboutData = {
  summary: "Computer Science student (AI specialization) with hands-on experience in machine learning and full-stack development. Passionate about applying AI to solve real-world problems, I have a proven track record of:",
  bulletPoints: [
    "Fine-tuning ML models to achieve 92% accuracy at Vishwam AI.",
    "Building production applications serving 500+ concurrent users for freelance clients.",
    "Proficient in RESTful microservices (FastAPI, Node.js) and computer vision (YOLO).",
    "Deploying scalable systems from development to production."
  ],
  specializations: [],
  conclusion: ""
};

export const achievements = [
  { label: 'ML Model Accuracy', value: 92 },
  { label: "Concurrent Users", value: 500 },
  { label: "Students Mentored", value: 40 },
  { label: "Performance Improvement", value: 85 },
];

export const skills = [
  {
    category: 'AI/ML',
    icon: BrainCircuit,
    technologies: [
      { name: 'Scikit-learn', level: 'Intermediate', proficiency: 70, icon: 'Cpu' },
      { name: 'YOLO', level: 'Intermediate', proficiency: 75, icon: 'Cpu' },
      { name: 'Feature Engineering', level: 'Advanced', proficiency: 85, icon: 'Cpu' },
      { name: 'MLOps', level: 'Beginner', proficiency: 30, icon: 'Cpu' },
    ],
  },
  {
    category: 'Backend & APIs',
    icon: Server,
    technologies: [
      { name: 'FastAPI', level: 'Expert', proficiency: 95, icon: 'Code' },
      { name: 'Node.js', level: 'Advanced', proficiency: 85, icon: 'Code' },
      { name: 'Express', level: 'Advanced', proficiency: 80, icon: 'Code' },
      { name: 'REST', level: 'Expert', proficiency: 95, icon: 'Code' },
    ],
  },
  {
    category: 'Frontend',
    icon: Code,
    technologies: [
      { name: 'React', level: 'Advanced', proficiency: 90, icon: 'Code' },
      { name: 'Next.js', level: 'Advanced', proficiency: 85, icon: 'Code' },
      { name: 'Tailwind CSS', level: 'Expert', proficiency: 95, icon: 'Code' },
    ],
  },
  {
    category: 'Databases',
    icon: Database,
    technologies: [
      { name: 'PostgreSQL', level: 'Intermediete', proficiency: 60, icon: 'Database' },
      { name: 'MongoDB', level: 'Advanced', proficiency: 85, icon: 'Database' },
      { name: 'MySQL', level: 'Intermediete', proficiency: 70, icon: 'Database' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: Cloud,
    technologies: [
      { name: 'Docker', level: 'Advanced', proficiency: 85, icon: 'Cloud' },
      { name: 'AWS', level: 'Intermediate', proficiency: 70, icon: 'Cloud' },
      { name: 'Azure', level: 'Intermediate', proficiency: 65, icon: 'Cloud' },
      { name: 'CI/CD', level: 'Intermediate', proficiency: 60, icon: 'Cloud' },
    ],
  },
];


export const experience = [
  {
    role: "Summer AI Intern",
    company: "Vishwam AI",
    duration: "Jun 2025 - Present",
    description: [
      "Fine-tuned ML models, improving accuracy from 84% to 92%.",
      "Drastically reduced model training time from 45 minutes to 12 minutes.",
      "Collaborated on developing new AI-driven features for flagship products."
    ]
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Freelance",
    duration: "Mar 2025 - Present",
    description: [
      "Engineered APIs handling over 2k daily requests with 99.8% uptime.",
      "Achieved an 85% performance boost in web applications (800ms to 120ms load time).",
      "Developed and maintained full-stack applications for various SaaS clients."
    ]
  }
];

export const projects = [
  {
    id: "autotuning-ai",
    name: "AutoTuning.AI",
    description: "A futuristic vehicle diagnostic interface that uses AI to provide rapid and accurate vehicle health assessments. It leverages computer vision and machine learning to identify potential issues.",
    stats: [
      { value: "87%", label: "Accuracy" },
      { value: "1K+", label: "Users" },
      { value: "<2min", label: "Diagnostics" }
    ],
    tech: ["Next.js", "FastAPI", "YOLO", "Docker", "AWS"],
    links: {
      live: "https://frontend-1-2yx1.vercel.app/",
      github: "https://github.com/Sudhamsh22/AutoTuning.AI.git"
    }
  },
  {
    id: "kl-radio",
    name: "KL Radio",
    description: "A real-time radio broadcasting dashboard designed for high concurrency and zero downtime. It provides station managers with live analytics and control over broadcast streams.",
    stats: [
      { value: "500+", label: "Concurrent Users" },
      { value: "Zero", label: "Downtime" },
    ],
    tech: ["React", "Node.js", "WebSockets", "MongoDB"],
    links: {
      live: "https://www.klradio.in/",
      github: "https://github.com/Bhanutejanallamothu/Klradio.git"
    }
  },
  {
    id: "ybs-industries",
    name: "YBS Industries Landing page",
    description: "Landing page for YBS Industries a software company of hyderabad with attractive UI. Improved client satisfaction.",
    stats: [
      { value: "High", label: "Client Satisfaction" }
    ],
    tech: ["React", "Next.js", "Tailwind CSS"],
    links: {
      live: "https://www.ybsindustriesllp.com/",
      github: "https://github.com/Sudhamsh22/YBS.git"
    }
  },
  {
    id: "samardhya-landing-page",
    name: "SAMARDHYA - LANDING PAGE",
    description: "Samardhya is platform for knowing ones skill and what they are good at. Made with react and TailwindCSS. It is a Client project",
    stats: [
      { value: "High", label: "Client Satisfaction" }
    ],
    tech: ["React", "Tailwind CSS"],
    links: {
      live: "https://samardhya-landing-page.vercel.app/",
      github: "https://github.com/Sudhamsh22/Samardhya_Landing-page.git"
    }
  },
  {
    id: "govconnect",
    name: "GovConnect - Interdepartmental cooperation System",
    description: "GovConnect is a website which helps users to access all government services in a single platform and all indian government departments to communicate with each other. Made with react for frontend connecting more than 20 Government services and Mongo Db for database.",
    stats: [
      { value: "20+", label: "Services Connected" }
    ],
    tech: ["React", "MongoDB", "Node.js"],
    links: {
      live: "https://gov-connect-three.vercel.app/",
      github: "https://github.com/Sudhamsh22/Gov-Connect.git"
    }
  },
  {
    id: "mana-sambaralu",
    name: "MANA SAMBARALU",
    description: "A client app for more than 50 Telugu festivals, built with FastAPI and Streamlit and deployed on Streamlit.",
    stats: [
      { value: "50+", label: "Festivals Covered" }
    ],
    tech: ["FastAPI", "Streamlit", "Python"],
    links: {
      live: "https://github.com/Sudhamsh22/mana-sambharalu.git",
      github: "https://github.com/Sudhamsh22/mana-sambharalu.git"
    }
  }
];

export const leadershipAndAchievements = [
  {
    title: 'Vice-President & PR at GRIET',
    description: 'Led a team to organize events, manage public relations, and enhance student engagement across the campus.',
  },
  {
    title: 'Organized a 24-hour hackathon twice',
    description: 'Successfully managed a major tech event with over 200 participants, fostering innovation and collaboration.',
  },
  {
    title: 'Rs 100,000 sponsorships secured',
    description: 'Established and maintained relationships with corporate partners, securing vital funding for events and initiatives.',
  },
  {
    title: 'Conducted 6+ workshops',
    description: 'Designed and delivered technical workshops on topics like AI, web development, and competitive programming.',
  },
  {
    title: 'Mentored 40+ students',
    description: 'Provided guidance and support to students, helping them secure placements in top tech companies.',
  },
];

export const certifications = [
  { name: 'Oracle AI Vector Search', issuer: 'Oracle' },
  { name: 'Microsoft Azure Fundamentals (AZ-900)', issuer: 'Microsoft' },
  { name: 'AI & Big Data', issuer: 'IEEE' },
];

export const socialLinks = {
  github: 'https://github.com/Sudhamsh22',
  linkedin: 'https://www.linkedin.com/in/sivasudhamsh',
  email: 'sivasudhamsh2005@gmail.com'
};
