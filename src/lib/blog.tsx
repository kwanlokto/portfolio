export interface BlogType {
  title: string;
  picture_url: string | null;
  source_url: string;
}

export const blogs: BlogType[] = [
  {
    title: "The Pragmatic Programmer",
    picture_url: null,
    source_url: "/portfolio/blog/the-pragmatic-programmer.md",
  },
];
