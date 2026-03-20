import esportsFloatOne from "../assets/1.jpeg";
import esportsFloatTwo from "../assets/2.jpeg";
import esportsFloatThree from "../assets/3.jpeg";
import dogeImage from "../assets/doge.jpeg";
import reelsIcon from "../assets/Instagram Reels icon in iOS Style.jpeg";
import lightBulbImage from "../assets/ideathon-bulb.jpeg";
import laptopHandsImage from "../assets/prompting-laptop.jpeg";
import promptWordsImage from "../assets/prompting-words.jpeg";
import talentShowImage from "../assets/talent-show.jpeg";
import shortFilmImage from "../assets/short-film.jpeg";

export const technicalEvents = [
  {
    slug: "ideathonx",
    title: "IdeathonX",
    category: "Technical",
    description: "Pitch bold problem statements and solution blueprints with rapid validation rounds.",
    mode: "Team",
    venue: "Department of AIML",
    icon: "T1",
    prize: "TBA",
    rules: [
      "Each team must have 2 to 4 members, and all members must register under the same team name.",
      "Ideas must address a real problem and should be original, practical, and clearly explained.",
      "Teams must be ready with a short pitch deck or visual aid for the presentation round.",
      "The total presentation and Q&A time must stay within the limit announced by the coordinators.",
      "Any copied idea, fabricated research, or plagiarism in content will lead to disqualification.",
      "The judges' decision on innovation, feasibility, and impact will be final."
    ],
    image: lightBulbImage,
    floaters: [
      { type: "image", src: lightBulbImage },
      { type: "label", label: "Ideate" },
      { type: "label", label: "Pitch" }
    ]
  },
  {
    slug: "prompting",
    title: "Prompting",
    category: "Technical",
    description: "Solve real-world challenges with prompt engineering, evaluation, and refinement.",
    mode: "Solo",
    venue: "Department of AIML",
    icon: "T2",
    prize: "TBA",
    rules: [
      "This is an individual event, and only one participant is allowed per registration.",
      "Participants must solve the given challenge using prompts, prompt iterations, and clear reasoning.",
      "Prompt history or the final prompt flow should be shown to the judges when requested.",
      "Using pre-built solutions that bypass the challenge intent is not allowed.",
      "Submissions will be judged on prompt quality, output relevance, refinement process, and clarity.",
      "Participants must complete the round within the allotted time announced at the venue."
    ],
    image: laptopHandsImage,
    floaters: [
      { type: "image", src: laptopHandsImage },
      { type: "image", src: promptWordsImage },
      { type: "label", label: "Refine" }
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
    venue: "Department of AIML",
    icon: "N1",
    prize: "TBA",
    rules: [
      "Each team must report on time with the full roster before the match schedule begins.",
      "The roster submitted at registration cannot be changed after fixtures are finalized.",
      "Use of cheats, exploits, unofficial mods, or unfair third-party tools will result in immediate disqualification.",
      "Players must follow the lobby settings, game mode, and match format given by the coordinators.",
      "Any team absent at the reporting time may forfeit the match based on organizer discretion.",
      "Referee calls and organizer decisions on disputes, restarts, and results will be final."
    ],
    image: esportsFloatOne,
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
    venue: "Department of AIML",
    icon: "N2",
    prize: "TBA",
    rules: [
      "Participants may perform solo or as a team, but the final lineup must be confirmed before the event starts.",
      "Each act must stay within the time limit announced by the event coordinators.",
      "Participants must carry their audio track or performance file in a ready-to-use format.",
      "Performances must avoid offensive, unsafe, or inappropriate content on stage.",
      "Props are allowed only if they are easy to manage and do not damage the venue.",
      "Judging will be based on talent, stage presence, originality, and audience engagement."
    ],
    image: talentShowImage,
    floaters: [
      { type: "image", src: talentShowImage },
      { type: "label", label: "Stage" },
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
    venue: "Department of AIML",
    icon: "P1",
    prize: "TBA",
    rules: [
      "Teams must submit an original short film created specifically for the competition.",
      "The film duration must remain within the minimum and maximum limits shared by the organizers.",
      "Entries must be submitted in a playable digital format before the stated deadline.",
      "Use of copyrighted media without permission may affect eligibility or scoring.",
      "Films containing hateful, explicit, or unsafe content can be rejected from screening.",
      "Judging will focus on storytelling, direction, editing, creativity, and overall impact."
    ],
    image: shortFilmImage,
    floaters: [
      { type: "image", src: shortFilmImage },
      { type: "label", label: "Storyboard" },
      { type: "label", label: "Edit" }
    ]
  },
  {
    slug: "meme-making",
    title: "Meme Making",
    category: "Pre-Event",
    description: "Create sharp, tech-flavored memes with originality and timing.",
    mode: "Solo",
    venue: "Department of AIML",
    icon: "P2",
    prize: "TBA",
    rules: [
      "This is an individual event, and each participant may submit only the number of entries allowed by the coordinators.",
      "Memes must be original and relevant to the event theme, technology, or student culture prompt provided.",
      "Copied templates are allowed only if the captioning and concept are genuinely original.",
      "Entries containing offensive, abusive, or discriminatory material will be disqualified.",
      "Participants must submit the final meme in the requested image format before the deadline.",
      "Judging will consider humor, originality, timing, relatability, and visual execution."
    ],
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
    venue: "Department of AIML",
    icon: "P3",
    prize: "TBA",
    rules: [
      "Participants must create and submit an original reel aligned with the TechLynx theme or event brief.",
      "The reel should follow the duration and aspect ratio guidelines announced by the coordinators.",
      "Only copyright-safe audio, visuals, and editing assets should be used in the final submission.",
      "The final reel must be submitted before the deadline in the required format or platform link.",
      "Entries with inappropriate content, plagiarism, or reused public reels will be rejected.",
      "Judging will focus on creativity, storytelling, editing quality, and audience appeal."
    ],
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
