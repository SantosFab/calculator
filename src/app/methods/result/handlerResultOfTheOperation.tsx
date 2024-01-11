import { TypeOfOperator } from "@/utils/interface/interfaceTypeOfOperator";
import { Dispatch, SetStateAction } from "react";

interface HandlerResultOfTheOperationProps {
  setCurrentHistory: Dispatch<SetStateAction<string | undefined>>;
  setCurrentView: Dispatch<SetStateAction<string>>;
  setFirstTerm: Dispatch<SetStateAction<number | undefined>>;
  setSymbol: Dispatch<SetStateAction<TypeOfOperator | undefined>>;
  setResultOperation: Dispatch<SetStateAction<number | undefined>>;
  currentHistory: string | undefined;
  currentView: string;
  firstTerm: number | undefined;
  symbol: TypeOfOperator | undefined;
  resultOperation: number | undefined;
  operation?: TypeOfOperator;
  isEqualButton?: boolean;
}

export function handlerResultOfTheOperation({
  setCurrentHistory,
  setCurrentView,
  setFirstTerm,
  setSymbol,
  setResultOperation,
  currentHistory,
  currentView,
  firstTerm,
  symbol,
  resultOperation,
  operation,
  isEqualButton = false,
}: HandlerResultOfTheOperationProps): void {
  let result: number;
  let parseCurrentView: number = parseFloat(currentView);

  if (!isNaN(parseFloat(currentView))) {
    parseCurrentView = parseFloat(currentView);
  } else {
    throw new Error("Invalid number");
  }
  if (
    isEqualButton &&
    resultOperation === undefined &&
    firstTerm !== undefined &&
    symbol !== undefined &&
    !handlerSplitStringByOperators(currentHistory)
  ) {
    result = handlerMathematicalOperationa(
      firstTerm,
      symbol,
      currentView === "0" ? firstTerm : parseCurrentView
    );
    setCurrentHistory(
      `${firstTerm} ${symbol.operator} ${
        currentView === "0" ? firstTerm : parseCurrentView
      } = ${result}`
    );
    setResultOperation(result);
    setCurrentView("0");
  } else if (
    operation !== undefined &&
    currentView !== "0" &&
    firstTerm !== undefined &&
    symbol !== undefined
  ) {
    result = handlerMathematicalOperationa(
      resultOperation === undefined ? firstTerm : resultOperation,
      symbol,
      parseCurrentView
    );
    setResultOperation(result);
    setSymbol(operation);
    setCurrentHistory(result + operation.operator);
    setCurrentView("0");
  } else if (
    isEqualButton &&
    currentView === "0" &&
    resultOperation !== undefined &&
    symbol !== undefined &&
    firstTerm !== undefined &&
    handlerSplitStringByOperators(currentHistory)
  ) {
    result = handlerMathematicalOperationa(resultOperation, symbol, firstTerm);
    setCurrentHistory(
      `${resultOperation} ${symbol.operator} ${firstTerm} = ${result}`
    );
    setResultOperation(result);
  } else if (
    isEqualButton &&
    currentView !== "0" &&
    resultOperation !== undefined &&
    symbol !== undefined
  ) {
    result = handlerMathematicalOperationa(
      resultOperation,
      symbol,
      parseCurrentView
    );
    setCurrentHistory(
      `${resultOperation} ${symbol.operator} ${parseCurrentView} = ${result}`
    );
    setFirstTerm(parseCurrentView);
    setCurrentView("0");
    setResultOperation(result);
  }
}

function handlerMathematicalOperationa(
  numberOne: number,
  { operator }: TypeOfOperator,
  numberTwo: number
): number {
  switch (operator) {
    case "/":
      return parseFloat((numberOne / numberTwo).toFixed(2));
    case "*":
      return parseFloat((numberOne * numberTwo).toFixed(2));
    case "-":
      return parseFloat((numberOne - numberTwo).toFixed(2));
    case "+":
      return parseFloat((numberOne + numberTwo).toFixed(2));
    default:
      throw new Error("Invalid operator");
  }
}

function handlerSplitStringByOperators(
  currentHistory: string | undefined
): boolean {
  if (!currentHistory) {
    return false;
  }
  const result = currentHistory
    .split(/\/|\*|\-|\+|=/g)
    .map((item) => parseFloat(item))
    .filter((num) => !isNaN(num));
  return result.length > 2;
}
