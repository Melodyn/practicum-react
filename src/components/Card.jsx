import { useState } from 'react';
import cn from 'classnames';

const Card = ({
  card,
  onClick,
}) => {
  const {
    name, link, likes,
  } = card;
  const [liked, setLiked] = useState(false);

  const className = cn('button', 'card__like', { card__like_liked: liked });

  return (
    <li className="card-item">
      <article className="card" aria-label={name}>
        <img
          src={link}
          alt={name}
          className="card__image"
          aria-hidden="true"
          onClick={() => onClick(card)}
        />
        <div className="card__info">
          <a
            href={link}
            className="card__link"
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </a>
          <div className="card__like-container">
            <button
              type="button"
              className={className}
              aria-label="Оценить"
              onClick={() => setLiked(!liked)}
            />
            <span className="card__like-count">{likes.length + Number(liked)}</span>
          </div>
        </div>
        <button
          type="button"
          className="button card__remove"
          aria-label="Удалить"
        />
      </article>
    </li>
  );
};

export { Card };
