const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'blogData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Title max ~70 chars. Description 140-160 chars.

const updates = [
  {
    oldTitle: 'Website Development Company Saudi Arabia: How to Choose the Right Partner in 2026',
    newTitle: 'Website Development Company Saudi Arabia: 2026 Guide', // 52 chars
    oldDesc: "Searching for the best website development company in Saudi Arabia? Adonix Digital builds fast, SEO-ready, conversion-focused websites for KSA businesses.",
    newDesc: "Looking for a website development company in Saudi Arabia? Adonix Digital builds fast, SEO-ready, conversion-focused websites for KSA businesses." // 147 chars
  },
  {
    oldTitle: 'AI Website Development Saudi Arabia: Why Standard Sites Are Becoming Obsolete',
    newTitle: 'AI Website Development Saudi Arabia: The Future of Web', // 54 chars
    oldDesc: "Discover how AI website development in Saudi Arabia is replacing traditional web design. Learn why AI-driven sites convert better and rank higher in KSA.",
    newDesc: "Discover how AI website development in Saudi Arabia is replacing traditional design. Learn why AI-driven sites convert better and rank higher." // 144 chars
  },
  {
    oldTitle: 'B2B vs B2C Lead Generation in Saudi Arabia: What Actually Works',
    newTitle: 'B2B vs B2C Lead Generation in Saudi Arabia Strategies', // 53 chars
    oldDesc: "Stop using consumer tactics for enterprise clients. Learn the distinct strategies required for successful B2B vs B2C lead generation in Saudi Arabia.",
    newDesc: "Stop using consumer tactics for enterprise clients. Learn the distinct strategies required for successful B2B vs B2C lead generation in Saudi Arabia." // 149 chars
  },
  {
    oldTitle: 'AI Voice Agents Are Replacing Call Centers in Saudi Arabia',
    newTitle: 'AI Voice Agents Replacing Call Centers in Saudi Arabia', // 54 chars
    oldDesc: "Explore how AI Voice Agents in Saudi Arabia are revolutionizing customer support, replacing traditional call centers with scalable, 24/7 AI-driven solutions.",
    newDesc: "Explore how AI voice agents in Saudi Arabia are revolutionizing support, replacing traditional call centers with scalable, 24/7 AI solutions." // 141 chars
  },
  {
    oldTitle: 'Inside the Adonix Method: Our 3-Step Framework for Guaranteed Growth',
    newTitle: 'The Adonix Method: Our 3-Step Framework for Growth', // 50 chars
    oldDesc: "Discover the Adonix Method, our proprietary 3-step framework designed to guarantee digital growth, automate operations, and scale businesses in Saudi Arabia.",
    newDesc: "Discover the Adonix Method, our proprietary 3-step framework designed to guarantee digital growth, automate operations, and scale KSA businesses." // 145 chars
  },
  {
    oldTitle: 'Why Your WhatsApp Client Portal is Costing You Clients (And How AI Fixes It)',
    newTitle: 'How WhatsApp AI Client Portals Prevent Client Churn', // 51 chars
    oldDesc: "Is manual WhatsApp communication hurting your agency? Learn how an AI-powered WhatsApp Client Portal can automate support, retain clients, and scale your operations.",
    newDesc: "Is manual WhatsApp communication hurting your agency? Learn how an AI-powered WhatsApp client portal can automate support and retain clients." // 141 chars
  },
  {
    oldTitle: '5 Signs Your Saudi Business Needs Workflow Automation Immediately',
    newTitle: '5 Signs Your Saudi Business Needs Workflow Automation', // 53 chars
    oldDesc: "Are manual tasks slowing down your company? Discover the top 5 signs your Saudi business needs workflow automation to reduce errors and scale efficiently.",
    newDesc: "Are manual tasks slowing down your company? Discover the top 5 signs your Saudi business needs workflow automation to scale efficiently in KSA." // 143 chars
  }
];

updates.forEach(u => {
  content = content.replace(u.oldTitle, u.newTitle);
  content = content.replace(u.oldDesc, u.newDesc);
});

fs.writeFileSync(filePath, content);
console.log('Blog metadata optimized.');
