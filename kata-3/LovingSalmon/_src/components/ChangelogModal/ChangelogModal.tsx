import React, { useState } from "react";

import changelog from "@/changelog.json";
import Modal from "@/components/common/Modal/Modal";

import ModalContent from "./ModalContent/ModalContent";

import styles from "./ChangelogModal.module.css";

const ChangelogModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const reversedChangelog: any[] = [...changelog.changes].reverse();

  return (
    <>
      <button className={styles.button} onClick={() => setModalOpened(true)}>
        C
      </button>

      <Modal opened={modalOpened} onModalClosed={() => setModalOpened(false)}>
        <ModalContent changelog={reversedChangelog} />
      </Modal>
    </>
  );
};

export default ChangelogModal;
