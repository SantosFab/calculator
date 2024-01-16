import { handlerOperator } from "./handlerOperator";
import { operators } from "@/utils/interface/operator/interfaceTypeOfOperator";
import { handlerResultOfTheOperation } from "@/methods/result/handlerResultOfTheOperation";
import {
  setCurrentHistoryMock,
  setCurrentViewMock,
  setFirstTermMock,
  setResultOperationMock,
  setSymbolMock,
} from "../../../__test__/Mock/setMock";
import { numbers } from "@/utils/interface/number/interfaceTypeOfNumbers";

describe("handlerOperatior", () => {
  const undefinedProperty: undefined = undefined;

  const { add, subtract } = operators;

  const { zero, one, two, three } = numbers;

  enum Number {
    Two = 2 as number,
    Three = 3 as number,
  }

  const displayTwoNegative: string = `${two.number}${subtract.operator}`;
  const displayThreeNegative: string = `${three.number}${subtract.operator}`;

  const createMockData = (overrides = {}) => ({
    setCurrentHistory: setCurrentHistoryMock,
    setCurrentView: setCurrentViewMock,
    setSymbol: setSymbolMock,
    setFirstTerm: setFirstTermMock,
    setResultOperation: setResultOperationMock,
    handlerResultOfTheOperation,
    firstTerm: undefinedProperty,
    currentHistory: undefinedProperty,
    currentView: "0",
    operation: add,
    resultOperation: undefinedProperty,
    symbol: undefinedProperty,
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Depois do primeiro termo ser adicionado o operador é apertado", () => {
    const mockData = createMockData({
      currentView: one.number,
    });

    handlerOperator(mockData);

    expect(setSymbolMock).toHaveBeenCalledWith(add);
    expect(setFirstTermMock).toHaveBeenCalledWith(1);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(
      `${one.number}${add.operator}`
    );
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setResultOperationMock).not.toHaveBeenCalled();
  });

  it("Operação realizada sem o uso de '=' 3-1-1 => resultando exibido no visor 2- ", () => {
    const mockData = createMockData({
      currentHistory: displayThreeNegative,
      firstTerm: Number.Three,
      symbol: subtract,
      currentView: one.number,
      operation: subtract,
    });

    handlerOperator(mockData);

    expect(setResultOperationMock).toHaveBeenCalledWith(Number.Two);
    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayTwoNegative);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setFirstTermMock).not.toHaveBeenCalled();
  });

  it("Troca de operator, sem realizar soma alguma ", () => {
    const mockData = createMockData({
      currentHistory: one.number,
      firstTerm: Number.Three,
      symbol: add,
      operation: subtract,
      currentView: zero.number,
    });

    handlerOperator(mockData);

    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayThreeNegative);
    expect(setCurrentViewMock).not.toHaveBeenCalled();
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setResultOperationMock).not.toHaveBeenCalled();
  });

  it("Troca de operator, sem operação matemática, porém existe um resultado anterior", () => {
    const mockData = createMockData({
      currentHistory: one.number,
      operation: subtract,
      currentView: zero.number,
      resultOperation: Number.Two,
    });
    handlerOperator(mockData);

    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayTwoNegative);
    expect(setCurrentViewMock).not.toHaveBeenCalled();
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setResultOperationMock).not.toHaveBeenCalled();
  });
});
