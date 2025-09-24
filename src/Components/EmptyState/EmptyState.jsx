import React from 'react';
import styles from './EmptyState.module.css';

export default function EmptyState({ message = "No data available" }) {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIcon}>📊</div>
      <h3 className={styles.emptyTitle}>No Transactions Yet</h3>
      <p className={styles.emptyMessage}>{message}</p>
    </div>
  );
}
