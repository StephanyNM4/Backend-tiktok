/* POR: ANGEL BULNES */
/* HTML Elements */
const logoutBtn = document.getElementById("btn-logout");
const loginBtnModal = document.getElementById("btn-login");
const createBtnModalSide = document.getElementById("btn-create-side");
const createBtnModalNav = document.getElementById("btn-create");
const uploadModalBtn = document.getElementById("btn-upload");
const tiktokList = document.getElementById("tiktok-list");
const commentModal = document.getElementById("commentModal");
const commentList = document.getElementById("comment-list");
const commentInput = document.getElementById("comment-input");
const btnCommentContainer = document.getElementById("btn-comment-container");
const hashList = document.getElementById("hash-list");
const profilesPicsList = document.querySelectorAll(".pp-form");
/* Login */
const loginBtn = document.getElementById("btn-login-modal");
const userInput = document.getElementById("user-input");
const passInput = document.getElementById("user-pass");

/* New user */
const newUser = document.getElementById("new-user");
const newPass = document.getElementById("new-pass");
const newConfirm = document.getElementById("new-confirm");
const createBtn = document.getElementById("btn-create-user");

/* New tiktok */
const titleInput = document.getElementById("title-input");
const selectVideo = document.getElementById("select-video");
const hashtagInput = document.getElementById("hashtag-input");
const msgInput = document.getElementById("msg-input");
const uploadBtn = document.getElementById("btn-upload-video");
const suggestedList = document.getElementById("suggested-list");

/* DOM loaded */
document.addEventListener("DOMContentLoaded", function () {
  setItem("usuarios", JSON.stringify({ usuarios }));
  setItem("tiktoks", JSON.stringify({ tiktoks }));
  setItem("hashtags", JSON.stringify({ hashtags }));
  renderSuggestedUsers();
  renderTiktoks();
  renderHashtags();
  const currentUser = getItem("currentUser");

  if (currentUser) {
    logoutBtn.classList.remove("d-none");
  }
});

/* Click events */
loginBtnModal.addEventListener("click", function () {
  showModal("#loginModal");
});

createBtnModalNav.addEventListener("click", function () {
  showModal("#createModal");
});

createBtnModalSide.addEventListener("click", function () {
  showModal("#createModal");
});

uploadModalBtn.addEventListener("click", function () {
  showModal("#uploadModal");
});

loginBtn.addEventListener("click", () =>
  login(userInput.value, passInput.value)
);

createBtn.addEventListener("click", () =>
  createUser(newUser.value, newPass.value, newConfirm.value)
);

uploadBtn.addEventListener("click", () =>
  createTikTok(
    selectVideo.value,
    hashtagInput.value,
    msgInput.value,
    titleInput.value
  )
);

logoutBtn.addEventListener("click", () => logout());

/**
 * Función que muestra los modales
 * @param {string} id
 */
function showModal(id) {
  $(id).modal("show");
}

/* Login */
/**
 * Función que loguea un usuario y guarda su sesión
 * en el localStorage
 * @param {string} username
 * @param {string} password
 */
function login(username, password) {
  if (!username || !password) {
    alert("Debe ingresar un usuario y contraseña");
    return;
  }
  const usuarios = JSON.parse(getItem("usuarios")).usuarios;
  usuarios.forEach((user) => {
    if (user.usuario === username && user.password === password) {
      setItem("currentUser", username);
      alert(`Bienvenido ${username}`);
      $("#loginModal").modal("hide");
      logoutBtn.classList.toggle("d-none");
      renderSuggestedUsers();
      renderTiktoks();
    }
  });
}

/**
 * Función que permite crear un usuario
 * @param {string} username
 * @param {string} password
 * @param {string} confirm
 */
