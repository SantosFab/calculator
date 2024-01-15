import { handlerOperator } from "./handlerOperator";
import { operators } from "@/utils/interface/interfaceTypeOfOperator";
import { handlerResultOfTheOperation } from "@/methods/result/handlerResultOfTheOperation";
import {
  setCurrentHistoryMock,
  setCurrentViewMock,
  setFirstTermMock,
  setResultOperationMock,
  setSymbolMock,
} from "../../../__test__/Mock/setMock";

describe("handlerFraction", () => {
  const currentHistoryUndefined: undefined = undefined;
  const firstTermUndefined: undefined = undefined;
  const symbolUndefined: undefined = undefined;
  const resultOperationUndefined: undefined = undefined;

  const add = operators[0];
  const subtract = operators[1];
  const multiply = operators[2];
  const divide = operators[3];

  const one: number = 1;
  const two: number = 2;
  const three: number = 3;

  const zeroS: string = "0";
  const oneS: string = "1";
  const twoS: string = "2";

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
      currentHistory: currentHistoryUndefined,
      currentView: oneS,
      firstTerm: firstTermUndefined,
      handlerResultOfTheOperation,
      operation: add,
      resultOperation: resultOperationUndefined,
      symbol: symbolUndefined,
    });
    expect(setSymbolMock).toHaveBeenCalledWith(add);
    expect(setFirstTermMock).toHaveBeenCalledWith(1);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayOnePositive);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zeroS);
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
      firstTerm: three,
      symbol: subtract,
      currentView: oneS,
      operation: subtract,
      handlerResultOfTheOperation,
      resultOperation: resultOperationUndefined,
    });

    expect(setResultOperationMock).toHaveBeenCalledWith(two);
    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayTwoNegative);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zeroS);
    expect(setFirstTermMock).not.toHaveBeenCalled();
  });

  it("Troca de operator, sem realizar soma alguma ", () => {
    handlerOperator({
      setCurrentHistory: setCurrentHistoryMock,
      setCurrentView: setCurrentViewMock,
      setFirstTerm: setFirstTermMock,
      setResultOperation: setResultOperationMock,
      setSymbol: setSymbolMock,
      currentHistory: oneS,
      firstTerm: three,
      symbol: add,
      operation: subtract,
      currentView: zeroS,
      handlerResultOfTheOperation,
      resultOperation: resultOperationUndefined,
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
      currentHistory: oneS,
      firstTerm: firstTermUndefined,
      symbol: symbolUndefined,
      operation: subtract,
      currentView: zeroS,
      handlerResultOfTheOperation,
      resultOperation: two,
    });

    expect(setSymbolMock).toHaveBeenCalledWith(subtract);
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(displayTwoNegative);
    expect(setCurrentViewMock).not.toHaveBeenCalled();
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setResultOperationMock).not.toHaveBeenCalled();
  });
});
