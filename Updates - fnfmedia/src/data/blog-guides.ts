import { pageMeta } from '@/data/seo'
import type { BlogPost } from '@/data/blog'

/**
 * Guides written for search and AI answers, each aimed at one main keyword and
 * linked to the page it supports. Results quoted here are only the ones supplied
 * for the flagship case study. Facts about other companies' products were checked
 * on 2026-11-01, so recheck the Shopify ones whenever Shopify changes its plans.
 */
const published = { date: 'Nov 1, 2026', dateISO: '2026-11-01' }

const chooseWebDevelopmentCompany: BlogPost = {
  ...published,
  slug: 'how-to-choose-web-development-company-india',
  meta: pageMeta.blogChooseWebDevelopment,
  headline: 'How to Choose a Web Development Company in India: 10 Questions to Ask',
  excerpt:
    'Ten plain questions on ownership, code, speed and support that show you which web development company is right for your business before you sign.',
  category: 'Web Development',
  readTime: '7 min read',
  image: { src: '/blog/choose-web-company.webp', alt: 'Three envelopes on a plinth, one with a brass key on it' },
  keywords:
    'web development company in India, how to choose a web development company, website development agency India, custom website development, boutique web development studio, questions to ask a web developer',
  body: [
    {
      type: 'lead',
      text: 'The right web development company gives you a website you own, that loads fast and brings in business. The wrong one leaves you with a template, a locked login and a bill every month. These ten questions show you which is which before you sign.',
    },
    { type: 'h2', text: 'Start with what the website has to do' },
    {
      type: 'p',
      text: 'Before you compare companies, write down one sentence on what the website is for. Booking consultations, selling products and recruiting staff are three different jobs, and they lead to three different builds. A company that asks about this in the first call is thinking about your business. One that opens with a page count is thinking about its template.',
    },
    { type: 'h2', text: '10 questions to ask a web development company' },
    { type: 'h3', text: '1. Can I see live websites you have built?' },
    {
      type: 'p',
      text: 'Ask for live links, not design mockups. Open them on your phone, click around and check how fast they load. Live work shows you what the company really delivers, including the parts a screenshot hides. You can [see ours here](/portfolio).',
    },
    { type: 'h3', text: '2. Who will actually build my website?' },
    {
      type: 'p',
      text: 'Some agencies sell the project and pass it on to a junior developer or an outside freelancer. Ask who designs and codes your site, and whether you can talk to them directly.',
    },
    { type: 'h3', text: '3. Is it custom-coded or built on a template?' },
    {
      type: 'p',
      text: 'Neither answer is wrong, but you should know which one you are paying for. A template is faster to launch. A [custom-coded website](/web-development#custom-coded-websites) is built around your business, so it can do exactly what you need and will not look like the next company in your industry.',
    },
    { type: 'h3', text: '4. Who owns the code, the design and the domain?' },
    {
      type: 'p',
      text: 'This is the question people forget. Get it in writing that you own the finished work once it is paid for. The domain and hosting accounts should be in your name, so you can move on from any supplier without losing your site.',
    },
    { type: 'h3', text: '5. Can I update the website myself?' },
    {
      type: 'p',
      text: 'You should not need a developer to change a price or swap a photo. Ask to see the admin panel you will get, and ask them to change a piece of content in front of you.',
    },
    { type: 'h3', text: '6. How do you handle speed and mobile?' },
    {
      type: 'p',
      text: "Most of your visitors will arrive on a phone. Paste one of the company's live sites into [Google PageSpeed Insights](https://pagespeed.web.dev/) and look at the mobile score. Then ask how they plan to get a good result on your site.",
    },
    { type: 'h3', text: '7. Is SEO built in from day one?' },
    {
      type: 'p',
      text: 'Search visibility is much easier to build in than to add later. Ask how they handle page structure, metadata, internal links and schema markup. Then ask about [answer engine optimization](/blog/what-is-answer-engine-optimization), because more buyers now start their research in an AI assistant.',
    },
    { type: 'h3', text: '8. How do revisions work?' },
    {
      type: 'p',
      text: 'Ask how you give feedback, how many rounds are included and what happens if you need more. Clear answers here prevent most of the arguments that come up late in a project.',
    },
    { type: 'h3', text: '9. What happens after launch?' },
    {
      type: 'p',
      text: 'A website needs someone on hand while you learn to run it. Ask how long support lasts, what it covers and how quickly they reply when something breaks.',
    },
    { type: 'h3', text: '10. How is the price scoped?' },
    {
      type: 'p',
      text: 'You want a written scope that says what is included, what is not, and when each payment is due. Compare the scopes side by side rather than the final figures, because two similar quotes can cover very different work.',
    },
    { type: 'h2', text: 'Red flags to watch for' },
    {
      type: 'list',
      items: [
        'They cannot show you live websites they built.',
        'They keep the domain or hosting in their own name.',
        'They will not say who owns the code.',
        'They promise a first-page ranking or a guaranteed result.',
        'They quote a price before they have asked about your business.',
      ],
    },
    { type: 'h2', text: 'A boutique studio or a large agency?' },
    {
      type: 'p',
      text: 'A large agency gives you more people and more process. A boutique studio takes on fewer projects, so the people you meet are usually the people doing the work. If your project needs close attention and quick decisions, a smaller team is often the better fit. If you need a big team across many departments, a larger agency may suit you better.',
    },
    { type: 'h2', text: 'What to do next' },
    {
      type: 'p',
      text: 'Send these ten questions to the two or three companies on your shortlist and compare the written answers. Vague replies tell you as much as good ones. If you would like to put them to us, [see how we build websites](/web-development) or [start your project](/contact).',
    },
  ],
  faq: [
    {
      question: 'How do I choose a web development company in India?',
      answer:
        'Check their live websites, find out who will build yours, and get ownership of the code, design and domain in writing. Then compare written scopes rather than final prices.',
    },
    {
      question: 'Should I own my website code?',
      answer:
        'Yes. Your contract should say you own the finished work once it is paid for, and your domain and hosting should be in your name, so you can change suppliers without losing the site.',
    },
    {
      question: 'Is a custom-coded website better than a template?',
      answer:
        'A template is quicker to launch. A custom-coded website is built around your business, so it fits what you need exactly and does not look like other sites. The right choice depends on what the website has to do.',
    },
  ],
}

