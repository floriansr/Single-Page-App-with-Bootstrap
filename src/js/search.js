const submitSearch = (searchInput) => {
  let keywords = searchInput

  window.location.href = `#gamelist/?search=${keywords}`;
};

export default submitSearch;