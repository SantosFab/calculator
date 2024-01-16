import { handlerNumberOnCurrentView } from "@/methods/add/handlerNumberOnCurrentiView";
import { SetStateAction } from "react";
import { setCurrentViewMock } from "../../../__test__/Mock/setMock";
import { numbers } from "@/utils/interface/number/interfaceTypeOfNumbers";

describe("handlerNumberOnCurrentView", () => {
  const { zero, five, six } = numbers;
  /* Testando uma forma diferente do uso do Mock, acho o caso posterior mais elegante */
  it("O primeiro número digitado é zero, não a incremento de número no visor ex:00", () => {
    let updateFunction: SetStateAction<string> = "";

    handlerNumberOnCurrentView({
      setCurrentView: (func) => {
        updateFunction = func;
        setCurrentViewMock();
      },
      typeOfNumber: zero,
    });

    const updatedState =
      typeof updateFunction === "function"
        ? (updateFunction as (prevState: string) => string)("0")
        : updateFunction;

    expect(updatedState).toBe("0");
  });

  it("Adicionando um número há um estado anterior ", () => {
    handlerNumberOnCurrentView({
      setCurrentView: setCurrentViewMock,
      typeOfNumber: five,
    });
    handlerNumberOnCurrentView({
      setCurrentView: setCurrentViewMock,
      typeOfNumber: six,
    });

    const updateFunction1: (prevState: string) => string =
      setCurrentViewMock.mock.calls[1][0];

    const updatedState1 = updateFunction1("");

    const updateFunction2: (prevState: string) => string =
      setCurrentViewMock.mock.calls[2][0];

    const updatedState2 = updateFunction2(updatedState1);

    expect(updatedState2).toBe("56");
  });
});
