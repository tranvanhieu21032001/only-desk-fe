import { chatWithCustomersInterface } from "@/model/auth";

import icTag from "@/assets/icons/auth/ic-tag.svg";
import icWoo from "@/assets/icons/auth/ic-woo.svg";
import icBig from "@/assets/icons/auth/ic-big.svg";
import icSms from "@/assets/icons/common/ic-sms.svg";
import icEcwid from "@/assets/icons/auth/ic-ecwid.svg";
import icAdobe from "@/assets/icons/auth/ic-adobe.svg";
import icShopify from "@/assets/icons/auth/ic-shopify.svg";
import icSquareOnline from "@/assets/icons/auth/ic-sqare.svg";
import icTelegram from "@/assets/icons/common/ic-telegram.svg";
import icWhatsapp from "@/assets/icons/common/ic-whats-app.svg";
import icMessenger from "@/assets/icons/common/ic-message.svg";
import icWordPress from "@/assets/icons/auth/ic-wordpress.svg";
import icSquareSpaces from "@/assets/icons/auth/ic-square-spaces.svg";

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

const connectPlugins = [
  {
    key: "wordpress",
    value: "wordpress",
    label: "Connect with WordPress",
    icon: icWordPress,
  },
  {
    key: "tag-manager",
    value: "tag-manager",
    label: "Tag Manager (Google Tag Manager)",
    icon: icTag,
  },
  {
    key: "shopify",
    value: "shopify",
    label: "Connect with Shopify",
    icon: icShopify,
  },
  {
    key: "woocommerce",
    value: "woocommerce",
    label: "Connect with WooCommerce",
    icon: icWoo,
  },
  {
    key: "ecwid",
    value: "ecwid",
    label: "Connect with Ecwid",
    icon: icEcwid,
  },
  {
    key: "adobe-commerce",
    value: "adobe-commerce",
    label: "Connect with Adobe Commerce",
    icon: icAdobe,
  },
  {
    key: "squarespace",
    value: "squarespace",
    label: "Connect with Squarespace",
    icon: icSquareSpaces,
  },
  {
    key: "square-online-store",
    value: "square-online-store",
    label: "Connect with Square Online Store",
    icon: icSquareOnline,
  },
  {
    key: "bigcommerce",
    value: "bigcommerce",
    label: "Connect with BigCommerce",
    icon: icBig,
  },
];

export { companySizes, chatWithCustomers, connectPlugins };
