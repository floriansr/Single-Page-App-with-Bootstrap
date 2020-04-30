import 'bootstrap';
import "../sass/styles.scss";
import routes from "./routes";
import submitSearch from "./search";

let gameArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  gameArgument = path[1] || "";

  let gameContent = document.getElementById("gameContent");
  routes[path[0]](gameArgument);
  return true;
};

const searchForm = document.getElementById("form");

searchForm.addEventListener("submit", (e) => {
	let searchInput = document.getElementById("searchbar");
	submitSearch(searchInput.value);
});


window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());