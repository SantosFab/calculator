import { FunctionComponent } from "react";
import styles from "./styles.module.css";

interface DisplayProps {
  historyView?: number;
  currentView: number;
}

const Display: FunctionComponent<DisplayProps> = ({
  historyView,
  currentView,
}) => {
  return (
    <>
      <div className={`${styles.history} overflow-hidden col-span-3 row-span-2`}>{historyView}</div>
      <div className="overflow-hidden">{currentView}</div>
    </>
  );
};

export default Display;
