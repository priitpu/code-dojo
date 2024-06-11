import React from "react";

import ChangelogEntry from "./ChangelogEntry/ChangelogEntry";

import styles from "./ModalContent.module.css";

interface Props {
  changelog: any[];
}

const ModalContent = ({ changelog }: Props) => {
  return (
    <div className={styles.container}>
      <h2> Changelog</h2>
      <hr />

      <div className={styles.entriesList}>
        {changelog.map((changelogEntry: any, index: any) => (
          <ChangelogEntry key={index} entry={changelogEntry} />
        ))}
      </div>
    </div>
  );
};

export default ModalContent;
