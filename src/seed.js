import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import SiteConfig from "./models/SiteConfig.js";
import {
  About,
  Achievement,
  Education,
  Experience,
  Hero,
  Project,
  Skill,
  Testimonial
} from "./models/content.js";

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany(),
    SiteConfig.deleteMany(),
    Hero.deleteMany(),
    About.deleteMany(),
    Skill.deleteMany(),
    Project.deleteMany(),
    Experience.deleteMany(),
    Education.deleteMany(),
    Achievement.deleteMany(),
    Testimonial.deleteMany()
  ]);

  const password = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Portfolio Admin",
    email: "admin@portfolio.dev",
    password
  });

  await SiteConfig.create({
    siteName: "Aarav Studio",
    tagline: "Product-focused full-stack developer",
    metaTitle: "Aarav Studio | Dynamic Portfolio",
    metaDescription: "A configurable MERN portfolio website.",
    theme: {
      mode: "light",
      primary: "#0f3d3e",
      secondary: "#f4b942",
      surface: "#f6efe4",
      text: "#1b1b18",
      headingFont: "Space Grotesk",
      bodyFont: "Manrope",
      radius: 26
    },
    navigation: [
      { label: "About", sectionKey: "about", enabled: true },
      { label: "Skills", sectionKey: "skills", enabled: true },
      { label: "Projects", sectionKey: "projects", enabled: true },
      { label: "Experience", sectionKey: "experience", enabled: true },
      { label: "Testimonials", sectionKey: "testimonials", enabled: true },
      { label: "Contact", sectionKey: "contact", enabled: true }
    ],
    socialLinks: [
      { label: "GitHub", icon: "Github", url: "https://github.com/" },
      { label: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/" },
      { label: "X", icon: "Twitter", url: "https://x.com/" }
    ],
    contact: {
      email: "hello@example.com",
      phone: "+91 90000 00000",
      location: "Bengaluru, India"
    },
    layout: {
      heroVariant: "split",
      sections: [
        {
          key: "about",
          label: "About",
          visible: true,
          order: 1,
          orientation: "horizontal",
          width: "contained",
          style: "spotlight",
          columns: 2,
          itemAlignment: "start"
        },
        {
          key: "skills",
          label: "Skills",
          visible: true,
          order: 2,
          orientation: "vertical",
          width: "contained",
          style: "grid",
          columns: 3,
          itemAlignment: "start"
        },
        {
          key: "projects",
          label: "Projects",
          visible: true,
          order: 3,
          orientation: "vertical",
          width: "full",
          style: "cards",
          columns: 2,
          itemAlignment: "start"
        },
        {
          key: "experience",
          label: "Experience",
          visible: true,
          order: 4,
          orientation: "vertical",
          width: "narrow",
          style: "timeline",
          columns: 1,
          itemAlignment: "start"
        },
        {
          key: "education",
          label: "Education",
          visible: true,
          order: 5,
          orientation: "vertical",
          width: "narrow",
          style: "stack",
          columns: 1,
          itemAlignment: "start"
        },
        {
          key: "achievements",
          label: "Achievements",
          visible: true,
          order: 6,
          orientation: "horizontal",
          width: "contained",
          style: "cards",
          columns: 2,
          itemAlignment: "center"
        },
        {
          key: "testimonials",
          label: "Testimonials",
          visible: true,
          order: 7,
          orientation: "horizontal",
          width: "contained",
          style: "cards",
          columns: 2,
          itemAlignment: "center"
        },
        {
          key: "contact",
          label: "Contact",
          visible: true,
          order: 8,
          orientation: "split",
          width: "contained",
          style: "spotlight",
          columns: 2,
          itemAlignment: "start"
        }
      ]
    }
  });

  await Hero.create({
    title: "Building bold interfaces with flexible content systems.",
    subtitle: "Full-stack engineer and UI systems builder",
    summary:
      "I create portfolio, SaaS, and product experiences where the content team can reshape the layout without touching code.",
    primaryCtaLabel: "View Projects",
    primaryCtaUrl: "#projects",
    secondaryCtaLabel: "Contact Me",
    secondaryCtaUrl: "#contact",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43d?auto=format&fit=crop&w=900&q=80",
    stats: [
      { label: "Years", value: "5+" },
      { label: "Projects", value: "18" },
      { label: "Clients", value: "12" }
    ]
  });

  await About.create({
    heading: "Design-minded engineering with strong CMS thinking.",
    body: "I focus on maintainable full-stack systems, expressive UI, and admin tooling that lets non-developers control structure as well as content.",
    highlights: ["MERN architecture", "Admin-first workflow", "Motion-driven UI", "Reusable component systems"]
  });

  await Skill.insertMany([
    { name: "React", category: "Frontend", level: 92, icon: "Code2" },
    { name: "Node.js", category: "Backend", level: 89, icon: "Server" },
    { name: "MongoDB", category: "Database", level: 86, icon: "Database" },
    { name: "Tailwind CSS", category: "UI", level: 91, icon: "Palette" },
    { name: "Framer Motion", category: "Animation", level: 84, icon: "Sparkles" },
    { name: "Express", category: "Backend", level: 88, icon: "Workflow" }
  ]);

  await Project.insertMany([
    {
      title: "Dynamic Creator Portfolio",
      slug: "dynamic-creator-portfolio",
      description: "A layout-configurable portfolio system with role-based admin controls.",
      stack: ["React", "Node.js", "MongoDB", "Tailwind"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      links: [
        { label: "Live Demo", url: "https://example.com", icon: "ExternalLink" },
        { label: "GitHub", url: "https://github.com", icon: "Github" }
      ]
    },
    {
      title: "Hiring Dashboard",
      slug: "hiring-dashboard",
      description: "An analytics-first dashboard with reusable data cards and modular content blocks.",
      stack: ["React", "Express", "Charting"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      links: [{ label: "Case Study", url: "https://example.com/case-study", icon: "FileText" }]
    }
  ]);

  await Experience.insertMany([
    {
      company: "Northstar Labs",
      role: "Senior Full Stack Developer",
      startDate: "2023",
      endDate: "Present",
      summary: "Led UI platform work for client-facing products.",
      points: ["Built config-driven pages", "Improved admin workflow", "Shipped reusable section components"]
    }
  ]);

  await Education.insertMany([
    {
      school: "National Institute of Technology",
      degree: "B.Tech in Computer Science",
      startDate: "2016",
      endDate: "2020",
      summary: "Focused on software engineering and human-computer interaction."
    }
  ]);

  await Achievement.insertMany([
    {
      title: "Top Portfolio Experience Award",
      issuer: "Design Systems Community",
      year: "2025",
      description: "Recognized for a flexible portfolio CMS and standout frontend execution."
    }
  ]);

  await Testimonial.insertMany([
    {
      name: "Riya Kapoor",
      role: "Product Designer",
      company: "Northstar Labs",
      quote: "The balance between visual craft and CMS flexibility was outstanding."
    }
  ]);

  console.log("Seed complete");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
