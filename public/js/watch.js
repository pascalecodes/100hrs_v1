//working with active item movement when clicked
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
const carousel = document.querySelector('#videoCarousel');
const playlist = document.querySelector('#videoPlaylist');
let activeSlide = 0;

carousel.addEventListener('slid.bs.carousel', () => {
 activeSlide = carousel.querySelector('.active').dataset.slideTo;
 console.log(`Slide to playlist item 1 ${activeSlide}`)
  updatePlaylistActiveClass();
});
console.log('test')
console.log(`Slide to playlist item 2 ${activeSlide}`);

function updatePlaylistActiveClass() {
  const playlistItems = playlist.querySelectorAll('.playlist-item');
  playlistItems.forEach((item) => {
    const itemIndex = item.dataset.slideTo;
    if (itemIndex == activeSlide) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
    item.addEventListener('click', () => {
      console.log(`Clicked videolist item ${itemIndex}`);
    });
  });
}


//*****working version with no playlist item movement
// const playlistItems = document.querySelectorAll('.playlist-item');
// const carouselItems = document.querySelectorAll('#videoCarousel .carousel-item');

// // Set the active slide in the carousel based on the active playlist item
// const activePlaylistItem = document.querySelector('.playlist-item.active');
// if (activePlaylistItem) {
//   const slideIndex = parseInt(activePlaylistItem.getAttribute('data-slide-to'));
//   const correspondingCarouselItem = document.querySelector(`#videoCarousel .carousel-item[data-slide-to="${slideIndex}"]`);
//   if (correspondingCarouselItem) {
//     correspondingCarouselItem.classList.add('active');
//   }
// }

// // Add event listener for the slid.bs.carousel event
// const videoCarousel = document.querySelector('#videoCarousel');
// if (videoCarousel) {
//   videoCarousel.addEventListener('slid.bs.carousel', () => {
//     const activeCarouselItem = document.querySelector('#videoCarousel .carousel-item.active');
//     if (activeCarouselItem) {
//       const slideIndex = parseInt(activeCarouselItem.getAttribute('data-slide-to'));
//       const activePlaylistItem = document.querySelector('.playlist-item.active');
//       if (activePlaylistItem) {
//         activePlaylistItem.classList.remove('active');
//       }
//       const correspondingPlaylistItem = document.querySelector(`.playlist-item[data-slide-to="${slideIndex}"]`);
//       if (correspondingPlaylistItem) {
//         correspondingPlaylistItem.classList.add('active');
//       }
//     }
//   });
// }

// // Add click event listeners for the playlist items
// playlistItems.forEach(item => {
//   item.addEventListener('click', e => {
//     e.preventDefault();
//     const slideIndex = parseInt(item.getAttribute('data-slide-to'));
//     const correspondingCarouselItem = document.querySelector(`#videoCarousel .carousel-item[data-slide-to="${slideIndex}"]`);
//     if (correspondingCarouselItem) {
//       correspondingCarouselItem.classList.add('active');
//       const activeCarouselItem = document.querySelector('#videoCarousel .carousel-item.active');
//       if (activeCarouselItem) {
//         activeCarouselItem.classList.remove('active');
//       }
//       videoCarousel.carousel(slideIndex);
//     }
//   });
// });

//scrolling playlist

// ****testing 
//scrolling playlist


// const playlistItems = document.querySelectorAll('.playlist-item');
// const carouselItems = document.querySelectorAll('#videoCarousel .carousel-item');

// // Set the active slide in the carousel based on the active playlist item
// const setActiveSlide = () => {
//   const activePlaylistItem = document.querySelector('.playlist-item.active');
//   if (activePlaylistItem) {
//     const slideIndex = parseInt(activePlaylistItem.getAttribute('data-slide-to'));
//     const correspondingCarouselItem = document.querySelector(`#videoCarousel .carousel-item[data-slide-to="${slideIndex}"]`);
//     if (correspondingCarouselItem) {
//       correspondingCarouselItem.classList.add('active');
//     }
//   }
// };

// // Set the active playlist item based on the active slide in the carousel
// const setActivePlaylistItem = () => {
//   const activeCarouselItem = document.querySelector('#videoCarousel .carousel-item.active');
//   if (activeCarouselItem) {
//     const slideIndex = parseInt(activeCarouselItem.getAttribute('data-slide-to'));
//     const activePlaylistItem = document.querySelector('.playlist-item.active');
//     if (activePlaylistItem) {
//       activePlaylistItem.classList.remove('active');
//       activePlaylistItem.querySelector('h4').style.color = "";
//     }
//     const correspondingPlaylistItem = document.querySelector(`.playlist-item[data-slide-to="${slideIndex}"]`);
//     if (correspondingPlaylistItem) {
//       correspondingPlaylistItem.classList.add('active');
//       correspondingPlaylistItem.querySelector('h4').style.color = "#dc3545";
//     }
//   }
// };

// // Add event listener for the slid.bs.carousel event
// const videoCarousel = document.querySelector('#videoCarousel');
// if (videoCarousel) {
//   videoCarousel.addEventListener('slid.bs.carousel', () => {
//     setActivePlaylistItem();
//   });
// }

// // Add click event listeners for the playlist items
// playlistItems.forEach(item => {
//   item.addEventListener('click', e => {
//     e.preventDefault();
//     const slideIndex = parseInt(item.getAttribute('data-slide-to'));
//     const correspondingCarouselItem = document.querySelector(`#videoCarousel .carousel-item[data-slide-to="${slideIndex}"]`);
//     if (correspondingCarouselItem) {
//       correspondingCarouselItem.classList.add('active');
//       const activeCarouselItem = document.querySelector('#videoCarousel .carousel-item.active');
//       if (activeCarouselItem) {
//         activeCarouselItem.classList.remove('active');
//       }
//       videoCarousel.carousel(slideIndex);
//       setActivePlaylistItem();
//     }
//   });
// });

// // Call setActiveSlide to set the active slide on page load
// setActiveSlide();