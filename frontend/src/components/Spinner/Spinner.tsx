import styles from "./Spinner.module.css";

function Spinner({ className = "" }: { className: string }) {
  return (
    <div className={`${className} ${styles.container}`}>
      <div className={styles.spinner} />
    </div>
  );
}

export default Spinner;
