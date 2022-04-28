import { useStore } from "effector-react";
import { FC, ReactNode, useEffect } from "react";
import { TextArea } from "../../shared/components/textarea";
import { debounce } from "../../shared/helpers/debounce";
import { $TextAreaStore, setTextArea } from "./model";
import styles from "./styles.module.css";

type FieldAreaPropsType = {
  actions: ReactNode;
  value: string;
  saver: any;
};

export const FieldArea: FC<FieldAreaPropsType> = ({
  actions,
  value,
  saver,
}) => {
  const textAreaState = useStore($TextAreaStore);
  useEffect(() => {
    setTextArea(value);
  }, [value]);
  return (
    <div className={styles.FieldArea}>
      <section className={styles.FieldTextArea}>
        <div className={styles.TextAreaContainer}>
          <TextArea
            disabled={false}
            name="discription"
            value={textAreaState}
            changer={setTextArea}
            saver={saver}
          />
        </div>
      </section>
      <section>{actions}</section>
    </div>
  );
};
