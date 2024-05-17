export const getIdxFromUrl = (url: string): string => {
  const splittedUrl = url.split("/");
  return splittedUrl[splittedUrl.length - 2] ?? "";
};
