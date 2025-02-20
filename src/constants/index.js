import { 
  buy,
  redeem,
  facebook, 
  instagram, 
  linkedin, 
  twitter, 
  airbnb, 
  binance, 
  coinbase, 
  dropbox, 
  send, 
  shield, 
  star
} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Profile",
  },
  {
    id: "features",
    title: "Lend Service",
  },
  {
    id: "product",
    title: "Get Service",
  },
  {
    id: "clients",
    title: "Manage Credits",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Rewards",
    content:
      "Each computation you offer to others rewards you with equivalent credit value",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We take proactive steps make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Balance Transfer",
    content:
      "Use credits earned to either trade computation from others or redeem real money!",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    name: "Redeem Credits",
    title: "Founder & Leader",
    img: redeem,
  },
  {
    id: "feedback-2",
    name: "Buy Credits",
    title: "Founder & Leader",
    img: buy,
  },
  
];

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
  },
];

export const footerLinks = [
  {
    title: "Creators",
    links: [
      {
        name: "Dheeraj Babu",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "Sathvik",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Rohan",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Bhupesh",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Kaushal",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Gokaraju Rangaraju Institute of Engineering and Technology",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Woxsen University",
        link: "https://www.hoobank.com/partners/",
      },
      
    ],
  },

];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];