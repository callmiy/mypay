import * as modalTemplate from "../templates/modalTemplate.handlebars";

export interface ModalConfig {
  content: string;
  onShow?: () => void;
  onDismiss?: () => void;
}

export class Modal {
  dom: HTMLDivElement | undefined;

  constructor(private config: ModalConfig) {}

  show = () => {
    const html = modalTemplate({ modalContent: this.config.content });

    this.dom = new DOMParser().parseFromString(html, "text/html").body
      .firstChild as HTMLDivElement;

    document.body.appendChild(this.dom);
    document.body.classList.add("dimmed", "dimmable");
    this.setUpDom();

    if (this.config.onShow) {
      this.config.onShow();
    }
  };

  setUpDom = () => {
    if (!this.dom) {
      return;
    }

    this.dom.addEventListener("click", this.clickHandler);

    Array.from(this.dom.querySelectorAll(".body-modal-dismisser")).forEach(el =>
      el.addEventListener("click", this.clickHandler)
    );
  };

  destroy = () => {
    document.body.classList.remove("dimmed", "dimmable");

    if (this.config.onDismiss) {
      this.config.onDismiss();
    }

    if (this.dom) {
      document.body.removeChild(this.dom);
      this.dom = undefined;
    }
  };

  private clickHandler = (evt: MouseEvent) => {
    evt.stopPropagation();

    const evtSrc = evt.srcElement;

    if (evtSrc && !evtSrc.classList.contains("body-modal-dismisser")) {
      return;
    }

    this.destroy();
  };
}

export default Modal;
