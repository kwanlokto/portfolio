type TravelingImageType = {
  type: "traveling";
};

type ReadingImageType = {
  type: "reading";
  md: string; // markdown file name without extension
  rating: number; // 0 to 5
};

export type HobbyImageType = {
  title: string;
  src: string;
  aspect_ratio: string; // format "width/height" e.g. "3/4"
} & (TravelingImageType | ReadingImageType);

export type HobbyType = {
  title: string;
  img: string;
  images: HobbyImageType[];
};

/**
 * For traveling hobby, each image represents a place that I have traveled to. Clicking on the
 * image will shows more pictures and details about the place. The aspect ratio
 * of the image is also provided to ensure that the image is displayed correctly without
 * distortion.
 */
const TRAVELING_IMAGES: HobbyImageType[] = [
  // Row 1
  {
    type: "traveling",
    title: "Antelope Canyon",
    src: "/portfolio/traveling/Antelope Canyon.jpg",
    aspect_ratio: "3/4",
  },
  {
    type: "traveling",
    title: "Mt Fuji",
    src: "/portfolio/traveling/Mt Fuji.jpg",
    aspect_ratio: "16/9",
  },
  {
    type: "traveling",
    title: "Lynn Canyon",
    src: "/portfolio/traveling/Lynn Canyon.jpg",
    aspect_ratio: "3/4",
  },
  {
    type: "traveling",
    title: "The Crack",
    src: "/portfolio/traveling/The Crack.jpg",
    aspect_ratio: "1",
  },
  // Row 2
  {
    type: "traveling",
    title: "Minoh Waterfalls",
    src: "/portfolio/traveling/Minoh Waterfalls.jpg",
    aspect_ratio: "9/16",
  },
  {
    type: "traveling",
    title: "Osaka Castle",
    src: "/portfolio/traveling/Osaka Castle.jpg",
    aspect_ratio: "3/4",
  },
  {
    type: "traveling",
    title: "Whistler",
    src: "/portfolio/traveling/Whistler.jpg",
    aspect_ratio: "4/3",
  },
  {
    type: "traveling",
    title: "Vancouver Canucks",
    src: "/portfolio/traveling/Vancouver Canucks.jpg",
    aspect_ratio: "1",
  },
];

/**
 * For reading hobby, each image represents a book. Clicking on the book will open a modal
 * that shows the markdown content of the book review and the rating (e.g. 4.5/5) will be
 * displayed as stars on the card.
 */
const READING_IMAGES: HobbyImageType[] = [
  // Row 1
  {
    type: "reading",
    title: "The Pragmatic Programmer",
    src: "/portfolio/reading/The Pragmatic Programmer.jpg",
    md: "/portfolio/reading/The Pragmatic Programmer.md",
    rating: 4.75,
    aspect_ratio: "3/2",
  },
];

/**
 * This is the main list of hobbies that will be displayed on the homepage. Each hobby has a
 * title, a cover image, and a list of images that will be shown in the modal when the hobby
 * card is clicked. The images in the modal can be either traveling images or reading images,
 * which are defined above.
 */
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

export const SCROLLING_HOBBIES: HobbyType[] = [...HOBBIES, ...HOBBIES];
