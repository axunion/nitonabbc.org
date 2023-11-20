import { setNavEvent } from "./nav";
import { setScrollEvent } from "./scroll";
import { setupContactPage } from "./contact";

setNavEvent(document.getElementById("nav"));
setScrollEvent(document.querySelectorAll("[data-scroll]"));
setupContactPage();
