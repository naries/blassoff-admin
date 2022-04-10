import Dashboard from "./assets/svg/dashboard.svg";
import Podcast from "./assets/svg/podcast.svg";
import Record from "./assets/svg/record.svg";
import Episode from "./assets/svg/episode.svg";
import Contact from "./assets/svg/contact.svg";
import Settings from "./assets/svg/setting-icon.svg";
import Asa from "./assets/png/asa.png";
import Bass from "./assets/png/bass.png";
import Gospel from "./assets/png/gospel.png";
import Interview from "./assets/png/interview.png";
import Radio from './assets/svg/Radio.svg'
import Users from './assets/svg/users.svg'
import Bell from './assets/svg/bell.svg'
import FlagBlack from './assets/svg/flag-black.svg'
import Comment from './assets/svg/comment.svg'
import UserCheck from './assets/svg/user-check.svg'

export const menu = [
  // {
  //   label: "Dashboard",
  //   icon: Dashboard,
  //   route: "/dashboard",
  // },
  // {
  //   label: "Creators ",
  //   icon: Users, // change Icon later
  //   route: "/creators",
  // },
  // {
  //   label: "Listeners",
  //   icon: UserCheck, // change Icon later
  //   route: "/listeners",
  // },
  // {
  //   label: "Podcasts",
  //   icon: Podcast,
  //   route: "/podcasts",
  // },
  // {
  //   label: "Flagged Podcasts",
  //   icon: FlagBlack,
  //   route: "/flagged-podcasts",
  // },
  // {
  //   label: "Episodes",
  //   icon: Episode,
  //   route: "/episodes",
  // },
  // {
  //   label: "FlaggedEpisodes",
  //   icon: FlagBlack,
  //   route: "/flagged-episodes",
  // },
  {
    label: "Users",
    icon: UserCheck, // change Icon later
    route: "/users",
  },
  {
    label: "Customers",
    icon: UserCheck, // change Icon later
    route: "/customers",
  },
  {
    label: "Payments",
    icon: Episode,
    route: "/payment",
  },
  {
    label: "Contents",
    icon: Comment,
    route: "/contents",
  },
  {
    label: "Notifications",
    icon: Bell,
    route: "/notifications",
  },
  // {
  //   label: "Banners",
  //   icon: Settings,
  //   route: "/banners",
  // },
  // {
  //   label: "Notification",
  //   icon: Bell,
  //   route: "/notification",
  // },
  // {
  //   label: "Background Music",
  //   icon: Record,
  //   route: "/bg-music",
  // },
  // {
  //     label: "Contact Support",
  //     icon: Contact,
  //     route: "/contacts"
  // },
];

export const podcasts = [
  {
    id: 1,
    title: "Asa Podcast",
    category: "Music",
    lastupdate: "Last updated: 2 hours ago",
    episodes: "5",
    image: Asa,
  },
  {
    id: 2,
    title: "Bass Project",
    category: "Instrumental",
    lastupdate: "Last updated: 2 hours ago",
    episodes: "5",
    image: Bass,
  },
  {
    id: 3,
    title: "Talk With Enoch",
    category: "Gospel",
    lastupdate: "2 hours ago",
    episodes: "5",
    image: Gospel,
  },
  {
    id: 4,
    title: "Asa Interview",
    category: "Interview",
    lastupdate: "Last updated: 2 hours ago",
    episodes: "5",
    image: Interview,
  },
  {
    id: 5,
    title: "Asa Podcast",
    category: "Music",
    lastupdate: "2 hours ago",
    episodes: "5",
    image: Asa,
  },
  {
    id: 6,
    title: "Bass Project",
    category: "Instrumental",
    lastupdate: "Last updated: 2 hours ago",
    episodes: "5",
    image: Bass,
  },
  {
    id: 7,
    title: "Talk With Enoch",
    category: "Gospel",
    lastupdate: "Last updated: 2 hours ago",
    episodes: "5",
    image: Gospel,
  },
  {
    id: 8,
    title: "Asa Interview",
    category: "Interview",
    lastupdate: "Last updated: 2 hours ago",
    episodes: "5",
    image: Interview,
  },
];

export const body = [
  {
    id: 1,
    picture: Asa,
    title: "Episode 1",
    episode:
      "https://topnaija.ng/wp-content/uploads/2019/01/Aṣa-05-360.mp3?_=1",
    duration: "03:33",
    visibility: "Public",
    published: "November 8, 2020",
  },
  {
    id: 2,
    picture: Asa,
    title: "Episode 2",
    episode:
      "https://topnaija.ng/wp-content/uploads/2019/01/Aṣa-05-360.mp3?_=1",
    duration: "03:33",
    visibility: "Public",
    published: "November 8, 2020",
  },
  {
    id: 3,
    picture: Asa,
    title: "Episode 3",
    episode:
      "https://topnaija.ng/wp-content/uploads/2019/01/Aṣa-05-360.mp3?_=1",
    duration: "03:33",
    visibility: "Public",
    published: "November 8, 2020",
  },
  {
    id: 4,
    picture: Asa,
    title: "Episode 4",
    episode:
      "https://topnaija.ng/wp-content/uploads/2019/01/Aṣa-05-360.mp3?_=1",
    duration: "03:33",
    visibility: "Public",
    published: "November 8, 2020",
  },
  {
    id: 5,
    picture: Asa,
    title: "Episode 5",
    episode:
      "https://topnaija.ng/wp-content/uploads/2019/01/Aṣa-05-360.mp3?_=1",
    duration: "03:33",
    visibility: "Public",
    published: "November 8, 2020",
  },
];

