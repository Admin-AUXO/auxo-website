// Color Palette - Dark Theme Optimized
export const colors = {
  'pure-white': '#FFFFFF',
  'rich-black': '#111111',
  'graphite': '#2D2D2D',
  'limestone': '#F1F1F0',
  'auxo-green': '#9ACD32',
  'petrol-ink': '#0A3A4A',
  'dark-bg': '#1A1A1A',
  'dark-border': '#333333',
} as const;

// Site Content - Cohesive Narrative Flow
export const siteContent = {
  // Navigation Content
  navigation: {
    logo: "AUXO Data Co.",
    menuItems: [
      { href: "#challenge", label: "The Problem", description: "Why data ambiguity costs you millions" },
      { href: "#framework", label: "Our Solution", description: "The AUXO transformation framework" },
      { href: "#impact", label: "Proven Results", description: "Real outcomes from real clients" },
      { href: "#engagement", label: "Start Here", description: "Begin your transformation" }
    ],
    ctaButton: "Schedule Discovery Call"
  },

  // Hero Section - The Hook
  hero: {
    preHeadline: "Executive Intelligence. Amplified.",
    headline: "YOUR DATA HOLDS THE ANSWERS TO TOMORROW'S COMPETITIVE ADVANTAGE",
    subheadline: "While your competitors debate conflicting reports, you could be making decisions backed by unified intelligence. Every insight you need already exists in your systems—scattered, fragmented, waiting to be unleashed.",
    ctaText: "Discover What You're Missing",
    ctaSubtext: "60-minute strategic assessment • No obligation • Immediate insights"
  },

  // Challenge Section - The Problem
  challenge: {
    eyebrow: "The Hidden Cost of Data Chaos",
    headline: "Ambiguity Is a Tax on Performance",
    subheadline: "Every day without unified intelligence costs you opportunities, capital, and competitive position.",
    bodyText: "Fragmented data creates strategic paralysis. Conflicting departmental reports breed hesitation. Historical analysis obscures emerging risks. This isn't just inefficiency—it's a systematic erosion of your ability to compete at the speed of modern business.",
    emphasisText: "What critical insights are you missing right now?",
    costBreakdown: {
      title: "The Real Cost of Data Fragmentation",
      items: [
        { 
          impact: "Revenue Hemorrhage",
          title: "Missed Market Opportunities", 
          description: "While you debate conflicting reports, competitors capture market share with decisive action backed by clear intelligence."
        },
        { 
          impact: "Capital Misallocation",
          title: "Strategic Missteps", 
          description: "Incomplete data leads to wrong decisions that compound over time, turning small mistakes into major strategic failures."
        },
        { 
          impact: "Hidden Threats",
          title: "Invisible Risk Accumulation", 
          description: "What you can't see in your fragmented data today could destroy value tomorrow—risks hiding in plain sight."
        }
      ]
    },
    transitionText: "What if every decision was backed by complete clarity?",
    visionText: "Imagine one source of truth that every department trusts. Where every report tells the same story. Where you see opportunities before competitors know they exist."
  },

  // Framework Section - The Solution
  framework: {
    eyebrow: "The AUXO Transformation Method",
    headline: "From Data Chaos to Strategic Dominance",
    subheadline: "A proven, sequential framework that transforms scattered information into unified competitive intelligence.",
    pillars: [
      {
        id: "pillar1",
        number: "01",
        title: "Unified Intelligence Foundation",
        subtitle: "One Source of Truth, Zero Ambiguity",
        description: "We eliminate data conflicts by creating a single, authoritative source that every stakeholder trusts. No more debates about which numbers are right—just clear, consistent intelligence that drives confident decisions.",
        benefits: ["End conflicting reports forever", "Accelerate decision velocity", "Eliminate data silos", "Create enterprise-wide alignment"],
        services: ["Unified Data Architecture", "Real-time Integration Pipelines", "Data Governance Framework", "Master Data Management"]
      },
      {
        id: "pillar2",
        number: "02", 
        title: "Predictive Intelligence Engine",
        subtitle: "From Historical Reporting to Future Advantage",
        description: "Your unified data becomes a crystal ball. Advanced analytics reveal patterns that predict success and signals that prevent failure—transforming reactive management into proactive strategy.",
        benefits: ["Predict market shifts before competitors", "Identify risks before they materialize", "Optimize resource allocation", "Accelerate growth opportunities"],
        services: ["Predictive Analytics Models", "Real-time KPI Dashboards", "Market Intelligence Systems", "Scenario Planning Tools"]
      },
      {
        id: "pillar3",
        number: "03",
        title: "Automated Competitive Advantage",
        subtitle: "Intelligence That Works While You Sleep",
        description: "We embed your insights directly into operations. AI-powered automation turns your intelligence into 24/7 competitive advantage—making optimal decisions at machine speed with human wisdom.",
        benefits: ["Automate complex decisions", "Scale intelligence across operations", "Maintain competitive edge continuously", "Generate measurable ROI"],
        services: ["Intelligent Process Automation", "Dynamic Decision Engines", "Automated Optimization Systems", "Performance Monitoring"]
      }
    ],
    closingStatement: "Sequential. Integrated. Transformative.",
    closingDescription: "Each phase builds on the last, creating compound value that transforms your organization's relationship with data—and your position in the market."
  },

  // Impact Section - The Proof
  impact: {
    eyebrow: "Transformation in Action",
    headline: "Real Results, Real ROI, Real Competitive Advantage",
    subheadline: "These aren't case studies—they're transformations that redefined how our clients compete.",
    stories: [
      {
        id: 1,
        client: "Fortune 500 Manufacturing",
        industry: "Manufacturing",
        challenge: "Conflicting inventory reports across 12 regional systems created $2.3M in excess inventory.",
        outcome: "34% reduction in inventory carrying costs and $1.8M annual savings achieved in 90 days.",
        keyMetrics: [
          { value: "$1.8M", label: "Annual Savings" },
          { value: "34%", label: "Cost Reduction" },
          { value: "90", label: "Days to Results" }
        ],
        color: "from-auxo-green/20 to-petrol-ink/20"
      },
      {
        id: 2,
        client: "Global Financial Services",
        industry: "Financial Services", 
        challenge: "Fragmented risk data across business units created regulatory compliance nightmares.",
        outcome: "100% regulatory compliance achieved with risk reporting reduced from 5 days to 2 hours.",
        keyMetrics: [
          { value: "100%", label: "Compliance Rate" },
          { value: "2", label: "Hours Reporting" },
          { value: "5→2", label: "Days to Hours" }
        ],
        color: "from-petrol-ink/20 to-auxo-green/20"
      },
      {
        id: 3,
        client: "High-Growth Technology Startup",
        industry: "Technology",
        challenge: "Inability to track customer acquisition costs across marketing channels burned $500K in funding.",
        outcome: "127% improvement in marketing ROI, secured Series A funding, and achieved predictable growth.",
        keyMetrics: [
          { value: "127%", label: "ROI Improvement" },
          { value: "$2.5M", label: "Series A Raised" },
          { value: "3x", label: "Growth Rate" }
        ],
        color: "from-auxo-green/20 to-limestone/20"
      }
    ],
    // Legacy cards format for backward compatibility
    cards: [
      {
        client: "Fortune 500 Manufacturing",
        challenge: "Conflicting inventory reports across 12 regional systems created $2.3M in excess inventory and constant operational confusion.",
        solution: "Implemented unified data architecture with real-time synchronization, automated reconciliation, and predictive inventory optimization.",
        outcome: "34% reduction in inventory carrying costs, 90-day elimination of reporting discrepancies, and $1.8M annual savings.",
        metrics: ["$1.8M", "Annual Savings", "34%", "Cost Reduction", "90", "Days to Results"]
      },
      {
        client: "Global Financial Services",
        challenge: "Fragmented risk data across business units created regulatory compliance nightmares and 5-day reporting cycles.",
        solution: "Built comprehensive risk intelligence framework with automated compliance monitoring and unified executive dashboards.",
        outcome: "100% regulatory compliance achieved, risk reporting reduced from 5 days to 2 hours, and proactive risk management enabled.",
        metrics: ["100%", "Compliance Rate", "2", "Hours Reporting", "5→2", "Days to Hours"]
      },
      {
        client: "High-Growth Technology Startup",
        challenge: "Inability to track customer acquisition costs across marketing channels burned through $500K in funding.",
        solution: "Created integrated marketing intelligence platform with real-time attribution modeling and ROI optimization.",
        outcome: "127% improvement in marketing ROI, secured Series A funding, and achieved predictable growth metrics.",
        metrics: ["127%", "ROI Improvement", "$2.5M", "Series A Raised", "3x", "Growth Rate"]
      }
    ],
    closingStatement: "Your transformation starts with a conversation.",
    closingDescription: "Every success story began with a strategic discussion about untapped potential. What could your unified data reveal about your next competitive breakthrough?"
  },

  // Engagement Section - The Call to Action
  engagement: {
    eyebrow: "Your Competitive Advantage Awaits",
    headline: "Transform Data Chaos Into Strategic Dominance",
    subheadline: "Schedule a confidential strategic assessment where we'll identify your hidden opportunities and create a roadmap to capture them.",
    bodyText: "This isn't a sales call—it's a strategic intelligence briefing focused on your specific challenges and untapped opportunities.",
    trustIndicators: [
      { icon: "🔒", text: "Confidential Discussion", description: "Your data challenges stay private" },
      { icon: "⚡", text: "60-Minute Deep Dive", description: "Focused, high-value conversation" },
      { icon: "🎯", text: "Strategic Assessment", description: "Immediate actionable insights" },
      { icon: "💡", text: "Custom Roadmap", description: "Clear path to transformation" }
    ],
    processSteps: [
      {
        title: "Current State Analysis",
        description: "We'll map your existing data landscape, identify pain points, and quantify missed opportunities hiding in your systems."
      },
      {
        title: "Strategic Opportunity Assessment",
        description: "Discover specific areas where unified intelligence can create immediate competitive advantage and measurable ROI."
      },
      {
        title: "Transformation Roadmap",
        description: "Get a clear, actionable plan from your current state to data-driven strategic dominance—with timelines and expected outcomes."
      }
    ],
    socialProof: {
      quote: "The strategic conversation was transformative. In 60 minutes, we identified $2M in hidden opportunities and created a clear roadmap to capture them. Six months later, we're ahead of schedule on every metric.",
      attribution: "Chief Strategy Officer, Fortune 500 Technology Company"
    },
    urgencyStatement: "Your competitive advantage is waiting in your data.",
    urgencyDescription: "Every day without unified intelligence is a day of missed opportunities. The conversation that transforms your strategic position starts with a single click.",
    ctaText: "Schedule Your Strategic Assessment",
    ctaSubtext: "Available this week • 60 minutes • Immediate insights"
  },

  // Footer Content
  footer: {
    tagline: "Transforming Data Chaos Into Strategic Dominance",
    description: "Your intelligence. Amplified. Your advantage. Automated.",
    ctaText: "Start Your Transformation",
    navigationLinks: [
      { href: "#hero", label: "Hidden Intelligence" },
      { href: "#challenge", label: "The Cost of Chaos" },
      { href: "#framework", label: "Our Method" },
      { href: "#impact", label: "Proven Results" }
    ],
    contactEmail: "contact@auxodata.co",
    privacyLink: "/privacy",
    companyName: "AUXO Data Co.",
    taglineBottom: "Strategic Data Intelligence"
  },

  // Scheduling Interface Content
  scheduling: {
    title: "Schedule Your Strategic Intelligence Briefing",
    subtitle: "Select a time that works for your executive schedule",
    meetingTitle: "Strategic Data Intelligence Assessment",
    meetingDescription: "A confidential 60-minute executive briefing focused on your specific data challenges and competitive opportunities. We'll explore how unified intelligence can transform your decision-making velocity and strategic position.",
    loadingText: "Preparing your strategic assessment interface...",
    confirmButton: "Confirm Strategic Session",
    availableTimesTitle: "Executive Time Slots Available"
  }
} as const;

