import { useState, useContext } from 'react';
import cn from 'classnames';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({
  card: sourceCard,
  onClick,
}) => {
  const {
    name, link, likes, owner,
  } = sourceCard;
  const currentUser = useContext(CurrentUserContext);
  const card = {
    ...sourceCard,
    isOwner: (currentUser._id === owner._id),
    liked: likes.some((liker) => liker._id === currentUser._id),
  };
  // так не надо делать, это пример для вебинара
  const [liked, setLiked] = useState(card.liked);

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
            {
              /* Фрагмент " + Number(liked)" добавлен для примера, в проекте его быть не должно */
              <span className="card__like-count">{likes.length + Number(liked)}</span>
            }
          </div>
        </div>
        {card.isOwner && (
          <button
            type="button"
            className="button card__remove"
            aria-label="Удалить"
          />
        )}
      </article>
    </li>
  );
};

export { Card };
