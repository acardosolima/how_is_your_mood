import styles from "./StartingPage.module.css";

/*
-----------------------------------------------------------
--- TODO: Add images and general styling                ---
-----------------------------------------------------------
*/
const StartingPage = () => {
  return (
    <div className="container">
      <section className={styles.starting}>
        <h1>
          If you're feeling down, this app is for you!
          <br />
          "How is your mood" lets you log your daily feelings, so you can track
          your progress and see how far you've come.
          <br />
          Sign up today and start feeling better!
        </h1>
      </section>
    </div>
  );
};

export default StartingPage;
