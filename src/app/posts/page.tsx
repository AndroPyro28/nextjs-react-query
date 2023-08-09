"use client";
import {query, mutate} from '@/hooks/useQueryProcessor'
import { post, posts } from "@/types/posts.type";
export default function Home() {

  const postsQuery = query<posts>('/posts', ['posts'])
  const postsMutation = mutate<post>('/posts', 'POST', ['posts'])

  const handleClick = () => {
    postsMutation.mutate({
      title: "new title",
      id: 8,
      author: "new aurthor",
    }, {
    });
  };

  if (postsQuery.isLoading) return <h1>loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <main className="">
      {postsQuery.data.map((post) => {
        return (
          <div key={post.id}>
           {post.id}. {post.title} - {post.author}
          </div>
        );
      })}
      <button onClick={handleClick}>click me</button>
    </main>
  );
}