const customShopifyVsTheme: BlogPost = {
  ...published,
  slug: 'custom-shopify-development-vs-theme',
  meta: pageMeta.blogCustomShopify,
  headline: 'Custom Shopify Development vs a Theme: Which Does Your Brand Need?',
  excerpt:
    'When a ready-made Shopify theme is enough, when it starts holding your brand back, and what custom Shopify development really includes.',
  category: 'Shopify',
  readTime: '6 min read',
  image: { src: '/blog/shopify-vs-theme.webp', alt: 'Plain white cubes beside one hand-carved block' },
  keywords:
    'custom Shopify development, custom Shopify theme, Shopify theme vs custom, Shopify Liquid development, Shopify development agency India, custom Shopify store',
  body: [
    {
      type: 'lead',
      text: 'A ready-made Shopify theme is a good way to start selling. Custom Shopify development makes sense when your store needs to look like your brand and work the way you sell, rather than the way a template allows.',
    },
    { type: 'h2', text: 'What is a Shopify theme?' },
    {
      type: 'p',
      text: 'A theme controls how your Shopify store looks and how it is laid out. You can pick a ready-made one from the Shopify Theme Store, change the colours and fonts, add your products and go live quickly. Plenty of successful stores start this way.',
    },
    {
      type: 'p',
      text: 'The limit is that you can only change what the theme lets you change. Colours, fonts and the sections it offers are easy. A different layout or a new way of showing products often is not.',
    },
    { type: 'h2', text: 'What is custom Shopify development?' },
    {
      type: 'p',
      text: "Custom Shopify development means building your theme in Liquid, Shopify's template language, around your own design. You still get Shopify's admin, checkout and app ecosystem. What changes is everything your customer sees, and how it behaves.",
    },
    {
      type: 'p',
      text: 'At Frame n Flow Media that means [custom Liquid code and a fully tailored theme](/custom-shopify-development), with no third-party theme to buy. We also set up payment gateways, shipping gateways and WhatsApp integration, so you get a store that is live and ready to sell rather than a design file.',
    },
    { type: 'h2', text: 'When a theme is enough' },
    {
      type: 'list',
      items: [
        'You are launching and still testing what sells.',
        'You have a small catalogue and a simple way of selling.',
        'A standard layout shows your products well.',
        'Speed to launch matters more than standing out for now.',
      ],
    },
    { type: 'h2', text: 'When to go custom' },
    {
      type: 'list',
      items: [
        'Your store looks like other stores in your category.',
        'Every new campaign needs a workaround or another app.',
        'You sell in a way the theme does not handle well, such as bundles, sets or made-to-order.',
        'Your brand has outgrown the look you launched with.',
        'Customers browse on their phones but too few of them buy.',
      ],
    },
    { type: 'h2', text: 'Theme or custom: how they compare' },
    {
      type: 'cards',
      items: [
        { title: 'Design', text: 'A theme gives you its layouts. A custom build starts from your brand.' },
        { title: 'Launch', text: 'A theme can go live quickly. A custom build takes longer because it is designed and coded for you.' },
        { title: 'Changes', text: 'A theme limits what you can change. A custom build can be shaped around how you sell.' },
        { title: 'Running the store', text: 'Both are run from the Shopify admin, so your team keeps the tools it knows.' },
      ],
    },
    { type: 'h2', text: 'What a custom Shopify build includes' },
    {
      type: 'list',
      ordered: true,
      items: [
        '**Planning the store:** how products are organised and how customers get from the home page to checkout.',
        '**Design and Liquid code:** your theme, built section by section, so it stays editable from the admin.',
        '**Connections:** payment gateways, shipping gateways and WhatsApp, set up and tested.',
        '**Launch:** the store goes live connected and ready to sell, with support while you settle in.',
      ],
    },
    { type: 'h2', text: 'Should you rebuild or start over?' },
    {
      type: 'p',
      text: 'If your products and customer data are already on Shopify, a new custom theme does not mean starting again. Your theme changes while the store behind it stays where it is. If you are unsure whether Shopify is the right platform at all, read our guide on [Shopify vs a custom-coded e-commerce website](/blog/shopify-vs-custom-ecommerce-website).',
    },
    { type: 'h2', text: 'See it on real stores' },
    {
      type: 'p',
      text: "The easiest way to judge this is to look at live work. Browse the [Shopify stores we've built](/custom-shopify-development#stores), then [start your project](/contact) if you would like one of your own.",
    },
  ],
  faq: [
    {
      question: 'What is custom Shopify development?',
      answer:
        "It means building your Shopify theme in Liquid around your own design, rather than adapting a ready-made theme. You keep Shopify's admin, checkout and apps, and the store looks and works the way your brand needs.",
    },
    {
      question: 'Is a custom Shopify theme worth it?',
      answer:
        'It is worth it when a theme starts limiting your brand: your store looks like others in your category, or new campaigns keep needing workarounds. If you are still testing what sells, a ready-made theme is often enough.',
    },
    {
      question: 'Can I still edit a custom Shopify store myself?',
      answer:
        'Yes. A custom theme is run from the same Shopify admin, and sections can be built so your team can edit them without a developer.',
    },
  ],
}

