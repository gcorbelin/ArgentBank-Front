"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logIn } from "@/redux/features/auth";
import { getUser } from "@/redux/features/user";
import { selectAuth, useAppSelector } from "@/redux/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

export default function SignIn() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authError = useAppSelector(selectAuth).error;
  const isAuth = useAppSelector(selectAuth).isAuth;
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(logIn({ userName: userName, password: password }));
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(getUser());
      redirect("/user");
    }
  }, [isAuth, dispatch]);

  return (
    <main className="main bg-dark">
      <section className={styles["sign-in-content"]}>
        <FontAwesomeIcon
          icon={faUserCircle}
          className={styles["sign-in-icon"]}
        />
        <h1>Sign In</h1>
        <form onSubmit={(event) => handleLogin(event)}>
          <div className={styles["input-wrapper"]}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              defaultValue={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className={styles["input-wrapper"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              defaultValue={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles["input-remember"]}>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {authError && <p>{authError}</p>}
          <button type="submit" className={styles["sign-in-button"]}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
