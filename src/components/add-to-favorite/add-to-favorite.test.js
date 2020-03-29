import React from 'react';
import renderer from 'react-test-renderer';
import AddToFavorite from './add-to-favorite';

describe(`Render AddToFavorite`, () => {
  it(`render isFavorite`, () => {
    const tree = renderer
    .create(<AddToFavorite isFavorite={true} onAddToFavoriteClick={() => {}}/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render isNotFavorite`, () => {
    const tree = renderer
    .create(<AddToFavorite isFavorite={false} onAddToFavoriteClick={() => {}}/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
