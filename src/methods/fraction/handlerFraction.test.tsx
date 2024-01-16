import { handlerFraction } from "@/methods/fraction/handlerFraction";
import { setCurrentViewMock } from "../../../__test__/Mock/setMock";

describe("handlerFraction", () => {
  it("Não deverá adicionar um ponto se já houver ponto na string", () => {
    const mockData = {
      currentView: "1.1",
      setCurrentView: setCurrentViewMock,
    };

    handlerFraction(mockData);

    expect(setCurrentViewMock).not.toHaveBeenCalled();
  });

  it("Deverá adicionar um ponto à string se não houver ponto", () => {
    const mockData = {
      currentView: "123",
      setCurrentView: setCurrentViewMock,
    };

    handlerFraction(mockData);

    expect(setCurrentViewMock).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setCurrentViewMock.mock.calls[0][0];

    expect(updateFunction("")).toBe("123.");
  });
});
