import { handlerDeleteNumber } from "@/methods/delete/handlerDeleteNumber";
import { setCurrentViewMock } from "../../../__test__/Mock/setMock";

describe("handlerDeleteNumber", () => {
  const createMockData = () => ({
    setCurrentView: setCurrentViewMock,
  });

  it("Deletar o último caractere da string se a string tiver mais de um caractere", () => {
    const mockData = createMockData();

    handlerDeleteNumber(mockData);

    expect(setCurrentViewMock).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction: (prevState: string) => string =
      setCurrentViewMock.mock.calls[0][0];

    expect(updateFunction("123")).toBe("12");
  });

  it("Retornar a 0 caso o visor contenha somente um número", () => {
    const updateFunction: (prevState: string) => string =
      setCurrentViewMock.mock.calls[0][0];

    expect(updateFunction("9")).toBe("0");
  });
});
