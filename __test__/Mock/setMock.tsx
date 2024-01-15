import { TypeOfOperator } from "@/utils/interface/interfaceTypeOfOperator";
import { Dispatch } from "react";

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
export const setResultOperationMock = jest.fn() as jest.Mock<
  Dispatch<number | undefined>
>;
