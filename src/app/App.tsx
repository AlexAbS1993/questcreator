import { useStore } from "effector-react";
import { Navigate, Route, Routes } from "react-router-dom";
import { $isModalOpen } from "../entities/Modal/model";
import { Creator } from "../pages/Creator";
import styles from "./app.module.css";
import { ModalRouter } from "./modalRouter";

function App() {
  const modal = useStore($isModalOpen);
  return (
    <div className={styles.AppContainer}>
      <Routes>
        <Route path="/creator/:id" element={<Creator />} />
        <Route path="*" element={<Navigate to="/creator/root" replace />} />
      </Routes>
      <>
        {modal && (
          <>
            <ModalRouter />
          </>
        )}
      </>
    </div>
  );
}

export default App;
