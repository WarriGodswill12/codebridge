export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: ContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "web-application-security-audit-cost",
    title: "How Much Does a Web App Security Audit Cost in 2026?",
    date: "2026-06-09",
    excerpt:
      "If you are asking how much a web application security audit costs, you are almost certainly close to buying one. So let's skip the vague “it depends” answer and give you real numbers.",
    body: [
      {
        type: "paragraph",
        text: "A web application security audit costs roughly $5,000 to $30,000 for most small businesses and startups, with tightly scoped single-app engagements often landing in the $4,000 to $10,000 range.",
      },
      { type: "heading", text: "Typical price ranges (and what changes them)" },
      {
        type: "table",
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
      { type: "heading", text: "Factors setting your number" },
      {
        type: "list",
        items: [
          "App size and complexity, the largest single driver",
          "Number of user roles and workflows",
          "Testing depth: gray-box or white-box versus a shallower black-box scan",
          "Compliance requirements, which typically add 15–30% to the price",
          "Whether a retest is included in scope",
        ],
      },
      { type: "heading", text: "What's included in a real audit vs a checklist scan" },
      {
        type: "list",
        items: [
          "Manual testing for business logic flaws automated scanners miss",
          "Authentication and authorization testing",
          "Chained vulnerability analysis, not just isolated findings",
          "A prioritized findings report ranked by real severity",
          "Clear, actionable remediation guidance",
          "Retest confirmation that fixes actually closed the gap",
        ],
      },
      { type: "heading", text: "When a startup actually needs one" },
      {
        type: "paragraph",
        text: "An audit shifts from optional to necessary when you're handling sensitive data, preparing for an enterprise deal, need a compliance certification, process payments, or are about to make a major architectural change.",
      },
      { type: "heading", text: "Red flags in a cheap audit" },
      {
        type: "list",
        items: [
          "A scan presented as if it were a full audit",
          "No named methodology behind the work",
          "Retest absent from the scope entirely",
          "Generic, templated reports that read the same for every client",
          "Undefined scope parameters before you sign",
          "High-pressure sales tactics to close quickly",
        ],
      },
      { type: "heading", text: "So what should you actually budget?" },
      {
        type: "paragraph",
        text: "A realistic 2026 budget for a meaningful, mostly manual audit from a competent provider is $8,000 to $18,000 for a typical startup or small business.",
      },
      { type: "heading", text: "Get a straight answer, not a sales pitch" },
      {
        type: "paragraph",
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
        type: "paragraph",
        text: "Most founders ask for a Laravel security audit expecting us to confirm what they already suspect, that their app is probably fine and just needs a once-over. Then we open the codebase. Audits typically turn up at least one critical issue capable of exposing customer data, and it's rarely negligence: it's the pressure to ship features quickly.",
      },
      { type: "heading", text: "What a security audit is (and isn't)" },
      {
        type: "paragraph",
        text: "A web application security audit is a structured, deliberate examination of your codebase, configuration, and infrastructure to find ways an attacker could read data they shouldn't, act as someone they're not, or break something that should hold.",
      },
      {
        type: "list",
        items: [
          "It isn't a vulnerability scanner, those miss business logic flaws entirely",
          "It isn't the same as a code-quality review",
          "It isn't a one-time, permanent guarantee",
        ],
      },
      { type: "heading", text: "Seven priority checks in Laravel SaaS apps" },
      {
        type: "list",
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
      { type: "heading", text: "Real, anonymized findings" },
      {
        type: "list",
        items: [
          "Debug mode exposure: an app with hundreds of customers had APP_DEBUG enabled in production, exposing database credentials and internal query structure through error pages",
          "Broken authorization: a billing endpoint fetched invoices without verifying tenant ownership, letting customers increment IDs to view other customers' invoices, names, amounts, and billing addresses included",
          "Mass assignment: a user-profile form accepted a role field via mass assignment; despite the frontend hiding it, users could add role=admin to the request payload and grant themselves admin access",
          "Unthrottled login: an app with zero rate limiting on its login route allowed thousands of automated credential-stuffing attempts without throttling or alerting",
        ],
      },
      { type: "heading", text: "What unfixed issues actually cost" },
      {
        type: "list",
        items: [
          "Direct breach costs: incident response, forensics, legal counsel",
          "Customer churn following breach notifications",
          "Lost enterprise deals from failed security questionnaires",
          "Regulatory exposure under GDPR and US state laws",
          "Founder time diverted from the roadmap during incident response",
        ],
      },
      { type: "heading", text: "Our audit process" },
      {
        type: "list",
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
      { type: "heading", text: "If you're running Laravel in production" },
      {
        type: "paragraph",
        text: "Book a free 20-minute walkthrough. We hold CEH and CompTIA Security+ certifications and have completed 30+ security audits.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
