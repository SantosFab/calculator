import { handlerFraction } from "@/methods/fraction/handlerFraction";
import { setCurrentViewMock } from "../../../__test__/Mock/setMock";

describe("handlerFraction", () => {
  it("Não deverá adicionar um ponto se já houver ponto na string", () => {
    handlerFraction({
      currentView: "1.1",
      setCurrentView: setCurrentViewMock,
    });

    expect(setCurrentViewMock).not.toHaveBeenCalled();
  });

  it("Deverá adicionar um ponto à string se não houver ponto", () => {
    handlerFraction({
      currentView: "123",
      setCurrentView: setCurrentViewMock,
    });

    expect(setCurrentViewMock).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setCurrentViewMock.mock.calls[0][0];

    expect(updateFunction("")).toBe("123.");
  });
});
