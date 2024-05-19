import { HomeController } from "src/application/controllers/HomeController";
import { HomeView } from "./Home.view";

export function Home() {
  const homeController = HomeController();

  return <HomeView homeController={homeController} />;
}
