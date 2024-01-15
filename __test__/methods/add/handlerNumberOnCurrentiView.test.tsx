import { handlerNumberOnCurrentView } from "@/methods/add/handlerNumberOnCurrentiView";
import {  SetStateAction } from "react";
import { setCurrentViewMock } from "../../Mock/setMock";

describe("handlerNumberOnCurrentView", () => {
  
  it("O primeiro número digitado é zero, não a incremento de número no visor ex:00", () => {
    let updateFunction: SetStateAction<string> = "";

    handlerNumberOnCurrentView({
      setCurrentView: (func) => {
        updateFunction = func;
        setCurrentViewMock();
      },
      numberS: "0",
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
      numberS: "5",
    });
    handlerNumberOnCurrentView({
      setCurrentView: setCurrentViewMock,
      numberS: "6",
    });

    const updateFunction1: (prevState: string) => string =
      setCurrentViewMock.mock.calls[1][0];

    const updatedState1 = updateFunction1("");
    const updateFunction2: (prevState: string) => string =
      setCurrentViewMock.mock.calls[2][0];

    const updatedState2 = updateFunction2(updatedState1);

    expect(updatedState2).toBe("56");
  });

  it("O número adicionado é maior que 10", () => {
    handlerNumberOnCurrentView({
      setCurrentView: setCurrentViewMock,
      numberS: "12345678910",
    });

    const updateFunction1: (prevState: string) => string =
      setCurrentViewMock.mock.calls[3][0];

    const updatedState1 = updateFunction1("");

    expect(updatedState1).toBe("");
    expect(setCurrentViewMock).toHaveBeenCalledTimes(4);
    expect(setCurrentViewMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
