import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm ";

export default function InfoTooltip({ isOpen, onClose }) {
  const iconSuccess = ""
  function handleSubmit () {};
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      button="Создать"
      title="Новое место"
      name="add"
    >
        <div className="popup-container">
            <div className="popup-form__success">
              <img className="popup-form__success_img" src={iconSuccess} />
              <p className="popup-form__success_text">
                Вы успешно зарегистрировались!
              </p>
            </div>
          <button className="popup-container-close " type="button" onClick={() => onClose()}></button>
        </div>
    </PopupWithForm>
  );
}
