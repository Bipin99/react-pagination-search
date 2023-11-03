import styles from './index.module.css'

export default function Spinner() {
  return (
    <div className={styles['spinner-container']}>
      <div className={styles.spinner}> loading</div>
    </div>
  );
}
