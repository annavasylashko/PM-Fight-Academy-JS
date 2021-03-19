import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoach, getCoaches, resetCoach } from "../../redux/actions";

import Input from "../Input/Input";

import styles from "../MainStyles/mainStyles.module.css";

const Coaches = () => {
  const dispatch = useDispatch();

  const coaches = useSelector((state) => state.coach.data);

  const [buttonState, setButtonState] = useState(true);

  const initialInputs = [
    {
      name: "firstName",
      value: "",
      error: "",
    },
    {
      name: "lastName",
      value: "",
      error: "",
    },
    {
      name: "birthDate",
      value: "",
      error: "",
    },
    {
      name: "description",
      value: "",
      error: "",
    },
    {
      name: "phoneNumber",
      value: "",
      error: "",
    },
  ];

  const [inputs, setInputs] = useState([...initialInputs]);

  useEffect(() => {
    dispatch(getCoaches());
    return () => dispatch(resetCoach());
  }, []);

  const inputHandler = (e) => {
    setInputs((state) => {
      let new_state = [...state];
      const index = new_state.findIndex((obj) => obj.name === e.target.name);
      new_state[index].value = e.target.value;
      new_state[index].error = "";
      return new_state;
    });
    if (e.target.value && inputs.every((i) => i.value.length > 1)) {
      setButtonState(false);
    }
  };

  const blurHandler = (e) => {
    if (e.target.value.length < 1) {
      setInputs((state) => {
        let new_state = [...state];
        const index = new_state.findIndex((obj) => obj.name === e.target.name);
        new_state[index].error = "Empty field";
        return new_state;
      });
      setButtonState(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addCoach({
        firstName: inputs.find((i) => i.name === "firstName").value,
        lastName: inputs.find((i) => i.name === "lastName").value,
        birthDate: inputs.find((i) => i.name === "birthDate").value,
        description: inputs.find((i) => i.name === "description").value,
        phoneNumber: inputs.find((i) => i.name === "phoneNumber").value,
      })
    );
    setInputs((state) => []);
  };

  const addForm = (e) => {
    setButtonState(true);
    setInputs((state) => [...initialInputs]);
  };

  const formatCoaches = () =>
    coaches?.map((coach) => (
      <p key={coach.id}>
        {coach.firstName} {""}
        {coach.lastName}
      </p>
    ));

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <button onClick={addForm} className={styles.addBtn}>
          <p className={styles.addBtnText}>Add</p>
          <div className={styles.addBtnPlus}>+</div>
        </button>
        <div className={styles.resultList}>{formatCoaches()}</div>
      </div>

      <div className={styles.rightContainer}>
        {inputs.length > 0 && (
          <form action="" onSubmit={submitHandler}>
            {inputs.map((i) => (
              <Input
                key={i.name + "_coach"}
                onBlur={blurHandler}
                onChange={inputHandler}
                type="text"
                name={i.name}
                error={i?.error}
              />
            ))}
            <div className={styles.btnContainer}>
              <button
                type="submit"
                disabled={buttonState}
                className={styles.addBtn}
              >
                <p className={styles.addBtnText}>Done</p>
              </button>
              <button
                type="reset"
                disabled={buttonState}
                className={styles.addBtn}
              >
                <p className={styles.addBtnText}>Delete</p>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Coaches;
