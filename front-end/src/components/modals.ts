const modalContentContainer = document.getElementById("body-modal-content");
const dimmer = document.getElementById("body-modal-dimmer");
const modal = document.getElementById("body-modal");
const dismissBtn = document.getElementById("body-modal-dismiss");

export const dismissModal = () => dismissBtn && dismissBtn.click();

export const destroyModal = (onDismiss: void | (() => void)) =>
  function modalDimissal(evt: MouseEvent) {
    if (!(modal && dimmer && dismissBtn)) {
      return;
    }

    evt.stopPropagation();

    const evtSrc = evt.srcElement;

    if (evtSrc && !evtSrc.classList.contains("body-modal-dismisser")) {
      return;
    }

    modal.classList.remove("animating", "visible", "active");
    dimmer.classList.remove("animating", "visible", "active");
    document.body.classList.remove("dimmed", "dimmable");

    dismissBtn.removeEventListener("click", modalDimissal);
    dimmer.removeEventListener("click", modalDimissal);

    if (onDismiss) {
      onDismiss();
    }
  };
export interface ModalConfig {
  content: string;
  onShow?: () => void;
}

export const showModal = (config: ModalConfig) => {
  if (!(modalContentContainer && modal && dimmer && dismissBtn)) {
    return;
  }

  modalContentContainer.innerHTML = config.content;
  document.body.classList.add("dimmed", "dimmable");
  dimmer.classList.add("animating", "visible", "active");
  modal.classList.add("animating", "visible", "active");

  let onDismiss;

  if (config.onShow) {
    onDismiss = config.onShow();
  }

  dismissBtn.addEventListener("click", destroyModal(onDismiss), { once: true });
  dimmer.addEventListener("click", destroyModal(onDismiss), { once: true });
};
