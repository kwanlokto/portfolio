type TravelingImageType = {
  type: "traveling";
  aspect_ratio: string; // format "width/height" e.g. "3/4"
};

type ReadingImageType = {
  type: "reading";
  md: string; // markdown file name without extension
  rating: number; // 0 to 5
};

export type HobbyImageType = {
  title: string;
  src: string;
} & (TravelingImageType | ReadingImageType);

const TRAVELING_IMAGES: HobbyImageType[] = [
  // Row 1
  {
    type: "traveling",
    title: "Antelope Canyon",
    src: "Antelope Canyon.jpg",
    aspect_ratio: "3/4",
  },
  {
    type: "traveling",
    title: "Mt Fuji",
    src: "Mt Fuji.jpg",
    aspect_ratio: "16/9",
  },
  {
    type: "traveling",
    title: "Lynn Canyon",
    src: "Lynn Canyon.jpg",
    aspect_ratio: "3/4",
  },
  {
    type: "traveling",
    title: "The Crack",
    src: "The Crack.jpg",
    aspect_ratio: "1",
  },
  // Row 2
  {
    type: "traveling",
    title: "Minoh Waterfalls",
    src: "Minoh Waterfalls.jpg",
    aspect_ratio: "9/16",
  },
  {
    type: "traveling",
    title: "Osaka Castle",
    src: "Osaka Castle.jpg",
    aspect_ratio: "3/4",
  },
  {
    type: "traveling",
    title: "Whistler",
    src: "Whistler.jpg",
    aspect_ratio: "4/3",
  },
  {
    type: "traveling",
    title: "Vancouver Canucks",
    src: "Vancouver Canucks.jpg",
    aspect_ratio: "1",
  },
];
const READING_IMAGES: HobbyImageType[] = [
  // Row 1
  {
    type: "reading",
    title: "The Pragmatic Programmer",
    src: "the_pragmatic_programmer.jfif",
    md: "the_pragmatic_programmer",
    rating: 4.75,
  },
];

const HOBBIES = [
  {
    title: "Traveling",
    img: "/portfolio/traveling.png",
    images: TRAVELING_IMAGES,
  },
  {
    title: "Reading",
    img: "/portfolio/reading.jpg",
    images: READING_IMAGES,
  },
  { title: "Gaming", img: "/portfolio/gaming.jpg", images: [] },
  { title: "Sports", img: "/portfolio/sport.png", images: [] },
];

export const SCROLLING_HOBBIES = [...HOBBIES, ...HOBBIES];
