"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectAuth, selectUser, useAppSelector } from "@/redux/selectors";
import { logOut } from "@/redux/features/auth";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./nav.module.css";

export default function Nav() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useAppSelector(selectAuth).isAuth;
  const userInfos = useAppSelector(selectUser).data;

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <nav className={styles["main-nav"]}>
      <Link className={styles["main-nav-logo"]} href="/">
        <Image
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
          className={styles["main-nav-logo-image"]}
          width={200}
          height={55}
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!isAuth && (
          <Link className={styles["main-nav-item"]} href="/signin">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
        {isAuth && userInfos && (
          <>
            <Link className={styles["main-nav-item"]} href="/user">
              <FontAwesomeIcon icon={faUserCircle} />
              {userInfos.firstName} {userInfos.lastName}
            </Link>
            <Link
              className={styles["main-nav-item"]}
              href="/"
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out"></i>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
