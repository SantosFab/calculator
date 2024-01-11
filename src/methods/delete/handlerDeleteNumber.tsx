import { Dispatch, SetStateAction } from "react";

interface HandlerDeleteNumberProps {
  setCurrentView: Dispatch<SetStateAction<string>>;
}

export function handlerDeleteNumber({
  setCurrentView,
}: HandlerDeleteNumberProps): void {
  setCurrentView((current) => {
    if (current.length > 1) {
      return current.slice(0, -1);
    } else {
      return "0";
    }
  });
}
