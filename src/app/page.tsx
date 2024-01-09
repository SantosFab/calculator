import { MouseEvent } from "react";
import Button from "./compoments/button/Button";
import Display from "./compoments/display/Display";

export default function Calculator() {
  return (
    <div className="calculator grid grid-cols-4 grid-flow-row  gap-1 p-1">
      <Display currentView={0}></Display>
      <Button symbol="CE" isSpan={true} isGray={true} />
      <Button symbol="⇤" isGray={true} />
      <Button symbol="/" isGray={true} />
      <Button symbol={7} />
      <Button symbol={8} />
      <Button symbol={9} />
      <Button symbol="*" isGray={true} />
      <Button symbol={4} />
      <Button symbol={5} />
      <Button symbol={6} />
      <Button symbol="-" isGray={true} />
      <Button symbol={1} />
      <Button symbol={2} />
      <Button symbol={3} />
      <Button symbol="+" isGray={true} />
      <Button symbol={0} isSpan={true} />
      <Button symbol="." />
      <Button symbol="=" isBlue={true} />
    </div>
  );
}
