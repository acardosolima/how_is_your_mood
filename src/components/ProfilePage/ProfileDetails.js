import styles from "./ProfileDetails.module.css";

/*
-------------------------------------------------------------------------------------------
--- TODO: Create edit option and read/update user information, persisting in database   ---
-------------------------------------------------------------------------------------------
*/
const ProfileDetails = () => {
  return (
    <div className={styles.profile}>
      <h1> Your User Profile</h1>
      <div>
        <label htmlFor="firstName"> First Name:</label>
        <input
          type="text"
          id="firstName"
          alt="firstName"
          value="Adriano"
          disabled
        />
      </div>
      <div>
        <label htmlFor="lastName"> E-mail:</label>
        <input type="text" id="lastName" alt="lastName" value="Lima" disabled />
      </div>
      <div>
        <label htmlFor="email"> E-mail:</label>
        <input
          type="email"
          id="email"
          alt="email"
          value="adrianocardoso1991@gmail.com"
          disabled
        />
      </div>
      <div>
        <label htmlFor="lastVisit"> Last visited in:</label>
        <input
          type="date"
          id="lastVisit"
          alt="lastVisit"
          value="2022-06-20"
          disabled
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
