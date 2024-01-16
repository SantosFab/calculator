import { TypeOfOperator } from '@/utils/interface/operator/interfaceTypeOfOperator';
import { Dispatch, SetStateAction } from 'react';

interface HandlerClearProps {
  setCurrentHistory: Dispatch<SetStateAction<string | undefined>>;
  setCurrentView: Dispatch<SetStateAction<string>>;
  setSymbol: Dispatch<SetStateAction<TypeOfOperator | undefined>>;
  setFirstTerm: Dispatch<SetStateAction<number | undefined>>;
  setResultOperation: Dispatch<SetStateAction<number | undefined>>;
}

export function handlerClear({
  setCurrentHistory,
  setCurrentView,
  setSymbol,
  setFirstTerm,
  setResultOperation,
}: HandlerClearProps): void {
  setCurrentHistory(undefined);
  setCurrentView('0');
  setSymbol(undefined);
  setFirstTerm(undefined);
  setResultOperation(undefined);
}
