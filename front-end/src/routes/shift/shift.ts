import { ajax } from "rxjs/ajax";
import { showModal } from "../../components/modals";
import { processNewMetaForm } from "../../components/new-meta-form/new-meta-form";

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

const attachTagsToDOM = (data: JsonResponseNewMetaForm) => {
  const css = makeTag(data.css);
  document.head.appendChild(css);

  const js = makeTag(data.js);
  document.body.appendChild(js);
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
    attachTagsToDOM(response);
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

      if (!window.appInterface.newMetaFormData) {
        return;
      }

      showModal({ content: window.appInterface.newMetaFormData.html });

      setTimeout(processNewMetaForm);
    },
    false
  );
}
