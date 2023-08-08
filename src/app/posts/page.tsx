"use client";
import { create, findAll, post, posts } from "@/services/posts";
import {
  useQuery,
  useMutation,
  useQueryClient,
  Updater,
} from "@tanstack/react-query";

export default function Home() {
  const queryClient = useQueryClient();

  // Optimistically update to the new value
  const wait = (duration: number) => {
    return new Promise((resolve) => setTimeout(resolve, duration));
  };

  const postsQuery = useQuery<posts, Error>({
    queryFn: async () => await findAll(),
    queryKey: ["posts"],
  });

  const postsMutation = useMutation({
    mutationFn: async (value: post) => await create(value),

    onMutate: (newPosts) => {
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["posts"]);
      // Optimistically update to the new value
      queryClient.setQueryData(
        ["posts"],
        (old: Updater<post[] | undefined, post[] | undefined>) => [
          ...old,
          newPosts,
        ]
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (err, newTodo, context) =>{
      queryClient.setQueryData(['posts'], context.previousTodos )
    },
    onSuccess: (err, newTodo, context) => {
      console.log({
        err,
        newTodo,
        context,
      });
    },
  });

  const handleClick = () => {
    postsMutation.mutate({
      title: "new title",
      id: 8,
      author: "new aurthor",
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
