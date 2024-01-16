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

  const { add, subtract, multiply, divide } = operators;

  const { zero, one, two, three } = numbers;

  const twoN: number = 2;
  const threeN: number = 3;

  const displayOnePositive: string = `${one.number}${add.operator}`;
  const displayTwoNegative: string = `${two.number}${subtract.operator}`;
  const displayThreeNegative: string = `${three.number}${subtract.operator}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Depois do primeiro termo ser adicionado o operador é apertado", () => {
    const mockData = {
      setCurrentHistory: setCurrentHistoryMock,
      setCurrentView: setCurrentViewMock,
      setSymbol: setSymbolMock,
      setFirstTerm: setFirstTermMock,
      setResultOperation: setResultOperationMock,
      handlerResultOfTheOperation,
      firstTerm: undefinedProperty,
      currentHistory: undefinedProperty,
      currentView: one.number,
      operation: add,
      resultOperation: undefinedProperty,
      symbol: undefinedProperty,
    };

    handlerOperator(mockData);

    expect(setSymbolMock).toHaveBeenCalledWith(add);
    expect(setFirstTermMock).toHaveBeenCalledWith(1);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayOnePositive);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setResultOperationMock).not.toHaveBeenCalled();
  });

  it("Operação realizada sem o uso de '=' 3-1-1 => resultando exibido no visor 2- ", () => {
    const mockData = {
      setCurrentHistory: setCurrentHistoryMock,
      setCurrentView: setCurrentViewMock,
      setSymbol: setSymbolMock,
      setFirstTerm: setFirstTermMock,
      setResultOperation: setResultOperationMock,
      handlerResultOfTheOperation,
      currentHistory: displayThreeNegative,
      firstTerm: threeN,
      symbol: subtract,
      currentView: one.number,
      operation: subtract,
      resultOperation: undefinedProperty,
    };

    handlerOperator(mockData);

    expect(setResultOperationMock).toHaveBeenCalledWith(twoN);
    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayTwoNegative);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setFirstTermMock).not.toHaveBeenCalled();
  });

  it("Troca de operator, sem realizar soma alguma ", () => {
    const mockData = {
      setCurrentHistory: setCurrentHistoryMock,
      setCurrentView: setCurrentViewMock,
      setSymbol: setSymbolMock,
      setFirstTerm: setFirstTermMock,
      setResultOperation: setResultOperationMock,
      handlerResultOfTheOperation,
      currentHistory: one.number,
      firstTerm: threeN,
      symbol: add,
      operation: subtract,
      currentView: zero.number,
      resultOperation: undefinedProperty,
    };
    
    handlerOperator(mockData);

    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayThreeNegative);
    expect(setCurrentViewMock).not.toHaveBeenCalled();
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setResultOperationMock).not.toHaveBeenCalled();
  });

  it("Troca de operator, sem operação matemática, porém existe um resultado anterior", () => {
    const mockData = {
      setCurrentHistory: setCurrentHistoryMock,
      setCurrentView: setCurrentViewMock,
      setSymbol: setSymbolMock,
      setFirstTerm: setFirstTermMock,
      setResultOperation: setResultOperationMock,
      handlerResultOfTheOperation,
      currentHistory: one.number,
      firstTerm: undefinedProperty,
      symbol: undefinedProperty,
      operation: subtract,
      currentView: zero.number,
      resultOperation: twoN,
    };
    handlerOperator(mockData);

    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayTwoNegative);
    expect(setCurrentViewMock).not.toHaveBeenCalled();
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setResultOperationMock).not.toHaveBeenCalled();
  });
});
