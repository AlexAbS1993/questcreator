import { FC, ReactNode } from "react";
import styles from "./styles.module.css";
import { Input } from "../../shared/components/input";

type VariantPropsType = {
  name: string;
  value: string;
  changer: any;
  isNowTyping: boolean;
  after: ReactNode;
};

export const Variant: FC<VariantPropsType> = ({
  name,
  value,
  changer,
  after,
  isNowTyping,
}) => {
  return (
    <>
      {isNowTyping && (
        <div
          className={styles.VariantChangingBackground}
          onClick={(event) => {
            event.stopPropagation();
          }}
        ></div>
      )}
      <div
        className={[
          styles.VariantWrapper,
          isNowTyping && styles.VariantWrapperActive,
        ].join(" ")}
      >
        <div className={styles.VariantContainer}>
          <Input
            name={name}
            value={value}
            changer={changer}
            disabled={!isNowTyping}
          />
          <div className={styles.VariantActions}>{after}</div>
        </div>
      </div>
    </>
  );
};
