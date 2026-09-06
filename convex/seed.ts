import { internalMutation } from "./_generated/server";

const projects = [
  {
    title: "Wytha",
    slug: "wytha-sports-marketplace-texas",
    client: "Sports analytics firm",
    location: "Texas, USA",
    role: "Full-stack product development",
    category: "SaaS marketplace",
    summary:
      "A real-time sports data marketplace with analyst publishing, subscriber access, and revenue-split payments.",
    result: "Platform live in 10 weeks. Zero post-launch critical bugs.",
    year: "2025",
    url: "https://wytha.com",
    featured: true,
    order: 1,
    accentColor: "#3b82f6",
    icon: "LineChart",
    tags: ["SaaS", "Marketplace"],
    challenge:
      "The founder had validated demand for a sports analytics marketplace but had no internal technical team, and every agency quoted six months. A platform that goes down during a live fixture doesn't get a second chance, so it needed to handle burst traffic, process payments reliably at peak checkout, and hold up under concurrent load from day one.",
    approach:
      "We designed five interconnected systems: a real-time, event-driven data pipeline built for burst traffic, an analyst publishing flow with earnings tracking, subscriber discovery and tiered access controls, idempotent payment processing with automatic revenue-splitting, and a content moderation and dispute-resolution backend.",
    techStack: ["React", "Node.js", "PostgreSQL", "AWS"],
    features: [
      "Real-time event-driven data pipeline for live fixture load",
      "Analyst publishing interface with performance history and earnings dashboard",
      "Curated discovery and tiered subscription purchase flows",
      "Revenue-split payment processing with audit trails",
      "Content moderation and dispute resolution backend",
    ],
    metrics: [
      { value: "10 weeks", label: "Contract to production launch" },
      { value: "0", label: "Critical bugs in the first 30 days" },
      { value: "10x", label: "User growth, no infrastructure changes" },
    ],
  },
  {
    title: "Epump",
    slug: "epump-forecourt-automation",
    client: "Fuel station automation provider",
    location: "Lagos, Nigeria",
    role: "Full-stack development & IoT integration",
    category: "IoT platform",
    summary:
      "Forecourt automation with tank monitoring, truck automation, and a mobile app serving thousands of stations.",
    result: "3,000+ stations automated, including NNPC, Rainoil, and Matrix.",
    year: "2025",
    url: "https://epump.com.ng",
    featured: true,
    order: 2,
    accentColor: "#f97316",
    icon: "Fuel",
    tags: ["IoT", "Hardware"],
    challenge:
      "Fuel station operators were losing revenue to theft, fraud, and manual tracking errors, with little real-time visibility into tank levels, pump activity, or truck deliveries across multiple sites.",
    approach:
      "We built an automated smart fuel management system covering tank automation, pump automation, and truck automation, all viewable and controllable remotely, so station owners can price, monitor, and report from a single dashboard instead of standing at the pump.",
    features: [
      "Real-time tank-level tracking to reduce theft and prevent losses",
      "Pump automation for accurate dispensing and real-time sales tracking",
      "GPS-enabled truck automation from depot loading to station offloading",
      "Remote fuel price changes via dashboard or mobile",
      "Real-time and historical transaction reporting",
      "Public display boards for customer-facing pump information",
    ],
    metrics: [
      { value: "3,000+", label: "Stations automated across Africa" },
      { value: "10+", label: "Years serving fuel retailers" },
    ],
  },
  {
    title: "Zapyt",
    slug: "zapyt-ai-saas",
    client: "Founder-built AI SaaS",
    role: "Full-stack development & security audit",
    category: "AI SaaS",
    summary:
      "An AI-powered soccer accumulator with live data pipelines, subscription billing, and a full security audit.",
    result: "12 vulnerabilities identified and resolved before launch.",
    year: "2025",
    url: "https://zapyt.app",
    featured: true,
    order: 3,
    accentColor: "#7c3aed",
    icon: "Sparkles",
    tags: ["AI", "SaaS"],
    challenge:
      "Accumulator betting was saturated with low-quality predictions. Zapyt needed to ingest live match data reliably, generate recommendations users could actually trust, and operate as a secure subscription SaaS from day one, since a financial-adjacent product leaves no margin for security oversights.",
    approach:
      "We ran a full OWASP-aligned security audit before launch, identifying and resolving every vulnerability before a single user signed up, alongside building the full data pipeline, the recommendation engine, and the subscriber-facing SaaS application.",
    techStack: ["Laravel", "Python", "PostgreSQL", "React", "Stripe"],
    features: [
      "Live match data pipeline with deduplication and normalization across sources",
      "Python-based recommendation engine with probability weighting and accuracy tracking",
      "Subscriber SaaS app with daily recommendations and a free-to-paid conversion path",
      "Full OWASP-aligned security audit covering injection, auth, access control, and data exposure",
    ],
    metrics: [{ value: "12", label: "Vulnerabilities resolved before launch" }],
  },
  {
    title: "Pancify",
    slug: "pancify-community-monetization-saas",
    client: "Founder-built community platform",
    role: "Full-stack development & bot integration",
    category: "SaaS · community",
    summary:
      "Bot-driven access control for Discord and Telegram with payment processing and earnings dashboards.",
    result: "End-to-end automation from payment to access to payout.",
    year: "2024",
    url: "https://pancify.com",
    featured: false,
    order: 4,
    accentColor: "#f472b6",
    icon: "MessagesSquare",
    tags: ["SaaS", "Community"],
    challenge:
      "Community managers monetizing Discord and Telegram were stitching together six separate tools: Stripe for payments, manual Discord role assignment, spreadsheets for subscription tracking, manual access revocation, earnings monitoring, and payouts. Every manual step was a point of failure, and unreliable revocation or opaque payouts were quietly destroying user trust.",
    approach:
      "We built five interconnected systems: automated Discord and Telegram bot integration for role-based access and instant revocation, idempotent subscription and payment processing with automated renewal retries, a real-time earnings and payout dashboard, a public community profile page, and multi-community management from a single dashboard.",
    techStack: ["Discord API", "Telegram API", "Stripe"],
    features: [
      "Discord and Telegram bot integration with automated access grants and instant revocation",
      "Idempotent subscription and payment processing with automated renewal retries",
      "Real-time earnings and payout dashboard",
      "Public-facing community profile page",
      "Multi-community management with free/paid tier configuration from one dashboard",
    ],
    metrics: [
      { value: "6", label: "Separate tools replaced by one platform" },
      { value: "0", label: "Manual steps from payment to access" },
    ],
  },
  {
    title: "Jude Elswitch",
    slug: "jude-elswitch-corporate-platform",
    client: "Electrical & telecom engineering firm",
    location: "Lagos, Nigeria",
    role: "Web design & development",
    category: "Corporate website",
    summary:
      "A digital platform showcasing six service areas and two decades of portfolio work for an engineering firm.",
    year: "2024",
    url: "https://judeelswitch.com",
    featured: false,
    order: 5,
    accentColor: "#22d3ee",
    icon: "Building2",
    tags: ["Corporate", "Website"],
    challenge:
      "A 20-year engineering firm with six service lines and 200+ completed projects had no digital presence that reflected that scale, making it harder to win government and enterprise contracts that expect a credible online portfolio.",
    approach:
      "We built a corporate platform structured around all six real service areas, electrical contracting, telecom infrastructure, ICT consulting, supply & procurement, project management, and renewable energy, with the company's real track record front and center.",
    features: [
      "Dedicated pages for all six service areas",
      "Company track record displayed: years in business, projects completed, certified engineers",
      "Portfolio section showcasing two decades of delivered work",
      "Contact and enquiry pathways for government and enterprise clients",
    ],
    metrics: [
      { value: "20+", label: "Years in business" },
      { value: "200+", label: "Projects completed" },
      { value: "40+", label: "Certified engineers" },
    ],
  },
  {
    title: "Topshipped",
    slug: "topshipped-startup-directory",
    client: "Founder-built startup directory",
    category: "SaaS · Directory",
    summary:
      "A vetted directory where founders share real revenue numbers and the stories behind them with a community of builders.",
    url: "https://www.topshipped.com",
    featured: false,
    order: 6,
    accentColor: "#eab308",
    icon: "Compass",
    tags: ["SaaS", "Directory"],
    challenge:
      "Founders building in public had no trustworthy place to show what was actually working. Most startup directories either gate real numbers behind a pitch deck or let anyone post unverified claims, leaving builders with no honest signal on what other projects were really earning.",
    approach:
      "We built a vetted directory where founders submit projects for review before they go live, then showcase real MRR alongside the story behind it, with browsing by category and stage so builders can find comparable projects instead of scrolling an unfiltered list.",
    features: [
      "Founder project submission flow with vetting before a listing goes live",
      "Real MRR displayed per project, from pre-revenue to six-figure ARR",
      "Category and stage browsing across AI, SaaS, dev tools, and health",
      "Founder story pages published alongside each project's numbers",
    ],
    metrics: [
      { value: "25", label: "Vetted projects featured" },
      { value: "29", label: "Founders represented" },
      { value: "485k+", label: "Combined MRR showcased" },
    ],
  },
];

export const seedProjects = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("projects").collect();
    for (const row of existing) {
      await ctx.db.delete(row._id);
    }
    for (const project of projects) {
      await ctx.db.insert("projects", project);
    }
    return { inserted: projects.length };
  },
});
