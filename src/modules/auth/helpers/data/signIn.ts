import { OptionsInterface } from "@/core/model/common";

import IconFlagAmerica from "@/assets/icons/common/ic-flag-america.svg";

const langOptions: OptionsInterface[] = [
  {
    key: "en",
    value: "en",
    label: "english",
    flag: IconFlagAmerica, // Chỉ ngôn ngữ này có cờ
  },
  {
    key: "vi",
    value: "vi",
    label: "vietnamese",
  },
  {
    key: "es",
    value: "es",
    label: "spanish",
  },
  {
    key: "fr",
    value: "fr",
    label: "french",
  },
  {
    key: "de",
    value: "de",
    label: "german",
  },
  {
    key: "zh",
    value: "zh",
    label: "chinese",
  },
  {
    key: "ja",
    value: "ja",
    label: "japanese",
  },
  {
    key: "ko",
    value: "ko",
    label: "korean",
  },
  {
    key: "pt",
    value: "pt",
    label: "portuguese",
  },
  {
    key: "it",
    value: "it",
    label: "italian",
  },
];

export { langOptions };
