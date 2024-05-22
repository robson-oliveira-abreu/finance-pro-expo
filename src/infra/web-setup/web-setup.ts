import { onPlatform } from "src/application/utils/onPlatform";
import { changeLanguage } from "./lang/lang";
import { add_metadata } from "./metadata/add_metadata.web";
import "./styles/styles.css";

function web_setup() {
  console.info("Setup web");
  add_metadata();
  changeLanguage("pt-BR");
}

export default onPlatform("web", web_setup);
