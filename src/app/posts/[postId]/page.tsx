"use client";

import { findById, post } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";

type IParams = {
  params: ConversationIdParams;
};

type ConversationIdParams = {
  postId: string;
};

function PostId({ params: { postId } }: IParams) {
  const postsQuery = useQuery<post, Error>({
    queryFn: async () => await findById(postId),
    queryKey: ["posts", postId],
  });

  if (postsQuery.isLoading) return <h1>loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      {postsQuery.data.id} {postsQuery.data.title} {postsQuery.data.author}
    </div>
  );
}

export default PostId;
