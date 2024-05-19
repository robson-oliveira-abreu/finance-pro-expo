import { useHomeController } from "@infra/controllers/useHomeController";
import { HomeView } from "./Home.view";

export function Home() {
  const homeController = useHomeController();

  return <HomeView homeController={homeController} />;
}
