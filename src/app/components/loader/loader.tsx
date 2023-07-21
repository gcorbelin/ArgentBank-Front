import styles from "./loader.module.css";
export default function Loader() {
  return (
    <div className={styles["ldio-spinner-wrapper"]}>
      <div className={styles["ldio-spinner-rolling"]}>
        <div className={styles["ldio-spinner"]}>
          <div></div>
        </div>
      </div>
    </div>
  );
}
