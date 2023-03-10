import React, { useContext } from 'react';
import { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from "../utils/Api";

const HomePage = () => {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  const { currentProfile, setCurrentProfile } = useContext(CurrentUserContext)

  useEffect(() => {
    // LOAD USER INFO
    api
      .getUserInfo()
      .then((res) => {
        setCurrentProfile(res);
        console.log(
          `%c[App] User fetched inside useEffect: ${JSON.stringify(res)}`,
          "color: cyan;"
        );
      })
      .catch((err) => {
        console.log(
          `%c[App] error while fetching user in useEffect: ${JSON.stringify(
            err
          )}`,
          "color: red;"
        );
      });

    // LOAD CARDS
    api
      .getInitialCards()
      .then((cardsResponse) => {
        const collectedCards = cardsResponse.map((card) => {
          return card;
        });
        setCards(collectedCards);
        console.log(
          `%c[Main] loading user cards, first one is: ${JSON.stringify(
            collectedCards[0]
          )}`,
          "color: cyan;"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentProfile._id);
    console.log(
      `%c[App] handleCardLike: card id: ${card._id} isLiked: ${isLiked}`,
      "color: violet"
    );
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentProfile._id;
    // Отправляем запрос в API и получаем обновлённые данные карточки
    isOwn &&
      api
        .deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((v) => v._id !== card._id));
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserInfo(name, about)
      .then((updatedUser) => {
        console.log(
          `%c[App] handleUpdateUser: User updated!🚀. \n Fresh user: ${JSON.stringify(
            updatedUser
          )}`,
          "color: cyan;"
        );
        setCurrentProfile(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then((updatedUser) => {
        console.log(
          `%c[App] handleUpdateAvatar: User updated!🚀. \n Fresh user: ${JSON.stringify(
            updatedUser
          )}`,
          "color: cyan;"
        );
        setCurrentProfile(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace({ name, link }) {
    api
      .addCard(name, link)
      .then((createdPlace) => {
        console.log(
          `%c[App] Place was created!📍. \n Created place: ${JSON.stringify(
            createdPlace
          )}`,
          "color: cyan;"
        );
        setCards([createdPlace, ...cards]);
        // setCards([...cards, createdPlace])
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleConfirmationClick() {
    setConfirmationPopupOpen(true);
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
  };


    return (
      <div>
        {currentProfile && (
          <Main
            onCardClick={setSelectedCard}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onConfirm={handleConfirmationClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
        )}

        {selectedCard && (
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        )}

        {isEditProfilePopupOpen && (
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {isEditAvatarPopupOpen && (
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}

        {isAddPlacePopupOpen && (
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
        )}
    </div>
  )}

export default HomePage;
