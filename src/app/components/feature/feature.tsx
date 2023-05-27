import Image from "next/image";
import styles from "./feature.module.css";

export interface FeatureProps {
  imgSrc: string;
  imgAlt?: string;
  title: string;
  content: string;
}

export default function Feature({
  imgSrc,
  imgAlt = "",
  title,
  content,
}: FeatureProps) {
  return (
    <div className={styles["feature-item"]}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        className={styles["feature-icon"]}
        width={100}
        height={100}
      />
      <h3 className={styles["feature-item-title"]}>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
