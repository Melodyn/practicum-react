/* eslint-disable no-unused-vars */
import '../vendor/normalize.css';
import '../pages/index.css';
import { useEffect, useState } from 'react';
import { Api } from '../utils/Api';
import { apiConfig, dataJSON } from '../utils/constants';
// components
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { PopupWithImage } from './PopupWithImage';

const reverse = (array) => array.slice().reverse();

const App = () => {
  const api = new Api(apiConfig);
  const initCards = reverse(dataJSON.cards);
  const [cards, setCards] = useState(initCards);
  const [selectedCard, setSelectedCard] = useState({});
  const [openPopupName, setOpenPopupName] = useState('');
  const currentUser = dataJSON.profile;

  const onClosePopup = () => {
    setOpenPopupName('');
  };

  // перед использованием api, необходимо установить данные в apiConfig
  // useEffect(() => {
  //   api.getCards()
  //     .then((serverCards) => {
  //       setCards(reverse(serverCards));
  //     })
  //     .catch(console.error);
  // }, []);

  const onCardClick = (card) => {
    setSelectedCard(card);
    setOpenPopupName('preview');
  };

  return (
    <>
      <Header />
      <Main
        cards={cards}
        onCardClick={onCardClick}
        currentUser={currentUser}
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
    </>
  );
};

export default App;
