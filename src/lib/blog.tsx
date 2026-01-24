export interface BlogType {
  id: string;
  title: string;
  picture_url: string | null;
}

export const blogs: BlogType[] = [
  {
    id: "the-pragmatic-programmer",
    title: "The Pragmatic Programmer",
    picture_url: "/portfolio/blog/pragmatic_programmer.jpg",
  },
];
