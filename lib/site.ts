/**
 * Single source of truth for site-wide data: brand, NAP (name/address/phone),
 * navigation, international positioning, case studies, and the services taxonomy.
 * Imported by components, pages, SEO helpers and JSON-LD builders.
 */

export const site = {
  name: "Sharper Labs Marketing",
  legalName: "Sharper Labs Marketing Consultancy",
  tagline: "Digital Marketing That Moves Your Business Forward",
  shortDescription:
    "Sharper Labs Marketing is a UK-based digital marketing consultancy serving UK and international clients. We build stronger brands, reach the right audiences, and achieve sustainable growth through brand strategy, web development, paid advertising, social media, data analysis, and SEO.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev.sharper-labs.com/marketing",
  email: "marketing@sharper-labs.com",
  phone: "0203 8193999",
  phoneIntl: "+44 (0)203 8193999",
  phoneHref: "tel:+442038193999",
  whatsappHref: "https://wa.me/442038193999",
  hours: "Mon–Fri 9:00–17:00 (GMT). Weekends & Bank Holidays closed.",
  timeZone: "Europe/London",
  founded: "2019",
  areaServed: "United Kingdom and Internationally",
  /** Default service pre-selected in the enquiry form. */
  featured: { label: "Brand Marketing", slug: "brand-marketing" },
} as const;

export const offices = {
  registered: {
    label: "Registered Address",
    name: "Arquen House",
    street: "4–6 Spicer Street",
    city: "St Albans",
    postcode: "AL3 4PQ",
    country: "United Kingdom",
  },
  head: {
    label: "Head Office",
    name: "Confero House",
    street: "333 Edgware Road",
    city: "London",
    postcode: "NW9 6TD",
    country: "United Kingdom",
  },
} as const;

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/share/18jbEi6M2e/?mibextid=wwXIfr", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/sharper.labs?igh=NmVnN2liMG1pMGVw", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com/@sharperlabs?si=RqhdQEFYp2yBcMbi", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/sharperlabshranlegal/", icon: "linkedin" },
] as const;

export const otherDivisions = [
  { label: "Group Home", href: "/" },
  { label: "HR", href: "/hr/" },
  { label: "Legal", href: "/legal/" },
  { label: "Academy", href: "/academy/" },
  { label: "IT", href: "/it/" },
  { label: "Recruitment", href: "/recruitment/" },
] as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

/* ----------------------------------------------------------------------- */
/* Services Taxonomy (Standardized 4-Part Structure)                       */
/* ----------------------------------------------------------------------- */

export type ServiceCapability = {
  title: string;
  description: string;
  icon?: string;
};

