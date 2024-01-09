"use client";
import { useState, useEffect } from "react";
import Button from "./compoments/button/Button";
import Display from "./compoments/display/Display";

export default function Calculator() {
  const [currentView, setCurrentView] = useState<string>('0');
  const [symbol, setSymbol] = useState<string | undefined>(undefined);
  const [currentHistory, setCurrentHistory] = useState<string | undefined>(
    undefined
  );

  function clear(): void {
    setCurrentHistory(undefined);
    setCurrentView('0');
  }

  function deleteNumber(): void {
    setCurrentView((current) => {
      

      if (current.length > 1) {
        
        return current.slice(0, -1);
      } else {
        return '0';
      }
    });
  }

  function addNumberOnCurrentView(number: number): void {
    setCurrentView((current) => {
      if (current.length >= 15) {
        return current;
      }
      return (parseFloat(current) * 10 + number).toString();
    });
  }

  function addOperation(symbol: string): void {
    setSymbol(symbol);
    setCurrentHistory(currentView + symbol);
    setCurrentView('0');
  }

  function addFraction(): void {
   
  }
  

  useEffect(() => {
    console.log("the symbol is:", symbol);
  }, [symbol]);

  return (
    <div className="calculator grid grid-cols-4 grid-flow-row  gap-1 p-1">
      <Display currentView={currentView} historyView={currentHistory}></Display>
      <Button symbol="CE" isSpan={true} isGray={true} onClick={() => clear()} />
      <Button symbol="⇤" isGray={true} onClick={() => deleteNumber()} />
      <Button symbol="/" isGray={true} onClick={() => addOperation("/")} />
      <Button symbol={7} onClick={() => addNumberOnCurrentView(7)} />
      <Button symbol={8} onClick={() => addNumberOnCurrentView(8)} />
      <Button symbol={9} onClick={() => addNumberOnCurrentView(9)} />
      <Button symbol="*" isGray={true} onClick={() => addOperation("*")} />
      <Button symbol={4} onClick={() => addNumberOnCurrentView(4)} />
      <Button symbol={5} onClick={() => addNumberOnCurrentView(5)} />
      <Button symbol={6} onClick={() => addNumberOnCurrentView(6)} />
      <Button symbol="-" isGray={true} onClick={() => addOperation("-")} />
      <Button symbol={1} onClick={() => addNumberOnCurrentView(1)} />
      <Button symbol={2} onClick={() => addNumberOnCurrentView(2)} />
      <Button symbol={3} onClick={() => addNumberOnCurrentView(3)} />
      <Button symbol="+" isGray={true} onClick={() => addOperation("+")} />
      <Button
        symbol={0}
        isSpan={true}
        onClick={() => addNumberOnCurrentView(0)}
      />
      <Button symbol="." onClick={() => addFraction()} />
      <Button symbol="=" isBlue={true} />
    </div>
  );
}
