import classes from "./StartingPage.module.css";

const StartingPage = () => {
  return (
    <section className={classes.starting}>
      <h1>
        If you're feeling down, this app is for you!
        <br />
        "How is your mood today" lets you log your daily feelings, so you can
        track your progress and see how far you've come.
        <br />
        Sign up today and start feeling better!
      </h1>
    </section>
  );
};

export default StartingPage;
