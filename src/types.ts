export interface PostcardData {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  location: string;
  message: string;
}

export interface GallerySettings {
  passcode: string;
  passcodeHint: string;
  galleryTitle: string;
  gallerySubtitle: string;
  musicUrl: string;
  bgMusicEnabled: boolean;
}

export const DEFAULT_POSTCARDS: PostcardData[] = [
  {
    id: "pc-1",
    imageUrl: "./images/776f8d65-dc19-4897-ae87-027cb4afe415.png",
    title: "Postcard from Brussels",
    date: "May 16, 2026",
    location: "Brussels, Belgium",
    message: "My beautiful lovey, an 'original', not inspiried by anyone, postcard from Brussels. It's to my beautiful squirrel in Bucaramanga with her flower hair accessory."
  },
  {
    id: "pc-2",
    imageUrl: "./images/capy_taking_lint.png",
    title: "Bellybutton Lint Production",
    date: "October 12, 2024",
    location: "Hairy Belly",
    message: "It's one of your favourite things that my body does, I want to keep producing little balls for you forever"
  },
  {
    id: "pc-3",
    imageUrl: "./images/WhatsApp Image 2026-06-22 at 00.06.30.jpeg",
    title: "Squirrel Protect",
    date: "April 28th, 2026",
    location: "All video calls",
    message: "You have always protected me, and I love you so much for it"
  },
  {
    id: "pc-4",
    imageUrl: "./images/ChatGPT Image Jun 19, 2026, 09_40_23 PM.png",
    title: "Even in the rain, Capy protects",
    date: "April 23, 2026",
    location: "Forest in Bedtime Story",
    message: "Our bedtime stories have become our routine, and this is one of the first one! I will protect my little nut-hunting squirrel in the forest while she sleeps"
  },
  {
    id: "pc-5",
    imageUrl: "./images/ChatGPT Image Jun 19, 2026, 09_40_57 PM.png",
    title: "Hihi's passport",
    date: "April 9, 2026",
    location: "Manila Zoo",
    message: "It's our little baby and she has a passport!"
  },
  {
    id: "pc-6",
    imageUrl: "./images/WhatsApp Image 2026-04-21 at 02.35.51.jpeg",
    title: "Postcard from Bogota",
    date: "April 20, 2026",
    location: "Bogota, Colombia",
    message: "This one is so beautiful lovey, I am still amazed how you thought of it. Also Hihi in her rapper era lol."
  },
  {
    id: "pc-7",
    imageUrl: "./images/ChatGPT Image Jun 19, 2026, 11_47_30 PM.png",
    title: "On the beach with our hybrids",
    date: "June 19, 2026",
    location: "Croatia",
    message: "Make the boys also have cute hairstyles! I love you, this is sometime in the future!!"
  },
  {
    id: "pc-8",
    imageUrl: "./images/ChatGPT Image Apr 21, 2026, 02_05_09 AM.png",
    title: "Capy Protect",
    date: "Sometime in April",
    location: "All video calls",
    message: "I will always keep you safe, that's my goal and my main reason."
  },
  {
    id: "pc-9",
    imageUrl: "./images/ChatGPT Image Jun 19, 2026, 09_43_09 PM.png",
    title: "Flying Capy Protect",
    date: "Sometime in April",
    location: "Airplane",
    message: "Even when you fly, I keep you safe by monitoring the skies"
  },
  {
    id: "pc-10",
    imageUrl: "./images/ChatGPT Image Jun 19, 2026, 09_44_25 PM.png",
    title: "Early Date",
    date: "Sometime May 2026",
    location: "Elisa Cafe",
    message: "We've had such beautiful memories in the past year, but this is still one of my favourite dates, I remember it vividly - let's go into the toilet stall together."
  }
];

export const DEFAULT_SETTINGS: GallerySettings = {
  passcode: "squirrel123_unlocked",
  passcodeHint: "Check your letter, my love",
  galleryTitle: "Squirrel and Capy Postcards from life",
  gallerySubtitle: "Every picture is a memory that only we know. Hover to focus, click to flip and read the secret letter behind it.",
  musicUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-11599.mp3", // romantic lofi guitar track
  bgMusicEnabled: false
};
