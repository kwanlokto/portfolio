export interface BlogType {
  id: string;
  title: string;
  picture_url: string | null;
  rating: number;
}

export const blogs: BlogType[] = [
  {
    id: "the-pragmatic-programmer",
    title: "Why 'The Pragmatic Programmer' Still Matters.",
    picture_url: "/portfolio/blog/photos/the_pragmatic_programmer.jfif",
    rating: 4.75,
  },
];
