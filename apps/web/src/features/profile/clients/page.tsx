import { ProfilePage } from "../components/ProfilePage/ProfilePage";

interface PublicProfilePageProps {
  profileUsername: string;
  profileAvatar?: string;
}

export default function PublicProfilePage({
  profileUsername,
  profileAvatar,
}: PublicProfilePageProps) {
  return (
    <ProfilePage
      publicView
      profileUsername={profileUsername}
      profileAvatar={profileAvatar}
    />
  );
}