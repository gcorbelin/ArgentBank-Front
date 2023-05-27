import styles from "./hero.module.css";

export default function Hero() {
  return (
    <div className={styles["hero"]}>
      <section className={styles["hero-content"]}>
        <h2 className="sr-only">Promoted Content</h2>
        <p className={styles["hero-subtitle"]}>No fees.</p>
        <p className={styles["hero-subtitle"]}>No minimum deposit.</p>
        <p className={styles["hero-subtitle"]}>High interest rates.</p>
        <p className={styles["hero-text"]}>
          Open a savings account with Argent Bank today!
        </p>
      </section>
    </div>
  );
}
