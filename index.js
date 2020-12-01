const formAdd = document.querySelector('#formAdd');
const photoList = document.querySelector('#photoList');
const btnSave = document.querySelector('#btnSave');
const btnDelete = document.querySelector('#btnDelete');

const newPhoto = (el, index) => {
  const html = `
  <li class="list-group-item col-lg-3 col-md-6 my-2 mx-lg-3 mx-sm-0 d-flex align-items-center">
    <a href="${el}" target="_blank"><img src="${el}" class="ajustPhoto" /></a>
    <i class="far fa-trash-alt trash m-auto" id="${index}"></i>
  </li>
  `;

  return html;
};

const savedPhotos = localStorage.getItem('photoCollection')
  ? JSON.parse(localStorage.getItem('photoCollection'))
  : [];

const newPhotos = [...savedPhotos];

formAdd.addEventListener('submit', (e) => {
  e.preventDefault();
  const photo = formAdd.urlPhoto.value.trim();
  newPhotos.push(photo);

  if (photo.length !== 0) {
    photoList.innerHTML += newPhoto(photo);
    formAdd.reset();
  }
});

window.addEventListener('load', () => {
  if (localStorage.getItem('photoCollection')) {
    savedPhotos.map(
      (el, index) => (photoList.innerHTML += newPhoto(el, index))
    );
  }
});

photoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('trash')) {
    e.target.parentElement.remove();
    const id = e.target;
    localStorage.setItem(
      'photoCollection',
      JSON.stringify([...newPhotos.slice(id - 1, -1)])
    );
  }
});

btnSave.addEventListener('click', () => {
  console.log(photoList.children);
  if (photoList.children.length == 0) {
    return;
  }

  localStorage.setItem('photoCollection', JSON.stringify([...newPhotos]));
});

btnDelete.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
