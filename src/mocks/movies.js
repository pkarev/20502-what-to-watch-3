const movies = [
  {
    id: 1,
    name: `The Grand Budapest Hotel`,
    genre: `Drama`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    posterBig: `/img/bg-the-grand-budapest-hotel.jpg`,
    posterSmall: `/img/the-grand-budapest-hotel-poster.jpg`,
    releaseDate: 2014,
    rating: {
      number: `8,9`,
      name: `Very good`,
      count: 240,
    },
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    director: `Wes Andreson`,
    stars: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    trailer: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Drama`,
    posterBig: `/img/bg-the-grand-budapest-hotel.jpg`,
    posterSmall: `/img/bohemian-rhapsody.jpg`,
    releaseDate: 2014,
    rating: {
      number: `8,9`,
      name: `Very good`,
      count: 240,
    },
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    director: `Wes Andreson`,
    stars: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    genre: `Drama`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    posterBig: `/img/bg-the-grand-budapest-hotel.jpg`,
    posterSmall: `/img/moonrise-kingdom.jpg`,
    releaseDate: 2014,
    rating: {
      number: `8,9`,
      name: `Very good`,
      count: 240,
    },
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    director: `Wes Andreson`,
    stars: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  },
  {
    id: 4,
    name: `Pulp fiction`,
    genre: `Drama`,
    trailer: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    posterBig: `/img/bg-the-grand-budapest-hotel.jpg`,
    posterSmall: `/img/pulp-fiction.jpg`,
    releaseDate: 2014,
    rating: {
      number: `8,9`,
      name: `Very good`,
      count: 240,
    },
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    director: `Wes Andreson`,
    stars: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  },
  {
    id: 5,
    name: `Snatch`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Drama`,
    posterBig: `/img/bg-the-grand-budapest-hotel.jpg`,
    posterSmall: `/img/snatch.jpg`,
    releaseDate: 2014,
    rating: {
      number: `8,9`,
      name: `Very good`,
      count: 240,
    },
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    director: `Wes Andreson`,
    stars: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  },
  {
    id: 6,
    name: `The Grand budapest hotel`,
    genre: `Drama`,
    trailer: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    posterBig: `/img/bg-the-grand-budapest-hotel.jpg`,
    posterSmall: `/img/the-grand-budapest-hotel-poster.jpg`,
    releaseDate: 2014,
    rating: {
      number: `8,9`,
      name: `Very good`,
      count: 240,
    },
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    director: `Wes Andreson`,
    stars: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  },
  {
    id: 7,
    name: `War of the worlds`,
    genre: `Drama`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    posterBig: `/img/bg-the-grand-budapest-hotel.jpg`,
    posterSmall: `/img/war-of-the-worlds.jpg`,
    releaseDate: 2014,
    rating: {
      number: `8,9`,
      name: `Very good`,
      count: 240,
    },
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    director: `Wes Andreson`,
    stars: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  },
  {
    id: 8,
    name: `No country for old men`,
    poster: `/img/no-country-for-old-men.jpg`,
    genre: `Drama`,
    trailer: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    posterBig: `/img/bg-the-grand-budapest-hotel.jpg`,
    posterSmall: `/img/no-country-for-old-men.jpg`,
    releaseDate: 2014,
    rating: {
      number: `8,9`,
      name: `Very good`,
      count: 240,
    },
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    director: `Wes Andreson`,
    stars: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  }
];

export default movies;