const shopifyVsCustom: BlogPost = {
  ...published,
  slug: 'shopify-vs-custom-ecommerce-website',
  meta: pageMeta.blogShopifyVsCustom,
  headline: 'Shopify vs a Custom-Coded E-Commerce Website: How to Choose',
  excerpt:
    'A straight comparison of Shopify and a custom-coded online store: ownership, monthly costs, payments in India and which one suits your brand.',
  category: 'E-Commerce',
  readTime: '6 min read',
  image: { src: '/blog/shopify-vs-custom.webp', alt: 'A brass scale weighing a shopping bag against stacked blocks' },
  keywords:
    'Shopify vs custom website, custom e-commerce website development India, Shopify or custom website, e-commerce website development company, Shopify payment gateway India, own your online store',
  body: [
    {
      type: 'lead',
      text: 'Shopify gives you a proven platform for a monthly fee. A custom-coded store gives you a site you own outright, with no recurring platform fee. The right choice depends on how you sell, how much you plan to grow and who will run the store.',
    },
    { type: 'h2', text: 'What you get with Shopify' },
    {
      type: 'p',
      text: 'Shopify handles hosting, security, checkout and a large app ecosystem, and your team runs everything from one admin. You pay a monthly subscription for this, and your costs rise as you add paid apps. With a [custom Shopify build](/custom-shopify-development) you keep all of that and still get a store that looks like your brand.',
    },
    { type: 'h2', text: 'What you get with a custom-coded store' },
    {
      type: 'p',
      text: 'A [custom-coded e-commerce website](/web-development#custom-coded-ecommerce) is written for your business, with its own backend. You own the stack, and there is no monthly platform fee to a store builder. You do need someone to maintain it, and features that Shopify includes have to be built or integrated.',
    },
    { type: 'h2', text: 'How they compare' },
    {
      type: 'cards',
      items: [
        { title: 'Ownership', text: 'Shopify is a platform you rent. A custom-coded store is yours outright.' },
        { title: 'Ongoing costs', text: 'Shopify has a monthly plan, plus any paid apps. A custom-coded store has hosting and maintenance, with no platform subscription.' },
        { title: 'Features', text: "Shopify's app store covers most needs quickly. A custom-coded store is built around exactly what you need." },
        { title: 'Running it', text: 'Shopify has a familiar admin. A custom-coded store comes with an admin panel built for your business.' },
      ],
    },
    { type: 'h2', text: 'Taking payments in India' },
    {
      type: 'p',
      text: 'This catches out many Indian sellers. Shopify Payments is not available to merchants in India, so stores use a third-party gateway such as Razorpay. Shopify adds its own transaction fee on those payments, and the rate depends on your plan, on top of what the gateway charges. Manual methods such as cash on delivery are exempt from that Shopify fee.',
    },
    {
      type: 'p',
      text: "A custom-coded store connects directly to the gateway, so the only payment fee is the gateway's own. Plans and fees change, so check the current rates on [Shopify's pricing page](https://www.shopify.com/in/pricing) before you compare.",
    },
    { type: 'h2', text: 'Choose Shopify if' },
    {
      type: 'list',
      items: [
        'You want a proven checkout and a large app ecosystem from day one.',
        'Your catalogue is large, or your team will manage it daily.',
        'You plan to scale and want the platform to carry the technical load.',
        'You are comfortable paying a monthly fee for that.',
      ],
    },
    { type: 'h2', text: 'Choose a custom-coded store if' },
    {
      type: 'list',
      items: [
        'Yours is a smaller e-commerce project with a focused catalogue.',
        'You want to own your stack outright.',
        'You would rather not carry a recurring platform fee.',
        'You want one site that does more than sell, with your own backend.',
      ],
    },
    { type: 'h2', text: 'Can you move later?' },
    {
      type: 'p',
      text: 'Yes, and many brands do. You can start on one and move to the other as you grow. What matters is that you keep control of your domain, product data and customer data, so a move stays simple.',
    },
    { type: 'h2', text: 'Still not sure?' },
    {
      type: 'p',
      text: 'We build both, so we have no reason to push you towards one. [See the e-commerce work in our portfolio](/portfolio), then [tell us about your store](/contact) and we will recommend the one that fits.',
    },
  ],
  faq: [
    {
      question: 'Is Shopify or a custom website better for e-commerce?',
      answer:
        'Shopify suits brands that want a proven platform and are comfortable with a monthly fee. A custom-coded store suits smaller projects where you want to own the stack outright with no recurring platform fee.',
    },
    {
      question: 'Is Shopify Payments available in India?',
      answer:
        "No. Merchants in India use a third-party gateway such as Razorpay. Shopify adds a transaction fee on those payments that depends on your plan, on top of the gateway's own charges.",
    },
    {
      question: 'Can I move from a custom store to Shopify later?',
      answer:
        'Yes. As long as you control your domain, product data and customer data, you can move between platforms as your business grows.',
    },
  ],
}

