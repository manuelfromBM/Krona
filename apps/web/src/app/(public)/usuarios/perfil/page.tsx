import MainLayout from "../../../../components/layout/MainLayout/MainLayout";
import UserProfilePage from "../../../../features/profile/users/page";

export default function PerfilPage() {
  return (
    <MainLayout center={<UserProfilePage />} right={null} />
  );
}