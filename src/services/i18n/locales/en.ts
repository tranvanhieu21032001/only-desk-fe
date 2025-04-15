import validate from "../validate/en.json";
import messages from "../messages/en.json";

import auth from "@/containers/auth/Locale/en.json";

interface LanguageObject {
  [key: string]: object;
}

const mergeWithValidateExceptMessages = (
  validateObj: LanguageObject,
  langObjs: LanguageObject
) => {
  const mergedObj: { [key: string]: object } = {};
  for (const key in langObjs) {
    if (langObjs[key] !== messages) {
      mergedObj[key] = { ...langObjs[key], ...validateObj };
    } else {
      mergedObj[key] = langObjs[key];
    }
  }
  return mergedObj;
};

const translationEN = mergeWithValidateExceptMessages(validate, {
  auth,
});

export default translationEN;
