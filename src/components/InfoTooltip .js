import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm ";

export default function InfoTooltip() {
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      button="Создать"
      title="Новое место"
      name="add"
    >
      <div className="popup popup_opened">
        <div className="popup-container">
          <form className="popup-form form-profile-edit">
            <div className="popup-form__success">
              <img className="popup-form__success_img" src={iconSuccess} />
              <p className="popup-form__success_text">
                Вы успешно зарегистрировались!
              </p>
            </div>
          </form>
          <button className="popup-container-close " type="button"></button>
        </div>
      </div>
    </PopupWithForm>
  );
}
