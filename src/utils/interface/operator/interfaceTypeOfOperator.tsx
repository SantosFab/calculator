export interface TypeOfOperator {
  operator: "/" | "*" | "-" | "+";
}

interface Operators {
  add: TypeOfOperator;
  subtract: TypeOfOperator;
  multiply: TypeOfOperator;
  divide: TypeOfOperator;
}

export const operators: Operators = {
  add: { operator: "+" },
  subtract: { operator: "-" },
  multiply: { operator: "*" },
  divide: { operator: "/" },
};
