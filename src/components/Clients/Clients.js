import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients, resetClient } from "../../redux/actions";

import styles from "../MainStyles/mainStyles.module.css";

const Clients = () => {
  const dispatch = useDispatch();

  const clients = useSelector((state) => state.client.data);

  useEffect(() => {
    dispatch(getClients());
    return () => dispatch(resetClient());
  }, []);

  const formatClients = () =>
    clients?.map((client) => (
      <div key={client.id}>
        <p>{client.name}</p>
        <span className={styles.clientPhoneNumber}>{client.phoneNumber}</span>
      </div>
    ));

  return (
    <div className={styles.clientContainer}>
      <div className={styles.resultList}>{formatClients()}</div>
    </div>
  );
};

export default Clients;
