import { showModal } from "../../components/modals";
import { dismissModal } from "../../components/modals";
import { processNewMetaForm } from "../../components/new-meta-form/new-meta-form";
import { sendMsg } from "../../utils/meta-utils";
import { CreateMeta } from "../../graphql/gen.types";
import { CreateMeta_meta } from "../../graphql/gen.types";

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
  sendMsg({
    topic: "new-form",
    ok: msg => {
      const response = msg as JsonResponseNewMetaForm;
      window.appInterface.newMetaFormData = response;
      attachTagsToDOM(response);
    }
  });
};
getNewMetaForm();

const makeMetaSelectOption = (meta: CreateMeta_meta) => {
  const opt = document.createElement("option") as HTMLOptionElement;
  opt.value = meta.id;
  opt.selected = true;
  const breaks = (+meta.breakTimeSecs / 60).toFixed(1);
  opt.textContent = ` ${breaks} min | € ${meta.payPerHr} night: ${
    meta.nightSupplPayPct
  } % sunday: ${meta.sundaySupplPayPct} % `;

  return opt;
};

const fetchNewMetaBtn = document.getElementById("get-new-meta-form-button");
const metaSelect = document.getElementById("select-meta") as HTMLSelectElement;

if (fetchNewMetaBtn && metaSelect) {
  fetchNewMetaBtn.addEventListener(
    "click",
    async () => {
      if (!window.appInterface.newMetaFormData) {
        await getNewMetaForm();
      }

      if (!window.appInterface.newMetaFormData) {
        return;
      }

      showModal({
        content: window.appInterface.newMetaFormData.html,

        onShow: () => {
          const newMetaFormCleanUp = processNewMetaForm((data: CreateMeta) => {
            const meta = data.meta as CreateMeta_meta;
            // tslint:disable-next-line:no-console
            // console.log("dismissModal", dismissModal);

            const opt = makeMetaSelectOption(meta);
            metaSelect.selectedIndex = -1;
            metaSelect.appendChild(opt);

            dismissModal();
          });

          return newMetaFormCleanUp;
        }
      });
    },
    false
  );
}
