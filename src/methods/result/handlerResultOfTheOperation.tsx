import { TypeOfOperator } from "@/utils/interface/operator/interfaceTypeOfOperator";
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
    /* O calculo é efetuado pela primeira vez, ou seja não tem um resultado ainda */
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
    /* Realizado quando o cliente realiza multiplas operações sem o uso do '=', exemplo:3+3+2+1, o cliente obtém o 9 no visor */
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
    /* O cliente realizou sua primeira operação, porém deseja continuar operações subsequentes com o mesmo primeiro, exemplo 3+3=6 +> 6+3=9 9+3 => 12... */
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
    /* O cliente já realizou sua primeira operações matemática, porém realizará outras operações como resultado obtido anteriormente, exemplo 3+3='6' => '6'+5=11 */
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

  function handlerMathematicalOperationa(
    numberOne: number,
    { operator }: TypeOfOperator,
    numberTwo: number
  ): number {

    function formatNumber(value: number): number {
      return parseFloat(value.toFixed(2));
    }

    switch (operator) {
      case "/":
        return formatNumber(numberOne / numberTwo);
      case "*":
        return formatNumber(numberOne * numberTwo);
      case "-":
        return formatNumber(numberOne - numberTwo);
      case "+":
        return formatNumber(numberOne + numberTwo);
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
}
