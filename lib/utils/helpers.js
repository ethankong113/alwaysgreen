export const createDate = (date) => {
  return new Date(Date.parse(date));
};

export const getValues = (data) => {
  return data.map((datum)=>datum.value);
};

export const getQuarter = (date) => {
  let str = date.split("-");
  let year = str[0];
  let month = parseInt(str[1]);
  let q = Math.ceil(month/3);
  return `${year.slice(2)}Q${q}`;
};

export const formatNumber = (num) => {
  if (num < 10) return num;
  let str = num.toString();
  str = str.split("").reverse();
  let newStr = [];
  str.forEach((chr, i) => {
    if (i !== 0 && i % 3 === 0) {
      newStr.push(",");
    }
    newStr.push(chr);
  });
  return newStr.reverse().join("");
};
