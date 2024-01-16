import { handlerNumberOnCurrentView } from "@/methods/add/handlerNumberOnCurrentiView";
import { SetStateAction } from "react";
import { setCurrentViewMock } from "../../../__test__/Mock/setMock";
import { numbers } from "@/utils/interface/number/interfaceTypeOfNumbers";
import { mock } from "node:test";

describe("handlerNumberOnCurrentView", () => {
  const { zero, five, six } = numbers;

  it("O primeiro número digitado é zero, não a incremento de número no visor ex:00", () => {
    const mockData = {
      setCurrentView: setCurrentViewMock,
      typeOfNumber: zero,
    };

    handlerNumberOnCurrentView(mockData);

    const updateFunction: (prevState: string) => string =
      setCurrentViewMock.mock.calls[0][0];

    const updateState = updateFunction("");

    expect(updateState).toBe("0");
  });

  it("Adicionando um número há um estado anterior ", () => {
    const mockDataOne = {
      setCurrentView: setCurrentViewMock,
      typeOfNumber: five,
    };

    const mockDataTwo = {
      setCurrentView: setCurrentViewMock,
      typeOfNumber: six,
    };

    handlerNumberOnCurrentView(mockDataOne);

    handlerNumberOnCurrentView(mockDataTwo);

    const updateFunction1: (prevState: string) => string =
      setCurrentViewMock.mock.calls[1][0];

    const updatedState1 = updateFunction1("");

    const updateFunction2: (prevState: string) => string =
      setCurrentViewMock.mock.calls[2][0];

    const updatedState2 = updateFunction2(updatedState1);

    expect(updatedState2).toBe("56");
  });
});
