/* eslint-disable no-unused-vars */
import '../vendor/normalize.css';
import '../index.css';
import { useEffect, useState } from 'react';
import { Api } from '../utils/Api';
import { apiConfig, dataJSON } from '../utils/constants';
// components
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { PopupWithImage } from './Popup/PopupWithImage';
import { PopupEditProfile } from './Popup/PopupEditProfile';
// contexts
import { defaultCurrentUser, CurrentUserContext } from '../contexts/CurrentUserContext';

const reverse = (array) => array.slice().reverse();

const App = () => {
  const api = new Api(apiConfig);
  const initCards = reverse(dataJSON.cards);
  const [cards, setCards] = useState(initCards);
  const [selectedCard, setSelectedCard] = useState({});
  const [openPopupName, setOpenPopupName] = useState('');
  const [currentUser, setCurrentUser] = useState(defaultCurrentUser);

  // перед использованием api, необходимо установить данные в apiConfig
  // useEffect(() => {
  //   Promise
  //     .all([
  //       api.getCards(),
  //       api.getProfile(),
  //     ])
  //     .then(([serverCards, serverProfile]) => {
  //       setCards(reverse(serverCards));
  //       setCurrentUser(serverProfile);
  //     })
  //     .catch(console.error);
  // }, []);

  const onClosePopup = () => {
    setOpenPopupName('');
  };

  const onOpenPopupEditProfile = () => {
    setOpenPopupName('profile');
  };

  const onCardClick = (card) => {
    setSelectedCard(card);
    setOpenPopupName('preview');
  };

  const onEditProfile = (updatedInfo) => {
    // api
    //   .setInfo(updatedInfo)
    //   .then((updatedUser) => {
    //     onClosePopup();
    //     setCurrentUser(updatedUser);
    //   })
    //   .catch(console.error);

    // код для демонстрации на вебинаре
    onClosePopup();
    setCurrentUser({
      ...currentUser,
      ...updatedInfo,
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onCardClick={onCardClick}
        onEditProfile={onOpenPopupEditProfile}
      />
      <Footer />

      <PopupWithImage
        card={selectedCard}
        isOpen={openPopupName === 'preview'}
        onClose={() => {
          onClosePopup();
          setSelectedCard({});
        }}
      />

      <PopupEditProfile
        isOpen={openPopupName === 'profile'}
        onSave={onEditProfile}
        onClose={onClosePopup}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
