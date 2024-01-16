"use client";
import { useState } from "react";
import Button from "@/app/components/button/Button";
import Display from "@/app/components/display/Display";
import {
  TypeOfOperator,
  operators,
} from "@/utils/interface/operator/interfaceTypeOfOperator";
import { TypeOfNumbers, numbers } from "@/utils/interface/number/interfaceTypeOfNumbers";
import { handlerClear } from "@/methods/clear/handlerClear";
import { handlerDeleteNumber } from "@/methods/delete/handlerDeleteNumber";
import { handlerFraction } from "@/methods/fraction/handlerFraction";
import { handlerNumberOnCurrentView } from "@/methods/add/handlerNumberOnCurrentiView";
import { handlerResultOfTheOperation } from "@/methods/result/handlerResultOfTheOperation";
import { handlerOperator } from "@/methods/operator/handlerOperator";

export default function Calculator() {
  const { one, two, three, four, five, six, seven, eight, nine, zero } =
    numbers;

  const { add, subtract, multiply, divide } = operators;

  const [currentView, setCurrentView] = useState<string>(zero.number);
  const [currentHistory, setCurrentHistory] = useState<string | undefined>(
    undefined
  );
  const [symbol, setSymbol] = useState<TypeOfOperator | undefined>(undefined);
  const [firstTerm, setFirstTerm] = useState<number | undefined>(undefined);
  const [resultOperation, setResultOperation] = useState<number | undefined>(
    undefined
  );

  const Add = (number: TypeOfNumbers) =>
    handlerNumberOnCurrentView({ typeOfNumber: number, setCurrentView });

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
      <Button
        symbol={divide.operator}
        isGray={true}
        onClick={() => Operator(divide)}
      />
      <Button symbol={7} onClick={() => Add(seven)} />
      <Button symbol={8} onClick={() => Add(eight)} />
      <Button symbol={9} onClick={() => Add(nine)} />
      <Button
        symbol={multiply.operator}
        isGray={true}
        onClick={() => Operator(multiply)}
      />
      <Button symbol={4} onClick={() => Add(four)} />
      <Button symbol={5} onClick={() => Add(five)} />
      <Button symbol={6} onClick={() => Add(six)} />
      <Button
        symbol={subtract.operator}
        isGray={true}
        onClick={() => Operator(subtract)}
      />
      <Button symbol={1} onClick={() => Add(one)} />
      <Button symbol={2} onClick={() => Add(two)} />
      <Button symbol={3} onClick={() => Add(three)} />
      <Button
        symbol={add.operator}
        isGray={true}
        onClick={() => Operator(add)}
      />
      <Button symbol={0} isSpan={true} onClick={() => Add(zero)} />
      <Button symbol="." onClick={() => IsFraction()} />
      <Button
        symbol="="
        isBlue={true}
        onClick={() => Result({ isEqualButton: true })}
      />
    </div>
  );
}
