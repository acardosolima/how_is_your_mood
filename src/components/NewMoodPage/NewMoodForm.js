import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useRef } from "react";

const NewMoodForm = () => {
  //Gets the current date to pass as a initial value to the date input
  const currentDate = new Date().toISOString().substring(0, 10);

  // Array with all the possible values for mood categories
  const levels = ["None", "Low", "Medium", "High", "Extreme"];

  const moodDateRef = useRef();
  const [anxietyValue, setAnxietyValue] = useState("");
  const [depressionValue, setDepressionValue] = useState("");
  const [enthusiasmValue, setEnthusiasmValue] = useState("");
  const [irritabilityValue, setIrritabilityValue] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState(false);
  const [alcoholConsumption, setAlcoholConsumption] = useState(false);
  const notesRef = useRef();

  const newMoodFormHandler = (event) => {
    event.preventDefault();

    const submitObject = {
      date: moodDateRef.current.value,
      anxiety: anxietyValue,
      depression: depressionValue,
      enthusiasm: enthusiasmValue,
      irritability: irritabilityValue,
      physicalActivity: physicalActivity,
      alcoholConsumption: alcoholConsumption,
      notes: notesRef.current.value,
    };

    console.log(submitObject);
  };

  const anxietyOnChangeHandler = (event) => {
    const selectedValue = event.target.id;
    setAnxietyValue(selectedValue.replace("Radio", ""));
  };

  const depressionOnChangeHandler = (event) => {
    const selectedValue = event.target.id;
    setDepressionValue(selectedValue.replace("Radio", ""));
  };

  const enthusiasmOnChangeHandler = (event) => {
    const selectedValue = event.target.id;
    setEnthusiasmValue(selectedValue.replace("Radio", ""));
  };

  const irritabilityOnChangeHandler = (event) => {
    const selectedValue = event.target.id;
    setIrritabilityValue(selectedValue.replace("Radio", ""));
  };

  const physicalActivityOnChangeHandler = (event) => {
    setPhysicalActivity(event.target.checked);
  };

  const alcoholConsumptionOnChangeHandler = (event) => {
    setAlcoholConsumption(event.target.checked);
  };

  return (
    <div className="container">
      <Form onSubmit={newMoodFormHandler}>
        <Form.Group className="mb-3" controlId="dateControlInput">
          <Form.Label> Date: </Form.Label>
          <Form.Control
            type="date"
            defaultValue={currentDate}
            ref={moodDateRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="anxietyControlInput">
          <Form.Label> Anxiety:</Form.Label>
          {levels.map((level) => {
            return (
              <Form.Check
                type="radio"
                name="anxiety"
                key={level + "AnxietyRadio"}
                id={level + "AnxietyRadio"}
                label={level}
                inline
                onChange={anxietyOnChangeHandler}
                required
              />
            );
          })}
        </Form.Group>

        <Form.Group className="mb-3" controlId="depressionControlInput">
          <Form.Label> Depression:</Form.Label>
          {levels.map((level) => {
            return (
              <Form.Check
                type="radio"
                name="depression"
                key={level + "DepressionRadio"}
                id={level + "DepressionRadio"}
                label={level}
                inline
                onChange={depressionOnChangeHandler}
                required
              />
            );
          })}
        </Form.Group>

        <Form.Group className="mb-3" controlId="enthusiasmControlInput">
          <Form.Label> Enthusiasm:</Form.Label>
          {levels.map((level) => {
            return (
              <Form.Check
                type="radio"
                name="enthusiasm"
                key={level + "EnthusiasmRadio"}
                id={level + "EnthusiasmRadio"}
                label={level}
                inline
                onChange={enthusiasmOnChangeHandler}
                required
              />
            );
          })}
        </Form.Group>

        <Form.Group className="mb-3" controlId="enthusiasmControlInput">
          <Form.Label> Irritability:</Form.Label>
          {levels.map((level) => {
            return (
              <Form.Check
                type="radio"
                name="irritability"
                key={level + "IrritabilityRadio"}
                id={level + "IrritabilityRadio"}
                label={level}
                inline
                onChange={irritabilityOnChangeHandler}
                required
              />
            );
          })}
        </Form.Group>

        <Form.Check
          type="switch"
          id="physicalActivitySwitch"
          label="Physical Activity"
          onChange={physicalActivityOnChangeHandler}
        />
        <Form.Check
          type="switch"
          id="alcoholConsumptionSwitch"
          label="Alcohol Consumption"
          onChange={alcoholConsumptionOnChangeHandler}
        />
        <Form.Group className="mb-3" controlId="notesControlInput">
          <Form.Label> Additional notes: </Form.Label>
          <Form.Control type="text" ref={notesRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLoginSubmitBtn">
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewMoodForm;