function createUser(username, password, confirm) {
  if (!username || !password || !confirm) {
    alert("Debe ingresar los datos para crear un usuario");
    return;
  }

  let image;
  const selectProfilePic = document.querySelector(".pp-active");
  if (selectProfilePic !== null) {
    image = selectProfilePic.src;
  } else {
    alert("No se agrego ninguna imagen");
    return;
  }

  let imageURL = "";
  if (image) {
    imageURL = image.substring(image.indexOf("assets"), image.length);
  }
  console.log(imageURL);

  if (password !== confirm) {
    alert("Las contraseñas no coinciden");
    return;
  }
  const usuarios = JSON.parse(getItem("usuarios")).usuarios;
  const user = {
    usuario: username,
    password: password,
    imagen: imageURL ? imageURL : "assets/profile-pics/goku.jpg",
    nombre: username,
    seguidores: [],
    siguiendo: [],
  };
  usuarios.push(user);
  setItem("usuarios", JSON.stringify({ usuarios }));
  alert("Usuario creado con exito");
  renderSuggestedUsers();
  $("#createModal").modal("hide");
}

/**
 * Función que renderiza los usuarios sugeridos dependiendo si
 * el usuario esta logueado o no
 */
function renderSuggestedUsers() {
  let html = "";
  const usuarios = JSON.parse(getItem("usuarios")).usuarios;
  const currentUser = getItem("currentUser");
  if (!currentUser) {
    html = "No estas logueado, ingresa para ver sugerencias";
  } else {
    const userObj = usuarios.find((user) => user.usuario === currentUser);
    usuarios.forEach((user) => {
      if (
        !userObj.siguiendo.includes(user.usuario) &&
        user.usuario !== currentUser
      ) {
        html += `
                  <li class="suggested-user">
                      <figure>
                        <img
                          class="rounded-circle mr-2 user-img-md"
                          src="${user.imagen}"
                          alt="Profile pic"
                        />
                      </figure>
                      <div class="user-info">
                        <strong>${user.nombre}</strong>
                        <p class="text-gray">@${user.usuario}</p>
                      </div>
                      <button
                        class="btn btn-main-outline btn-sm ml-auto side-button"
                        onclick="follow('${user.usuario}')"
                      >
                        Follow
                      </button>
                  </li>
        
        `;
      }
    });
  }
  suggestedList.innerHTML = html;
}

/**
 * Función que permite crear un nuevo tiktok
 * @param {string} video
 * @param {string} hashtags
 * @param {string} mensaje
 * @param {string} title
 */
function createTikTok(video, hashtags, mensaje, title) {
  let hash = [];
  if (!video || !mensaje || !title) {
    alert("Debe ingresar los campos correspondientes");
    return;
  }

  if (hashtags) {
    const hashtagsStorage = JSON.parse(getItem("hashtags")).hashtags;
    hash = hashtags.split(",");
    hash.forEach((tag) => {
      if (!hashtagsStorage.includes(tag)) {
        const newHash = {
          hashtag: tag,
          videos: 0,
        };
        hashtagsStorage.push(newHash);
      }
    });
    setItem("hashtags", JSON.stringify({ hashtags: hashtagsStorage }));
    renderHashtags();
  }

  const date = new Date();
  let createDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const tiktoks = JSON.parse(getItem("tiktoks")).tiktoks;
  const user = getItem("currentUser");
  const newTiktok = {
    usuario: user,
    titulo: mensaje,
    video: `assets/${video}`,
    tituloCancion: title,
    fecha: createDate,
    likes: 0,
    shares: 0,
    hashtags: hash,
    comentarios: [],
  };

  tiktoks.push(newTiktok);
  setItem("tiktoks", JSON.stringify({ tiktoks }));
  alert("Tiktok creado con exito");
  renderTiktoks();
  $("#uploadModal").modal("hide");
}

/**
 * Función que renderiza los tiktoks segun
 * si hay usuario logueado o no, y si se le pasa
 * un hashtag
 * @param {string} hash
 */
