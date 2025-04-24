export const phoneRegex = /^\d{10}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,50}$/;
export const emailAddressRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;