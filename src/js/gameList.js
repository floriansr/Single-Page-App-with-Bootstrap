const GameList = (argument = "") => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      
      let finalURL = url;
      
      if (argument) {
        finalURL = url + "&search=" + argument;
      }	

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
                      response.results.forEach((article, i) => {

                        articles += `
                              <a href="#gamedetail/${article.id}" class="cardGame">
                                      <img class="card-img-top" src="${article.background_image}" alt="Card image cap">
                                  <div class="card-body">
                                      <h2 class="card-text">${article.name}</h2>
                                      <p class="text-center">${article.released}</p>
                                      <p class="text-center">${article.rating}</p>
                                      <div id="special_platforms${i}"></div>
                                  </div>
                              </a>`;
                      });         
                      document.querySelector(".page-list .articles").innerHTML = articles;
                      return response;
        })
        .then((response) => {
          response.results.forEach((article, i) => {
            article.parent_platforms.forEach((x) => {
            let variable = document.getElementById(`special_platforms${i}`)
            console.log("variable = " + variable)
                        if (x.platform.slug === "pc"){
                          variable.innerHTML += `
                          <i class="fas fa-laptop"></i>
                          `;
                        }

                        if (x.platform.slug === "playstation"){
                          variable.innerHTML += `
                          <i class="fab fa-playstation"></i>
                          `;
                        }

                        if (x.platform.slug === "xbox"){
                           variable.innerHTML += `
                          <i class="fab fa-xbox"></i>
                           `;
                        }

            })
          })
        })

    };

    fetchList("https://api.rawg.io/api/games?page=1&page_size=27", cleanedArgument);
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
                    // response.results.forEach((article, i) => {
                      // article.parent_platforms.forEach((x) => {

                      //   // console.log(articles);

                      //   // document.getElementById(`special_platforms${i}`);
                      //   console.log(document.getElementById("special_platforms0"));

                      //   if (x.platform.slug === "pc"){
                      //     articles += `
                      //     <i class="fas fa-laptop"></i>
                      //     `;
                      //   }

                      //   if (x.platform.slug === "playstation"){
                      //     articles += `
                      //     <i class="fab fa-playstation"></i>
                      //     `;
                      //   }

                      //   if (x.platform.slug === "xbox"){
                      //      articles += `
                      //     <i class="fab fa-xbox"></i>
                      //      `;
                      //   }
                      // })
export default GameList;