"use client";
import { useState, useEffect } from "react";
import Button from "./compoments/button/Button";
import Display from "./compoments/display/Display";

export default function Calculator() {
  const [currentView, setCurrentView] = useState<number>(-12);
  const [symbol, setSymbol] = useState<string | undefined>(undefined);
  const [currentHistory, setCurrentHistory] = useState<string | undefined>(
    undefined
  );

  function clear(): void {
    setCurrentHistory(undefined);
    setCurrentView(0);
  }

  function deleteNumber(): void {
    setCurrentView((current) => {
      const currentAsString = current.toString();

      if (currentAsString.length > 1) {
        const newNumber =
          current < 0
            ? -1 * Math.floor(Math.abs(current) / 10)
            : Math.floor(current / 10);
        return newNumber;
      } else {
        return 0;
      }
    });
  }

  function addNumberOnCurrentView(number: number): void {
    setCurrentView((current) => {
      const isfifteen = current.toString();
      if (isfifteen.length >= 15) {
        return current;
      }
      return current * 10 + number;
    });
  }

  useEffect(() => {
    console.log("the symbol is:", symbol);
  }, [symbol]);

  return (
    <div className="calculator grid grid-cols-4 grid-flow-row  gap-1 p-1">
      <Display currentView={currentView} historyView={currentHistory}></Display>
      <Button symbol="CE" isSpan={true} isGray={true} onClick={() => clear()} />
      <Button symbol="⇤" isGray={true} onClick={() => deleteNumber()} />
      <Button symbol="/" isGray={true} onClick={() => setSymbol("/")} />
      <Button symbol={7} onClick={() => addNumberOnCurrentView(7)} />
      <Button symbol={8} onClick={() => addNumberOnCurrentView(8)} />
      <Button symbol={9} onClick={() => addNumberOnCurrentView(9)} />
      <Button symbol="*" isGray={true} onClick={() => setSymbol("*")} />
      <Button symbol={4} onClick={() => addNumberOnCurrentView(4)} />
      <Button symbol={5} onClick={() => addNumberOnCurrentView(5)} />
      <Button symbol={6} onClick={() => addNumberOnCurrentView(6)} />
      <Button symbol="-" isGray={true} onClick={() => setSymbol("-")} />
      <Button symbol={1} onClick={() => addNumberOnCurrentView(1)} />
      <Button symbol={2} onClick={() => addNumberOnCurrentView(2)} />
      <Button symbol={3} onClick={() => addNumberOnCurrentView(3)} />
      <Button symbol="+" isGray={true} onClick={() => setSymbol("+")} />
      <Button
        symbol={0}
        isSpan={true}
        onClick={() => addNumberOnCurrentView(0)}
      />
      <Button symbol="." />
      <Button symbol="=" isBlue={true} />
    </div>
  );
}
