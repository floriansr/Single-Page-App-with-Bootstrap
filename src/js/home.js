import moment from "moment";
let pageSizeNumber = 9;

const Home = (argument = "") => {

  let time = moment().format().slice(0,10);
  let future_time = moment().add(1, 'years').format().slice(0,10);

  const preparePage = () => {
    let articles = "";

    const fetchList = (url) => {
      let URL = url;
      
      fetch(`${URL}`)
        .then((response) => response.json())
        .then((response) => {
				    	console.log(response);
				    	return response;
				    	})
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
                </a>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
          return response;
        })

        .then((response) => {
          console.log(response.results)
          response.results.forEach((article, i) => {
            
            if (article.parent_platforms === undefined) {
              return
            }

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

    fetchList(`https://api.rawg.io/api/games?dates=${time},${future_time}&ordering=-added&page=1&page_size=${pageSizeNumber}`);
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

const pageSize = () => {
    if (pageSizeNumber < 18) {
        pageSizeNumber += 9;
        Home();
    } else {
        pageSizeNumber += 9;
        document.getElementById('see-more-button').hidden = true;
        Home();
    }
}


document.getElementById('see-more-button').addEventListener('click', pageSize)

export default Home;