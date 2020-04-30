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
          let { name, released, description, clip } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          video.src = clip.clip;

          articleDOM.querySelector("h3.title").innerHTML = name;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    gameContent.innerHTML = `
      <section class="page-detail">
      <video controls="controls" src="" id="video"></video>
        <div class="article">
          <h3 class="title"></h3>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default GameDetail;