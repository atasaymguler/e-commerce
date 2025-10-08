export const getPage = (): number => {
  let page = localStorage.getItem("currentPage") || "1";
  page = JSON.parse(page);
  return Number(page);
};
