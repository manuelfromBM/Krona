import { ProfilePage } from "../components/ProfilePage/ProfilePage";
import type { UserProfilePageProps } from "../types/profile.types";

export default function UserProfilePage(props: UserProfilePageProps) {
  return <ProfilePage {...props} />;
}