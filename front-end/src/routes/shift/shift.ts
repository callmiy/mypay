import { ajax } from "rxjs/ajax";
import { insertModalContent } from "../../components/modals";
import { showModal } from "../../components/modals";

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
  const css = makeTag(data.css);
  document.head.appendChild(css);
  insertModalContent(data.html);
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
      if (!window.appInterface.newMetaFormData) {
        await getNewMetaForm();
      }

      showModal();
    },
    false
  );
}
