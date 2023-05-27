import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./nav.module.css";

export default function Nav() {
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
        <Link className={styles["main-nav-item"]} href="/signin">
          <FontAwesomeIcon icon={faUserCircle} />
          Sign In
        </Link>
        <Link className={styles["main-nav-item"]} href="/user">
          <FontAwesomeIcon icon={faUserCircle} />
          Tony
        </Link>
        <Link className={styles["main-nav-item"]} href="/">
          <i className="fa fa-sign-out"></i>
          <FontAwesomeIcon icon={faRightFromBracket} />
          Sign Out
        </Link>
      </div>
    </nav>
  );
}
