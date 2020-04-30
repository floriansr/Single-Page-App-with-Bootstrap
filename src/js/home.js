import moment from "moment";

const Home = (argument = "") => {

  let time = moment().format().slice(0,10);
  let future_time = moment().add(1, 'years').format().slice(0,10);

  const preparePage = () => {
    let articles = "";

    const fetchList = (url) => {
      let URL = url;

      console.log(URL);

      fetch(`${URL}`)
        .then((response) => response.json())
        .then((response) => {
				    	console.log(response);
				    	return response;
				    	})
        .then((response) => {
          response.results.forEach((article) => {

            articles += `
                <a href="#gamedetail/${article.id}" class="cardGame">
                      <img class="card-img-top" src="${article.background_image}" alt="Card image cap">
                  <div class="card-body">
                      <h2 class="card-text">${article.name}</h2>
                      <p class="text-center">${article.released}</p>
                  </div>
                </a>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList(`https://api.rawg.io/api/games?dates=${time},${future_time}&&page_size=27`);
    //game à venir sur un an, page_list en fetch 27, découpage par 9 à prédéfinir
  };
// ordering=-rating&page=1&page_size=${entryLimit}

  const render = () => {
    gameContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default Home;