import { TypeOfOperator } from "@/utils/interface/interfaceTypeOfOperator";
import { Dispatch, SetStateAction } from "react";

interface HandlerOperatorProps {
  setCurrentHistory: Dispatch<SetStateAction<string | undefined>>;
  setCurrentView: Dispatch<SetStateAction<string>>;
  setFirstTerm: Dispatch<SetStateAction<number | undefined>>;
  setSymbol: Dispatch<SetStateAction<TypeOfOperator | undefined>>;
  setResultOperation: Dispatch<SetStateAction<number | undefined>>;
  currentHistory: string | undefined;
  currentView: string;
  firstTerm: number | undefined;
  symbol: TypeOfOperator | undefined;
  operation: TypeOfOperator;
  resultOperation: number | undefined;
  handlerResultOfTheOperation: Function;
}

export function handlerOperator({
  setCurrentHistory,
  setCurrentView,
  setFirstTerm,
  setSymbol,
  setResultOperation,
  currentHistory,
  currentView,
  firstTerm,
  symbol,
  operation,
  resultOperation,
  handlerResultOfTheOperation,
}: HandlerOperatorProps): void {
  if (
    currentHistory === undefined &&
    symbol === undefined &&
    firstTerm === undefined &&
    resultOperation === undefined
  ) {
    setSymbol(operation);
    setFirstTerm(parseFloat(currentView));
    setCurrentHistory(currentView + operation.operator);
    setCurrentView("0");
  } else if (
    currentView !== "0" &&
    currentHistory !== undefined &&
    symbol !== undefined &&
    firstTerm !== undefined &&
    !handlerSplitStringByOperators(currentHistory)
  ) {
    handlerResultOfTheOperation({
      operation,
      currentView,
      firstTerm,
      symbol,
      resultOperation,
      setResultOperation,
      setSymbol,
      setCurrentHistory,
      setCurrentView,
    });
    setSymbol(operation);
  } else {
    setSymbol(operation);
    resultOperation === undefined
      ? setCurrentHistory(firstTerm + operation.operator)
      : setCurrentHistory(
          parseFloat(resultOperation.toFixed(2)) + operation.operator
        );
  }
}

function handlerSplitStringByOperators(currentHistory: string): boolean {
  if (!currentHistory) {
    return false;
  }
  const result = currentHistory
    .split(/\/|\*|\-|\+|=/g)
    .map((item) => parseFloat(item))
    .filter((num) => !isNaN(num));
  return result.length > 2;
}
