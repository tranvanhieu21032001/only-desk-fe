import { chatWithCustomersInterface } from "@/model/auth";

import icTelegram from "@/assets/icons/common/ic-telegram.svg";
import icWhatsapp from "@/assets/icons/common/ic-whats-app.svg";
import icMessenger from "@/assets/icons/common/ic-message.svg";
import icSms from "@/assets/icons/common/ic-sms.svg";

const companySizes = [
  {
    key: "2",
    value: "2",
    label: "2-9",
  },
  {
    key: "10",
    value: "10",
    label: "10-49",
  },
  {
    key: "50",
    value: "50",
    label: "50-99",
  },
  {
    key: "100",
    value: "499",
    label: "100-499",
  },
  {
    key: "500",
    value: "999",
    label: "500-999",
  },
  {
    key: "1000",
    value: "1000",
    label: "1000+",
  },
  {
    key: "just-me",
    value: "justMe",
    label: "Just me",
  },
];

const chatWithCustomers: chatWithCustomersInterface[] = [
  { key: "telegram", value: "telegram", label: "telegram", icon: icTelegram },
  { key: "whatsapp", value: "whatsapp", label: "whatsapp", icon: icWhatsapp },
  {
    key: "messenger",
    value: "messenger",
    label: "messenger",
    icon: icMessenger,
  },
  {
    key: "sms",
    value: "sms",
    label: "sms",
    icon: icSms,
  },
];

export { companySizes, chatWithCustomers };
