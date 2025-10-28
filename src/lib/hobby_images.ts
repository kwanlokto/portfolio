export type HobbyImageType = {
  src: string;
  aspect_ratio: string; // format "width/height" e.g. "3/4"
};

export const hobby_images: Record<string, HobbyImageType[]> = {
  traveling: [
    { src: "Lynn Canyon.jpg", aspect_ratio: "3/4" },
    { src: "Minoh Waterfalls.jpg", aspect_ratio: "9/16" },
    { src: "Mt Fuji.jpg", aspect_ratio: "16/9" },
    { src: "Osaka Castle.jpg", aspect_ratio: "9/16" },
    { src: "Rural Japan.jpg", aspect_ratio: "16/9" },
    { src: "The Crack.jpg", aspect_ratio: "1" },
    { src: "Vancouver Canucks.jpg", aspect_ratio: "16/9" },
    { src: "Whistler.jpg", aspect_ratio: "4/3" },
  ],
  sport: [],
};
