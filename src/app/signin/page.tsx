import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

export default function SignIn() {
  return (
    <main className="main bg-dark">
      <section className={styles["sign-in-content"]}>
        <FontAwesomeIcon
          icon={faUserCircle}
          className={styles["sign-in-icon"]}
        />
        <h1>Sign In</h1>
        <form>
          <div className={styles["input-wrapper"]}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className={styles["input-wrapper"]}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className={styles["input-remember"]}>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className={styles["sign-in-button"]}>Sign In</button>
        </form>
      </section>
    </main>
  );
}
