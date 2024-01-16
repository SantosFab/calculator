export interface TypeOfNumbers {
  number: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";
}

interface Numbers {
  one: TypeOfNumbers;
  two: TypeOfNumbers;
  three: TypeOfNumbers;
  four: TypeOfNumbers;
  five: TypeOfNumbers;
  six: TypeOfNumbers;
  seven: TypeOfNumbers;
  eight: TypeOfNumbers;
  nine: TypeOfNumbers;
  zero: TypeOfNumbers;
}

export const numbers: Numbers = {
  one: { number: "1" },
  two: { number: "2" },
  three: { number: "3" },
  four: { number: "4" },
  five: { number: "5" },
  six: { number: "6" },
  seven: { number: "7" },
  eight: { number: "8" },
  nine: { number: "9" },
  zero: { number: "0" },
};
