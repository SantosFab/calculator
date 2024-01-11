"use client";
import { useState } from "react";
import Button from "@/app/compoments/button/Button";
import Display from "@/app/compoments/display/Display";
import {
  TypeOfOperator,
  operators,
} from "@/utils/interface/interfaceTypeOfOperator";
import { handlerClear } from "@/methods/clear/handlerClear";
import { handlerDeleteNumber } from "@/methods/delete/handlerDeleteNumber";
import { handlerFraction } from "@/methods/fraction/handlerFraction";
import { handlerNumberOnCurrentView } from "@/methods/add/handlerNumberOnCurrentiView";
import { handlerResultOfTheOperation } from "@/methods/result/handlerResultOfTheOperation";
import { handlerOperator } from "@/methods/operator/handlerOperator";

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

  const Add = (numberS: string) =>
    handlerNumberOnCurrentView({ numberS, setCurrentView });

  const Clear = () =>
    handlerClear({
      setCurrentHistory,
      setCurrentView,
      setSymbol,
      setFirstTerm,
      setResultOperation,
    });

  const Delete = () => handlerDeleteNumber({ setCurrentView });

  const IsFraction = () => handlerFraction({ currentView, setCurrentView });

  const Operator = (operation: TypeOfOperator) =>
    handlerOperator({
      setCurrentHistory,
      setCurrentView,
      setFirstTerm,
      setSymbol,
      setResultOperation,
      currentView,
      currentHistory,
      firstTerm,
      symbol,
      operation,
      resultOperation,
      handlerResultOfTheOperation,
    });

  const Result = ({
    operation,
    isEqualButton,
  }: {
    operation?: TypeOfOperator;
    isEqualButton?: boolean;
  }) =>
    handlerResultOfTheOperation({
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
      isEqualButton,
    });

  return (
    <div className="calculator grid grid-cols-4 grid-flow-row  gap-1 p-1">
      <Display currentView={currentView} historyView={currentHistory}></Display>
      <Button symbol="CE" isSpan={true} isGray={true} onClick={() => Clear()} />
      <Button symbol="⇤" isGray={true} onClick={() => Delete()} />
      <Button symbol="/" isGray={true} onClick={() => Operator(operators[3])} />
      <Button symbol={7} onClick={() => Add("7")} />
      <Button symbol={8} onClick={() => Add("8")} />
      <Button symbol={9} onClick={() => Add("9")} />
      <Button symbol="*" isGray={true} onClick={() => Operator(operators[2])} />
      <Button symbol={4} onClick={() => Add("4")} />
      <Button symbol={5} onClick={() => Add("5")} />
      <Button symbol={6} onClick={() => Add("6")} />
      <Button symbol="-" isGray={true} onClick={() => Operator(operators[1])} />
      <Button symbol={1} onClick={() => Add("1")} />
      <Button symbol={2} onClick={() => Add("2")} />
      <Button symbol={3} onClick={() => Add("3")} />
      <Button symbol="+" isGray={true} onClick={() => Operator(operators[0])} />
      <Button symbol={0} isSpan={true} onClick={() => Add("0")} />
      <Button symbol="." onClick={() => IsFraction()} />
      <Button
        symbol="="
        isBlue={true}
        onClick={() => Result({ isEqualButton: true })}
      />
    </div>
  );
}
