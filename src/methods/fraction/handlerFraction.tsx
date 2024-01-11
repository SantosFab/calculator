import { Dispatch, SetStateAction } from "react";

interface HandlerFractionProps {
  currentView: string;
  setCurrentView: Dispatch<SetStateAction<string>>;
}

export function handlerFraction({
  currentView,
  setCurrentView,
}: HandlerFractionProps): void {
  if (currentView.indexOf(".") === -1) {
    setCurrentView(() => currentView + ".");
  }
  return;
}
