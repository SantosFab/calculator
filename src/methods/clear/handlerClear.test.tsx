import { handlerClear } from "@/methods/clear/handlerClear";
import {
  setCurrentHistoryMock,
  setCurrentViewMock,
  setFirstTermMock,
  setResultOperationMock,
  setSymbolMock,
} from "../../../__test__/Mock/setMock";

describe("handlerClear", () => {
  const createMockData = () => ({
    setCurrentHistory: setCurrentHistoryMock,
    setCurrentView: setCurrentViewMock,
    setFirstTerm: setFirstTermMock,
    setResultOperation: setResultOperationMock,
    setSymbol: setSymbolMock,
  });

  it("Resetar todos os estados", () => {
    const mockData = createMockData();

    handlerClear(mockData);

    expect(setCurrentHistoryMock).toHaveBeenCalledWith(undefined);
    expect(setCurrentViewMock).toHaveBeenCalledWith("0");
    expect(setFirstTermMock).toHaveBeenCalledWith(undefined);
    expect(setResultOperationMock).toHaveBeenCalledWith(undefined);
    expect(setSymbolMock).toHaveBeenCalledWith(undefined);
  });
});
