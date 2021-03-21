import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoach,
  getCoaches,
  updateCoach,
  deleteCoach,
  resetCoach,
} from "../../redux/actions";

import Input from "../Input/Input";

import styles from "../MainStyles/mainStyles.module.css";

const Coaches = () => {
  const dispatch = useDispatch();

  const coaches = useSelector((state) => state.coach.data);
  const [coach, setUpdateCoach] = useState({});

  const [isCreateButtonDisabled, setCreateButtonDisabling] = useState(true);
  const [isDeleteButtonDisabled, setDeleteButtonDisabling] = useState(true);
  const [isUpdateButtonDisabling, setUpdateButtonDisabling] = useState(true);

  const [isCreateButtonVisible, setCreateButtonVisibility] = useState(true);
  const [isDeleteButtonVisible, setDeleteButtonVisibility] = useState(false);
  const [isUpdateButtonVisible, setUpdateButtonVisibility] = useState(false);

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

  const initialFormState = () => {
    setCreateButtonDisabling(true);
    setCreateButtonVisibility(true);
    setDeleteButtonVisibility(false);
    setUpdateButtonVisibility(false);
    setInputs((state) => [...initialInputs]);
  };

  const inputHandler = (e) => {
    setInputs((state) => {
      let new_state = [...state];
      const index = new_state.findIndex((obj) => obj.name === e.target.name);
      new_state[index].value = e.target.value;
      new_state[index].error = "";
      return new_state;
    });
    if (e.target.value && inputs.every((i) => i.value.length > 1)) {
      setCreateButtonDisabling(false);
      setUpdateButtonDisabling(false);
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
      setCreateButtonDisabling(true);
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

  const updateHandler = () => {
    dispatch(
      updateCoach({
        firstName: inputs.find((i) => i.name === "firstName").value,
        lastName: inputs.find((i) => i.name === "lastName").value,
        birthDate: inputs.find((i) => i.name === "birthDate").value,
        description: inputs.find((i) => i.name === "description").value,
        phoneNumber: inputs.find((i) => i.name === "phoneNumber").value,
        id: coach.id,
      })
    );
    initialFormState();
  };

  const deleteHandler = () => {
    dispatch(deleteCoach(coach.id));
    initialFormState();
  };

  const addForm = (e) => {
    initialFormState();
  };

  const setCoach = (coachId) => {
    return (e) => {
      setCreateButtonVisibility(false);
      setDeleteButtonVisibility(true);
      setUpdateButtonVisibility(true);
      setDeleteButtonDisabling(false);
      const coach = coaches.find((coach) => coach.id === coachId);
      setUpdateCoach(coach);
      const coachInput = [
        {
          name: "firstName",
          value: coach.firstName,
          error: "",
        },
        {
          name: "lastName",
          value: coach.lastName,
          error: "",
        },
        {
          name: "birthDate",
          value: coach.birthDate,
          error: "",
        },
        {
          name: "description",
          value: coach.description,
          error: "",
        },
        {
          name: "phoneNumber",
          value: coach.phoneNumber,
          error: "",
        },
      ];
      setInputs((state) => [...coachInput]);
    };
  };

  const formatCoaches = () =>
    coaches?.map((coach) => (
      <p key={coach.id} onClick={setCoach(coach.id)}>
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
                defaultValue={i.value}
                error={i?.error}
              />
            ))}
            <div className={styles.btnContainer}>
              {isDeleteButtonVisible && (
                <button
                  onClick={deleteHandler}
                  disabled={isDeleteButtonDisabled}
                  className={styles.addBtn}
                >
                  <p className={styles.addBtnText}>Delete</p>
                </button>
              )}
              {isCreateButtonVisible && (
                <button
                  type="submit"
                  disabled={isCreateButtonDisabled}
                  className={styles.addBtn}
                >
                  <p className={styles.addBtnText}>Done</p>
                </button>
              )}
              {isUpdateButtonVisible && (
                <button
                  onClick={updateHandler}
                  disabled={isUpdateButtonDisabling}
                  className={styles.addBtn}
                >
                  <p className={styles.addBtnText}>Update</p>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Coaches;
