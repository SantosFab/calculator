"use client";
import { useState, useEffect } from "react";
import Button from "./compoments/button/Button";
import Display from "./compoments/display/Display";

export default function Calculator() {
  const [currentView, setCurrentView] = useState<string>("0");
  const [symbol, setSymbol] = useState<string | undefined>(undefined);
  const [currentHistory, setCurrentHistory] = useState<string | undefined>(
    undefined
  );
  const [symbol, setSymbol] = useState<TypeOfOperator | undefined>(undefined);
  const [firstTerm, setFirstTerm] = useState<number | undefined>(undefined);
  const [resultOperation, setResultOperation] = useState<number | undefined>(
    undefined
  );

  interface TypeOfOperator {
    operator: "/" | "*" | "-" | "+";
  }

  const operators: TypeOfOperator[] = [
    { operator: "+" },
    { operator: "-" },
    { operator: "*" },
    { operator: "/" },
  ];

  function handlerClear(): void {
    setCurrentHistory(undefined);
    setCurrentView("0");
    setSymbol(undefined);
    setFirstTerm(undefined);
    setResultOperation(undefined);
  }

  function handlerDeleteNumber(): void {
    setCurrentView((current) => {
      if (current.length > 1) {
        return current.slice(0, -1);
      } else {
        return "0";
      }
    });
  }

  function handlerNumberOnCurrentView(numberS: string): void {
    setCurrentView((current) => {
      if (current.length >= 15) {
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
      setCurrentView((current) => currentView + ".");
    }
    return;
  }

  return (
    <div className="calculator grid grid-cols-4 grid-flow-row  gap-1 p-1">
      <Display currentView={currentView} historyView={currentHistory}></Display>
      <Button symbol="CE" isSpan={true} isGray={true} onClick={() => handlerClear()} />
      <Button symbol="⇤" isGray={true} onClick={() => handlerDeleteNumber()} />
      <Button
        symbol="/"
        isGray={true}
        onClick={() => handlerOperator(operators[3])}
      />
      <Button symbol={7} onClick={() => handlerNumberOnCurrentView('7')} />
      <Button symbol={8} onClick={() => handlerNumberOnCurrentView('8')} />
      <Button symbol={9} onClick={() => handlerNumberOnCurrentView('9')} />
      <Button
        symbol="*"
        isGray={true}
        onClick={() => handlerOperator(operators[2])}
      />
      <Button symbol={4} onClick={() => handlerNumberOnCurrentView('4')} />
      <Button symbol={5} onClick={() => handlerNumberOnCurrentView('5')} />
      <Button symbol={6} onClick={() => handlerNumberOnCurrentView('6')} />
      <Button
        symbol="-"
        isGray={true}
        onClick={() => handlerOperator(operators[1])}
      />
      <Button symbol={1} onClick={() => handlerNumberOnCurrentView('1')} />
      <Button symbol={2} onClick={() => handlerNumberOnCurrentView('2')} />
      <Button symbol={3} onClick={() => handlerNumberOnCurrentView('3')} />
      <Button
        symbol="+"
        isGray={true}
        onClick={() => handlerOperator(operators[0])}
      />
      <Button
        symbol={0}
        isSpan={true}
        onClick={() => handlerNumberOnCurrentView('0')}
      />
      <Button symbol="." onClick={() => handlerFraction()} />
      <Button
        symbol="="
        isBlue={true}
        onClick={() => handlerResultOfTheOperation({ isResult: true })}
      />
    </div>
  );
}
