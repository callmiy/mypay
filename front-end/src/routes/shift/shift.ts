import { ajax } from "rxjs/ajax";

interface JsonResponseTag {
  name: string;
  attrs: { [key: string]: string };
}

export interface JsonResponseNewMetaForm {
  html: string;
  css: JsonResponseTag;
  js: JsonResponseTag;
}

const makeTag = ({ name, attrs }: JsonResponseTag) => {
  const tagEl = document.createElement(name);

  for (const [attr, value] of Object.entries(attrs)) {
    tagEl.setAttribute(attr, value);
  }

  return tagEl;
};

const attachNewFormToDOM = (data: JsonResponseNewMetaForm) => {
  const bodyModalInsertEl = window.appInterface.bodyModalInsertEl;

  if (!bodyModalInsertEl) {
    return;
  }

  const css = makeTag(data.css);
  document.head.appendChild(css);
  bodyModalInsertEl.innerHTML = data.html;
};

const getNewMetaForm = async () => {
  const newMetaFormUrl = window.appInterface.newMetaFormUrl;

  if (!newMetaFormUrl) {
    return;
  }

  ajax({
    url: newMetaFormUrl,
    responseType: "json"
  }).subscribe(json => {
    const response = json.response as JsonResponseNewMetaForm;
    window.appInterface.newMetaFormData = response;
    attachNewFormToDOM(response);
  });
};
getNewMetaForm();

const fetchNewMetaBtn = document.getElementById("get-new-meta-form-button");

if (fetchNewMetaBtn) {
  fetchNewMetaBtn.addEventListener(
    "click",
    async () => {
      const bodyModalInsertEl = window.appInterface.bodyModalInsertEl;

      if (!bodyModalInsertEl) {
        return;
      }

      const modalParent = bodyModalInsertEl.parentElement;

      if (!modalParent) {
        return;
      }

      if (!window.appInterface.newMetaFormData) {
        await getNewMetaForm();
      }

      document.body.classList.add("dimmed", "dimmable");
      modalParent.classList.add("animating", "visible", "active");
      bodyModalInsertEl.classList.add("animating", "visible", "active");
    },
    false
  );
}
