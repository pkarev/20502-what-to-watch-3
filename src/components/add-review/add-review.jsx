import React from 'react';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';

const AddReview = ({onAddReview}) => {
  const {register, handleSubmit, formState} = useForm({
    mode: `onChange`,
  });

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit(onAddReview)}>
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
            name="review-text"
            id="review-text"
            placeholder="Review text"
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!formState.isValid}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}


AddReview.propTypes = {
  id: PropTypes.number.isRequired,
  onAddReview: PropTypes.func.isRequired,
};

export default AddReview;