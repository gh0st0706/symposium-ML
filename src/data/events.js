import esportsFloatOne from "../assets/1.jpeg";
import esportsFloatTwo from "../assets/2.jpeg";
import esportsFloatThree from "../assets/3.jpeg";
import dogeImage from "../assets/doge.jpeg";
import reelsIcon from "../assets/Instagram Reels icon in iOS Style.jpeg";

export const technicalEvents = [
  {
    slug: "ideathonx",
    title: "IdeathonX",
    category: "Technical",
    description: "Pitch bold problem statements and solution blueprints with rapid validation rounds.",
    mode: "Team",
    venue: "Main Auditorium",
    icon: "T1",
    prize: "TBA",
    floaters: [
      { type: "label", label: "Ideate" },
      { type: "label", label: "Pitch" },
      { type: "label", label: "Validate" }
    ]
  },
  {
    slug: "prompting",
    title: "Prompting",
    category: "Technical",
    description: "Solve real-world challenges with prompt engineering, evaluation, and refinement.",
    mode: "Solo",
    venue: "Lab Arena",
    icon: "T2",
    prize: "TBA",
    floaters: [
      { type: "label", label: "Prompt" },
      { type: "label", label: "Refine" },
      { type: "label", label: "Evaluate" }
    ]
  }
];

export const nonTechnicalEvents = [
  {
    slug: "esports",
    title: "eSports",
    category: "Non-Technical",
    description: "Competitive brackets with live shoutcasts and high-energy matchups.",
    mode: "Team",
    venue: "Arena Zone",
    icon: "N1",
    prize: "TBA",
    floaters: [
      { type: "image", src: esportsFloatOne },
      { type: "image", src: esportsFloatTwo },
      { type: "image", src: esportsFloatThree }
    ]
  },
  {
    slug: "talent-show",
    title: "Talent Show",
    category: "Non-Technical",
    description: "Stage performances that celebrate creativity, confidence, and showmanship.",
    mode: "Solo / Team",
    venue: "Open Stage",
    icon: "N2",
    prize: "TBA",
    floaters: [
      { type: "label", label: "Stage" },
      { type: "label", label: "Perform" },
      { type: "label", label: "Encore" }
    ]
  }
];

export const preEvents = [
  {
    slug: "short-film",
    title: "Short Film",
    category: "Pre-Event",
    description: "Tell a story in under time with impactful visuals and narrative clarity.",
    mode: "Team",
    venue: "Online Submission",
    icon: "P1",
    prize: "TBA",
    floaters: [
      { type: "label", label: "Storyboard" },
      { type: "label", label: "Shoot" },
      { type: "label", label: "Edit" }
    ]
  },
  {
    slug: "meme-making",
    title: "Meme Making",
    category: "Pre-Event",
    description: "Create sharp, tech-flavored memes with originality and timing.",
    mode: "Solo",
    venue: "Online Submission",
    icon: "P2",
    prize: "TBA",
    image: dogeImage,
    floaters: [
      { type: "image", src: dogeImage },
      { type: "label", label: "Caption" },
      { type: "label", label: "Punchline" }
    ]
  },
  {
    slug: "reels-making",
    title: "Reels Making",
    category: "Pre-Event",
    description: "Craft fast, engaging reels that capture TechLynx energy.",
    mode: "Solo",
    venue: "Online Submission",
    icon: "P3",
    prize: "TBA",
    image: reelsIcon,
    floaters: [
      { type: "image", src: reelsIcon },
      { type: "label", label: "Shoot" },
      { type: "label", label: "Cut" }
    ]
  }
];

export const events = [...technicalEvents, ...nonTechnicalEvents, ...preEvents];

export const eventBySlug = events.reduce((acc, event) => {
  acc[event.slug] = event;
  return acc;
}, {});
