const modalContentContainer = document.getElementById("body-modal-content");
const dimmer = document.getElementById("body-modal-dimmer");
const modal = document.getElementById("body-modal");
const dismissBtn = document.getElementById("body-modal-dismiss");

const dismissModalListener = () => {
  if (!(modal && dimmer && dismissBtn)) {
    return;
  }

  modal.classList.remove("animating", "visible", "active");
  dimmer.classList.remove("animating", "visible", "active");
  document.body.classList.remove("dimmed", "dimmable");

  dismissBtn.removeEventListener("click", dismissModalListener, false);
  dimmer.removeEventListener("click", dismissModalListener, false);
};

export interface ModalConfig {
  content: string;
}

export const showModal = (config: ModalConfig) => {
  if (!(modalContentContainer && modal && dimmer && dismissBtn)) {
    return;
  }

  modalContentContainer.innerHTML = config.content;
  document.body.classList.add("dimmed", "dimmable");
  dimmer.classList.add("animating", "visible", "active");
  modal.classList.add("animating", "visible", "active");

  dismissBtn.addEventListener("click", dismissModalListener, false);
  dimmer.addEventListener("click", dismissModalListener, false);
};
