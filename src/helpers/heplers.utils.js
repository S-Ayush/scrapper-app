export const validateUrl = (url) => {
  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
  if (regex.test(url)) {
    return true;
  }
  return false;
};

// convert array buffer to string
export const arrayBufferToString = (buffer) => {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
};
