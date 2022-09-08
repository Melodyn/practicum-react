import { createContext } from 'react';
import avatarImg from '../images/avatar.gif';

export const defaultCurrentUser = {
  name: 'Меместо',
  about: 'Место ваших мемов',
  avatar: avatarImg,
  _id: 'dd8b6dea22fe4ea0ad5d46f4',
  cohort: '',
};
export const CurrentUserContext = createContext(defaultCurrentUser);
