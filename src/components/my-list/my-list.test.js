import React from 'react';
import renderer from 'react-test-renderer';
import MyList from './my-list.jsx';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `/img/bohemian-rhapsody.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    previewImage: `/img/moonrise-kingdom.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  }
];

it(`Render MyList`, () => {
  const tree = renderer
    .create(
        <MyList movies={movies} onCardClick={() => {}}/>, {
          createNodeMock: () => ({})
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
