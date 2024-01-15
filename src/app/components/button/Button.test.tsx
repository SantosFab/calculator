import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  const callBack = jest.fn() as jest.Mock<
    void,
    [React.MouseEvent<HTMLButtonElement>]
  >;
  const isTrue = true as boolean;
  const symbol = "2" as string | number;
  const isSpan = "col-span-2" as string;
  const isBlue = "blue" as string;
  const isGray = "gray" as string;

  it("renderização com somente symbol e Onclick", () => {
    const { getByText } = render(<Button onClick={callBack} symbol={symbol} />);

    const button = getByText(symbol);
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(callBack).toHaveBeenCalled();
  });

  it("renderização com style blue", () => {
    const { getByText } = render(
      <Button onClick={callBack} symbol={symbol} isBlue={isTrue} />
    );
    expect(getByText(symbol)).toHaveClass(isBlue);
    expect(getByText(symbol)).not.toHaveClass(isGray);
    expect(getByText(symbol)).not.toHaveClass(isSpan);
  });

  it("renderização com style isSpan ", () => {
    const { getByText } = render(
      <Button onClick={callBack} symbol={symbol} isSpan={isTrue} />
    );
    expect(getByText(symbol)).toHaveClass(isSpan);
    expect(getByText(symbol)).not.toHaveClass(isGray);
    expect(getByText(symbol)).not.toHaveClass(isBlue);
  });

  it("renderização com style  IsGray", () => {
    const { getByText } = render(
      <Button onClick={callBack} symbol={symbol} isGray={isTrue} />
    );
    expect(getByText(symbol)).toHaveClass(isGray);
    expect(getByText(symbol)).not.toHaveClass(isBlue);
    expect(getByText(symbol)).not.toHaveClass(isSpan);
  });

  it("renderização com style isSpan e IsGray", () => {
    const { getByText } = render(
      <Button
        onClick={callBack}
        symbol={symbol}
        isBlue={isTrue}
        isSpan={isTrue}
      />
    );
    expect(getByText(symbol)).toHaveClass(isBlue);
    expect(getByText(symbol)).not.toHaveClass(isGray);
    expect(getByText(symbol)).toHaveClass(isSpan);
  });
});
