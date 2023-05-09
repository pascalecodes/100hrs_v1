const form = document.getElementById('avatarForm');
const avatar = document.getElementById('avatar');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the file object from the form
  const file = form.querySelector('input[name="avatar"]').files[0];

  // Check if the file is an image
  if (!file || !file.type.match(/^image\/.*/)) {
    alert('Please select an image file.');
    return;
  }

  // Create a new Blob object from the file
  const blob = new Blob([file], {type: file.type});

  // Create a new URL object from the Blob object
  const url = window.URL.createObjectURL(blob);

  // Set the src of the avatar image to the URL object
  avatar.src = url;
});