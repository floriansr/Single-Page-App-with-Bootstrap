const GameList = (argument = "") => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }	

      fetch(`${finalURL}`)
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

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

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

export default GameList;