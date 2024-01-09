"use client";
import { MouseEvent, useState, useEffect } from "react";
import Button from "./compoments/button/Button";
import Display from "./compoments/display/Display";

export default function Calculator() {
  const [currentView, setCurrentView] = useState<number>(-124);
  const [symbol, setSymbol] = useState<string | undefined>(undefined);
  const [currentHistory, setCurrentHistory] = useState<number | undefined>(
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

  useEffect(() => {
    console.log("the symbol is:", symbol);
  }, [symbol]);

  return (
    <div className="calculator grid grid-cols-4 grid-flow-row  gap-1 p-1">
      <Display currentView={currentView} historyView={currentHistory}></Display>
      <Button symbol="CE" isSpan={true} isGray={true} onClick={() => clear()} />
      <Button symbol="⇤" isGray={true} onClick={() => deleteNumber()} />
      <Button symbol="/" isGray={true} onClick={() => setSymbol("/")} />
      <Button
        symbol={7}
        onClick={() => setCurrentView((current) => current + 7)}
      />
      <Button
        symbol={8}
        onClick={() => setCurrentView((current) => current + 8)}
      />
      <Button
        symbol={9}
        onClick={() => setCurrentView((current) => current + 9)}
      />
      <Button symbol="*" isGray={true} onClick={() => setSymbol("*")} />
      <Button
        symbol={4}
        onClick={() => setCurrentView((current) => current + 4)}
      />
      <Button
        symbol={5}
        onClick={() => setCurrentView((current) => current + 5)}
      />
      <Button
        symbol={6}
        onClick={() => setCurrentView((current) => current + 6)}
      />
      <Button symbol="-" isGray={true} onClick={() => setSymbol("-")} />
      <Button
        symbol={1}
        onClick={() => setCurrentView((current) => current + 1)}
      />
      <Button
        symbol={2}
        onClick={() => setCurrentView((current) => current + 2)}
      />
      <Button
        symbol={3}
        onClick={() => setCurrentView((current) => current + 3)}
      />
      <Button symbol="+" isGray={true} onClick={() => setSymbol("+")} />
      <Button
        symbol={0}
        isSpan={true}
        onClick={() => setCurrentView((current) => current + 0)}
      />
      <Button symbol="." />
      <Button symbol="=" isBlue={true} />
    </div>
  );
}
