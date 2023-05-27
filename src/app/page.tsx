import { Metadata } from "next";
import Hero from "./components/hero/hero";
import Feature, { FeatureProps } from "./components/feature/feature";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
};

const features: FeatureProps[] = [
  {
    imgSrc: "/img/icon-chat.png",
    imgAlt: "Chat Icon",
    title: "You are our #1 priority",
    content:
      "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
  },
  {
    imgSrc: "/img/icon-money.png",
    imgAlt: "Money Icon",
    title: "More savings means higher rates",
    content:
      "The more you save with us, the higher your interest rate will be!",
  },
  {
    imgSrc: "/img/icon-security.png",
    imgAlt: "Security Icon",
    title: "Security you can trust",
    content:
      "We use top of the line encryption to make sure your data and money is always safe.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <section className={styles["features"]}>
        <h2 className="sr-only">Features</h2>
        {features.map((feature) => (
          <Feature
            key={feature.imgSrc}
            imgSrc={feature.imgSrc}
            imgAlt={feature.imgAlt}
            title={feature.title}
            content={feature.content}
          />
        ))}
      </section>
    </main>
  );
}
