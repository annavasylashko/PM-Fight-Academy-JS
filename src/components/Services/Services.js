import React, {useEffect, useState} from "react";
import Input from "../Input/Input";
import styles from "./services.module.css";
import {useDispatch, useSelector} from "react-redux";
import {addService, getServices, resetService} from "../../redux/actions";

const Services = () => {
  const dispatch = useDispatch()

  const services = useSelector(state => state.service.data)

  const [buttonState, setButtonState] = useState(true)

  const initialInputs = [
      {
      name: "name",
      value: "",
      error: ""
  },
  {
      name: "description",
      value: "",
      error: ""
  },
  {
      name: "price",
      value: "",
      error: ""
  }]

  const [inputs, setInputs] = useState([...initialInputs])

  useEffect(() => {
    dispatch(getServices())
    return () => dispatch(resetService())
  }, [])

  const inputHandler = (e) =>{
    setInputs(state => {
        let new_state = [...state]
        const index = new_state.findIndex(obj => obj.name === e.target.name)
        new_state[index].value = e.target.value
        new_state[index].error = ""
        return new_state
      }
    )
      if (e.target.value && inputs.every(i => i.value.length > 1)){
          setButtonState(false)
      }
  }
  const blurHandler = (e) => {
    if (e.target.value.length < 1) {
      setInputs(state => {
            let new_state = [...state]
            const index = new_state.findIndex(obj => obj.name === e.target.name)
            new_state[index].error = "Empty field"
            return new_state
          }
      )
      setButtonState(true)
    }
  }

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(addService({
          name: inputs.find(i => i.name === "name").value,
          description: inputs.find(i => i.name === "description").value,
          price: inputs.find(i => i.name === "price").value
      }))
      setInputs(state => [])
  }
    const addForm = (e) => {
        setButtonState(true)
        setInputs(state => [...initialInputs])
    }



  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <button onClick={addForm} className={styles.addBtn}>
          <p className={styles.addBtnText}>Add</p>
          <div className={styles.addBtnPlus}>+</div>
        </button>
        <div className={styles.resultList}>
          {services?.map((s) => <p key={s.name} className={styles.resumeDate}>{s.name}</p>)}
        </div>
      </div>

        {(inputs.length > 0) && <form action="" onSubmit={submitHandler} className={styles.rightContainer}>
          {inputs.map(i =>  <Input key={i.name+"_service"} onBlur={blurHandler} onChange={inputHandler} type="text" name={i.name} error={i?.error} />)}
        <button type="submit"  disabled={buttonState} className={styles.addBtn}>
          <p className={styles.addBtnText}>Done</p>
        </button>
      </form>}
    </div>
  )
}

export default Services;
