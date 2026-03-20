import esportsFloatOne from "../assets/1.jpeg";
import esportsFloatTwo from "../assets/2.jpeg";
import esportsFloatThree from "../assets/3.jpeg";
import dogeImage from "../assets/doge.jpeg";
import lightBulbImage from "../assets/ideathon-bulb.jpeg";
import laptopHandsImage from "../assets/prompting-laptop.jpeg";
import promptWordsImage from "../assets/prompting-words.jpeg";
import talentShowImage from "../assets/talent-show.jpeg";
import shortFilmImage from "../assets/short-film.jpeg";
import treasureImage from "../assets/Treasure.jpeg";

const registrationForms = {
  ideathonx: "https://forms.gle/rqMhA4mUvf7mWLtZ7",
  "paper-presentation": "https://forms.gle/fwWqcAWQK5K1ZFg68",
  "algo-auction": "https://forms.gle/FCZkyZnJfdbvfR5g6",
  prompting: "https://forms.gle/REPLACE_PROMPTING_FORM",
  esports: "https://forms.gle/4YQT7QTjXZZPkNfT8",
  "talent-show": "https://forms.gle/r89kk3tt46nC4YT86",
  "treasure-hunt": "https://forms.gle/uewPg9JWtNQtQZ7m8",
  "short-film": "https://forms.gle/REPLACE_SHORT_FILM_FORM",
  "meme-making": "https://forms.gle/REPLACE_MEME_MAKING_FORM"
};

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
    registrationUrl: registrationForms.ideathonx,
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
    slug: "paper-presentation",
    title: "Paper Presentation",
    category: "Technical",
    description: "Present research papers, case studies, and technical insights with strong structure and clarity.",
    mode: "Solo / Team",
    venue: "Department of AIML",
    icon: "T1B",
    prize: "TBA",
    registrationUrl: registrationForms["paper-presentation"],
    rules: [
      "Participants may present individually or as a team, based on event coordinator instructions.",
      "The paper topic should be original and relevant to technology, engineering, or innovation domains.",
      "Presenters must bring slides or supporting material in a ready-to-present format.",
      "The presentation and Q&A must stay within the time limit announced by coordinators.",
      "Plagiarism or uncredited copied work will lead to direct disqualification.",
      "Judging will be based on content quality, technical depth, clarity, and presentation skills."
    ],
    image: promptWordsImage,
    floaters: [
      { type: "image", src: promptWordsImage },
      { type: "label", label: "Abstract" },
      { type: "label", label: "Present" }
    ]
  },
  {
    slug: "algo-auction",
    title: "Algo Auction",
    category: "Technical",
    description: "Compete through strategy-driven bidding rounds, algorithmic problem solving, and fast technical decision-making.",
    mode: "Team",
    venue: "Department of AIML",
    icon: "T1C",
    prize: "TBA",
    registrationUrl: registrationForms["algo-auction"],
    rules: [
      "Participants must register with the same team name if the event is played in teams.",
      "Each round will involve bidding, selection, or challenge allocation based on event coordinator rules.",
      "Teams must complete the allotted problem or task within the announced time limit.",
      "Unfair collaboration, use of prohibited resources, or rule violations can lead to disqualification.",
      "All bids, challenge assignments, and scoring decisions recorded by the organizers will be final.",
      "Judging will consider strategy, correctness, speed, and overall execution across rounds."
    ],
    image: laptopHandsImage,
    floaters: [
      { type: "image", src: laptopHandsImage },
      { type: "label", label: "Bid" },
      { type: "label", label: "Solve" }
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
    registrationUrl: registrationForms.prompting,
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
    registrationUrl: registrationForms.esports,
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
    title: "Talent Battle",
    category: "Non-Technical",
    description: "High-energy stage performances that reward creativity, confidence, and crowd-pulling presence.",
    mode: "Solo / Team",
    venue: "Department of AIML",
    icon: "N2",
    prize: "TBA",
    registrationUrl: registrationForms["talent-show"],
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
      { type: "label", label: "Battle" },
      { type: "label", label: "Perform" }
    ]
  },
  {
    slug: "treasure-hunt",
    title: "Treasure Hunt",
    category: "Non-Technical",
    description: "Race through clue-based checkpoints, decoding tasks, and surprise challenges with speed, teamwork, and sharp observation.",
    mode: "Team",
    venue: "Department of AIML",
    icon: "N3",
    prize: "TBA",
    registrationUrl: registrationForms["treasure-hunt"],
    rules: [
      "Teams must stay together throughout the event unless the coordinators announce a special round format.",
      "Each clue must be solved in the intended order, and skipping checkpoints is not allowed.",
      "Using unauthorized help, outside participants, or online answer sharing will lead to disqualification.",
      "The team that completes the trail correctly in the shortest time will have the advantage.",
      "Participants must respect campus rules, safety instructions, and all restricted areas during the hunt.",
      "Coordinator decisions on clue validation, time records, and final rankings will be final."
    ],
    image: treasureImage,
    floaters: [
      { type: "image", src: treasureImage },
      { type: "label", label: "Clue" },
      { type: "label", label: "Track" },
      { type: "label", label: "Find" }
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
    registrationUrl: registrationForms["short-film"],
    topics: [
      {
        title: "Mental Health Awareness",
        description: "Build a story around depression, anxiety, student pressure, emotional burnout, and the importance of breaking stigma through empathy and support."
      },
      {
        title: "Cyber Safety & Digital Addiction",
        description: "Explore online scams, privacy risks, excessive screen dependence, and the real impact of social media on daily life and mental well-being."
      },
      {
        title: "Environmental Protection",
        description: "Highlight climate change, pollution, plastic waste, and the urgent need for responsible action to protect the planet."
      },
      {
        title: "Women Safety & Empowerment",
        description: "Focus on harassment, equality, self-defense, confidence, and the importance of creating spaces where women can live and speak freely."
      }
    ],
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
    registrationUrl: registrationForms["meme-making"],
    topics: [
      {
        title: "Drug Abuse Awareness",
        description: "Create memes that spotlight the dangers of addiction, the impact of peer pressure, and the importance of choosing a healthy path."
      },
      {
        title: "Road Safety Awareness",
        description: "Focus on safe driving, helmet and seatbelt use, avoiding mobile phone distractions, and the importance of following traffic rules."
      },
      {
        title: "Child Labour Awareness",
        description: "Use your concept to highlight the harm caused by child labour and the need to protect every child's right to safety, dignity, and learning."
      },
      {
        title: "Importance of Education",
        description: "Show how education builds opportunity, confidence, and a better future for individuals, families, and society."
      }
    ],
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
  }
];

export const events = [...technicalEvents, ...nonTechnicalEvents, ...preEvents];

export const eventBySlug = events.reduce((acc, event) => {
  acc[event.slug] = event;
  return acc;
}, {});
