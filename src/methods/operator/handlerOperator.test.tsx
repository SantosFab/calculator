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

describe("handlerFraction", () => {
  const undefinedProperty: undefined = undefined;

  const { add, subtract, multiply, divide } = operators;
  
  const {zero, one , two, three} = numbers;
  
  const oneN: number = 1;
  const twoN: number = 2;
  const threeN: number = 3;


  const displayOnePositive: string = `${one}${add.operator}`;
  const displayTwoNegative: string = `${two}${subtract.operator}`;
  const displayThreeNegative: string = `${three}${subtract.operator}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Depois do primeiro termo ser adicionado o operador é apertado", () => {
    handlerOperator({
      setCurrentHistory: setCurrentHistoryMock,
      setCurrentView: setCurrentViewMock,
      setFirstTerm: setFirstTermMock,
      setResultOperation: setResultOperationMock,
      setSymbol: setSymbolMock,
      currentHistory: undefinedProperty,
      currentView: one.number,
      firstTerm: undefinedProperty,
      handlerResultOfTheOperation,
      operation: add,
      resultOperation: undefinedProperty,
      symbol: undefinedProperty,
    });
    expect(setSymbolMock).toHaveBeenCalledWith(add);
    expect(setFirstTermMock).toHaveBeenCalledWith(1);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayOnePositive);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setResultOperationMock).not.toHaveBeenCalled();
  });

  it("Operação realizada sem o uso de '=' 3-1-1 => resultando exibido no visor 2- ", () => {
    handlerOperator({
      setCurrentHistory: setCurrentHistoryMock,
      setCurrentView: setCurrentViewMock,
      setFirstTerm: setFirstTermMock,
      setResultOperation: setResultOperationMock,
      setSymbol: setSymbolMock,
      currentHistory: displayThreeNegative,
      firstTerm: threeN,
      symbol: subtract,
      currentView: one.number,
      operation: subtract,
      handlerResultOfTheOperation,
      resultOperation: undefinedProperty,
    });

    expect(setResultOperationMock).toHaveBeenCalledWith(two);
    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayTwoNegative);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setFirstTermMock).not.toHaveBeenCalled();
  });

  it("Troca de operator, sem realizar soma alguma ", () => {
    handlerOperator({
      setCurrentHistory: setCurrentHistoryMock,
      setCurrentView: setCurrentViewMock,
      setFirstTerm: setFirstTermMock,
      setResultOperation: setResultOperationMock,
      setSymbol: setSymbolMock,
      currentHistory: one.number,
      firstTerm: threeN,
      symbol: add,
      operation: subtract,
      currentView: zero.number,
      handlerResultOfTheOperation,
      resultOperation: undefinedProperty,
    });

    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayThreeNegative);
    expect(setCurrentViewMock).not.toHaveBeenCalled();
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setResultOperationMock).not.toHaveBeenCalled();
  });

  it("Troca de operator, sem operação matemática, porém existe um resultado anterior", () => {
    handlerOperator({
      setCurrentHistory: setCurrentHistoryMock,
      setCurrentView: setCurrentViewMock,
      setFirstTerm: setFirstTermMock,
      setResultOperation: setResultOperationMock,
      setSymbol: setSymbolMock,
      currentHistory: one.number,
      firstTerm: undefinedProperty,
      symbol: undefinedProperty,
      operation: subtract,
      currentView: zero.number,
      handlerResultOfTheOperation,
      resultOperation: twoN,
    });

    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayTwoNegative);
    expect(setCurrentViewMock).not.toHaveBeenCalled();
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setResultOperationMock).not.toHaveBeenCalled();
  });
});
