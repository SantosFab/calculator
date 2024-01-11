import { Dispatch, SetStateAction } from "react";

interface HandlerNumberOnCurrentViewProps {
  setCurrentView: Dispatch<SetStateAction<string>>;
  numberS: string;
}

export function handlerNumberOnCurrentView({
  setCurrentView,
  numberS,
}: HandlerNumberOnCurrentViewProps): void {
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
