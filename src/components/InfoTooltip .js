import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm ";

export default function InfoTooltip () {



  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      button="Создать"
      title="Новое место"
      name="add"
    >
      
    </PopupWithForm>
  );
}
