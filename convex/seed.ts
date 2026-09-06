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

const services = [
  {
    title: "Client Onboarding Portals",
    description:
      "Professional service firms spend 6–10 hours per new client on manual onboarding. We build a fully branded client portal, a single, secure web application your clients log into to complete onboarding, and typically cut that time from 6–8 hours to under 45 minutes.",
    order: 1,
  },
  {
    title: "SaaS MVP Development",
    description:
      "You have a validated idea but no technical co-founder, and you've been quoted $150K and 12 months. We scope, architect, and ship your MVP in 6–12 weeks, a working, deployed product, not a prototype, and founders who come to us launch faster and cheaper than their original estimate.",
    order: 2,
  },
  {
    title: "Internal Tools & Dashboards",
    description:
      "Your team is running the business on spreadsheets, WhatsApp threads, and SaaS tools that don't talk to each other. We build a custom internal tool, a private web application shaped around how your team actually works, and clients typically reclaim 10–20 hours of team time per week within the first month.",
    order: 3,
  },
  {
    title: "Security Audits",
    description:
      "If you run a SaaS product, you almost certainly have security vulnerabilities you don't know about. We run a full technical review of your application covering authentication, vulnerabilities, and GDPR compliance, giving you a comprehensive, prioritised view of your risk surface within 10 business days.",
    order: 4,
  },
  {
    title: "Booking & Scheduling",
    description:
      "You're on Calendly or Acuity, paying monthly for a product that still doesn't fit your workflow exactly. We build a custom booking and scheduling system tailored to your exact workflow, not the other way around, leading to an immediate drop in no-shows and faster booking completion.",
    order: 5,
  },
  {
    title: "AI Feature Integration",
    description:
      "You have a working product, and your competitors are shipping AI features. We design and build AI-powered features that slot into your existing product, no rebuild required, and built correctly, they create measurable user behaviour change.",
    order: 6,
  },
];

export const seedServices = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("services").collect();
    for (const row of existing) {
      await ctx.db.delete(row._id);
    }
    for (const service of services) {
      await ctx.db.insert("services", service);
    }
    return { inserted: services.length };
  },
});

const pricingTiers = [
  {
    name: "Starter",
    price: "$3,000 – $8,000",
    timeline: "3–6 weeks",
    description: "For focused, well-defined problems.",
    features: [
      "Single-purpose web application",
      "Up to 5 core screens or workflows",
      "User authentication",
      "Basic admin panel",
      "Deployed, documented, and handed over",
      "14-day post-launch support",
    ],
    featured: false,
    order: 1,
  },
  {
    name: "Growth",
    price: "$8,000 – $20,000",
    timeline: "6–12 weeks",
    description: "For multi-feature products and platforms.",
    features: [
      "Full multi-user web application",
      "Up to 15 screens or workflows",
      "Roles & permissions system",
      "Third-party integrations (payments, APIs)",
      "Full admin & reporting dashboard",
      "OWASP security review included",
      "30-day post-launch support",
    ],
    featured: true,
    order: 2,
  },
  {
    name: "Scale",
    price: "$20,000 – $50,000+",
    timeline: "10–20 weeks",
    description: "For complex systems and enterprise workflows.",
    features: [
      "Complex, multi-module platform",
      "Unlimited screens and workflows",
      "Custom AI or ML feature development",
      "Data pipelines and external integrations",
      "Full security audit & penetration test",
      "Infrastructure setup and hardening",
      "60-day post-launch support",
    ],
    featured: false,
    order: 3,
  },
];

export const seedPricing = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("pricingTiers").collect();
    for (const row of existing) {
      await ctx.db.delete(row._id);
    }
    for (const tier of pricingTiers) {
      await ctx.db.insert("pricingTiers", tier);
    }
    return { inserted: pricingTiers.length };
  },
});

