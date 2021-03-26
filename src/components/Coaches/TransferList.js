import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {
  addQualification,
  deleteQualifications,
  getQualifications, getServices,
  resetQualifications, resetService
} from "../../redux/actions";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 200,
    height: 250,
    overflow: "hidden",
    background: "#01010152",
    color: "#fff",
    display: "flex",
    flexDirection: "Column"
  },
  header: {
    padding: "8px",
    color: "#f5ff01",
    fontSize: "1rem"
  },
  hr: {
    background: "#fff",
  },
  button: {
    margin: theme.spacing(0.5, 0),
    color: "#f5ff01",
    borderColor: "#f5ff01",
  },
  list:{
    overflow: "auto",
  }
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({searchId}) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const qualifications = useSelector((state) => state.qualification.data);

  const services = useSelector((state) => state.service.data);

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState( []);
  const [right, setRight] = useState( []);

  const update = (list) => {
    const selectedId = qualifications.map(q => q.ServiceId)

    const left = list.filter((l) => selectedId.indexOf(l.id) === -1)
    const right = list.filter((l) => selectedId.indexOf(l.id) !== -1)

    setLeft([...left])
    setRight([...right])
  }

  useEffect(  () => {
    dispatch(getQualifications('CoachId', searchId));
    dispatch(getServices())

    return () => {
      dispatch(resetQualifications())
      dispatch(resetService())
    }
  },[dispatch]);

  useEffect(()=>{
    update(services)
  }, [services])

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const createQualification = (serviceId) => {
    return {
      id: (searchId * serviceId)*Date.now(),
      ServiceId: serviceId,
      CoachId: searchId
    }
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(checked)
  };

  const handleAllRight = () => {
    left.forEach(s => dispatch(addQualification(createQualification(s.id))))
    left.forEach(s => console.log(createQualification(s.id)))
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = async () => {
    leftChecked.forEach(s => dispatch(addQualification(createQualification(s.id))))

    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));

  };

  const handleCheckedLeft = () => {
    const selectedId = rightChecked.map(s => s.id)
    const qForDel = qualifications.filter((q) => selectedId.indexOf(q.ServiceId) !== -1)
    qForDel.forEach(q => dispatch(deleteQualifications(q.id)))

    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    const selectedId = right.map(s => s.id)
    const qForDel = qualifications.filter((q) => selectedId.indexOf(q.ServiceId) !== -1)
    qForDel.forEach(q => dispatch(deleteQualifications(q.id)))

    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (title, items) => (
    <Paper className={classes.paper}>
      <CardHeader className={classes.header}
          title={title}
      />
      <Divider className={classes.hr} />
      <List dense className={classes.list} component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.id}-label`;

          return (
            <ListItem
              key={value.id}
              role="listItem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  style={{ color: "#f5ff01" }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item>{customList('Available', left)}</Grid>
      <Grid item id="Arrow_buttons">
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Selected', right)}</Grid>
    </Grid>
  );
}