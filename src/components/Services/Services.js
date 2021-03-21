import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  deleteService,
  getServices,
  resetService,
  updateService,
  getCoaches,
  resetCoach,
} from "../../redux/actions";

import Input from "../Input/Input";
import TransferList from "../TransferList/TransferList";
import styles from "../MainStyles/mainStyles.module.css";

const Services = () => {
  const dispatch = useDispatch();

  const services = useSelector((state) => state.service.data);
  const [service, setUpdateService] = useState({});

  const coaches = useSelector((state) => state.coach.data);

  const [isCreateButtonDisabled, setCreateButtonDisabling] = useState(true);
  const [isDeleteButtonDisabled, setDeleteButtonDisabling] = useState(true);
  const [isUpdateButtonDisabling, setUpdateButtonDisabling] = useState(true);

  const [isCreateButtonVisible, setCreateButtonVisibility] = useState(true);
  const [isDeleteButtonVisible, setDeleteButtonVisibility] = useState(false);
  const [isUpdateButtonVisible, setUpdateButtonVisibility] = useState(false);

  const initialInputs = [
    {
      name: "name",
      value: "",
      error: "",
    },
    {
      name: "description",
      value: "",
      error: "",
    },
    {
      name: "price",
      value: "",
      error: "",
    },
  ];

  const [inputs, setInputs] = useState([...initialInputs]);

  useEffect(() => {
    dispatch(getServices());
    return () => dispatch(resetService());
  }, [dispatch]);

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
      addService({
        name: inputs.find((i) => i.name === "name").value,
        description: inputs.find((i) => i.name === "description").value,
        price: inputs.find((i) => i.name === "price").value,
      })
    );
    setInputs((state) => []);
  };

  const updateHandler = () => {
    dispatch(
      updateService({
        name: inputs.find((i) => i.name === "name").value,
        description: inputs.find((i) => i.name === "description").value,
        price: inputs.find((i) => i.name === "price").value,
        id: service.id,
      })
    );
    initialFormState();
  };

  const deleteHandler = () => {
    dispatch(deleteService(service.id));
    initialFormState();
  };

  const addForm = (e) => {
    initialFormState();
  };

  const setService = (serviceId) => {
    return (e) => {
      setCreateButtonVisibility(false);
      setDeleteButtonVisibility(true);
      setUpdateButtonVisibility(true);
      setDeleteButtonDisabling(false);
      const service = services.find((service) => service.id === serviceId);
      setUpdateService(service);
      const serviceInput = [
        {
          name: "name",
          value: service.name,
          error: "",
        },
        {
          name: "description",
          value: service.description,
          error: "",
        },
        {
          name: "price",
          value: service.price,
          error: "",
        },
      ];
      setInputs((state) => [...serviceInput]);
    };
  };

  const formatServices = () =>
    services?.map((s) => (
      <p key={s.id} onClick={setService(s.id)}>
        {s.name}
      </p>
    ));

  const formatCoaches = () =>
    coaches?.map((coach) => `${coach.firstName} ${coach.lastName}`);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <button onClick={addForm} className={styles.addBtn}>
          <p className={styles.addBtnText}>Add</p>
          <div className={styles.addBtnPlus}>+</div>
        </button>
        <div className={styles.resultList}>{formatServices()}</div>
      </div>

      <div className={styles.rightContainer}>
        {inputs.length > 0 && (
          <form action="" onSubmit={submitHandler}>
            {inputs.map((i) => (
              <Input
                key={i.name + "_service"}
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

        <TransferList left={formatCoaches()} right={[]} name="coaches" />
      </div>
    </div>
  );
};

export default Services;
