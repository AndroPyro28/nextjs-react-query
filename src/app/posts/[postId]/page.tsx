"use client";

import { query } from "@/hooks/useQueryProcessor";
import { comments } from "@/types/comments.type";
import { post } from "@/types/posts.type";
import { useQuery } from "@tanstack/react-query";

type IParams = {
  params: ConversationIdParams;
};

type ConversationIdParams = {
  postId: string;
};

function PostId({ params: { postId } }: IParams) {

  const postsQuery = query<post>(`/posts/${postId}`, ['posts', postId]);
  const commentsQuery = query<comments>(`/comments?postId=${postId}`, ['comments', postId], {enabled: postsQuery?.data?.id != null})

  if (postsQuery.isLoading) return <h1>loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      {postsQuery.data.id} {postsQuery.data.title} {postsQuery.data.author}

      comments:  { commentsQuery.isLoading ? <div>loading comments...</div> :  commentsQuery?.data?.map((comment) => (
        <div>{comment.body}</div>
      ))}
    </div>
  );
}

export default PostId;
