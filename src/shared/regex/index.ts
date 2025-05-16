export const phoneRegex = /^\d{10}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,50}$/;
export const emailAddressRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const websiteRegex =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
