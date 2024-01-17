import { handlerResultOfTheOperation } from "./handlerResultOfTheOperation";
import {
  setCurrentHistoryMock,
  setCurrentViewMock,
  setFirstTermMock,
  setResultOperationMock,
  setSymbolMock,
} from "../../../__test__/Mock/setMock";
import { numbers } from "@/utils/interface/number/interfaceTypeOfNumbers";
import {
  TypeOfOperator,
  operators,
} from "@/utils/interface/operator/interfaceTypeOfOperator";

describe("handlerResultOfTheOperation", () => {
  const undefinedProperty: undefined = undefined;

  const isTrue: boolean = true;

  const { add, subtract, divide, multiply } = operators;

  const { zero, one, two, three } = numbers;

  enum Number {
    Zero = 0 as number,
    One = 1 as number,
    Two = 2 as number,
    Three = 3 as number,
    Six = 6 as number,
    Nine = 9 as number,
  }

  type MockFunction = jest.Mock;

  interface MockDataOverrides {
    setCurrentHistory?: MockFunction;
    setCurrentView?: MockFunction;
    setFirstTerm?: MockFunction;
    setSymbol?: MockFunction;
    setResultOperation?: MockFunction;
    currentHistory?: string | undefined;
    currentView?: string;
    firstTerm?: number | undefined;
    symbol?: TypeOfOperator | undefined;
    resultOperation?: number | undefined;
    operation?: TypeOfOperator;
    isEqualButton?: boolean;
  }

  const createMockData = (overrides: MockDataOverrides = {}) => ({
    setCurrentHistory: setCurrentHistoryMock,
    setCurrentView: setCurrentViewMock,
    setFirstTerm: setFirstTermMock,
    setResultOperation: setResultOperationMock,
    setSymbol: setSymbolMock,
    currentHistory: undefinedProperty,
    currentView: "0",
    firstTerm: undefinedProperty,
    resultOperation: undefinedProperty,
    symbol: undefinedProperty,
    operation: undefinedProperty,
    isEqualButton: undefinedProperty,
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Número inválido", () => {
    const mockData = createMockData({ currentView: "Not number" });

    expect(() => handlerResultOfTheOperation(mockData)).toThrow(
      "Invalid number"
    );
  });

  it("Primeiro calculo efetuado, com currentView definido(valor diferente de zero)", () => {
    const mockData = createMockData({
      currentHistory: `${Number.Three}${subtract.operator}`,
      currentView: one.number,
      firstTerm: Number.Three,
      symbol: subtract,
      isEqualButton: isTrue,
    });

    handlerResultOfTheOperation(mockData);

    const stringOfHistory = `${Number.Three} ${subtract.operator} ${Number.One} = ${Number.Two}`;

    expect(setCurrentHistoryMock).toHaveBeenCalledWith(stringOfHistory);
    expect(setResultOperationMock).toHaveBeenCalledWith(Number.Two);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setSymbolMock).not.toHaveBeenCalled();
  });

  it("Primeiro calculo efetuado, com currentView indefinido(valor igual zero)", () => {
    const mockData = createMockData({
      currentHistory: `${Number.Three}${subtract.operator}`,
      currentView: zero.number,
      firstTerm: Number.Three,
      symbol: add,
      isEqualButton: isTrue,
    });

    handlerResultOfTheOperation(mockData);

    const stringOfHistory = `${Number.Three} ${add.operator} ${Number.Three} = ${Number.Six}`;

    expect(setCurrentHistoryMock).toHaveBeenCalledWith(stringOfHistory);
    expect(setResultOperationMock).toHaveBeenCalledWith(Number.Six);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setSymbolMock).not.toHaveBeenCalled();
  });

  it("Efetuação de cálculo sequências sem uso do operador de igualdade '=' - ResultOfOperation indefinido ", () => {
    const mockData = createMockData({
      currentHistory: `${Number.Three}${multiply.operator}`,
      currentView: two.number,
      firstTerm: Number.Three,
      symbol: multiply,
      operation: multiply,
    });

    handlerResultOfTheOperation(mockData);

    const stringOfHistory: string = `${Number.Six}${multiply.operator}`;

    expect(setCurrentHistoryMock).toHaveBeenCalledWith(stringOfHistory);
    expect(setResultOperationMock).toHaveBeenCalledWith(Number.Six);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setSymbolMock).toHaveBeenCalledWith(multiply);
  });

  it("Efetuação de cálculo sequências sem uso do operador de igualdade '='ResultOfOperation definido ", () => {
    const mockData = createMockData({
      currentHistory: `${Number.Three}${divide.operator}`,
      currentView: three.number,
      firstTerm: Number.Three,
      symbol: divide,
      operation: divide,
      resultOperation: Number.Nine,
    });

    handlerResultOfTheOperation(mockData);

    const stringOfHistory: string = `${Number.Three}${divide.operator}`;

    expect(setCurrentHistoryMock).toHaveBeenCalledWith(stringOfHistory);
    expect(setResultOperationMock).toHaveBeenCalledWith(Number.Three);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setSymbolMock).toHaveBeenCalledWith(divide);
  });

  it("operações sequenciais com o mesmo termo - ex PA de 3", () => {
    const mockData = createMockData({
      currentHistory: `${Number.Three} ${add.operator} ${Number.Three} = ${Number.Six}`,
      currentView: zero.number,
      firstTerm: Number.Three,
      resultOperation: Number.Six,
      symbol: add,
      isEqualButton: isTrue,
    });

    handlerResultOfTheOperation(mockData);

    const stringOfHistory: string = `${Number.Six} ${add.operator} ${Number.Three} = ${Number.Nine}`;

    expect(setCurrentHistoryMock).toHaveBeenCalledWith(stringOfHistory);
    expect(setResultOperationMock).toHaveBeenCalledWith(Number.Nine);
    expect(setCurrentViewMock).not.toHaveBeenCalled();
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setSymbolMock).not.toHaveBeenCalled();
  });

  it("operações sequenciais com o resultado obtido anteriormente com o uso do operador de igualdade '=' - ex 3+3='6' => '6'+5=11", () => {
    const mockData = createMockData({
      currentView: two.number,
      resultOperation: Number.Six,
      symbol: divide,
      isEqualButton: isTrue,
    });

    handlerResultOfTheOperation(mockData);

    const stringOfHistory: string = `${Number.Six} ${divide.operator} ${Number.Two} = ${Number.Three}`;

    expect(setCurrentHistoryMock).toHaveBeenCalledWith(stringOfHistory);
    expect(setResultOperationMock).toHaveBeenCalledWith(Number.Three);
    expect(setCurrentViewMock).toHaveBeenCalledWith(zero.number);
    expect(setFirstTermMock).toHaveBeenCalledWith(Number.Two);
    expect(setSymbolMock).not.toHaveBeenCalled();
  });

  it("handlerSplitStringByOperators com parâmetro indefinido", () => {
    const mockData = createMockData({
      currentView: zero.number,
      firstTerm: Number.Three,
      resultOperation: Number.Six,
      symbol: add,
      isEqualButton: isTrue,
    });

    handlerResultOfTheOperation(mockData);

    expect(setCurrentHistoryMock).not.toHaveBeenCalled();
    expect(setResultOperationMock).not.toHaveBeenCalled();
    expect(setCurrentViewMock).not.toHaveBeenCalled();
    expect(setFirstTermMock).not.toHaveBeenCalled();
    expect(setSymbolMock).not.toHaveBeenCalled();
  });
});
