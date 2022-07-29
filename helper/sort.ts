export const sortByStringNumber = (a: string, b: string): number => {
  const aNumber = Number(a.split(" ")[0].replace(/[^0-9\.]+/g, ""));
  const bNumber = Number(b.split(" ")[0].replace(/[^0-9\.]+/g, ""));

  return aNumber - bNumber;
};

export const sortByVideoName = (a: string, b: string): number => {
  const aNumber = Number(
    a
      .split(" ")[0]
      .split(".")[1]
      .replace(/[^0-9\.]+/g, "")
  );
  const bNumber = Number(
    b
      .split(" ")[0]
      .split(".")[1]
      .replace(/[^0-9\.]+/g, "")
  );

  return aNumber - bNumber;
};
