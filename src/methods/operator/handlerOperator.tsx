import { TypeOfOperator } from "@/utils/interface/operator/interfaceTypeOfOperator";
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
    /* O operador é apertado pela primeira vez */
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
    /* O calculo é efetuado sem o do '=', exemplo:3+3+2+1, o cliente obtém o 9 no visor */
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
  } else {
    /* O operador é apertada, porém a operação matemática era outra, ou seja, troca de operador */
    setSymbol(operation);
    resultOperation === undefined
      ? setCurrentHistory(firstTerm + operation.operator)
      : setCurrentHistory(resultOperation + operation.operator);
  }
}

function handlerSplitStringByOperators(currentHistory: string): boolean {
    const result = currentHistory
    .split(/\/|\*|\-|\+|=/g)
    .map((item) => parseFloat(item))
    .filter((num) => !isNaN(num));
  return result.length > 2;
}