const posts = [
  {
    slug: "web-application-security-audit-cost",
    title: "How Much Does a Web App Security Audit Cost in 2026?",
    date: "2026-06-09",
    excerpt:
      "If you are asking how much a web application security audit costs, you are almost certainly close to buying one. So let's skip the vague “it depends” answer and give you real numbers.",
    body: [
      {
        type: "paragraph" as const,
        text: "A web application security audit costs roughly $5,000 to $30,000 for most small businesses and startups, with tightly scoped single-app engagements often landing in the $4,000 to $10,000 range.",
      },
      { type: "heading" as const, text: "Typical price ranges (and what changes them)" },
      {
        type: "table" as const,
        headers: ["Engagement type", "2026 cost (USD)", "Best for"],
        rows: [
          ["Small, tightly scoped web app or API", "$4,000–$10,000", "—"],
          [
            "Mid-complexity SaaS (gray box)",
            "$8,000–$18,000",
            "Growing SaaS with auth, dashboards, integrations",
          ],
          [
            "Standard commercial engagement",
            "$10,000–$35,000",
            "Established products with payments and multiple roles",
          ],
          [
            "Large or complex",
            "$25,000–$150,000+",
            "Enterprise platforms, heavy compliance",
          ],
        ],
      },
      { type: "heading" as const, text: "Factors setting your number" },
      {
        type: "list" as const,
        items: [
          "App size and complexity, the largest single driver",
          "Number of user roles and workflows",
          "Testing depth: gray-box or white-box versus a shallower black-box scan",
          "Compliance requirements, which typically add 15–30% to the price",
          "Whether a retest is included in scope",
        ],
      },
      { type: "heading" as const, text: "What's included in a real audit vs a checklist scan" },
      {
        type: "list" as const,
        items: [
          "Manual testing for business logic flaws automated scanners miss",
          "Authentication and authorization testing",
          "Chained vulnerability analysis, not just isolated findings",
          "A prioritized findings report ranked by real severity",
          "Clear, actionable remediation guidance",
          "Retest confirmation that fixes actually closed the gap",
        ],
      },
      { type: "heading" as const, text: "When a startup actually needs one" },
      {
        type: "paragraph" as const,
        text: "An audit shifts from optional to necessary when you're handling sensitive data, preparing for an enterprise deal, need a compliance certification, process payments, or are about to make a major architectural change.",
      },
      { type: "heading" as const, text: "Red flags in a cheap audit" },
      {
        type: "list" as const,
        items: [
          "A scan presented as if it were a full audit",
          "No named methodology behind the work",
          "Retest absent from the scope entirely",
          "Generic, templated reports that read the same for every client",
          "Undefined scope parameters before you sign",
          "High-pressure sales tactics to close quickly",
        ],
      },
      { type: "heading" as const, text: "So what should you actually budget?" },
      {
        type: "paragraph" as const,
        text: "A realistic 2026 budget for a meaningful, mostly manual audit from a competent provider is $8,000 to $18,000 for a typical startup or small business.",
      },
      { type: "heading" as const, text: "Get a straight answer, not a sales pitch" },
      {
        type: "paragraph" as const,
        text: "If you want a number specific to your actual app rather than a range, book a call and we'll scope it honestly, including telling you if you don't need one yet.",
      },
    ],
  },
  {
    slug: "laravel-security-audit",
    title: "What a Laravel Security Audit Actually Finds in a SaaS App",
    date: "2026-06-09",
    excerpt:
      "Most founders ask for a Laravel security audit expecting us to confirm what they already suspect: that their app is “probably fine, just needs a once-over.” Then we open the codebase.",
    body: [
      {
        type: "paragraph" as const,
        text: "Most founders ask for a Laravel security audit expecting us to confirm what they already suspect, that their app is probably fine and just needs a once-over. Then we open the codebase. Audits typically turn up at least one critical issue capable of exposing customer data, and it's rarely negligence: it's the pressure to ship features quickly.",
      },
      { type: "heading" as const, text: "What a security audit is (and isn't)" },
      {
        type: "paragraph" as const,
        text: "A web application security audit is a structured, deliberate examination of your codebase, configuration, and infrastructure to find ways an attacker could read data they shouldn't, act as someone they're not, or break something that should hold.",
      },
      {
        type: "list" as const,
        items: [
          "It isn't a vulnerability scanner, those miss business logic flaws entirely",
          "It isn't the same as a code-quality review",
          "It isn't a one-time, permanent guarantee",
        ],
      },
      { type: "heading" as const, text: "Seven priority checks in Laravel SaaS apps" },
      {
        type: "list" as const,
        items: [
          "Exposed secrets and configuration: .env accessibility, APP_DEBUG left on in production, leaked credentials",
          "Authentication and session handling: password hashing, session configuration, token expiration",
          "Tenant isolation, the SaaS-specific check: making sure queries actually scope to the current tenant",
          "Mass assignment: verifying $fillable and $guarded prevent unauthorized field manipulation",
          "Input validation and injection: raw database queries, DB::raw() usage, XSS vulnerabilities",
          "Rate limiting and abuse protection on login and password-reset endpoints",
          "Dependencies and known vulnerabilities: composer.lock and JS packages checked against CVE databases",
        ],
      },
      { type: "heading" as const, text: "Real, anonymized findings" },
      {
        type: "list" as const,
        items: [
          "Debug mode exposure: an app with hundreds of customers had APP_DEBUG enabled in production, exposing database credentials and internal query structure through error pages",
          "Broken authorization: a billing endpoint fetched invoices without verifying tenant ownership, letting customers increment IDs to view other customers' invoices, names, amounts, and billing addresses included",
          "Mass assignment: a user-profile form accepted a role field via mass assignment; despite the frontend hiding it, users could add role=admin to the request payload and grant themselves admin access",
          "Unthrottled login: an app with zero rate limiting on its login route allowed thousands of automated credential-stuffing attempts without throttling or alerting",
        ],
      },
      { type: "heading" as const, text: "What unfixed issues actually cost" },
      {
        type: "list" as const,
        items: [
          "Direct breach costs: incident response, forensics, legal counsel",
          "Customer churn following breach notifications",
          "Lost enterprise deals from failed security questionnaires",
          "Regulatory exposure under GDPR and US state laws",
          "Founder time diverted from the roadmap during incident response",
        ],
      },
      { type: "heading" as const, text: "Our audit process" },
      {
        type: "list" as const,
        items: [
          "Scoping: define boundaries and deliverables upfront",
          "Automated baseline: tool-based detection of known issues",
          "Manual review: code analysis from an attacker's perspective",
          "Verification: confirm exploitability before it goes in the report",
          "Reporting: severity-rated findings in plain language",
          "Remediation support: help implementing the fixes",
          "Retest: verify the fixes actually close the gap",
        ],
      },
      { type: "heading" as const, text: "If you're running Laravel in production" },
      {
        type: "paragraph" as const,
        text: "Book a free 20-minute walkthrough. We hold CEH and CompTIA Security+ certifications and have completed 30+ security audits.",
      },
    ],
  },
];

export const seedPosts = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("posts").collect();
    for (const row of existing) {
      await ctx.db.delete(row._id);
    }
    for (const post of posts) {
      await ctx.db.insert("posts", post);
    }
    return { inserted: posts.length };
  },
});