function renderTiktoks(hash) {
  let html = "";
  const tiktoks = JSON.parse(getItem("tiktoks")).tiktoks;
  const usuarios = JSON.parse(getItem("usuarios")).usuarios;
  const currentUser = getItem("currentUser");
  const userObj = usuarios.find((user) => user.usuario === currentUser);

  if (hash) {
    tiktoks.forEach((tiktok, index) => {
      if (tiktok.hashtags.includes(hash)) {
        const userTiktok = usuarios.find(
          (user) => user.usuario === tiktok.usuario
        );

        //Renderizar los hashtags
        let hasht = "";
        tiktok.hashtags.forEach((hash) => {
          hasht += ` <li class="mr-2">#${hash}</li>`;
        });
        html += fillTemplate(tiktok, hasht, userTiktok, index, tiktoks.length);
      }
    });
    if (html === "") {
      html = "<h3>No hay tiktoks con este hashtag :(<h3>";
    }
    tiktokList.innerHTML = html;
    return;
  }

  if (!currentUser) {
    tiktoks.forEach((tiktok, index) => {
      const userTiktok = usuarios.find(
        (user) => user.usuario === tiktok.usuario
      );

      //Renderizar los hashtags
      let hasht = "";
      tiktok.hashtags.forEach((hash) => {
        hasht += ` <li class="mr-2">#${hash}</li>`;
      });
      html += fillTemplate(
        tiktok,
        hasht,
        userTiktok,
        index,
        tiktoks.length,
        currentUser
      );
    });
  } else {
    tiktoks.forEach((tiktok, index) => {
      const userTiktok = usuarios.find(
        (user) => user.usuario === tiktok.usuario
      );
      if (
        userObj.siguiendo.includes(tiktok.usuario) ||
        tiktok.usuario === currentUser
      ) {
        //Renderizar los hashtags
        let hasht = "";
        tiktok.hashtags.forEach((hash) => {
          hasht += ` <li class="mr-2">#${hash}</li>`;
        });
        html += fillTemplate(
          tiktok,
          hasht,
          userTiktok,
          index,
          tiktoks.length,
          currentUser
        );
      }
    });
  }

  tiktokList.innerHTML = html;
}

/**
 * Función encargada de llenar el template de tiktoks
 * @param {object} tiktok
 * @param {string} hashtags
 * @param {object} user
 * @param {number} index
 * @param {number} size
 * @param {string} currentUser
 */
function fillTemplate(tiktok, hashtags, user, index, size, currentUser) {
  return ` <div class="tiktok">
    <div class="row">
      <div class="col-lg-10 col-md-12">
        <div class="tiktok__content">
          <div class="tiktok__header">
            <figure class="mr-4">
              <img
                src="${user.imagen}"
                class="rounded-circle user-img"
                alt="Profile pic"
              />
            </figure>
            <div class="tiktok___info">
              <div class="user-info">
                <strong>@${user.usuario}</strong>
                <span>${user.nombre}</span>
              </div>
              <div class="tiktok__desc">
                <div class="hashtags">
                  <ul>
                    ${hashtags}
                  </ul>
                </div>
                <span>${tiktok.titulo}</span>
              </div>
              <div class="tiktok__name">
                <i class="fas fa-music mr-3"></i>
                <p>${tiktok.tituloCancion}</p>
              </div>
            </div>
          </div>
          <div class="tiktok__media">
            <video
              class="tiktok-video"
              src="${tiktok.video}"
              onclick="this.paused ? this.play() : this.pause()"
            ></video>

            <div class="buttons">
              <ul>
                <li class="text-center mb-2">
                  <div class="btn-icon rounded-circle">
                    <i class="fas fa-heart fa-lg"></i>
                  </div>
                  ${tiktok.likes}
                </li>
                <li class="text-center mb-2">
                  <div class="btn-icon rounded-circle" onclick="fillCommentModal(${
                    tiktok.id
                  })">
                    <i class="fas fa-comment-dots fa-lg"></i>
                  </div>
                ${tiktok.comentarios.length}
                </li>
                <li class="text-center mb-2">
                  <div class="btn-icon rounded-circle">
                    <i class="fas fa-share fa-lg"></i>
                  </div>
                  ${tiktok.shares}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-2 d-lg-block d-none">
      ${
        currentUser === null
          ? `<div class="tiktok__follow">
          <button
            class="btn btn-main-outline btn-sm btn-follow font-weight-bold"
          >
            Follow
          </button>
        </div>`
          : ""
      }
      </div>
    </div>
    </div>
    ${index !== size - 1 ? "<hr />" : ""} `;
}

