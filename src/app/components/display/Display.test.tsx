import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import Display from "./Display";

describe("Display component", () => {
  it("renderização com somente o CurrentView", () => {
    const currentView = "Conteúdo do Current View";

    const { getByText, queryByText } = render(
      <Display currentView={currentView} />
    );

    expect(getByText(currentView)).toBeInTheDocument();
    const historyViewElement = queryByText(/conteúdo do history view/i);
    expect(historyViewElement).toBeNull();
  });

  it("renderização com o CurrentView e CurrentHistory", () => {
    const historyView = "Conteúdo do History View";
    const currentView = "Conteúdo do Current View";

    const { getByText } = render(
      <Display historyView={historyView} currentView={currentView} />
    );

    expect(getByText(historyView)).toBeInTheDocument();
    expect(getByText(currentView)).toBeInTheDocument();
  });
});
