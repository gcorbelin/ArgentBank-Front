"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { selectAuth, selectUser, useAppSelector } from "@/redux/selectors";
import { AppDispatch } from "@/redux/store";
import { updateUser } from "@/redux/features/user";
import Account, { AccountProps } from "../components/account/account";
import Loader from "../components/loader/loader";
import styles from "./page.module.css";

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
  const user = useAppSelector(selectUser);
  const userInfos = user.data;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>(
    userInfos ? userInfos.firstName : ""
  );
  const [lastName, setLastName] = useState<string>(
    userInfos ? userInfos.lastName : ""
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateUser({ firstName: firstName, lastName: lastName }));
    if (user.status === "resolved") {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userInfos) {
      setFirstName(userInfos.firstName);
      setLastName(userInfos.lastName);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      redirect("/signin");
    }
    if (userInfos) {
      setFirstName(userInfos.firstName);
      setLastName(userInfos.lastName);
    }
  }, [isAuth, userInfos, dispatch]);

  return (
    <>
      {(!isAuth || user.status === "pending") && <Loader />}
      {isAuth && (
        <main className="main bg-dark">
          <div className={styles["header"]}>
            <h1>
              Welcome back
              <br />
              {!isEditing && (
                <>
                  {userInfos?.firstName} {userInfos?.lastName}
                </>
              )}
            </h1>
            {isEditing && (
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className={styles["update-form-row"]}>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    id="lastName"
                    defaultValue={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
                <div className={styles["update-form-row"]}>
                  <button
                    type="button"
                    className={styles["edit-button"]}
                    onClick={() => {
                      handleCancel();
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles["edit-button"]}>
                    Save
                  </button>
                </div>
              </form>
            )}
            {!isEditing && (
              <button
                type="button"
                className={styles["edit-button"]}
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                Edit Name
              </button>
            )}
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
