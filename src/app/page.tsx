"use client";
import { useState } from "react";
import Button from "@/app/compoments/button/Button";
import Display from "@/app/compoments/display/Display";
import {
  TypeOfOperator,
  operators,
} from "@/utils/interface/interfaceTypeOfOperator";

import { handlerNumberOnCurrentView } from "@/app/methods/add/handlerNumberOnCurrentiView";
import { handlerDeleteNumber } from "@/app/methods/delete/handlerDeleteNumber";

export default function Calculator() {
  const [currentView, setCurrentView] = useState<string>("0");
  const [currentHistory, setCurrentHistory] = useState<string | undefined>(
    undefined
  );
  const [symbol, setSymbol] = useState<TypeOfOperator | undefined>(undefined);
  const [firstTerm, setFirstTerm] = useState<number | undefined>(undefined);
  const [resultOperation, setResultOperation] = useState<number | undefined>(
    undefined
  );
  
  const Clear = () =>
    handlerClear({
      setCurrentHistory,
      setCurrentView,
      setSymbol,
      setFirstTerm,
      setResultOperation,
    });

  const operators: TypeOfOperator[] = [
    { operator: "+" },
    { operator: "-" },
    { operator: "*" },
    { operator: "/" },
  ];

  const Add = (numberS: string) =>
    handlerNumberOnCurrentView({ numberS, setCurrentView });

  const Delete = () => handlerDeleteNumber({ setCurrentView });

  function handlerNumberOnCurrentView(numberS: string): void {
    setCurrentView((current) => {
      if (current.length >= 10) {
        return current;
      } else if (current === "0") {
        return numberS;
      } else {
        return current + numberS;
      }
    });
  }

  function handlerFraction(): void {
    if (currentView.indexOf(".") === -1) {
      setCurrentView(() => currentView + ".");
    }
    return;
  }

  function handlerOperator(operation: TypeOfOperator): void {
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
      !handlerSplitStringByOperators()
    ) {
      handlerResultOfTheOperation({ operation });
      setSymbol(operation);
    } else {
      setSymbol(operation);
      resultOperation === undefined
        ? setCurrentHistory(firstTerm + operation.operator)
        : setCurrentHistory(resultOperation.toFixed(2) + operation.operator);
    }
  }

  function handlerResultOfTheOperation({
    operation,
    isEqualButton: isEqualButton = false,
  }: {
    operation?: TypeOfOperator;
    isEqualButton?: boolean;
  }): void {
    let result: number;
    let parseCurrentView: number = parseFloat(currentView);
    if (
      isEqualButton &&
      resultOperation === undefined &&
      firstTerm !== undefined &&
      symbol !== undefined &&
      !handlerSplitStringByOperators()
    ) {
      result = handlerMathematicalOperationa(
        firstTerm,
        symbol,
        currentView === "0" ? firstTerm : parseCurrentView
      );
      setCurrentHistory(
        `${firstTerm.toFixed(2)} ${symbol.operator} ${
          currentView === "0" ? firstTerm.toFixed(2) : parseCurrentView.toFixed(2)
        } = ${result.toFixed(2)}`
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
      setCurrentHistory(result.toFixed(2) + operation.operator);
      setCurrentView("0");
    } else if (
      isEqualButton &&
      currentView === "0" &&
      resultOperation !== undefined &&
      symbol !== undefined &&
      firstTerm !== undefined &&
      handlerSplitStringByOperators()
    ) {
      result = handlerMathematicalOperationa(resultOperation, symbol, firstTerm);
      setCurrentHistory(
        `${resultOperation.toFixed(2)} ${symbol.operator} ${firstTerm.toFixed(2)} = ${result.toFixed(2)}`
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
        `${resultOperation.toFixed(2)} ${symbol.operator} ${parseCurrentView.toFixed(2)} = ${result.toFixed(2)}`
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
        return numberOne / numberTwo;
      case "*":
        return numberOne * numberTwo;
      case "-":
        return numberOne - numberTwo;
      case "+":
        return numberOne + numberTwo;
      default:
        throw new Error("Invalid operator");
    }
  }

  function handlerSplitStringByOperators(): boolean {
    if (!currentHistory) {
      return false;
    }
    const result = currentHistory
      .split(/\/|\*|\-|\+|=/g)
      .map((item) => parseFloat(item))
      .filter((num) => !isNaN(num));
    return result.length > 2;
  }

  return (
    <div className="calculator grid grid-cols-4 grid-flow-row  gap-1 p-1">
      <Display currentView={currentView} historyView={currentHistory}></Display>
      <Button symbol="CE" isSpan={true} isGray={true} onClick={() => Clear()} />
      <Button symbol="⇤" isGray={true} onClick={() => Delete()} />
      <Button
        symbol="="
        isBlue={true}
        onClick={() => Result({ isEqualButton: true })}
      />
    </div>
  );
}