/**
 * Función encargada de llenar el modal de comentarios
 * @param {number} id
 */
function fillCommentModal(id) {
  const tiktoks = JSON.parse(getItem("tiktoks")).tiktoks;
  const tiktokComments = tiktoks.find((tiktok) => tiktok.id === id);
  let html = "";

  tiktokComments.comentarios.forEach((comment) => {
    html += `
    <div class="comment d-flex">
      <figure class="mr-4">
        <img
          width="50"
          class="rounded-circle"
          src="assets/profile-pics/patricio.jpg"
          alt="Profile pic"
        />
      </figure>
      <div class="comment__data">
        <strong>${comment.usuario}</strong>
        <p>${comment.comentario}</p>
      </div>
    </div>
    `;
  });

  btnCommentContainer.innerHTML = `
  <button class="btn btn-main btn-lg" onclick="addComment(${id})">
    Comentar
  </button>
  `;
  commentList.innerHTML = html;
  $("#commentModal").modal("show");
}

/**
 * Función encargada de agregar un comentario
 * @param {number} id
 */
function addComment(id) {
  const tiktoks = JSON.parse(getItem("tiktoks")).tiktoks;
  const tiktok = tiktoks.find((tiktok) => tiktok.id === id);
  const currentUser = getItem("currentUser");
  const newComment = {
    usuario: currentUser,
    comentario: commentInput.value,
  };

  tiktok.comentarios.push(newComment);
  setItem("tiktoks", JSON.stringify({ tiktoks }));
  alert("Comentario añadido con exito");
  $("#commentModal").show("hide");
}

/**
 * Función encarga de renderizar los hashtags
 */
function renderHashtags() {
  let html = "";
  const hashtags = JSON.parse(getItem("hashtags")).hashtags;
  hashtags.forEach((tag) => {
    html += `
    <li class="d-flex justify-content-between align-items-center">
      <div class="hashtag">
        <strong>#${tag.hashtag}</strong>
        <p>${convertNumber(tag.videos)} of videos</p>
      </div>
      <i class="fas fa-chevron-right cursor-pointer" onclick="renderTiktoks('${
        tag.hashtag
      }')"></i>
    </li>
    `;
  });

  hashList.innerHTML = html;
}

/**
 * Función encarga de humanizar el numero de
 * videos
 * @param {number} number
 */
function convertNumber(number) {
  if (number > 0) {
    return `${number / Math.pow(10, Math.log10(number))}M`;
  } else {
    return 0;
  }
}
/**
 * Función encarga de cambiar las
 * clases del formulario de imagenes
 * para obtenerlas
 * @param {number} id
 */
function toggleActive(id) {
  profilesPicsList.forEach((pp) => {
    if (pp.id === `profile-${id}`) {
      pp.classList.add("pp-active");
    } else {
      pp.classList.remove("pp-active");
    }
  });
}

/**
 * Función encarga de agregar un usuario
 * @param {string} userToFollow
 */
function follow(userToFollow) {
  const currentUser = getItem("currentUser");
  const usuarios = JSON.parse(getItem("usuarios")).usuarios;
  const userObj = usuarios.find((user) => user.usuario === currentUser);
  userObj.siguiendo.push(userToFollow);
  setItem("usuarios", JSON.stringify({ usuarios }));
  renderSuggestedUsers();
  renderTiktoks();
}

/**
 * Función encarga de hacer logout
 */
function logout() {
  removeItem("currentUser");
  renderTiktoks();
  renderSuggestedUsers();
  logoutBtn.classList.add("d-none");
}
