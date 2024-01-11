import { FunctionComponent } from "react";
import styles from "./styles.module.css";

interface DisplayProps {
  historyView?: string;
  currentView: string;
}

const Display: FunctionComponent<DisplayProps> = ({
  historyView,
  currentView,
}) => {
  return (
    <div className="col-span-4 row-span-2 flex flex-col justify-center items-end px-2 overflow-hidden ">
      <div className={`${styles.history} ${styles.view} `}>{historyView}</div>
      <div className={`${styles.view} `}>{currentView}</div>
    </div>
  );
};

export default Display;
