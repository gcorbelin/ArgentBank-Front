import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <p className={styles["footer-text"]}>Copyright 2020 Argent Bank</p>
    </footer>
  );
}
