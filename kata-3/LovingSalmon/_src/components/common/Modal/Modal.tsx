import React, { ReactNode, useEffect, useRef } from "react";

import styles from "./Modal.module.css";

interface Props {
  children: ReactNode;
  opened: boolean;
  onModalClosed: () => void;
}

const Modal = ({ children, opened, onModalClosed }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.addEventListener("click", (event) => {
        const rect = ref.current!.getBoundingClientRect();

        const isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (!isInDialog) {
          ref.current?.close();
        }
      });
    }
  }, [ref]);

  useEffect(() => {
    if (opened) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [opened]);

  return (
    <dialog ref={ref} className={styles.container} onClose={onModalClosed}>
      <button className={styles.closeButton} onClick={onModalClosed}>
        X
      </button>

      {children}
    </dialog>
  );
};

export default Modal;