const answerEngineOptimization: BlogPost = {
  ...published,
  slug: 'what-is-answer-engine-optimization',
  meta: pageMeta.blogAeo,
  headline: 'What Is Answer Engine Optimization (AEO)? A Plain-English Guide',
  excerpt:
    'What AEO means, how it differs from SEO, and the practical steps that help ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your business.',
  category: 'SEO & AEO',
  readTime: '7 min read',
  image: { src: '/blog/aeo.webp', alt: 'A vintage radio beside a stack of cards, with one card raised above the rest' },
  keywords:
    'what is answer engine optimization, AEO, AEO vs SEO, how to rank on ChatGPT, get cited by AI, AI search optimization, AEO services India',
  body: [
    {
      type: 'lead',
      text: "Answer engine optimization (AEO) means structuring your website's content so AI assistants can understand it, trust it and cite it. When someone asks ChatGPT, Perplexity or Gemini for a recommendation in your industry, AEO is how your business becomes part of the answer.",
    },
    { type: 'h2', text: 'What is an answer engine?' },
    {
      type: 'p',
      text: "An answer engine gives people one written answer instead of a list of links. ChatGPT, Perplexity, Gemini, Microsoft Copilot and Google's AI Overviews all work this way. The buyer reads the answer, and often never sees a search results page at all.",
    },
    { type: 'h2', text: 'AEO vs SEO: what is the difference?' },
    {
      type: 'cards',
      items: [
        { title: 'The goal', text: 'SEO gets your page ranked so people click. AEO gets your business named or cited inside the answer.' },
        { title: 'The result', text: 'SEO gives you a position in a list. AEO gives you a mention or a source link.' },
        { title: 'What it rewards', text: 'SEO rewards relevance and authority. AEO adds clear, quotable answers and consistent facts about your business.' },
        { title: 'How you measure it', text: 'SEO tracks rankings and clicks. AEO tracks how often you are mentioned and cited.' },
      ],
    },
    {
      type: 'p',
      text: 'AEO does not replace SEO. It sits on top of it. Google says you do not need special markup or files to appear in its AI features, and that the same fundamentals apply: pages it can crawl, content that helps people, and structured data that matches what is on the page. So [strong SEO](/seo-aeo#seo) comes first.',
    },
    { type: 'h2', text: 'How to optimize for answer engines' },
    { type: 'h3', text: '1. Answer the question in the first lines' },
    {
      type: 'p',
      text: 'Put the direct answer at the top of the page or section, in one or two plain sentences, then go into detail. A clean, self-contained answer is easy for an AI system to lift and credit. The first paragraph of this article is an example.',
    },
    { type: 'h3', text: '2. Write headings the way people ask' },
    {
      type: 'p',
      text: 'Use the questions your customers really ask as headings, such as "How much does a custom website take to build?" Your sales calls and WhatsApp chats are the best source for these.',
    },
    { type: 'h3', text: '3. Add FAQs to the pages that matter' },
    {
      type: 'p',
      text: 'A short FAQ on each service page gives direct answers to common questions. Keep it useful. Five real questions are better than twenty invented ones.',
    },
    { type: 'h3', text: '4. Use schema markup that matches the page' },
    {
      type: 'p',
      text: 'Schema tells machines what your page is about: your organization, services, articles, FAQs and reviews. It only helps when it matches what people can see on the page, so never mark up content that is not there.',
    },
    { type: 'h3', text: '5. Keep your business details consistent' },
    {
      type: 'p',
      text: 'AI models build their picture of your business from across the web. Your name, services and location should read the same on your website, Google Business Profile, LinkedIn and directories. Conflicting details make you harder to recommend.',
    },
    { type: 'h3', text: '6. Earn mentions and reviews elsewhere' },
    {
      type: 'p',
      text: 'What others say about you carries more weight than what you say about yourself. Reviews, directory listings, press and articles on other sites all give answer engines more reason to trust you.',
    },
    { type: 'h3', text: '7. Make sure AI crawlers can reach your site' },
    {
      type: 'p',
      text: 'Check that your robots.txt file does not block the crawlers you want, and that your key content is visible in the page without needing to click or log in.',
    },
    { type: 'h2', text: 'How do you measure AEO?' },
    {
      type: 'p',
      text: 'Make a list of ten questions your buyers would ask, then put them to ChatGPT, Perplexity, Gemini and Google every month. Note whether you are named, whether you are linked and who is named instead. You can also watch for visits from these tools in Google Analytics.',
    },
    { type: 'h2', text: 'What AEO cannot do' },
    {
      type: 'p',
      text: 'Nobody can guarantee that an AI assistant will recommend you, and anyone who does is overselling. Answers change and depend on how each person asks. What you can do is make your business the clearest, most consistent and best-supported option available.',
    },
    { type: 'h2', text: 'Where to start' },
    {
      type: 'p',
      text: 'Pick your three most important service pages. Put a direct answer at the top of each, add a short FAQ and check your schema. If you would like us to handle it, see our [SEO and AEO services](/seo-aeo) or [start your project](/contact).',
    },
  ],
  faq: [
    {
      question: 'What is AEO in marketing?',
      answer:
        "AEO stands for answer engine optimization. It means structuring your website's content so AI assistants such as ChatGPT, Perplexity and Gemini can understand it, trust it and cite it in their answers.",
    },
    {
      question: 'What is the difference between SEO and AEO?',
      answer:
        'SEO aims to rank your pages so people click through. AEO aims to get your business named or cited inside the answer an AI assistant gives. AEO builds on SEO rather than replacing it.',
    },
    {
      question: 'Can you guarantee a ChatGPT recommendation?',
      answer:
        'No. Answers vary by person and change over time, so nobody can guarantee one. Good AEO makes your business clearer, more consistent and better supported, which improves your chances.',
    },
  ],
}

