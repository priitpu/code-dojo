import React from "react";

import ChangesList from "./ChangesList/ChangesList";

import styles from "./ChangelogEntry.module.css";

interface Props {
  entry: any;
}

const ChangelogEntry = ({ entry }: Props) => {
  const { version, date, description, features, bugfixes } = entry;

  const formattedDate = new Date(date).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.container}>
      <h3>
        <span>v{version}</span>
        <span> - </span>
        <span>{formattedDate}</span>
      </h3>

      {description && <p>{description}</p>}

      {features.length > 0 && (
        <ChangesList title="Features" listItems={features} />
      )}

      {bugfixes.length > 0 && (
        <ChangesList title="Bug fixes" listItems={bugfixes} />
      )}
    </div>
  );
};

export default ChangelogEntry;
