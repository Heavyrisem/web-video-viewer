const stringToNumber = (str: string): number =>
  Number(str.replace(/[^0-9\.]+/g, ""));

export const sortByStringNumber = (a: string, b: string): number => {
  const aNumber = stringToNumber(a.split(" ")[0]);
  const bNumber = stringToNumber(b.split(" ")[0]);

  return aNumber - bNumber;
};

export const sortByVideoName = (a: string, b: string): number => {
  const aNumber = stringToNumber(a.split(" ")[0].split(".")[1]);
  const bNumber = stringToNumber(b.split(" ")[0].split(".")[1]);

  return aNumber - bNumber;
};
