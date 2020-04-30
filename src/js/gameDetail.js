const GameDetail = (id) => {
  const preparePage = () => {
    let cleanedArgument = id.replace(/\s+/g, "-");
    let articleContent = "";

    const fetchGame = (url, id) => {
      let finalURL = url + id;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        // .then((response) => {
        //       console.log(response);
        //       return response;
        //       })
        .then((response) => {
          let { name, released, description, clip, background_image, slug } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          video.src = clip.clip;
          image.src = background_image;

          articleDOM.querySelector("h3.title").innerHTML = name;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;

          fetchScreen(slug);
          fetchYoutube(slug);
        });
      };

    const fetchScreen = (slug) => {
      let urlScreen = `https://api.rawg.io/api/games/${slug}/screenshots?page_1&page_size=4`
      
      fetch(`${urlScreen}`)
        .then((response) => response.json())
        .then((response) => {
              console.log(response);
              return response;
              })
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
        .then((response) => {
              console.log(response.results);
              return response;
              })
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
                                <p class="title_font white">${video.name}</p>
                                <p class="title_font red">${video.channel_title}</p>
                            </div>

                            `;
            });
        })
    }

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
            <hr style="width: 50%">
        </div>

        <video controls="controls" src="" id="video"></video>


        <div id="screenshots" class= "space-between"></div>
        <iframe width="640" height="360" class="stick youtube w-50" id="youtube_video" src=""></iframe>
        <div id="youtube_videos" class="space-between"></div>

      </section>
    `;

    preparePage();
  };

  render();
};

export default GameDetail;