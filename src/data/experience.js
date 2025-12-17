export const experience = [
  {
    company: "Innover Labs",
    role: "Backend / Real-Time Systems Engineer",
    duration: "Apr 2023 – Present",
    location: "New Delhi",
    sections: [
      {
        title: "Conference AI, Lingolive AI & Voice AI Systems",
        achievements: [
          "Designed real-time Voice AI systems and SIP-based telephony/audio call and multilingual AI-powered phone conversations with low-latency audio pipelines.",
          "Designed and built Conference AI from scratch, enabling multiple speakers and listeners to join a real-time room and communicate in different languages simultaneously using STT → Translation → TTS pipelines.",
          "Implemented concurrent audio stream handling, async buffering, and real-time language routing to support multilingual conversations at scale.",
          "Designed, developed, and owned Lingolive AI, a standalone deployment of Conference AI with separate backend and frontend deployments, selective initialization of services and modules, full role-based authentication and authorization, and production-ready isolation while reusing core architecture.",
          "Took complete ownership of Lingolive AI architecture, deployment strategy, and production stability."
        ],
        videoUrl: null, // Can be added later
        thumbnailUrl: null // Can be added later
      },
      {
        title: "AI over Phone, SIP Infrastructure & Funding Impact",
        achievements: [
          "Built AI-over-Phone interpretation system allowing callers and callees to speak in different languages over regular phone calls using SIP and Twilio.",
          "Designed human escalation workflows, converting AI calls into seamless 3-way human calls without dropping twilio sessions.",
          "Architected and deployed SIP infrastructure from scratch using Asterisk on AWS EC2, supporting 100+ concurrent calls.",
          "Solved complex production issues including race conditions, audio delays, stream overlaps, SIP timeouts, async timing mismatches, and dual-call synchronization.",
          "Successful SIP POC and production deployment directly contributed to $1M funding raised from LSA.",
          "Designed and implemented a configuration-driven AI-over-Phone system where companies can provision dedicated Twilio numbers mapped to predefined call behavior.",
          "Enabled per-number configuration allowing organizations to define default source and target languages for calls, configure custom introduction messages, and control call behavior without requiring users to select languages during the call.",
          "Built backend workflows to dynamically resolve call configuration based on the dialed phone number, enabling seamless multilingual calls through dedicated language-specific numbers."
        ],
        videoUrl: null,
        thumbnailUrl: null
      },
      {
        title: "API Platform, Link-Based Access & Integrations",
        achievements: [
          "Designed and implemented a secure API-key–based backend platform, enabling external systems to programmatically create and manage call access links and control permissions and usage via API keys.",
          "Built link-based access flows for LSA audio SIP calls, Boostlingo audio/video calls, and LSA video-only calls using Google Meet, implemented using service-account–based Meet creation (no user login required).",
          "Owned the complete API design, authentication model, and backend logic for partner integrations."
        ],
        videoUrl: null,
        thumbnailUrl: null
      },
      {
        title: "Backend & Platform Engineering",
        achievements: [
          "Migrated core databases from SAP HANA → PostgreSQL and later DynamoDB → PostgreSQL for another project (CashApp), including full authentication and user-management logic rewrite with zero post-migration bugs.",
          "Designed unified storage interface integrating Google Drive, AWS S3, and Box, abstracting provider-specific logic.",
          "Optimized SQL queries achieving 30% reduction in API response time.",
          "Debugged and resolved 200+ production issues, significantly improving platform reliability."
        ],
        videoUrl: null,
        thumbnailUrl: null
      },
      {
        title: "AI & Product Features",
        achievements: [
          "Built Dynamic Forms & FormAI, extracting structured data from spoken user input and auto-filling forms using AI pipelines.",
          "Developed widget-based workflow designer, allowing users to connect inputs and outputs to create custom automation flows.",
          "Integrated Google Calendar (create/read/delete) and service-account-based Google Meet creation, eliminating user login requirements.",
          "Implemented OTP-based scheduling system for language translation requests.",
          "Mentored and trained 1 intern in backend and frontend systems."
        ],
        videoUrl: null,
        thumbnailUrl: null
      }
    ]
  }
]

