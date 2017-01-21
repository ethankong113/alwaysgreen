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
  let numberString = num.toString().split(".");
  let output = numberString[0], decimal = numberString[1], count = 0;
  output = output.split("");
  for (let idx = output.length - 1; idx >= 0; idx--) {
    if (count === 3) {
      output[idx] = output[idx] + ",";
      count = 0;
    }
    count++;
  }
  output = output.join("");
  if (decimal) {
    output = output + "." + decimal;
  }
  return output;
};
