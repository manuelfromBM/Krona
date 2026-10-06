import { notFound } from "next/navigation";

import MainLayout from "../../../../components/layout/MainLayout/MainLayout";
import PublicProfilePage from "../../../../features/profile/clients/page";
import { mockPosts } from "../../../../features/Feed/mocks/mockPosts";

export function generateStaticParams() {
  return mockPosts.map((post) => ({
    username: post.user.username,
  }));
}

export default async function PublicProfileRoute({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const post = mockPosts.find((item) => item.user.username === username);

  if (!post) {
    notFound();
  }

  return (
    <MainLayout
      center={
        <PublicProfilePage
          profileUsername={post.user.username}
          profileAvatar={post.user.avatar}
        />
      }
      right={null}
    />
  );
}