export interface BlogType {
  id: string;
  title: string;
  picture_url: string | null;
  rating: number;
}

export const blogs: BlogType[] = [
  {
    id: "the-pragmatic-programmer",
    title: "The Pragmatic Programmer",
    picture_url: "/portfolio/blog/pragmatic_programmer.jpg",
    rating: 4.75,
  },
];
