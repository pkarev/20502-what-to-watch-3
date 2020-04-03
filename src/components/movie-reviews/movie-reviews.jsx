import React from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';

const MovieReviews = ({reviews}) => {
  const chunkedReviews = chunk(reviews, Math.ceil(reviews.length / 2));
  const getDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString(`default`, {month: `long`});
    return `${date.getMonth()} ${month}, ${date.getFullYear()}`;
  };

  return (
    <div className="movie-card__reviews movie-card__row">
      {chunkedReviews.map((col, colIndex) => (
        <div className="movie-card__reviews-col" key={colIndex}>
          {col.map((review, reviewIndex) => (
            <div className="review" key={reviewIndex}>
              <blockquote className="review__quote">
                <p className="review__text">
                  {review.comment}
                </p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime={review.date}>{getDate(review.date)}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })),
};

export default MovieReviews;
