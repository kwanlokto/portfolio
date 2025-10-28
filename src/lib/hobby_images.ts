export type HobbyImageType = {
  src: string;
  aspect_ratio: string; // format "width/height" e.g. "3/4"
};

export const hobby_images: Record<string, HobbyImageType[]> = {
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
  sport: [],
};
