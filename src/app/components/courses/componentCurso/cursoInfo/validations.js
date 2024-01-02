export const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

export const isPhoneValid = (phone) => {
    const re = /^\+?([0-9]{2,4})?\s?([0-9]{6,10})$/;
    return re.test(String(phone));
};

export const isTextValid = (text) => {
    return text.length > 0;
};