import 'bootstrap';
import "../sass/styles.scss";
import routes from "./routes";

let gameArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  gameArgument = path[1] || "";

  let gameContent = document.getElementById("gameContent");
  routes[path[0]](gameArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());