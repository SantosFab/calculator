import { TypeOfOperator } from "@/utils/interface/interfaceTypeOfOperator";
import { Dispatch, SetStateAction } from "react";

export const setCurrentHistoryMock = jest.fn() as jest.Mock<
  Dispatch<string | undefined>
>;
export const setCurrentViewMock = jest.fn() as jest.Mock<Dispatch<string>>;
export const setSymbolMock = jest.fn() as jest.Mock<
  Dispatch<TypeOfOperator | undefined>
>;
export const setFirtTermMock = jest.fn() as jest.Mock<
  Dispatch<number | undefined>
>;
export const setResultOperation = jest.fn() as jest.Mock<
  Dispatch<number | undefined>
>;
