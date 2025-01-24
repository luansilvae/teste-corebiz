import React from "react";

import styles from "./loading-shelf.module.scss";

export const LoadingShelf: React.FC = () => {
  return (
    <article className={styles.skeleton}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonPrice} />
      <div className={styles.skeletonButton} />
    </article>
  );
};
