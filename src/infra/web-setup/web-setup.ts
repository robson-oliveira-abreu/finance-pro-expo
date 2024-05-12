import { onPlatform } from "@infra/utils/onPlatform";
import { changeLanguage } from "./lang/lang";
import { add_metadata } from "./metadata/add_metadata.web";

function web_setup() {
  console.info("Setup web");
  add_metadata();
  changeLanguage("pt-BR");
}

export default onPlatform("web", web_setup);