export type Service = {
  slug: string;
  /** page H1 */
  title: string;
  /** short label for nav/menus/cards */
  short: string;
  icon: string; // lucide-react icon name
  /** one-line teaser for cards & meta description seed */
  excerpt: string;
  /** hero image on the service page + card image */
  image: string;
  imageAlt: string;
  contain?: boolean;
  kicker: string;
  lead: string;
  hook?: string;
  /** Structured "What We Do" capabilities */
  whatWeDo: ServiceCapability[];
  /** Structured "Our Approach" narrative */
  approach: string;
  /** Structured "What You Can Expect" deliverables */
  whatYouCanExpect: string[];
  /** intro body paragraphs */
  body: string[];
  /** benefit bullets shown as a checklist */
  benefits: string[];
  /** secondary detail blocks */
  detailHeading?: string;
  details?: { title: string; description: string; icon?: string }[];
  /** numbered process steps (optional) */
  process?: { title: string; description: string }[];
  /** page-level FAQs */
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "brand-marketing",
    title: "Brand Marketing",
    short: "Brand Marketing",
    icon: "Palette",
    excerpt:
      "Build a distinctive brand identity, messaging, and visual presence your customers recognize and remember across digital and offline channels.",
    image: "/images/brand-marketing-02.jpg",
    imageAlt: "Designer creating a brand logo and visual identity",
    contain: true,
    kicker: "Brand Identity & Strategy",
    lead: "Build a Brand Your Customers Recognise and Remember",
    hook: "Your brand is more than a logo. It is the identity, message, and experience that shape how customers perceive your business across UK and international markets.",
    body: [
      "Your brand is more than a logo. It is the identity, message, and experience that shape how customers perceive your business.",
      "Sharper Labs Marketing helps you create or refine a distinctive brand that communicates your value, connects with your target audience, and remains consistent across digital and offline touchpoints.",
      "Whether you are launching a new enterprise or repositioning an established company for global expansion, we align creative direction with commercial objectives.",
    ],
    whatWeDo: [
      {
        title: "Brand Strategy and Positioning",
        description:
          "Research your market, audience, and competitors to clarify what your business stands for and how it should be positioned.",
        icon: "Target",
      },
      {
        title: "Visual Identity Development",
        description:
          "Develop or refine your logo, colour palette, typography, and visual style to create a consistent, memorable brand identity.",
        icon: "Palette",
      },
      {
        title: "Brand Messaging and Tone of Voice",
        description:
          "Create clear messaging that communicates your value proposition and gives your brand a distinctive, trusted personality.",
        icon: "MessageSquare",
      },
      {
        title: "Marketing Materials & Collateral",
        description:
          "Develop branded digital assets and marketing collateral that support campaigns and maintain absolute consistency across channels.",
        icon: "LayoutTemplate",
      },
    ],
    approach:
      "We begin by understanding your business, audience, and market position. We then define the brand direction, develop the agreed creative assets, and provide clear guidance on applying the identity consistently across every client touchpoint.",
    whatYouCanExpect: [
      "A clearer brand identity and distinctive market positioning",
      "Consistent messaging and tone of voice across customer touchpoints",
      "Professional visual assets aligned with your business goals",
      "A robust brand foundation for future marketing campaigns",
    ],
    benefits: [
      "A distinctive visual identity and logo",
      "Consistent brand messaging and tone of voice",
      "Brand storytelling that builds trust",
      "Stronger brand recognition and recall",
      "Brand guidelines your whole team can follow",
      "A brand strategy aligned to your commercial ambitions",
    ],
    detailHeading: "What our brand marketing covers",
    details: [
      {
        title: "Brand Strategy and Positioning",
        description: "Research your market and competitors to define where your business wins.",
        icon: "Target",
      },
      {
        title: "Visual Identity Design",
        description: "Logos, colour palettes, and typography built for modern screens and print.",
        icon: "Palette",
      },
      {
        title: "Tone of Voice & Messaging",
        description: "Words and narratives that resonate across UK and international markets.",
        icon: "MessageSquare",
      },
      {
        title: "Brand Guidelines & Collateral",
        description: "Complete asset libraries and guidelines your teams and partners can execute with ease.",
        icon: "LayoutTemplate",
      },
    ],
    faqs: [
      {
        question: "What is brand marketing?",
        answer:
          "Brand marketing promotes your business as a whole rather than a single offer. It builds a consistent identity, story, and reputation, so customers recognise, remember, and trust your brand over time.",
      },
      {
        question: "What is the difference between branding and marketing?",
        answer:
          "Marketing is how you generate demand and revenue in the short term; branding is the long-term foundation that shapes how your business is perceived. Strong branding makes every marketing campaign perform significantly better.",
      },
      {
        question: "Do you design logos and brand guidelines?",
        answer:
          "Yes. We design logos and full visual identities, and produce practical brand guidelines covering colours, typography, imagery, and tone of voice for digital and print application.",
      },
      {
        question: "Can you refresh our existing brand for international markets?",
        answer:
          "Absolutely. We assess your current brand, target demographics, and expansion goals, then evolve your identity to appeal to wider audiences while preserving your established brand equity.",
      },
      {
        question: "How do I get started with brand marketing?",
        answer:
          "Book a free consultation with our team or call +44 (0)203 8193999 to discuss your brand goals and review our strategic recommendations.",
      },
    ],
  },
  {
    slug: "website-design-and-development",
    title: "Website Design & Development",
    short: "Website Design & Development",
    icon: "Code2",
    excerpt:
      "Turn your website into a better customer experience with responsive design, intuitive UI/UX, and conversion journeys built to turn visitors into enquiries.",
    image: "/images/brand-marketing-03.png",
    imageAlt: "Illustration of website design and development interface",
    contain: true,
    kicker: "UI/UX & Engineering",
    lead: "Turn Your Website into a Better Customer Experience",
    hook: "Your website is often the first place potential customers go to understand your business. It should communicate your value clearly, work smoothly across devices, and make the next step easy.",
    body: [
      "Your website is often the first place potential customers go to understand your business. It should communicate your value clearly, work smoothly across devices, and make the next step easy.",
      "We design and develop websites that reflect your brand, support your business objectives, and provide a clear, user-friendly journey from first visit to enquiry.",
      "From technical performance and accessibility to search engine optimization and analytics integration, our websites are engineered for real business growth.",
    ],
    whatWeDo: [
      {
        title: "Website Planning and Structure",
        description:
          "Understand your requirements, audience, and goals before planning the site architecture and key user conversion journeys.",
        icon: "Layers",
      },
      {
        title: "UI/UX Design",
        description:
          "Create clear layouts, intuitive navigation, and consistent visual experiences that help users find relevant information effortlessly.",
        icon: "LayoutTemplate",
      },
      {
        title: "Responsive Website Development",
        description:
          "Build fast, secure websites designed to deliver flawless experiences across desktop, tablet, and mobile devices.",
        icon: "Code2",
      },
      {
        title: "Conversion-Focused Content and Design",
        description:
          "Structure pages around clear messages, compelling proof points, and strategic calls to action that encourage visitors to enquire.",
        icon: "Target",
      },
      {
        title: "Testing, Launch and Ongoing Maintenance",
        description:
          "Test agreed functionality and cross-browser compatibility before launch, with ongoing maintenance and support.",
        icon: "CheckCircle2",
      },
    ],
    approach:
      "We move methodically from discovery and planning to design, development, testing, and launch. We also identify opportunities to improve existing websites through performance, usability, and conversion reviews.",
    whatYouCanExpect: [
      "A high-performing website aligned with your brand and commercial objectives",
      "Seamless responsive design across all supported devices",
      "Clear navigation and conversion-focused user journeys",
      "An SEO-friendly technical foundation built on modern best practices",
      "Better opportunities to convert visitors into qualified enquiries",
    ],
    benefits: [
      "Responsive design that works on every device",
      "Fast, reliable, and secure web architecture",
      "User-focused UI/UX that drives enquiries",
      "Search-engine-friendly build from day one",
      "Ongoing website maintenance and security updates",
      "Smooth project delivery without disruption to your operations",
    ],
    detailHeading: "How we build your website",
    process: [
      {
        title: "Discovery and Planning",
        description: "We understand your objectives, audience, and competitor landscape to architect an effective site map.",
      },
      {
        title: "UI/UX Design",
        description: "We create modern, branded wireframes and interactive prototypes focused on intuitive user journeys.",
      },
      {
        title: "Development & Integration",
        description: "We build clean, accessible code with integrated analytics, CMS capabilities, and fast load speeds.",
      },
      {
        title: "Testing and Launch",
        description: "Rigorous quality assurance across browsers and screen sizes before zero-downtime deployment.",
      },
      {
        title: "Maintenance and Optimisation",
        description: "Ongoing security, speed enhancements, and conversion reviews as your business expands.",
      },
    ],
    faqs: [
      {
        question: "Do you design and build websites from scratch?",
        answer:
          "Yes. We handle the full lifecycle from discovery and UI/UX design to development, testing, and deployment, tailoring every element to your commercial objectives.",
      },
      {
        question: "Will my website work across international markets?",
        answer:
          "Yes. We build responsive, multi-region capable websites optimized for global CDNs, fast international page speeds, and multi-timezone lead capture.",
      },
      {
        question: "Do you offer ongoing website maintenance?",
        answer:
          "We do. We provide continuous support, security patching, and technical upkeep so your website stays secure and high-performing.",
      },
      {
        question: "Is the website built to be search-engine friendly?",
        answer:
          "Every website is built with clean semantic HTML, structured JSON-LD data, optimized meta tags, and high Core Web Vitals scores.",
      },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Social Media Marketing",
    icon: "Share2",
    excerpt:
      "Turn social media activity into meaningful customer connections with purposeful content, consistent communication, and data-led management.",
    image: "/images/brand-marketing-01.png",
    imageAlt: "Illustration of social media marketing campaign and audience engagement",
    contain: true,
    kicker: "Audience Growth & Engagement",
    lead: "Turn Social Media Activity into Meaningful Customer Connections",
    hook: "Social media provides an opportunity to communicate your brand's value, build relationships, and stay connected with potential customers across platforms.",
    body: [
      "Social media provides an opportunity to communicate your brand's value, build relationships, and stay connected with potential customers.",
      "We help businesses plan and manage social media activity around their audience, objectives, and brand identity. Our focus is on purposeful content, consistent communication, and performance insights that guide improvement.",
      "Whether your focus is B2B lead generation on LinkedIn or consumer engagement on Instagram and TikTok, we coordinate social media with your overall commercial strategy.",
    ],
    whatWeDo: [
      {
        title: "Social Media Strategy",
        description: "Identify suitable platforms, audience priorities, content themes, and commercial objectives.",
        icon: "Target",
      },
      {
        title: "Content Planning and Creation",
        description: "Develop content calendars, compelling captions, creative briefs, and platform-appropriate graphics and copy.",
        icon: "LayoutTemplate",
      },
      {
        title: "Social Media Management",
        description: "Support publishing, scheduling, profile consistency, and agreed community management activities.",
        icon: "MessageSquare",
      },
      {
        title: "Campaigns and Promotions",
        description: "Plan social content around product launches, services, seasonal campaigns, and key business announcements.",
        icon: "Rocket",
      },
      {
        title: "Performance Analysis",
        description: "Review available metrics such as reach, engagement, clicks, and conversions to identify what resonates.",
        icon: "BarChart3",
      },
    ],
    approach:
      "We assess your current presence, define content priorities, plan and publish agreed content, and review results regularly. Future content is refined based on audience response and performance data.",
    whatYouCanExpect: [
      "A more consistent, professional social media presence",
      "Content aligned with your brand voice and target audience",
      "Better understanding of audience engagement and content resonance",
      "Increased relevant website traffic and qualified enquiries",
      "Clearer insight into content performance and ROI",
    ],
    benefits: [
      "Active presence on the platforms that matter to your buyers",
      "Increased brand awareness and authority in your sector",
      "Expert content planning, creation, and distribution",
      "Audience growth on LinkedIn, Instagram, Facebook, and beyond",
      "Regular insight reporting to continuously refine campaigns",
    ],
    faqs: [
      {
        question: "Which social media platforms do you manage?",
        answer:
          "We manage all major platforms, including LinkedIn, Instagram, Facebook, X (Twitter), and YouTube. We focus on the channels where your buyers actually spend time.",
      },
      {
        question: "Do you handle B2B social media as well as B2C?",
        answer:
          "Yes. We specialize in B2B thought-leadership and executive positioning on LinkedIn, as well as visually rich B2C campaigns on lifestyle platforms.",
      },
      {
        question: "How do you measure social media return on investment?",
        answer:
          "We look past vanity metrics to measure meaningful indicators: qualified click-throughs, engagement quality, website conversions, and direct lead enquiries.",
      },
    ],
  },
  {
    slug: "social-media-followers",
    title: "Social Media Followers Increasing",
    short: "Follower Growth",
    icon: "UserPlus",
    excerpt:
      "Rapid, genuine social media follower growth across Instagram, TikTok, LinkedIn, and Facebook to build authoritative brand presence, engagement, and reach.",
    image: "/images/brand-marketing-04.png",
    imageAlt: "Illustration of social media follower increasing across Instagram, TikTok, LinkedIn, and Facebook",
    contain: true,
    kicker: "Multi-Platform Audience Scale",
    lead: "Accelerate Genuine Social Media Followers Across Every Major Platform",
    hook: "Growing your social media followers builds immediate authority, trust, and organic reach. We help brands expand verified, engaged audiences across Facebook, Instagram, LinkedIn, and TikTok.",
    body: [
      "A large, engaged social media following is critical for brand credibility, market trust, and inbound lead generation. We build tailored follower growth strategies engineered to attract real, targeted followers across Facebook, Instagram, LinkedIn, and TikTok.",
      "We combine algorithmic content optimization, targeted outreach campaigns, and viral audience funnels designed to convert casual profile visitors into loyal, long-term followers.",
      "We manage the entire follower increasing process from start to finish, continuously refining demographic targeting, content velocity, and cross-platform synergy to achieve consistent growth.",
    ],
    whatWeDo: [
      {
        title: "Instagram & TikTok Follower Expansion",
        description: "Deploy viral short-form video strategies, trend-jacking, and high-converting profile funnels to attract massive, active followers.",
        icon: "TrendingUp",
      },
      {
        title: "LinkedIn B2B Audience Scaling",
        description: "Grow authoritative professional followings for founders, executives, and company pages through targeted thought-leadership networking.",
        icon: "Target",
      },
      {
        title: "Facebook Community & Page Growth",
        description: "Build vibrant Facebook page followings and dedicated community groups with high daily engagement and active discussion.",
        icon: "Users",
      },
      {
        title: "Niche Audience & Demographic Targeting",
        description: "Laser-target followers based on precise geography, industry, interests, and competitor followings to ensure authentic engagement.",
        icon: "Search",
      },
      {
        title: "Engagement Retention & Profile Optimisation",
        description: "Transform profile layouts, highlight reels, and bios to maximize visitor-to-follower conversion rates and long-term retention.",
        icon: "LayoutTemplate",
      },
    ],
    approach:
      "We begin with thorough audience and competitor profiling, craft platform-specific growth funnels across Facebook, Instagram, LinkedIn, and TikTok, and execute continuous engagement campaigns to scale real followers rapidly without vanity bots.",
    whatYouCanExpect: [
      "Rapid, measurable increase in authentic followers across target platforms",
      "Enhanced social proof, brand authority, and profile credibility",
      "Higher engagement rates, story views, and profile interactions",
      "Tailored strategies across Facebook, Instagram, LinkedIn, and TikTok",
      "Transparent weekly reporting on follower velocity and audience quality",
    ],
    benefits: [
      "Immediate boost in social proof and brand credibility",
      "Greater organic reach across Facebook, Instagram, LinkedIn, and TikTok",
      "Zero bots or fake accounts—100% targeted, genuine growth",
      "Seamless integration with your overall marketing and sales funnel",
    ],
    faqs: [
      {
        question: "Which social media platforms do you grow followers on?",
        answer:
          "We specialise in scaling targeted followers across all major networks, including Instagram, TikTok, LinkedIn, and Facebook, tailoring our growth mechanics to each platform's unique algorithm.",
      },
      {
        question: "Are the followers real and engaged?",
        answer:
          "Yes. We strictly use organic growth funnels, viral content strategies, and targeted demographic outreach. We never use fake bots or deceptive shortcuts that violate platform terms.",
      },
      {
        question: "How quickly will we see follower growth?",
        answer:
          "Our initial campaigns typically begin driving noticeable follower velocity within the first 7 to 14 days, with compounding growth accelerating over consecutive months.",
      },
    ],
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    short: "Data Analysis",
    icon: "BarChart3",
    excerpt:
      "Turn marketing data into better business decisions with consolidated performance views, audience insights, and actionable recommendations.",
    image: "/images/brand-marketing-05.png",
    imageAlt: "Illustration of marketing data analysis and dashboards",
    contain: true,
    kicker: "Business Intelligence & Analytics",
    lead: "Turn Marketing Data into Better Business Decisions",
    hook: "Marketing data is valuable when it helps you understand your audience, evaluate performance, and decide what to do next with confidence.",
    body: [
      "Marketing data is valuable when it helps you understand your audience, evaluate performance, and decide what to do next.",
      "Sharper Labs Marketing helps businesses interpret relevant data from their digital channels and turn findings into practical, commercial recommendations.",
      "By consolidating numbers from web analytics, CRM systems, ad accounts, and social channels, we give you a single, unified view of what drives revenue.",
    ],
    whatWeDo: [
      {
        title: "Marketing Performance Analysis",
        description: "Review available data to understand traffic, engagement, leads, conversions, and campaign outcomes.",
        icon: "BarChart3",
      },
      {
        title: "Audience and Market Insights",
        description: "Examine audience behaviour, market trends, and competitor activity to identify growth opportunities.",
        icon: "Search",
      },
      {
        title: "Channel and Campaign Comparison",
        description: "Compare performance across channels and campaigns to identify which activities contribute to agreed objectives.",
        icon: "Layers",
      },
      {
        title: "Reporting and Dashboards",
        description: "Organise key performance indicators into clear, easy-to-understand executive dashboards.",
        icon: "LayoutTemplate",
      },
      {
        title: "Actionable Recommendations",
        description: "Translate findings into prioritised actions, such as refining content, improving landing pages, or adjusting budgets.",
        icon: "Target",
      },
    ],
    approach:
      "We establish the business questions first, review the available data, assess its quality, and identify meaningful patterns. We then present the findings and recommend practical next steps to accelerate growth.",
    whatYouCanExpect: [
      "A clearer, single-source view of marketing performance across channels",
      "Better visibility into conversion bottlenecks and revenue opportunities",
      "More informed campaign and budget allocation decisions",
      "Executive reporting linked directly to commercial KPIs",
      "Actionable recommendations based on verified evidence rather than guesswork",
    ],
    benefits: [
      "Evidence-based decision making for senior leadership",
      "Elimination of wasteful marketing expenditure",
      "Clear attribution across multi-touch buyer journeys",
      "Custom dashboards tailored to your reporting cycles",
    ],
    faqs: [
      {
        question: "What is marketing data analysis?",
        answer:
          "Marketing data analysis gathers and interprets data across digital touchpoints to evaluate strategy performance and determine where to invest for maximum return.",
      },
      {
        question: "What platforms do you work with?",
        answer:
          "We work with Google Analytics 4, Google Search Console, Looker Studio, CRM databases (HubSpot, Salesforce), and all major advertising platforms.",
      },
      {
        question: "How often will we receive reports?",
        answer:
          "We provide automated real-time dashboards alongside scheduled monthly executive briefings with strategic recommendations.",
      },
    ],
  },
  {
    slug: "organic-seo",
    title: "Organic SEO",
    short: "Organic SEO",
    icon: "Search",
    excerpt:
      "Help the right customers find your business through search with technical audits, search intent research, on-page optimisation, and sustainable authority building.",
    image: "/images/brand-marketing-06.png",
    imageAlt: "Illustration of search engine optimisation and website ranking",
    contain: true,
    kicker: "Search Engine Optimisation",
    lead: "Help the Right Customers Find Your Business Through Search",
    hook: "When potential customers search for products or services you provide, your website needs to be discoverable, useful, and relevant to their commercial needs.",
    body: [
      "When potential customers search for products or services you provide, your website needs to be discoverable, useful, and relevant to their needs.",
      "Our organic SEO service helps businesses improve search visibility through technical improvements, keyword research, content optimization, and ongoing performance analysis.",
      "We focus on sustainable, white-hat techniques that build lasting authority for commercial queries across the UK and international markets.",
    ],
    whatWeDo: [
      {
        title: "SEO Audits and Technical Reviews",
        description: "Review technical issues that may affect crawling, indexing, Core Web Vitals, and search visibility.",
        icon: "Search",
      },
      {
        title: "Keyword and Search Intent Research",
        description: "Identify relevant search terms and understand what users are looking for at each stage of their decision journey.",
        icon: "Target",
      },
      {
        title: "On-Page SEO & Content Optimisation",
        description: "Improve page titles, meta descriptions, headings, internal links, content structure, and keyword relevance.",
        icon: "LayoutTemplate",
      },
      {
        title: "Content Strategy & Topic Clusters",
        description: "Identify high-value topics and content opportunities that answer customer questions and earn organic traffic.",
        icon: "Layers",
      },
      {
        title: "Authority and Backlink Development",
        description: "Identify opportunities to earn genuine backlinks through useful content, industry directories, and reputable publications.",
        icon: "CheckCircle2",
      },
      {
        title: "Performance Monitoring & Analytics",
        description: "Use Google Search Console and analytics platforms to monitor impressions, clicks, rankings, and conversions.",
        icon: "BarChart3",
      },
    ],
    approach:
      "We begin with a comprehensive technical and competitor audit and a prioritised action plan. We then implement agreed technical and content improvements, monitor performance, and refine the strategy as search algorithms evolve.",
    whatYouCanExpect: [
      "A stronger technical SEO foundation with clean crawlability and fast page speed",
      "Better alignment between website content and user search intent",
      "Improved opportunities to earn relevant, high-converting organic traffic",
      "Greater visibility and transparent tracking across target keywords",
      "A sustainable, long-term approach to compounding search growth",
    ],
    benefits: [
      "Higher search rankings on Google and Bing for commercial queries",
      "Continuous technical SEO fixes and on-page optimization",
      "Competitor gap analysis to capture market share",
      "High-intent traffic that reduces reliance on paid media",
      "Long-term compounding return on investment",
    ],
    faqs: [
      {
        question: "How long does SEO take to see meaningful results?",
        answer:
          "SEO is a compounding long-term investment. Most clients begin seeing improvements in crawl health and initial rankings within 3 to 6 months, with major traffic and lead growth accelerating thereafter.",
      },
      {
        question: "Can you guarantee first-page rankings?",
        answer:
          "No ethical agency can guarantee specific #1 rankings, as search algorithms and competitors change constantly. What we guarantee is proven, white-hat methodology, technical excellence, and transparent monthly progress.",
      },
      {
        question: "Do you optimize for UK local search or international search?",
        answer:
          "Both. We implement local schema and geo-targeting for UK regional visibility, as well as hreflang, international architecture, and search intent targeting for cross-border reach.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find(
    (s) => s.slug === slug || (slug === "pay-per-click" && s.slug === "social-media-followers"),
  );
}

/* ----------------------------------------------------------------------- */
/* Case Studies (Strictly Adhering to Management 5-Point Specification)    */
/* ----------------------------------------------------------------------- */

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  category: string;
  services: string[];
  featured: boolean;
  clientOverview: {
    industry: string;
    businessModel: string;
    targetMarket: string;
    timeframe: string;
  };
  challenge: string;
  strategyAndWork: string[];
  results: {
    metric: string;
    label: string;
    period: string;
    source: string;
  }[];
  keyTakeaway: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "international-b2b-supply-chain",
    title: "Scaling Inbound Enterprise Enquiries Across the UK & Europe",
    summary:
      "How a specialist supply-chain tech consultancy achieved a 214% surge in qualified inbound RFPs through unified brand positioning and international SEO.",
    image: "/images/marketing-landing-1.jpeg",
    category: "B2B & Tech",
    services: ["Brand Marketing", "Website Design & Development", "Organic SEO"],
    featured: true,
    clientOverview: {
      industry: "Enterprise Supply Chain & Logistics Advisory",
      businessModel: "B2B Professional Consultancy",
      targetMarket: "UK, Germany, Benelux, and North America",
      timeframe: "9 Months",
    },
    challenge:
      "The client had strong industry credibility in the UK but had fragmented website messaging that positioned them narrowly as a London firm. Overseas prospects found the website slow and confusing, resulting in high bounce rates and near-zero organic enquiries from international buyers.",
    strategyAndWork: [
      "Repositioned the brand as a premier UK-based consultancy serving UK and international supply chain leaders.",
      "Re-engineered the website architecture with responsive Next.js development, reducing page load times from 4.8s to 0.9s.",
      "Executed an international organic SEO strategy targeting high-intent commercial keywords across UK and European search queries.",
      "Integrated a multi-timezone consultation booking system and quotation request workflow.",
    ],
    results: [
      {
        metric: "+214%",
        label: "Increase in Qualified Enterprise Enquiries",
        period: "9 Months",
        source: "HubSpot CRM & Google Analytics 4",
      },
      {
        metric: "Top 3",
        label: "Rankings for 48 High-Intent Commercial Terms",
        period: "Google UK & EU",
        source: "Google Search Console",
      },
      {
        metric: "62%",
        label: "Increase in Average Session Duration",
        period: "Post-Launch",
        source: "Google Analytics 4",
      },
    ],
    keyTakeaway:
      "Positioning a UK consultancy with clear international messaging combined with fast, conversion-oriented web architecture builds immediate trust with overseas enterprise clients.",
    testimonial: {
      quote:
        "Sharper Labs transformed our digital positioning completely. We went from being viewed as a local firm to competing and winning cross-border contracts across Europe.",
      author: "David M.",
      role: "Managing Director",
    },
  },
  {
    slug: "sustainable-lifestyle-ecommerce-scale",
    title: "Scaling 250K+ Active Social Media Followers for an International Lifestyle Brand",
    summary:
      "Executing viral social growth funnels and targeted audience expansion across Instagram, TikTok, LinkedIn, and Facebook to build massive brand authority.",
    image: "/images/brand-marketing-04.png",
    category: "E-commerce & Retail",
    services: ["Social Media Followers Increasing", "Data Analysis", "Website Design & Development"],
    featured: true,
    clientOverview: {
      industry: "Sustainable Consumer Goods & Lifestyle",
      businessModel: "Direct-to-Consumer (D2C) E-commerce",
      targetMarket: "UK & Gulf Cooperation Council (UAE, Saudi Arabia, Qatar)",
      timeframe: "6 Months",
    },
    challenge:
      "The brand struggled to build an authentic, engaged social presence. Stagnant follower growth on Instagram and TikTok was limiting organic reach, while customer trust and brand credibility remained low.",
    strategyAndWork: [
      "Engineered multi-channel follower acquisition campaigns across Instagram, TikTok, LinkedIn, and Facebook.",
      "Optimised short-form viral video hooks and creator collaborations to drive rapid profile visits and conversions.",
      "Built dedicated community engagement funnels that converted casual viewers into active, engaged followers.",
      "Deployed a custom analytics dashboard tracking real-time follower velocity, retention, and engagement across all channels.",
    ],
    results: [
      {
        metric: "+250K",
        label: "Verified Social Media Followers Gained",
        period: "6-Month Run Rate",
        source: "Instagram, TikTok & Meta Analytics",
      },
      {
        metric: "+340%",
        label: "Growth in Cross-Platform Audience Engagement",
        period: "Quarter 2 vs Quarter 4",
        source: "Consolidated Data Dashboard",
      },
      {
        metric: "+138%",
        label: "Growth in Profile-to-Website Inbound Traffic",
        period: "Year-over-Year",
        source: "Shopify Analytics",
      },
    ],
    keyTakeaway:
      "Disciplined audience targeting, platform-native content hooks, and proactive community engagement deliver compounding, authentic social follower growth.",
    testimonial: {
      quote:
        "The clarity and speed Sharper Labs brought to our social media follower growth was extraordinary. Our communities on Instagram and TikTok expanded rapidly with real, engaged customers.",
      author: "Sarah K.",
      role: "Founder & Head of Growth",
    },
  },
  {
    slug: "healthcare-clinical-advisory-growth",
    title: "Establishing Thought Leadership & Organic Authority in Healthcare",
    summary:
      "How an established UK healthcare advisory practice leveraged strategic content and technical SEO to generate a 310% increase in international consultation requests.",
    image: "/images/brand-marketing-01.png",
    category: "Healthcare & Life Sciences",
    services: ["Organic SEO", "Brand Marketing", "Social Media Marketing"],
    featured: true,
    clientOverview: {
      industry: "Healthcare, Compliance & Clinical Practice",
      businessModel: "Specialist Advisory & Training",
      targetMarket: "UK National Health Providers & Overseas Private Clinics",
      timeframe: "12 Months",
    },
    challenge:
      "The consultancy possessed world-class medical expertise, but their online presence was static and invisible in organic search. Potential partners searching for specialist UK clinical guidance could not discover their insights or service offerings.",
    strategyAndWork: [
      "Conducted in-depth search intent research mapping clinical decision-makers' regulatory and compliance questions.",
      "Authored 24 comprehensive, authoritative guides aligned with Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) criteria.",
      "Executed targeted digital PR earning editorial mentions in high-authority medical and compliance journals.",
      "Built an interactive consultation booking workflow with automated calendar invites across different time zones.",
    ],
    results: [
      {
        metric: "+310%",
        label: "Increase in High-Value Consultation Requests",
        period: "12-Month Period",
        source: "Consultation Booking Engine",
      },
      {
        metric: "4.2x",
        label: "Growth in Total Organic Search Impressions",
        period: "Annual Comparison",
        source: "Google Search Console",
      },
      {
        metric: "8",
        label: "Earned Tier-1 Medical Publication Backlinks",
        period: "Year 1",
        source: "Ahrefs & Search Console",
      },
    ],
    keyTakeaway:
      "For professional advisory firms, authentic thought leadership and high E-E-A-T content are the most reliable drivers of high-margin international client acquisition.",
    testimonial: {
      quote:
        "We now receive genuine enquiries from healthcare executives across the UK and the Commonwealth who found us solely through organic search.",
      author: "Dr. Alistair R.",
      role: "Senior Partner",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/* ----------------------------------------------------------------------- */
/* Keywords Architecture (From Management Improvement Guide Pages 11–13)   */
/* ----------------------------------------------------------------------- */

export const targetKeywords = {
  primary: [
    "Digital marketing agency UK",
    "Digital marketing consultancy UK",
    "Digital marketing services UK",
    "Full-service digital marketing agency",
    "Digital marketing for small businesses",
    "B2B digital marketing agency UK",
    "Digital marketing strategy services",
    "Business growth marketing agency",
    "Online marketing services for businesses",
  ],
  brandMarketing: [
    "Brand marketing agency UK",
    "Branding agency for businesses",
    "Brand strategy consultancy",
    "Brand identity design services",
    "Brand positioning strategy",
    "Brand awareness campaigns",
    "Business rebranding services",
  ],
  websiteDesign: [
    "Website design agency UK",
    "Website development company UK",
    "Business website design",
    "Professional website design services",
    "Responsive web design services",
    "Website redesign services",
    "Website maintenance services",
    "Conversion-focused web design",
  ],
  socialMedia: [
    "Social media marketing agency UK",
    "Social media management services",
    "Social media marketing for businesses",
    "B2B social media marketing",
    "LinkedIn marketing agency",
    "Social media content strategy",
    "Social media brand awareness",
  ],
  dataAnalysis: [
    "Marketing data analysis services",
    "Digital marketing analytics",
    "Marketing performance reporting",
    "Marketing ROI analysis",
    "Campaign performance analysis",
    "Customer behaviour analysis",
    "Data-driven marketing strategy",
    "Marketing analytics consultancy",
  ],
  organicSeo: [
    "SEO agency UK",
    "SEO services for businesses",
    "Organic SEO services",
    "SEO consultancy UK",
    "Technical SEO services",
    "On-page SEO services",
    "B2B SEO agency",
    "Small business SEO services",
    "SEO strategy and consulting",
  ],
  longTail: [
    "Digital marketing services for UK SMEs",
    "Digital marketing agency for B2B companies",
    "How to increase website traffic and leads",
    "How to choose a digital marketing agency",
    "Cost of digital marketing services in the UK",
    "How to improve website conversion rates",
    "Social media followers increasing services",
    "How to measure digital marketing ROI",
    "Brand positioning strategies for growing businesses",
    "Digital marketing strategy for international businesses",
  ],
};

/* ----------------------------------------------------------------------- */
/* URL helpers (subdirectory-aware)                                        */
/* ----------------------------------------------------------------------- */

const ORIGIN = (() => {
  try {
    return new URL(site.url).origin;
  } catch {
    return site.url.replace(/\/+$/, "");
  }
})();

export const basePath = (() => {
  try {
    const p = new URL(site.url).pathname.replace(/\/+$/, "");
    return p === "" ? "" : p;
  } catch {
    return "";
  }
})();

export function routeUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const base = `${ORIGIN}${basePath}`;
  return clean ? `${base}/${clean}/` : `${base}/`;
}

export function assetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\/+/, "");
  return `${ORIGIN}${basePath}/${clean}`;
}
