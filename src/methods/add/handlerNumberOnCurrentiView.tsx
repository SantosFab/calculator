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
    } else {
      return current === "0"
        ? typeOfNumber.number
        : current + typeOfNumber.number;
    }
  });
}
