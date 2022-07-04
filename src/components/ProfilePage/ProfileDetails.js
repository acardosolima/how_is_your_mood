import { useEffect, useState, useContext, useMemo } from "react";
import useHttp from "../../hooks/use-http";
import Modal from "../UI/Modal";
import LoadingSpinner from "../UI/LoadingSpinner";
import AuthContext from "../../store/auth-context";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import styles from "./ProfileDetails.module.css";

/*
--------------------------------------------------------------------------------------------------
--- TODO: remove dummy data in fields, should refactor test code to mock http req ---
--------------------------------------------------------------------------------------------------
*/
const ProfileDetails = () => {
  const [isLoading, error, sendRequest] = useHttp();
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("email@example.com");
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
    <Form>
      <fieldset disabled>
        <h1> Your user profile </h1>
        <Form.Group as={Row} className="mb-3" controlId="profileFirstName">
          <Form.Label column sm={2}>
            First Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" value={firstName} readOnly />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="profileLastName">
          <Form.Label column sm={2}>
            Last Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" value={lastName} readOnly />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="profileEmail">
          <Form.Label column sm={2}>
            E-mail:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" value={email} readOnly />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="profileLastVisit">
          <Form.Label column sm={2}>
            Last visited in:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" value={lastVisit} readOnly />
          </Col>
        </Form.Group>
      </fieldset>
      {error ? <Alert variant="danger"> {error} </Alert> : ""}
      {isLoading ? (
        <Modal>
          <LoadingSpinner />
        </Modal>
      ) : (
        ""
      )}
    </Form>
  );
};

export default ProfileDetails;