export const episodes = [
  {
    id: 1,
    title: "Asa-Stay-Tonight",
    podcast: "Asa Podcast",
    type: "Public",
    status: "Published",
    published: "Nov 8, 2020 17:31",
  },
  {
    id: 2,
    title: "Stay-Tune-Show",
    podcast: "Asa Podcast",
    type: "Public",
    status: "Draft",
    published: "Nov 8, 2020 17:31",
  },
];

export const liverecords = [
  {
    id: 1,
    title: "Word Live Conference",
    preview:
      "https://topnaija.ng/wp-content/uploads/2019/01/Aṣa-05-360.mp3?_=1",
    recorded: "Nov 8, 2020 17:31",
  },
  {
    id: 2,
    title: "Word Live Conference",
    preview:
      "https://topnaija.ng/wp-content/uploads/2019/01/Aṣa-05-360.mp3?_=1",
    recorded: "Nov 8, 2020 17:31",
  },
];

export const offlinerecords = [
  {
    title: "Mars Live Conference",
    preview:
      "https://topnaija.ng/wp-content/uploads/2019/01/Aṣa-05-360.mp3?_=1",
    recorded: "Nov 8, 2020 17:31",
  },
  {
    title: "Jupiter Live Conference",
    preview:
      "https://topnaija.ng/wp-content/uploads/2019/01/Aṣa-05-360.mp3?_=1",
    recorded: "Nov 8, 2020 17:31",
  },
];

export const nigeriraState = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const languages = [
  { code: "sq", name: "Albanian" },
  { code: "ar", name: "Arabic" },
  { code: "be", name: "Belarusian" },
  { code: "bg", name: "Bulgarian" },
  { code: "zh", name: "Chinese" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch, Flemish" },
  { code: "en", name: "English" },
  { code: "et", name: "Estonian" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek (Modern)" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "lt", name: "Lithuanian" },
  { code: "mk", name: "Macedonian" },
  { code: "ro", name: "Moldovan, Moldavian, Romanian" },
  { code: "no", name: "Norwegian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "sr", name: "Serbian" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "es", name: "Spanish, Castilian" },
  { code: "sv", name: "Swedish" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" },
];

export const visibility = [
  { value: "PRIVATE", label: "Private" },
  { value: "PUBLIC", label: "Public" },
  // { value: 'LIMITED', label: 'Limited' }
];

export const genres = [
  { value: "Acoustic Group", label: "Acoustic Group" },
  { value: "Action", label: "Action" },
  { value: "Adventure", label: "Adventure" },
  { value: "Alternative Hip-hop", label: "Alternative Hip-hop" },
  { value: "Ambient", label: "Ambient" },
  { value: "Beats", label: "Beats" },
  { value: "Bright", label: "Bright" },
  { value: "Build-up Scene", label: "Build-up Scene" },
  { value: "High Drones", label: "High Drones" },
  { value: "Chasing", label: "Chasing" },
  { value: "Electric", label: "Electric" },
  { value: "Elegant", label: "Elegant" },
  { value: "Elevator Music", label: "Elevator Music" },
  { value: "Energetic", label: "Energetic" },
  { value: "Epic", label: "Epic" },
  { value: "Fast", label: "Fast" },
  { value: "Floating", label: "Floating" },
  { value: "Folk", label: "Folk" },
  { value: "Indie Pop", label: "Indie Pop" },
  { value: "Intro Outro", label: "Intro Outro" },
  { value: "Jazz", label: "Jazz" },
  { value: "Jingles", label: "Jingles" },
  { value: "Laid back", label: "Laid back" },
  { value: "Meditation", label: "Meditation" },
  { value: "Medium", label: "Medium" },
  { value: "Modern Blues", label: "Modern Blues" },
  { value: "Modern Classical", label: "Modern Classical" },
  { value: "Mystery", label: "Mystery" },
  { value: "Nostalgia", label: "Nostalgia" },
  { value: "Peaceful", label: "Peaceful" },
  { value: "Pop", label: "Pop" },
  { value: "Pulses", label: "Pulses" },
  { value: "Quirky", label: "Quirky" },
  { value: "Relaxing", label: "Relaxing" },
  { value: "Restless", label: "Restless" },
  { value: "Romantic", label: "Romantic" },
  { value: "RNB", label: "RNB" },
  { value: "Rock", label: "Rock" },
  { value: "Running", label: "Running" },
  { value: "Small Emotion", label: "Small Emotion" },
  { value: "Smooth", label: "Smooth" },
  { value: "Soft House", label: "Soft House" },
  { value: "Special Effects", label: "Special Effects" },
  { value: "Medium", label: "Medium" },
  { value: "Solo Guitar", label: "Solo Guitar" },
  { value: "Solo Piano", label: "Solo Piano" },
  { value: "Special Ocassion", label: "Special Ocassion" },
  { value: "Suspense", label: "Suspense" },
  { value: "Synthwave", label: "Synthwave" },
  { value: "Techno & Trance", label: "Techno & Trance" },
  { value: "Trap", label: "Trap" },
  { value: "Upbeat", label: "Upbeat" },
  { value: "Vocal", label: "Vocal" },
  { value: "World", label: "World" },
  { value: "Mystery", label: "Mystery" },
  { value: "Vibe", label: "Vibe" },
  { value: "Soft House", label: "Soft House" },
  { value: "Alternative", label: "Alternative" },
  { value: "Beautiful", label: "Beautiful" },
];

export const sectionPos = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
];

export const lockedMsg =
  "Your account is locked due to too many failed login attempts, after 24 hours a code will be sent to your mobile number or email to activate it back";
