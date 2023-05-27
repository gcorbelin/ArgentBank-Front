import styles from "./account.module.css";

export interface AccountProps {
  title: string;
  amount: string;
  description: string;
}

export default function Account({ title, amount, description }: AccountProps) {
  return (
    <section className={styles["account"]}>
      <div className={styles["account-content-wrapper"]}>
        <h3 className={styles["account-title"]}>{title}</h3>
        <p className={styles["account-amount"]}>{amount}</p>
        <p className={styles["account-amount-description"]}>{description}</p>
      </div>
      <div className={styles["account-content-wrapper cta"]}>
        <button className={styles["transaction-button"]}>
          View transactions
        </button>
      </div>
    </section>
  );
}
