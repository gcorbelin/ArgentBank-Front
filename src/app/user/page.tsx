"use client";
import { useEffect } from "react";
import { selectAuth, selectUser, useAppSelector } from "@/redux/selectors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Account, { AccountProps } from "../components/account/account";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import Loader from "../components/loader/loader";

const accounts: AccountProps[] = [
  {
    title: "Argent Bank Checking (x8349)",
    amount: "$2,082.79",
    description: "Available Balance",
  },
  {
    title: "Argent Bank Savings (x6712)",
    amount: "$10,928.42",
    description: "Available Balance",
  },
  {
    title: "Argent Bank Credit Card (x8349)",
    amount: "$184.30",
    description: "Current Balance",
  },
];

export default function User() {
  const isAuth = useAppSelector(selectAuth).isAuth;
  const dispatch = useDispatch<AppDispatch>();
  const userInfos = useAppSelector(selectUser).data;

  useEffect(() => {
    if (!isAuth) {
      redirect("/signin");
    }
  }, [isAuth, dispatch]);

  return (
    <>
      {!isAuth && <Loader />}
      {isAuth && (
        <main className="main bg-dark">
          <div className={styles["header"]}>
            <h1>
              Welcome back
              <br />
              {userInfos?.firstName} {userInfos?.lastName}
            </h1>
            <button className={styles["edit-button"]}>Edit Name</button>
          </div>
          <h2 className="sr-only">Accounts</h2>
          {accounts.map((account) => (
            <Account
              key={account.title}
              title={account.title}
              amount={account.amount}
              description={account.description}
            />
          ))}
        </main>
      )}
    </>
  );
}
