import { handlerNumberOnCurrentView } from "@/methods/add/handlerNumberOnCurrentiView";
import { setCurrentViewMock } from "../../../__test__/Mock/setMock";
import {
  TypeOfNumbers,
  numbers,
} from "@/utils/interface/number/interfaceTypeOfNumbers";

describe("handlerNumberOnCurrentView", () => {
  type MockDataOverries = {
    setCurrentView?: jest.Mock;
    typeOfNumber?: TypeOfNumbers;
  };

  const createMockData = (overrides:MockDataOverries = {}) => ({
    setCurrentView: setCurrentViewMock,
    typeOfNumber: zero,
    ...overrides,
  });

  const { zero, five, six } = numbers;

  it("O primeiro número digitado é zero, não a incremento de número no visor ex:00", () => {
    const mockData = createMockData();

    handlerNumberOnCurrentView(mockData);

    const updateFunction: (prevState: string) => string =
      setCurrentViewMock.mock.calls[0][0];

    const updateState = updateFunction("");

    expect(updateState).toBe("0");
  });

  it("Adicionando um número há um estado anterior ", () => {
    const mockDataOne = createMockData({
      typeOfNumber: five,
    });

    const mockDataTwo = createMockData({
      typeOfNumber: six,
    });

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
