import { handlerFraction } from "@/methods/fraction/handlerFraction";
import { setCurrentViewMock } from "../../../__test__/Mock/setMock";

describe("handlerFraction", () => {
  interface MockDataOverrides {
    currentView?: string;
    setCurrentView?: jest.Mock;
  }

  const createMockData = (overrides: MockDataOverrides = {}) => ({
    currentView: "0",
    setCurrentView: setCurrentViewMock,
    ...overrides,
  });

  it("Não deverá adicionar um ponto se já houver ponto na string", () => {
    const mockData = createMockData({
      currentView: "1.1",
    });

    handlerFraction(mockData);

    expect(setCurrentViewMock).not.toHaveBeenCalled();
  });

  it("Deverá adicionar um ponto à string se não houver ponto", () => {
    const mockData = createMockData({
      currentView: "123",
    });

    handlerFraction(mockData);

    expect(setCurrentViewMock).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setCurrentViewMock.mock.calls[0][0];

    expect(updateFunction("")).toBe("123.");
  });
});
