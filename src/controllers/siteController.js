import SiteConfig from "../models/SiteConfig.js";
import {
  About,
  Achievement,
  ContactMessage,
  Education,
  Experience,
  Hero,
  Project,
  Resume,
  Skill,
  Testimonial
} from "../models/content.js";

const singletonMap = {
  hero: Hero,
  about: About,
  resume: Resume
};

const collectionMap = {
  skills: Skill,
  projects: Project,
  experience: Experience,
  education: Education,
  achievements: Achievement,
  testimonials: Testimonial,
  messages: ContactMessage
};

export const getPublicSite = async (req, res) => {
  const [siteConfig] = await SiteConfig.find().limit(1);

  const [hero, about, resume, skills, projects, experience, education, achievements, testimonials] =
    await Promise.all([
      Hero.findOne(),
      About.findOne(),
      Resume.findOne(),
      Skill.find().sort({ createdAt: -1 }),
      Project.find().sort({ featured: -1, createdAt: -1 }),
      Experience.find().sort({ createdAt: -1 }),
      Education.find().sort({ createdAt: -1 }),
      Achievement.find().sort({ createdAt: -1 }),
      Testimonial.find().sort({ createdAt: -1 })
    ]);

  res.json({
    siteConfig,
    content: {
      hero,
      about,
      resume,
      skills,
      projects,
      experience,
      education,
      achievements,
      testimonials
    }
  });
};

export const getDashboardData = async (req, res) => {
  const [siteConfig] = await SiteConfig.find().limit(1);
  const messages = await ContactMessage.find().sort({ createdAt: -1 });

  res.json({
    siteConfig,
    messages,
    collections: {
      skills: await Skill.countDocuments(),
      projects: await Project.countDocuments(),
      experience: await Experience.countDocuments(),
      education: await Education.countDocuments(),
      achievements: await Achievement.countDocuments(),
      testimonials: await Testimonial.countDocuments()
    }
  });
};

export const getSingleton = async (req, res) => {
  const model = singletonMap[req.params.key];

  if (!model) {
    return res.status(404).json({ message: "Unknown content key" });
  }

  const item = await model.findOne();
  res.json(item || {});
};

export const upsertSingleton = async (req, res) => {
  const model = singletonMap[req.params.key];

  if (!model) {
    return res.status(404).json({ message: "Unknown content key" });
  }

  const current = await model.findOne();

  if (!current) {
    const created = await model.create(req.body);
    return res.status(201).json(created);
  }

  Object.assign(current, req.body);
  await current.save();

  return res.json(current);
};

export const listCollection = async (req, res) => {
  const model = collectionMap[req.params.key];

  if (!model) {
    return res.status(404).json({ message: "Unknown collection key" });
  }

  const items = await model.find().sort({ createdAt: -1 });
  res.json(items);
};

export const createCollectionItem = async (req, res) => {
  const model = collectionMap[req.params.key];

  if (!model) {
    return res.status(404).json({ message: "Unknown collection key" });
  }

  const item = await model.create(req.body);
  res.status(201).json(item);
};

export const updateCollectionItem = async (req, res) => {
  const model = collectionMap[req.params.key];

  if (!model) {
    return res.status(404).json({ message: "Unknown collection key" });
  }

  const item = await model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json(item);
};

export const deleteCollectionItem = async (req, res) => {
  const model = collectionMap[req.params.key];

  if (!model) {
    return res.status(404).json({ message: "Unknown collection key" });
  }

  await model.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

export const updateSiteConfig = async (req, res) => {
  const current = await SiteConfig.findOne();

  if (!current) {
    const created = await SiteConfig.create(req.body);
    return res.status(201).json(created);
  }

  Object.assign(current, req.body);
  await current.save();

  return res.json(current);
};

export const submitContactMessage = async (req, res) => {
  const message = await ContactMessage.create(req.body);
  res.status(201).json(message);
};
