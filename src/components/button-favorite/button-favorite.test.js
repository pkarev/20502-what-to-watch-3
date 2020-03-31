import React from 'react';
import renderer from 'react-test-renderer';
import ButtonFavorite from './button-favorite.jsx';

describe(`Render ButtonFavorite`, () => {
  it(`render isFavorite`, () => {
    const tree = renderer
      .create(<ButtonFavorite isFavorite={true} onButtonFavoriteClick={() => {}}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render isNotFavorite`, () => {
    const tree = renderer
      .create(<ButtonFavorite isFavorite={false} onButtonFavoriteClick={() => {}}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
