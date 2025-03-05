import { Post } from '@/ui/post'
import React from 'react'
import { getPosts } from '@/lib/posts'
export default async function Page() {
  const posts = await getPosts()
 
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}