// Animation Variants
export const animationVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  }
} as const;

// SEO Metadata
export const seoMetadata = {
  title: 'AUXO Data Co. - Strategic Data Intelligence',
  description: 'We engineer data frameworks that deliver a single source of truth, converting operational complexity into strategic dominance.',
  keywords: 'data strategy, business intelligence, data analytics, executive consulting',
  url: 'https://auxodata.co',
  ogImage: '/og-image.svg'
} as const;

// Privacy Policy Content
export const privacyPolicyContent = {
  title: 'Privacy Policy',
  lastUpdated: 'December 2024',
  sections: [
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you schedule a consultation, contact us, or interact with our website. This may include your name, email address, company information, and any other information you choose to provide.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, communicate with you, respond to your inquiries, and send you relevant business information. We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.'
    },
    {
      title: 'Data Security',
      content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.'
    },
    {
      title: 'Contact Information',
      content: 'If you have any questions about this Privacy Policy, please contact us through our website or scheduling system.'
    }
  ]
} as const;

// 404 Page Content
export const notFoundContent = {
  title: '404 - Page Not Found',
  headline: 'This Page Has Gone Off the Grid',
  subheadline: 'Like fragmented data in a complex system, this page seems to have lost its way. Let us help you find what you\'re looking for.',
  ctaText: 'Return to Strategic Intelligence',
  ctaLink: '/'
} as const;