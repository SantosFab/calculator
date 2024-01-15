import { handlerClear } from "@/methods/clear/handlerClear";
import {
  setCurrentHistoryMock,
  setCurrentViewMock,
  setFirtTermMock as setFirstTermMock,
  setResultOperationMock,
  setSymbolMock,
} from "../../../__test__/Mock/setMock";

describe("handlerClear", () => {
  it("Resetar todos os estados", () => {
    handlerClear({
      setCurrentHistory: setCurrentHistoryMock,
      setCurrentView: setCurrentViewMock,
      setFirstTerm: setFirstTermMock,
      setResultOperation: setResultOperationMock,
      setSymbol: setSymbolMock,
    });
    expect(setCurrentHistoryMock).toHaveBeenCalledWith(undefined)
    expect(setCurrentViewMock).toHaveBeenCalledWith('0')
    expect(setFirstTermMock).toHaveBeenCalledWith(undefined)
    expect(setResultOperationMock).toHaveBeenCalledWith(undefined)
    expect(setSymbolMock).toHaveBeenCalledWith(undefined)
  });
});
