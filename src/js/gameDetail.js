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
          let { name, released, description, clip, background_image, slug } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          video.src = clip.clip;
          image.src = background_image;

          articleDOM.querySelector("h3.title").innerHTML = name;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;

          fetchScreen(slug);
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
      </section>
    `;

    preparePage();
  };

  render();
};

export default GameDetail;