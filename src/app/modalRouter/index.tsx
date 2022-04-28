import { useStore } from "effector-react";
import { $ModalType } from "../../entities/Modal/model";
import { SelectIdListModal } from "../../widgets/Modal";

export const ModalRouter = () => {
  const modalType = useStore($ModalType);
  switch (modalType) {
    case "selectId": {
      return <SelectIdListModal />;
    }
    case "default": {
      return <></>;
    }
  }
  return <></>;
};
