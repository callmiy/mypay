const modalContentContainer = document.getElementById("body-modal-content");

export const insertModalContent = (html: string) => {
  if (!modalContentContainer) {
    return false;
  }

  modalContentContainer.innerHTML = html;
  modalContentContainer.classList.add("has-child");
  return true;
};

export const showModal = () => {
  if (
    !modalContentContainer ||
    !modalContentContainer.classList.contains("has-child")
  ) {
    return;
  }

  const dimmer = document.getElementById("body-modal-dimmer");
  const modal = document.getElementById("body-modal");

  if (!(modal && dimmer)) {
    return;
  }

  document.body.classList.add("dimmed", "dimmable");
  dimmer.classList.add("animating", "visible", "active");
  modal.classList.add("animating", "visible", "active");
};
