import mongoose from "mongoose";

const projectLinkSchema = new mongoose.Schema(
  {
    label: String,
    url: String,
    icon: String
  },
  { _id: false }
);

const singletonSchema = {
  type: mongoose.Schema.Types.Mixed,
  default: {}
};

export const Hero = mongoose.model(
  "Hero",
  new mongoose.Schema(
    {
      title: String,
      subtitle: String,
      summary: String,
      primaryCtaLabel: String,
      primaryCtaUrl: String,
      secondaryCtaLabel: String,
      secondaryCtaUrl: String,
      profileImage: String,
      stats: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
      }
    },
    { timestamps: true }
  )
);

export const About = mongoose.model(
  "About",
  new mongoose.Schema(
    {
      heading: String,
      body: String,
      highlights: {
        type: [String],
        default: []
      }
    },
    { timestamps: true }
  )
);

export const Skill = mongoose.model(
  "Skill",
  new mongoose.Schema(
    {
      name: String,
      category: String,
      level: Number,
      icon: String
    },
    { timestamps: true }
  )
);

export const Project = mongoose.model(
  "Project",
  new mongoose.Schema(
    {
      title: String,
      slug: {
        type: String,
        unique: true
      },
      description: String,
      stack: {
        type: [String],
        default: []
      },
      image: String,
      featured: {
        type: Boolean,
        default: false
      },
      links: {
        type: [projectLinkSchema],
        default: []
      }
    },
    { timestamps: true }
  )
);

export const Experience = mongoose.model(
  "Experience",
  new mongoose.Schema(
    {
      company: String,
      role: String,
      startDate: String,
      endDate: String,
      summary: String,
      points: {
        type: [String],
        default: []
      }
    },
    { timestamps: true }
  )
);

export const Education = mongoose.model(
  "Education",
  new mongoose.Schema(
    {
      school: String,
      degree: String,
      startDate: String,
      endDate: String,
      summary: String
    },
    { timestamps: true }
  )
);

export const Achievement = mongoose.model(
  "Achievement",
  new mongoose.Schema(
    {
      title: String,
      issuer: String,
      year: String,
      description: String
    },
    { timestamps: true }
  )
);

export const Testimonial = mongoose.model(
  "Testimonial",
  new mongoose.Schema(
    {
      name: String,
      role: String,
      company: String,
      quote: String,
      avatar: String
    },
    { timestamps: true }
  )
);

export const ContactMessage = mongoose.model(
  "ContactMessage",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      subject: String,
      message: String
    },
    { timestamps: true }
  )
);

export const Resume = mongoose.model(
  "Resume",
  new mongoose.Schema(
    {
      fileUrl: String,
      label: String,
      extra: singletonSchema
    },
    { timestamps: true }
  )
);
