import { useEffect, useState, useContext, useMemo } from "react";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import styles from "./ProfileDetails.module.css";

/*
--------------------------------------------------------------------------------------------------
--- TODO: remove dummy data in email and lastVisit fields. Refactor test code to mock http req ---
--------------------------------------------------------------------------------------------------
*/
const ProfileDetails = () => {
  const [isLoading, error, sendRequest] = useHttp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("example@example.com");
  const [lastVisit, setLastVisit] = useState("2022-06-20");

  // Context access point to get authentication token information
  const authCtx = useContext(AuthContext);
  const token = useMemo(() => authCtx.token, [authCtx.token]);
  const userID = useMemo(() => authCtx.userID, [authCtx.userID]);

  const updateFields = (res) => {
    setFirstName(res.firstName);
    setLastName(res.lastName);
    setEmail(res.email);
    setLastVisit(res.lastVisit);
  };

  useEffect(() => {
    sendRequest(
      {
        url:
          "https://how-is-your-mood-today-default-rtdb.firebaseio.com/users/" +
          userID +
          ".json?auth=" +
          token,
      },
      updateFields
    );
  }, [sendRequest, userID, token]);

  return (
    <div className={styles.profile}>
      <h1> Your User Profile</h1>
      <div>
        <label htmlFor="firstName"> First Name: </label>
        <input type="text" id="firstName" value={firstName} disabled />
      </div>
      <div>
        <label htmlFor="lastName"> Last Name: </label>
        <input type="text" id="lastName" value={lastName} disabled />
      </div>
      <div>
        <label htmlFor="email"> E-mail: </label>
        <input type="email" id="email" alt="email" value={email} disabled />
      </div>
      <div>
        <label htmlFor="lastVisit"> Last visited in: </label>
        <input
          type="date"
          id="lastVisit"
          alt="lastVisit"
          value={lastVisit}
          disabled
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
