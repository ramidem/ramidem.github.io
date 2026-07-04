window.resumeData = {
  profile: {
    name: "Med Aduh",
    headline: "Software Engineer | Backend-leaning full-stack systems and product delivery",
    location: "Davao City, Philippines / Remote",
    email: "im.ramidem@gmail.com",
    github: "https://github.com/ramidem",
    summary:
      "Full-stack engineer using AI-assisted workflows to ship reliable product systems, backend services, and operational tooling.",
    updated: "2026-06-30"
  },
  lenses: [
    {
      id: "general",
      label: "General",
      summary:
        "Broad full-stack profile across product delivery, backend services, operational workflows, and client systems.",
      tags: ["fullstack", "backend", "frontend", "operations", "platform", "ai"]
    },
    {
      id: "fullstack",
      label: "Full-stack",
      summary:
        "Best fit for roles needing someone who can move between frontend product flows, APIs, data models, auth, and deployment constraints.",
      tags: ["fullstack", "frontend", "backend", "platform"]
    },
    {
      id: "backend",
      label: "Backend / platform",
      summary:
        "Strongest evidence is in service boundaries, RBAC, stored procedures, API clients, reporting systems, cloud storage, and data-backed workflows.",
      tags: ["backend", "platform", "database", "auth"]
    },
    {
      id: "product",
      label: "Product systems",
      summary:
        "Useful for product engineering roles where the work is ambiguous, workflow-heavy, and needs practical delivery judgment.",
      tags: ["product", "operations", "fullstack", "ai"]
    },
    {
      id: "frontend",
      label: "Frontend",
      summary:
        "Frontend work spans React product surfaces, admin tools, dashboards, commerce flows, responsive UI, and generated document previews.",
      tags: ["frontend", "fullstack", "product"]
    },
    {
      id: "ai",
      label: "AI-assisted delivery",
      summary:
        "Recent work uses AI-assisted execution while preserving source review, product judgment, tests, and release-quality checks.",
      tags: ["ai", "product", "platform", "operations"]
    }
  ],
  skills: [
    {
      group: "Languages",
      items: ["TypeScript", "JavaScript", "SQL"]
    },
    {
      group: "Web and services",
      items: ["React", "Next.js", "Node.js", "NestJS", "Strapi", "Zod"]
    },
    {
      group: "Cloud and data",
      items: [
        "Google Cloud",
        "Firebase",
        "MySQL",
        "PostgreSQL",
        "Drizzle ORM",
        "Firestore",
        "Firebase Storage",
        "Vercel"
      ]
    },
    {
      group: "Product tooling",
      items: ["CASL", "Konva", "Contentful", "SendGrid"]
    },
    {
      group: "Practices",
      items: ["Full-stack architecture", "developer tooling", "testing", "automation"]
    }
  ],
  repeatedTech: [
    { name: "React", count: 10 },
    { name: "TypeScript", count: 10 },
    { name: "Node.js", count: 10 },
    { name: "Google Cloud Platform", count: 8 },
    { name: "Next.js", count: 7 },
    { name: "Firebase Auth", count: 7 },
    { name: "NestJS", count: 5 },
    { name: "Firebase", count: 5 },
    { name: "MySQL", count: 5 },
    { name: "CASL", count: 4 }
  ],
  experience: [
    {
      organization: "Symph",
      role: "Software Engineer",
      dates: "Nov 2020 - Present",
      location: "Remote",
      summary:
        "Client and product engineering across NDA platforms, using full-stack and AI-assisted workflows to ship operational software.",
      bullets: [
        "Shipped production work across React, TypeScript, Next.js, NestJS, Firebase, Strapi, MySQL/PostgreSQL, and Google Cloud.",
        "Maintained long-running financial services systems while also leading newer product builds in HRIS/payroll, operations, CMS, and admin tooling.",
        "Worked across frontend product flows, service integration, authorization, reports, exports, generated clients, storage, and release validation."
      ]
    }
  ],
  projects: [
    {
      name: "HRIS / Payroll Platform",
      role: "Project Lead / Software Engineer",
      dates: "Feb 2026 - Jun 2026",
      context: "Symph client work; AI-assisted delivery",
      tags: ["fullstack", "backend", "frontend", "product", "operations", "platform", "ai", "auth"],
      tech: ["Next.js", "Firebase", "Firestore", "Firebase Auth", "Firebase Admin", "CASL", "Jest", "Playwright"],
      summary:
        "Led development of a custom HRIS/payroll platform covering employees, attendance, time-off, payroll, RBAC, documentation, reports, and audit trails.",
      bullets: [
        "Built org-scoped Firestore architecture, Firebase Auth/Admin integration, Storage rules, API routes, CASL permission gates, and emulator-backed tests.",
        "Implemented operational workflows for employee lifecycle, time tracking, leave approvals, payslips, schedules, onboarding, documentation, and notifications.",
        "Added release-quality tooling for generated documentation search, release notes, validation scripts, Playwright, Jest, and Firebase rules tests."
      ]
    },
    {
      name: "CMS / Marketplace Admin Platform",
      role: "Project Lead / Software Engineer",
      dates: "Jan 2025 - May 2025",
      context: "Symph client work",
      tags: ["backend", "frontend", "platform", "product", "fullstack"],
      tech: ["Strapi 5", "TypeScript", "React", "Node.js", "Google Cloud", "JWT", "Cloud Storage"],
      summary:
        "Led a Strapi/TypeScript CMS platform connecting CMS operators to opportunity, verification, content, and marketplace workflows.",
      bullets: [
        "Built custom Strapi plugins for opportunity review, collaborators, preview links, and AI/II verification.",
        "Integrated platform APIs through TypeScript services, React admin hooks, JWT review tokens, and status endpoints.",
        "Supported GCP deployment with Cloud Build, App Engine, managed secrets, Cloud Storage, and database configuration."
      ]
    },
    {
      name: "Financial Services Operations Platform",
      role: "Software Engineer",
      dates: "Jan 2021 - Nov 2025",
      context: "Symph client work",
      tags: ["backend", "frontend", "operations", "database", "platform", "fullstack"],
      tech: ["React", "TypeScript", "Node.js", "MySQL", "Stored procedures", "Google Cloud"],
      summary:
        "Maintained branch-operation workflows across KYC, money transfer, reports, ShopSafe, vault, and receipt handling.",
      bullets: [
        "Built React and TypeScript service changes for sendout/payout flows, watchlist checks, branch reports, and fund-request approvals.",
        "Improved operational reliability through receipt upload handling, transaction logging, stored-procedure integration, and branch-scoped report filters.",
        "Supported long-running fintech workflows across React UI, Node services, MySQL stored procedures, and GCP-backed deployment paths."
      ]
    },
    {
      name: "Financial Services Microservices Platform",
      role: "Software Engineer",
      dates: "Feb 2022 - Nov 2025",
      context: "Symph client work",
      tags: ["backend", "platform", "database", "operations"],
      tech: ["NestJS", "Nx", "TypeScript", "MySQL", "Google Cloud Storage", "Swagger/OpenAPI", "Jest"],
      summary:
        "Built service workflows across marketplace transactions, CKYC/watchlist, reports, payroll, and shared TypeScript libraries.",
      bullets: [
        "Implemented ShopSafe transaction and listing services with payment, disbursement, voucher, points/rewards, GCS image, and watchlist integrations.",
        "Delivered reporting services for bank/vault balances and fund-transfer movement with streamed MySQL data, PDF/CSV output, charts, and tests.",
        "Maintained shared service libraries for storage, errors, constants, accounting utilities, DTOs, and generated API clients."
      ]
    },
    {
      name: "Financial Services Ecommerce Platform",
      role: "Software Engineer",
      dates: "May 2025 - Aug 2025",
      context: "Symph client work",
      tags: ["fullstack", "backend", "frontend", "product", "operations"],
      tech: ["Next.js", "NestJS", "TypeScript", "MCash", "PayMongo", "Stored procedures"],
      summary:
        "Built checkout, cart, product, pickup, and payment flows across a Next.js/NestJS commerce app.",
      bullets: [
        "Integrated MCash and PayMongo checkout with OTP verification, attempt blocking, alternate payment numbers, and order success handling.",
        "Added product, branch, compute-order, and place-order backend integrations backed by stored procedures and generated TypeScript API clients.",
        "Improved checkout reliability with computed totals, branch-loading safeguards, existing-customer handling, and payment-state controls."
      ]
    },
    {
      name: "Financial Services Stored Procedure Layer",
      role: "Software Engineer",
      dates: "Apr 2021 - Nov 2025",
      context: "Symph client work",
      tags: ["backend", "database", "operations", "platform"],
      tech: ["MySQL", "Stored procedures", "SQL", "Reporting"],
      summary:
        "Maintained MySQL stored procedures behind money transfer, CKYC/watchlist, marketplace, ecommerce, vault, and reporting workflows.",
      bullets: [
        "Built report procedures for domestic transactions, bank/vault balances, fund-transfer movement per bank, and branch/area/region/zone rollups.",
        "Added database support for ShopSafe item listings/transactions, OTP attempts, KYC/watchlist logs, and fund-request receipt handling."
      ]
    },
    {
      name: "Veterinary Clinic Platform",
      role: "Software Engineer",
      dates: "Jan 2026",
      context: "Symph client/product work",
      tags: ["backend", "platform", "auth", "fullstack", "product"],
      tech: ["NestJS", "Next.js", "TypeScript", "CASL", "PostgreSQL", "Drizzle ORM", "Nx"],
      summary:
        "Implemented backend/platform work around role-based authorization, clinic membership, generated API contracts, and frontend permission visibility.",
      bullets: [
        "Implemented CASL-based RBAC across a NestJS backend and Next.js admin UI for platform admins, clinic owners, vets, staff, and pet owners.",
        "Migrated role and clinic-membership authorization flows with PostgreSQL/Drizzle schema changes, service-layer checks, and generated API client updates.",
        "Built service management foundations and fixed workflow issues across encounters, inventory, SMS history, payroll visibility, and frontend RBAC."
      ]
    },
    {
      name: "Interior Design Commerce Platform",
      role: "Contributing Software Engineer",
      dates: "Nov 2020 - Mar 2021",
      context: "Symph client work",
      tags: ["frontend", "fullstack", "product"],
      tech: ["React", "Firebase", "Konva", "Contentful", "SendGrid"],
      summary:
        "Contributed to connected workflows for designers, project managers, clients, and shoppers across design tools, review lifecycle, catalog, checkout, and order management.",
      bullets: [
        "Improved project workflows across collage-builder comments, uploaded files/photos, questionnaire behavior, access controls, local storage compression, and client-facing review states.",
        "Fixed commerce and admin workflows across order previews, delivery fees, order status actions, voucher handling, merchant/admin exports, checkout states, and product display behavior.",
        "Maintained React/Firebase shop surfaces including responsive layouts, related-product behavior, empty-cart checkout handling, and shop page fixes."
      ]
    },
    {
      name: "Distributor Operations Platform",
      role: "Project Lead / Software Engineer",
      dates: "May 2026 - Jun 2026",
      context: "Symph client work; AI-assisted delivery",
      tags: ["fullstack", "backend", "frontend", "operations", "product", "ai"],
      tech: ["Next.js", "Firebase", "Firestore", "ExcelJS", "jsPDF", "Recharts", "Resend"],
      summary:
        "Led an operations platform for account management, distributor reports, sales workflows, visit schedules, and market dashboards.",
      bullets: [
        "Implemented purchase order, consignment, invoice/DR, report upload, export dashboard, and market workflow policy flows.",
        "Built Firebase-backed auth/session handling, Firestore/Storage access, user/admin management, and route-protected staff/distributor areas.",
        "Added reporting and export workflows with dashboards, spreadsheet/PDF generation, upload handling, and email handoff."
      ]
    },
    {
      name: "Education Planning Tool",
      role: "Software Engineer",
      dates: "Aug 2024 - Sep 2024",
      context: "Symph client/product work",
      tags: ["frontend", "product", "fullstack"],
      tech: ["Next.js", "React", "TypeScript", "Nx", "DOCX generation", "Playwright"],
      summary:
        "Supported an AI lesson-planning product with responsive web flows and generated document exports.",
      bullets: [
        "Improved DOCX export for Daily Lesson Logs, including subject/grade headers, objectives, weekday tables, and empty-cell handling.",
        "Refined responsive landing content UX with carousel sizing, image cards, image modals, and gallery navigation.",
        "Fixed portal and generated-content display details across Lesson Planner web flows."
      ]
    },
    {
      name: "Nookbud",
      role: "Founder / Software Engineer",
      dates: "Apr 2026 - Jun 2026",
      context: "Personal product; AI-assisted delivery",
      tags: ["product", "ai", "backend", "frontend", "platform"],
      tech: ["React Native", "Nx", "Drizzle ORM", "SQLite", "NestJS", "Next.js"],
      summary:
        "Led product discovery, design system work, and implementation for a co-parenting coordination app with records, audit trails, and exports.",
      bullets: [
        "Built local-first mobile data foundations with Drizzle/SQLite migrations, immutable audit logs, versioned entries, attachments, spaces, members, and child records.",
        "Implemented service boundaries for audit, entries, resources, tasks, disputes, acknowledgments, timeline, sync, export, files, and notifications.",
        "Maintained an Nx workspace spanning React Native mobile, Next.js landing/admin/design surfaces, NestJS backend scaffolding, and product/design artifacts."
      ]
    },
    {
      name: "RoundSave",
      role: "Founder / Software Engineer",
      dates: "Mar 2026 - Jun 2026",
      context: "Personal product; AI-assisted delivery",
      tags: ["product", "ai", "frontend", "backend", "platform"],
      tech: ["Next.js", "Firebase", "Firestore", "React Native", "Nx", "PWA"],
      summary:
        "Built a rotating savings circle platform with groups, contributions, payouts, wallet accounting, disputes, KYC, and trust scoring.",
      bullets: [
        "Built Firebase-backed web workflows for dashboards, group creation/joining, transaction history, withdrawals, dispute escalation, push notifications, and analytics.",
        "Implemented Firestore rules for group membership, organizer permissions, contributions, payouts, trust scores, wallet records, ledger records, withdrawals, and disputes.",
        "Added PWA/service-worker support, foreground notification handling, installable manifest assets, and React Native/Nx mobile scaffolding."
      ]
    }
  ]
};
