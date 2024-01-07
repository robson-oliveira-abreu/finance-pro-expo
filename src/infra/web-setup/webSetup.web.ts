import { changeLanguage } from "./lang/lang";
import { add_metadata } from "./metadata/add_metadata.web";

function web_setup() {
  add_metadata();
  changeLanguage("pt-BR");
}

export { web_setup };
