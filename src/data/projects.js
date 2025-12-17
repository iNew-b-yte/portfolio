export const projects = [
  {
    id: 1,
    title: "SIP Infrastructure & WebRTC",
    subtitle: "Production-Grade Telephony System",
    description: "Built complete SIP infrastructure from scratch using Asterisk on AWS EC2, supporting 100+ concurrent calls. Custom React hook wrapping SIP.js SDK for seamless browser-to-phone communication.",
    tech: ["Asterisk", "PJSIP", "SIP.js", "React", "WebRTC", "PostgreSQL"],
    highlights: [
      "100+ concurrent calls supported",
      "Custom React hooks for SIP.js",
      "Dynamic user provisioning via PostgreSQL",
      "Production-tested WebRTC integration"
    ],
    videoUrl: null,
    thumbnailUrl: null,
    demoUrl: null,
    githubUrl: null,
    detailLink: "/project/sip-infrastructure"
  },
  {
    id: 2,
    title: "AI Over Phone",
    subtitle: "Real-Time Bilingual Translation (35+ Languages)",
    description: "Built AI-powered phone interpretation enabling real-time bilingual calls. Features dynamic configuration, seamless human escalation, and WebSocket-based audio streaming. Contributed to $1M funding.",
    tech: ["Python", "FastAPI", "Twilio", "Deepgram", "WebSocket", "DynamoDB"],
    highlights: [
      "Directly contributed to $1M funding",
      "35+ languages supported",
      "Seamless human escalation without dropping calls",
      "<200ms translation latency"
    ],
    videoUrl: null,
    thumbnailUrl: null,
    demoUrl: null,
    githubUrl: null,
    detailLink: "/project/ai-over-phone"
  },
  {
    id: 3,
    title: "Conference AI / Meeting AI",
    subtitle: "Multilingual Real-Time Conference System",
    description: "Built production Conference AI enabling multiple speakers and listeners in different languages to communicate simultaneously. Uses async locks and queues for 50+ concurrent participants.",
    tech: ["Python", "FastAPI", "Asyncio", "Deepgram", "DynamoDB", "WebRTC"],
    highlights: [
      "50+ concurrent participants per room",
      "Central broadcast architecture",
      "Async locks for concurrency control",
      "95% reduction in translation API calls"
    ],
    videoUrl: null,
    thumbnailUrl: null,
    demoUrl: null,
    githubUrl: null,
    detailLink: "/project/conference-ai"
  },
  {
    id: 4,
    title: "API Key Access Platform",
    subtitle: "Secure Multi-Tenant Integration System",
    description: "Designed secure API-key based platform enabling third-party customers to integrate Lingolet services. Features permission-based access control, rate limiting, and customer testing UI.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "React", "Bcrypt"],
    highlights: [
      "10+ enterprise customers integrated",
      "Zero security breaches",
      "100% data isolation",
      "Permission-based access control"
    ],
    videoUrl: null,
    thumbnailUrl: null,
    demoUrl: null,
    githubUrl: null,
    detailLink: "/project/api-key-access"
  },
  {
    id: 5,
    title: "Lingolet Platform",
    subtitle: "Unified Interpretation Platform",
    description: "Production-grade platform offering human + AI-based interpretation across voice, phone, and meetings. Powers Conference AI, AI-over-Phone, and scheduling workflows for real customers.",
    tech: ["Python", "FastAPI", "PostgreSQL", "DynamoDB", "React"],
    highlights: [
      "Multi-modal interpretation support",
      "Human + AI hybrid workflows",
      "Production deployment with 99.5% uptime",
      "Enterprise SSO and RBAC"
    ],
    videoUrl: null,
    thumbnailUrl: null,
    demoUrl: null,
    githubUrl: null
  },
  {
    id: 2,
    title: "Compliance Cart",
    subtitle: "Compliance Management System",
    description: "Backend-heavy compliance management system. Stabilized backend services by fixing critical bugs and improving reliability.",
    tech: ["Node.js", "LoopBack", "PostgreSQL"],
    highlights: [
      "Critical bug fixes and stability improvements",
      "Backend service optimization",
      "Reliability enhancements"
    ],
    videoUrl: null,
    thumbnailUrl: null,
    demoUrl: null,
    githubUrl: null
  },
  {
    id: 3,
    title: "Smart Safe",
    subtitle: "IoT System",
    description: "Designed end-to-end IoT architecture, including hardware selection and backend communication pipeline. Enabled mobile and web access to smart locker systems.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    highlights: [
      "End-to-end IoT architecture design",
      "Hardware integration",
      "Mobile and web access",
      "Smart locker system control"
    ],
    videoUrl: null,
    thumbnailUrl: null,
    demoUrl: null,
    githubUrl: null
  }
]

