export type HobbyImageType = {
  src: string;
  aspect_ratio: string; // format "width/height" e.g. "3/4"
};

export const HOBBY_IMAGES: Record<string, HobbyImageType[]> = {
  traveling: [
    // Row 1
    { src: "Antelope Canyon.jpg", aspect_ratio: "3/4" },
    { src: "Mt Fuji.jpg", aspect_ratio: "16/9" },
    { src: "Lynn Canyon.jpg", aspect_ratio: "3/4" },
    { src: "The Crack.jpg", aspect_ratio: "1" },
    // Row 2
    { src: "Minoh Waterfalls.jpg", aspect_ratio: "9/16" },
    { src: "Osaka Castle.jpg", aspect_ratio: "3/4" },
    { src: "Whistler.jpg", aspect_ratio: "4/3" },
    { src: "Vancouver Canucks.jpg", aspect_ratio: "1" },
  ],
  sports: [],
  gaming: [],
  reading: [],
};

const HOBBIES = [
  { title: "Traveling", img: "/portfolio/travel.png" },
  { title: "Reading", img: "/portfolio/reading.jpg" },
  { title: "Gaming", img: "/portfolio/gaming.jpg" },
  { title: "Sports", img: "/portfolio/sport.png" },
];

export const SCROLLING_HOBBIES = [...HOBBIES, ...HOBBIES];