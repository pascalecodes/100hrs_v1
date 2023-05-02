// const playlistItems = document.querySelectorAll('.playlist-item');
// const carouselItems = document.querySelectorAll('#videoCarousel .carousel-item');

// playlistItems.forEach(item => {
//   item.addEventListener('click', e => {
//     e.preventDefault();
//     const slideIndex = parseInt(item.getAttribute('data-slide-to'));

//     console.log(`Clicked playlist item ${slideIndex}`);

//     // Update the active slide in the video carousel
//     const activeCarouselItem = document.querySelector('#videoCarousel .carousel-item.active');
//     if (activeCarouselItem) {
//       activeCarouselItem.className = activeCarouselItem.className.replace(/\bactive\b/g, '');
//     }
//     if (carouselItems[slideIndex]) {
//       carouselItems[slideIndex].className += ' active';
//     }

//     // Remove the active class from all playlist items
//     document.querySelectorAll('.playlist-item.active').forEach(activeItem => {
//       activeItem.className = activeItem.className.replace(/\bactive\b/g, '');
//     });

//     // Add the active class to the clicked playlist item
//     const correspondingPlaylistItem = document.querySelector(`.playlist-item[data-slide-to="${slideIndex}"]`);
//     if (correspondingPlaylistItem) {
//       correspondingPlaylistItem.className += ' active';
//     }
//   });
// });

// document.querySelector('#videoCarousel').addEventListener('slid.bs.carousel', () => {
//   const activeSlideIndex = parseInt(document.querySelector('#videoCarousel .carousel-item.active').getAttribute('data-slide-to'));

//   console.log(`Slid to carousel item ${activeSlideIndex}`);

//   // Remove the active class from all playlist items
//   document.querySelectorAll('.playlist-item.active').forEach(activeItem => {
//     activeItem.className = activeItem.className.replace(/\bactive\b/g, '');
//   });

//   // Add the active class to the corresponding playlist item
//   const correspondingPlaylistItem = document.querySelector(`.playlist-item[data-slide-to="${activeSlideIndex}"]`);
//   if (correspondingPlaylistItem) {
//     correspondingPlaylistItem.className += ' active';
//   }
// });

const playlistItems = document.querySelectorAll('.playlist-item');
const carouselItems = document.querySelectorAll('#videoCarousel .carousel-item');

playlistItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const slideIndex = parseInt(item.getAttribute('data-slide-to'));

    console.log(`Clicked playlist item ${slideIndex}`);

    // Update the active slide in the video carousel
    const activeCarouselItem = document.querySelector('#videoCarousel .carousel-item.active');
    if (activeCarouselItem) {
      activeCarouselItem.className = activeCarouselItem.className.replace(/\bactive\b/g, '');
    }
    if (carouselItems[slideIndex]) {
      carouselItems[slideIndex].className += ' active';
    }

    // Remove the active class from all playlist items
    document.querySelectorAll('.playlist-item.active').forEach(activeItem => {
      activeItem.className = activeItem.className.replace(/\bactive\b/g, '');
    });

    // Add the active class to the clicked playlist item
    const correspondingPlaylistItem = document.querySelector(`.playlist-item[data-slide-to="${slideIndex}"]`);
    if (correspondingPlaylistItem) {
      correspondingPlaylistItem.className += ' active';
    }
  });
});

const videoCarousel = document.querySelector('#videoCarousel');
if (videoCarousel) {
  videoCarousel.addEventListener('slide.bs.carousel', () => {
    console.log('Slide event fired');
  });

  videoCarousel.addEventListener('slid.bs.carousel', () => {
    const activeSlideIndex = parseInt(document.querySelector('#videoCarousel .carousel-item.active').getAttribute('data-slide-to'));

    console.log(`Slid to carousel item ${activeSlideIndex}`);

    // Remove the active class from all playlist items
    document.querySelectorAll('.playlist-item.active').forEach(activeItem => {
      activeItem.className = activeItem.className.replace(/\bactive\b/g, '');
    });

    // Add the active class to the corresponding playlist item
    const correspondingPlaylistItem = document.querySelector(`.playlist-item[data-slide-to="${activeSlideIndex}"]`);
    if (correspondingPlaylistItem) {
      correspondingPlaylistItem.className += ' active';
    }
  });
}