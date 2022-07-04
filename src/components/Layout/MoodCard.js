import Card from "react-bootstrap/Card";
import TimeAgo from "timeago-react";

import styles from "./MoodCard.module.css";

const formatDate = (stringDate) => {};

const MoodCard = (props) => {
  return (
    <Card className={styles.card} bg="light" text="dark" key={props.data.key}>
      <Card.Header as="h5"> {props.data.date} </Card.Header>
      <Card.Body>
        <Card.Text>Anxiety: {props.data.anxiety}</Card.Text>
        <Card.Text>Depression: {props.data.depression}</Card.Text>
        <Card.Text>Enthusiasm: {props.data.enthusiasm}</Card.Text>
        <Card.Text>Irritability: {props.data.irritability}</Card.Text>
        <hr />
        <Card.Text> {props.data.notes}</Card.Text>
        <Card.Footer>
          <small>
            Created <TimeAgo datetime={props.data.createdAt} />
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default MoodCard;
