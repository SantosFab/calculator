import { TypeOfNumbers } from "@/utils/interface/number/interfaceTypeOfNumbers";
import { Dispatch, SetStateAction } from "react";

interface HandlerNumberOnCurrentViewProps {
  setCurrentView: Dispatch<SetStateAction<string>>;
  typeOfNumber: TypeOfNumbers;
}

export function handlerNumberOnCurrentView({
  setCurrentView,
  typeOfNumber,
}: HandlerNumberOnCurrentViewProps): void {
  setCurrentView((current) => {
    if (current.length >= 10) {
      return current;
    } else if (current === "0") {
      return typeOfNumber.number;
    } else {
      return current + typeOfNumber.number;
    }
  });
}
