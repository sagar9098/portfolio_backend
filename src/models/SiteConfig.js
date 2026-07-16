import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
  {
    label: String,
    icon: String,
    url: String
  },
  { _id: false }
);

const navItemSchema = new mongoose.Schema(
  {
    label: String,
    sectionKey: String,
    enabled: {
      type: Boolean,
      default: true
    }
  },
  { _id: false }
);

const sectionLayoutSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    },
    orientation: {
      type: String,
      enum: ["vertical", "horizontal", "split"],
      default: "vertical"
    },
    width: {
      type: String,
      enum: ["full", "contained", "narrow"],
      default: "contained"
    },
    style: {
      type: String,
      enum: ["grid", "cards", "timeline", "stack", "spotlight"],
      default: "stack"
    },
    columns: {
      type: Number,
      min: 1,
      max: 4,
      default: 1
    },
    itemAlignment: {
      type: String,
      enum: ["start", "center", "end"],
      default: "start"
    },
    accent: {
      type: String,
      default: ""
    }
  },
  { _id: false }
);

const siteConfigSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: "Portfolio"
    },
    tagline: {
      type: String,
      default: "Dynamic portfolio website"
    },
    metaTitle: String,
    metaDescription: String,
    theme: {
      mode: {
        type: String,
        default: "light"
      },
      primary: {
        type: String,
        default: "#1034a6"
      },
      secondary: {
        type: String,
        default: "#f6c344"
      },
      surface: {
        type: String,
        default: "#f8f4ec"
      },
      text: {
        type: String,
        default: "#1c1917"
      },
      headingFont: {
        type: String,
        default: "Space Grotesk"
      },
      bodyFont: {
        type: String,
        default: "Manrope"
      },
      radius: {
        type: Number,
        default: 24
      }
    },
    navigation: [navItemSchema],
    socialLinks: [socialLinkSchema],
    layout: {
      heroVariant: {
        type: String,
        default: "split"
      },
      sections: [sectionLayoutSchema]
    },
    contact: {
      email: String,
      phone: String,
      location: String
    }
  },
  { timestamps: true }
);

const SiteConfig = mongoose.model("SiteConfig", siteConfigSchema);

export default SiteConfig;