const founderPersonalBranding: BlogPost = {
  ...published,
  slug: 'personal-branding-for-founders',
  meta: pageMeta.blogFounderBranding,
  headline: 'Personal Branding for Founders: How to Build Authority Without Doing It All',
  excerpt:
    'A simple system for founder-led content: what to talk about, how often to post, and how one Dublin jeweller reached 1M+ organic views with zero ad spend.',
  category: 'Personal Branding',
  readTime: '6 min read',
  image: { src: '/blog/founder-branding.webp', alt: 'A phone on a tripod beside a ring light and an open notebook' },
  keywords:
    'personal branding for founders, founder-led content, personal brand strategy, organic content for business, founder content marketing, done-for-you content',
  body: [
    {
      type: 'lead',
      text: 'Personal branding for founders means using your own face, voice and experience to build trust in your business. It works because people trust a person faster than a logo, and it does not have to take over your week if someone else handles everything except the recording.',
    },
    { type: 'h2', text: 'Why founder-led content works' },
    {
      type: 'p',
      text: 'A buyer choosing between two similar businesses goes with the one they feel they know. When a founder shows up regularly and explains how things really work, that familiarity builds before any sales call. A logo cannot do that, and neither can an ad that runs out when the money does.',
    },
    { type: 'h2', text: 'What this looks like in practice' },
    {
      type: 'p',
      text: 'The Grafton Vault is a fine jewellery business in Dublin, Ireland. It started from zero, with founder-led organic content and no paid advertising. The founder recorded raw footage, and we handled the scripting, editing and posting.',
    },
    {
      type: 'stats',
      items: [
        { title: 'Organic views', location: 'Dublin', value: '1M+', text: 'From a standing start.' },
        { title: 'Consultations booked', location: 'Dublin', value: '300+', text: 'Real conversations with buyers.' },
        { title: 'Ad spend', location: 'Dublin', value: 'Zero', text: 'All of it organic.' },
      ],
    },
    { type: 'p', text: '[Read the Grafton Vault case study](/portfolio#grafton-vault).' },
    { type: 'h2', text: 'A simple system: you record, the rest is handled' },
    {
      type: 'list',
      ordered: true,
      items: [
        '**Plan:** pick topics from the questions your customers already ask.',
        '**Script:** turn each topic into a short outline, so you never stare at a camera wondering what to say.',
        '**Record:** batch several videos in one sitting on your phone.',
        '**Edit:** cut them into clean, watchable videos with captions.',
        '**Post:** publish on a regular schedule and track what brings enquiries.',
      ],
    },
    {
      type: 'p',
      text: 'Founders usually stall at editing and posting, not at speaking. Hand those parts to someone else and the only thing left on your plate is hitting record.',
    },
    { type: 'h2', text: 'What should a founder talk about?' },
    {
      type: 'cards',
      items: [
        { title: 'Customer questions', text: 'Answer what people ask before they buy. One real question is one video.' },
        { title: 'How it really works', text: 'Show the craft, the process and what goes on behind the scenes.' },
        { title: 'Mistakes to avoid', text: 'Warn buyers about what goes wrong in your industry.' },
        { title: 'Your opinion', text: 'Say what you believe and why. This is what makes you memorable.' },
      ],
    },
    { type: 'h2', text: 'How often should you post?' },
    {
      type: 'p',
      text: 'Choose a schedule you can keep for a year, not one you can keep for a month. Consistency matters more than volume, and most founders fail by starting too fast and stopping. One batch of recording can cover several weeks of posts.',
    },
    { type: 'h2', text: 'Common mistakes' },
    {
      type: 'list',
      items: [
        'Waiting for perfect lighting, a studio or a better camera.',
        'Talking about your company instead of your customer\'s problem.',
        'Chasing trends that have nothing to do with what you sell.',
        'Counting views rather than enquiries.',
        'Stopping after a few weeks because it has not worked yet.',
      ],
    },
    { type: 'h2', text: 'Measure what pays' },
    {
      type: 'p',
      text: 'Views tell you what is being watched. Enquiries and consultations tell you what is working. Ask every new lead how they found you, and do more of what they name.',
    },
    { type: 'h2', text: 'Want this done for you?' },
    {
      type: 'p',
      text: 'We run [personal branding for founders](/marketing#personal-branding) from scripting to posting, so you only need to hit record. [Start your project](/contact) and tell us about your business.',
    },
  ],
  faq: [
    {
      question: 'What is personal branding for founders?',
      answer:
        'It means using your own face, voice and experience to build trust in your business, usually through regular content, so buyers feel they know you before they ever speak to you.',
    },
    {
      question: 'How much time does founder content take?',
      answer:
        'If someone else handles planning, scripting, editing and posting, your part is recording. Batching several videos in one sitting can cover several weeks of posts.',
    },
    {
      question: 'Can personal branding work without ads?',
      answer:
        'Yes. The Grafton Vault in Dublin reached 1M+ organic views and 300+ booked consultations from founder-led content with zero ad spend.',
    },
  ],
}

/** Newest first. */
export const guides: BlogPost[] = [
  customShopifyVsTheme,
  answerEngineOptimization,
  chooseWebDevelopmentCompany,
  shopifyVsCustom,
  founderPersonalBranding,
]
