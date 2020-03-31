import React from 'react';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import UserBlock from '../user-block/user-block.jsx';
import HomeLink from '../home-link/home-link.jsx';
import {AppDynamicRoute} from '../../routes.js';

const AddReview = ({movie, onCommentPost}) => {
  const {id, name, poster, posterBig} = movie;
  const {register, handleSubmit, formState} = useForm({
    mode: `onChange`,
  });

  const _handleCommentPost = (data) => {
    onCommentPost(id, data);
  };

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={posterBig} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <HomeLink/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link"
                  to={AppDynamicRoute.film(id)}
                >
                  The Grand Budapest Hotel
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock/>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={poster} alt={name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={handleSubmit(_handleCommentPost)}>
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" ref={register({required: true})}/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" ref={register({required: true})}/>
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked ref={register({required: true})}/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" ref={register({required: true})}/>
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" ref={register({required: true})}/>
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea"
              ref={register({
                required: true,
                minLength: 50,
                maxLength: 400,
              })}
              name="comment"
              id="review-text"
              placeholder="Review text"
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={!formState.isValid || formState.isSubmitting}>Post</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};


AddReview.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
    posterBig: PropTypes.string,
  }),
  onCommentPost: PropTypes.func.isRequired
};

export default AddReview;
