import React from "react";

import styles from "./ChangesList.module.css";

interface Props {
  title: string;
  listItems: any[];
}

const ChangesList = ({ title, listItems }: Props) => {
  return (
    <div>
      <h4>{title}</h4>

      <ul className={styles.list}>
        {listItems.map((listItem: any, index: any) => (
          <li key={index}>
            {listItem.description}

            {listItem.link && (
              <div>
                <a
                  target="_blank"
                  href={listItem.link.url}
                  className={styles.link}
                >
                  {listItem.link.text}
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChangesList;
