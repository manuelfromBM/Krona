import MainLayout from "../../components/layout/MainLayout/MainLayout";
import SearchPage from "../../features/Search/SearchPage";

export default function SearchRoute() {
  return (
    <MainLayout
      center={<SearchPage />}
      right={null}
    />
  );
}