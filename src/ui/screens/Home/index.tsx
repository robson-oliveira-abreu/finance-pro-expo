import { HomeController } from "@application/controllers/HomeController";
import { HomeView } from "./Home.view";

export function Home() {
  const homeController = HomeController();

  return <HomeView homeController={homeController} />;
}
