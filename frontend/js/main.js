// POR: ANGEL BULNES
const usuarios = [
  {
    usuario: "goku",
    password: "asd.456",
    imagen: 'assets/profile-pics/goku.jpg',
    nombre: "Son Goku",
    seguidores: ["krillin", "bulma", "vegeta"],
    siguiendo: ["dende", "gohan", "goten"],
  },
  {
    usuario: "krillin",
    password: "asd.456",
    nombre: "Krillin",
    imagen: 'assets/profile-pics/krilin.jpg',
    seguidores: ["bulma", "vegeta"],
    siguiendo: ["gohan", "goten"],
  },
  {
    usuario: "bulma",
    password: "asd.456",
    nombre: "Bulma",
    imagen: 'assets/profile-pics/bulma.jpg',
    seguidores: ["krillin", "vegeta"],
    siguiendo: ["goten"],
  },
  {
    usuario: "vegeta",
    password: "asd.456",
    nombre: "Vegeta",
    imagen: 'assets/profile-pics/vegeta.jpg',
    seguidores: ["bulma"],
    siguiendo: ["goten"],
  },
  {
    usuario: "dende",
    password: "asd.456",
    nombre: "Dende",
    imagen: 'assets/profile-pics/dende.jpg',
    seguidores: ["goku", "bulma"],
    siguiendo: ["goku", "goten"],
  },
  {
    usuario: "gohan",
    password: "asd.456",
    nombre: "Gohan",
    imagen: 'assets/profile-pics/gohan.jpg',
    seguidores: ["goku", "bulma"],
    siguiendo: ["krillin", "goten"],
  },
];

const tiktoks = [
  {
    id: 1,
    usuario: 'goku',
    titulo: "¡Ya basta freezer!",
    fecha: "12/12/2012",
    video: "assets/videos/1.mp4",
    tituloCancion: "Cha la head cha la!",
    likes: 10,
    shares: 15,
    comentarios: [
      {
        usuario: "krillin",
        comentario: "Gokuuuuuu!",
      },
      {
        usuario: "vegeta",
        comentario: "Insecto!!!!",
      },
    ],
    hashtags: ["Dogs", "Freezer", ]
  },
  {
    id: 2,
    usuario: 'gohan',
    titulo: "¡Ya basta freezer!",
    fecha: "12/12/2012",
    video: "assets/videos/2.mp4",
    tituloCancion: "Cha la head cha la!",
    likes: 10,
    shares: 15,
    comentarios: [
      {
        usuario: "krillin",
        comentario: "Gokuuuuuu!",
      },
      {
        usuario: "vegeta",
        comentario: "Insecto!!!!",
      },
    ],
    hashtags: ["Dogs", "Freezer"]
  },
  {
    id: 3,
    usuario: 'dende',
    titulo: "¡Ya basta freezer!",
    fecha: "12/12/2012",
    video: "assets/videos/3.mp4",
    tituloCancion: "Cha la head cha la!",
    likes: 10,
    shares: 15,
    comentarios: [
      {
        usuario: "krillin",
        comentario: "Gokuuuuuu!",
      },
      {
        usuario: "vegeta",
        comentario: "Insecto!!!!",
      },
    ],
    hashtags: [ "Freezer", ]
  },
  {
    id: 4,
    usuario: 'bulma',
    titulo: "¡Ya basta freezer!",
    fecha: "12/12/2012",
    video: "assets/videos/4.mp4",
    tituloCancion: "Cha la head cha la!",
    likes: 10,
    shares: 15,
    comentarios: [
      {
        usuario: "krillin",
        comentario: "Gokuuuuuu!",
      },
      {
        usuario: "vegeta",
        comentario: "Insecto!!!!",
      },
    ],
    hashtags: ["Freezer", ]
  },
];

const hashtags = [
  {
    hashtag: 'Dogs',
    videos: 1000000000,
  },
  {
    hashtag: 'Freezer',
    videos: 1000000000,
  },
  {
    hashtag: 'Donde esta el dinero',
    videos: 1000000000,
  },
  {
    hashtag: 'Examen 1',
    videos: 1000000000,
  },
]

function setItem(key, value) {
  localStorage.setItem(key, value);
}

function getItem(key) {
  return localStorage.getItem(key);
}

function removeItem(key){
  localStorage.removeItem(key);
}
