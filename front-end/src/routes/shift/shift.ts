import { showModal } from "../../components/modals";
import { processNewMetaForm } from "../../components/new-meta-form/new-meta-form";
import { getSocket } from "../../app";

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
  const socket = getSocket();

  const channel = socket.channel("meta:meta", {});
  channel.on("new-form", msg => {
    // tslint:disable-next-line:no-console
    console.log("Got message", msg);
  });

  channel
    .join()
    .receive("ok", messages => {
      // tslint:disable-next-line:no-console
      console.log("Joining topic: meta:meta", messages);
    })
    .receive("error", ({ reason }) => {
      // tslint:disable-next-line:no-console
      console.log("failed join", reason);
    })
    .receive("timeout", () => {
      // tslint:disable-next-line:no-console
      console.log("Networking issue. Still waiting...");
    });

  channel
    .push("new-form", {})
    .receive("ok", msg => {
      const response = msg as JsonResponseNewMetaForm;
      window.appInterface.newMetaFormData = response;
      attachTagsToDOM(response);
    })
    .receive("error", reasons => {
      // tslint:disable-next-line:no-console
      console.log("Could not receive new form", reasons);
    })
    .receive("timeout", () => {
      // tslint:disable-next-line:no-console
      console.log("Networking issue...");
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
