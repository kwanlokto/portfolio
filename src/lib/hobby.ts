import { asset } from "@/lib/site";

type PhotoItemType = {
  type: "photo";
};

type ReviewItemType = {
  type: "review";
  md: string; // markdown file name without extension
  rating: number; // 0 to 5
};

export type HobbyItemType = {
  title: string;
  src: string;
  aspect_ratio: string; // format "width/height" e.g. "3/4"
} & (PhotoItemType | ReviewItemType);

export type HobbyType = {
  title: string;
  img: string;
  images: HobbyItemType[];
};

/**
 * For traveling hobby, each image represents a place that I have traveled to. Clicking on the
 * image will shows more pictures and details about the place. The aspect ratio
 * of the image is also provided to ensure that the image is displayed correctly without
 * distortion.
 */
const TRAVELING_IMAGES: HobbyItemType[] = [
  // Row 1
  {
    type: "photo",
    title: "Antelope Canyon",
    src: asset("/traveling/Antelope Canyon.jpg"),
    aspect_ratio: "3/4",
  },
  {
    type: "photo",
    title: "Mt Fuji",
    src: asset("/traveling/Mt Fuji.jpg"),
    aspect_ratio: "16/9",
  },
  {
    type: "photo",
    title: "Lynn Canyon",
    src: asset("/traveling/Lynn Canyon.jpg"),
    aspect_ratio: "3/4",
  },
  {
    type: "photo",
    title: "The Crack",
    src: asset("/traveling/The Crack.jpg"),
    aspect_ratio: "1/1",
  },
  // Row 2
  {
    type: "photo",
    title: "Minoh Waterfalls",
    src: asset("/traveling/Minoh Waterfalls.jpg"),
    aspect_ratio: "9/16",
  },
  {
    type: "photo",
    title: "Osaka Castle",
    src: asset("/traveling/Osaka Castle.jpg"),
    aspect_ratio: "3/4",
  },
  {
    type: "photo",
    title: "Whistler",
    src: asset("/traveling/Whistler.jpg"),
    aspect_ratio: "4/3",
  },
  {
    type: "photo",
    title: "Vancouver Canucks",
    src: asset("/traveling/Vancouver Canucks.jpg"),
    aspect_ratio: "1/1",
  },
];

/**
 * For reading hobby, each image represents a book. Clicking on the book will open a modal
 * that shows the markdown content of the book review and the rating (e.g. 4.5/5) will be
 * displayed as stars on the card.
 */
const READING_IMAGES: HobbyItemType[] = [
  // Row 1
  {
    type: "review",
    title: "The Pragmatic Programmer",
    src: asset("/reading/The Pragmatic Programmer.jpg"),
    md: asset("/reading/The Pragmatic Programmer.md"),
    rating: 4.75,
    aspect_ratio: "1/1",
  },
  {
    type: "review",
    title: "The Phoenix Project",
    src: asset("/reading/The Phoenix Project.jpg"),
    md: asset("/reading/The Phoenix Project.md"),
    rating: 4.5,
    aspect_ratio: "1/1",
  },
];

/**
 * This is the main list of hobbies that will be displayed on the homepage. Each hobby has a
 * title, a cover image, and a list of images that will be shown in the modal when the hobby
 * card is clicked. The images in the modal can be either traveling images or reading images,
 * which are defined above.
 */
export const HOBBIES: HobbyType[] = [
  {
    title: "Traveling",
    img: asset("/traveling.png"),
    images: TRAVELING_IMAGES,
  },
  {
    title: "Reading",
    img: asset("/reading.jpg"),
    images: READING_IMAGES,
  },
  { title: "Gaming", img: asset("/gaming.jpg"), images: [] },
  { title: "Sports", img: asset("/sport.png"), images: [] },
];
