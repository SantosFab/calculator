import { handlerDeleteNumber } from "@/methods/delete/handlerDeleteNumber";
import { setCurrentViewMock } from "../../Mock/setMock";

describe("handlerDeleteNumber", () => {
  it("Deve deletar o último caractere da string se a string tiver mais de um caractere", () => {
    handlerDeleteNumber({
      setCurrentView: setCurrentViewMock,
    });
    expect(setCurrentViewMock).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction: (prevState: string) => string =
    setCurrentViewMock.mock.calls[0][0];

    expect(updateFunction("123")).toBe("12");
  });
  it('Retornar 0 caso o visor contenha somente um número', ()=>{

    const updateFunction: (prevState: string) => string = setCurrentViewMock.mock.calls[0][0]
    expect(updateFunction('9')).toBe('0')
  })
});
