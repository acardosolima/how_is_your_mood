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
      <p> First Name:</p>
      <p> Last Name: </p>
      <p> E-mail:</p>
      <p> Last Visited in: </p>
    </div>
  );
};

export default ProfileDetails;
