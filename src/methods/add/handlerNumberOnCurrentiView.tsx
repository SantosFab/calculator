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
    if (current.length >= 10 || current === "0") {
      return current;
    } else {
      return current + typeOfNumber.number;
    }
  });
}
