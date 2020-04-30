const GameDetail = (id) => {
  const preparePage = () => {
    let cleanedArgument = id.replace(/\s+/g, "-");
    let articleContent = "";

    const fetchGame = (url, id) => {
      let finalURL = url + id;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
              console.log(response);
              return response;
              })
        .then((response) => {
          let { name, released, description, genres, clip, background_image, slug, website, ratings, rating, stores, tags } = response;

              genres.slice(0, 4).forEach((x) => {
              genres += `
              <a href="#gamelist/genres=${x.slug}">${x.name}</a> `;
              })

              tags.slice(0, 4).forEach((x) => {
              tags += `
              <a href="#gamelist/tags=${x.slug}">${x.name}</a> `;
              })

            stores.forEach((store) => {           
            stores += `<a href="${store.url}" target="_blank">${store.store.name}</a>, `;
            });

            let reducer = (accumulator, currentValue) => accumulator + currentValue;
            let counts = ratings.map((x) => x.count);
            let numberRatings = counts.reduce(reducer);

            let articleDOM = document.querySelector(".page-detail .article");
            video.src = clip.clip;
            image.src = background_image;

            articleDOM.querySelector("h3.title").innerHTML = name;
            articleDOM.querySelector("p.release-date span").innerHTML = released;
            articleDOM.querySelector("p.description").innerHTML = description;
            articleDOM.querySelector("a.website").href = website;
            articleDOM.querySelector("p.ratings").innerHTML += numberRatings;
            articleDOM.querySelector("p.rating").innerHTML += rating;
            articleDOM.querySelector("p.stores").innerHTML += stores;
            articleDOM.querySelector("p.tags").innerHTML += tags;
            articleDOM.querySelector("p.genres").innerHTML += genres;




          fetchScreen(slug);
          fetchYoutube(slug);
          fetchSimilarGames(slug);
        });
      };

    const fetchScreen = (slug) => {
      let urlScreen = `https://api.rawg.io/api/games/${slug}/screenshots?page_1&page_size=4`
      
      fetch(`${urlScreen}`)
        .then((response) => response.json())
        // .then((response) => {
        //       console.log(response);
        //       return response;
        //       })
        .then((response) => {

              let screenshot = document.getElementById("screenshots");

                  response.results.forEach((screen) => {
                    
                    screenshot.innerHTML += `
                        <img src="${screen.image}" class="screenshots">
                        `;
                  });
        });
    }
    const fetchYoutube = (slug) => {
      let urlYoutube = `https://api.rawg.io/api/games/${slug}/youtube?page=1&page_size=4`
      
      fetch(`${urlYoutube}`)
        .then((response) => response.json())
        // .then((response) => {
        //       console.log(response.results);
        //       return response;
        //       })
        .then((response) => {
         
          let videos = response.results;
          let videoPrincipale = videos.shift()

          let youtube_videos = document.getElementById("youtube_videos");
          let youtube_video = document.getElementById("youtube_video");

          youtube_video.src = "https://www.youtube.com/embed/"+ videoPrincipale.external_id

            videos.forEach((video) => {
                            youtube_videos.innerHTML += `

                            <div>
                                <iframe width="640" height="360" class="stick youtube w-100" src="https://www.youtube.com/embed/${video.external_id}"></iframe>
                                <p class="white">${video.name}</p>
                                <p class="metallic_grey">${video.channel_title}</p>
                            </div>

                            `;
            });
        })
    }
    const fetchSimilarGames = (slug) => {
      let urlSimilarGames = `https://api.rawg.io/api/games/${slug}/suggested?page_1&page_size=6`
      console.log(urlSimilarGames)

      fetch(urlSimilarGames)
          .then((response) => response.json())
          .then((response) => {
                                let games = response.results;
                                let similarGames = document.getElementById("similar_games");

                                  games.forEach((game) => {
                                    similarGames.innerHTML += `
                                          <a href="#gamedetail/${game.id}" class="cardGame">
                                             <img class="card-img-top" src="${game.background_image}" alt="Card image cap">
                                              <div class="card-body">
                                                  <h3 class="card-text">${game.name}</h3>
                                              </div>
                                          </a>`;
                                  });
                              });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    gameContent.innerHTML = `
      
      <section class="page-detail">
        
        <div class="article">
            <img src="" id="image" class="bigscreen">
            <hr>
              <h3 class="title"></h3>
              <p class="release-date text-center">Release date : <span></span></p>
            <hr style="width: 50%">
              <p class="description text-center"></p>
              <p class="ratings text-center">Votes: </p>
              <p class="rating text-center">Score sur 5: </p>
              <p class="stores text-center">Stores : </p>
              <p class="tags text-center">Tags : </p>
              <p class="genres text-center">Genres : </p>


            <hr style="width: 50%">
            <a class="website" href="" target="_blank">Go to website</a>
        </div>

        <video controls="controls" src="" id="video"></video>


        <div id="screenshots" class= "space-between"></div>
        <iframe width="640" height="360" class="stick youtube w-50" id="youtube_video" src=""></iframe>
        <div id="youtube_videos" class="space-between"></div>
        <div id="similar_games" class="space-between"></div>

      </section>
    `;

    preparePage();
  };

  render();
};

export default GameDetail;