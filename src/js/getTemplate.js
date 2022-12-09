export const getTemplate = image => {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;

  return `<div class="photo-card">
    <a class='link-item' href=${largeImageURL}>
    <img src=${webformatURL} alt=${tags} loading="lazy" />
    
    <div class="info">
      <p class="info-item">
      <span><b>Likes</b></span>
        <span>${likes}</span>
      </p>

      <p class="info-item">
      <span><b>Views</b></span>
        <span>${views}</span>
      </p>

      <p class="info-item">
      <span><b>Comments</b></span>
        <span>${comments}</span>
      </p>
      
      <p class="info-item">
      <span><b>Downloads</b></span>
        <span>${downloads}</span>
      </p>
    </div>
    </a>
  </div>`;
};
