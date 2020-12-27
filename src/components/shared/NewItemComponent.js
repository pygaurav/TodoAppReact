import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
const NewBucketComponent = (props) => {
  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2)
    }
  }));
  const classes = useStyles();
  const {
    anchorEl,
    open,
    id,
    handleClose,
    title,
    onSave,
    bucketid,
    bucketname
  } = props;
  const [name, setName] = useState("");
  const onChange = (e) => {
    setName(e.target.value);
  };
  const handleSave = () => {
    let Payload = {};
    if (!bucketid) {
      Payload.name = name;
    } else {
      Payload.name = name;
      Payload.key = bucketid;
      Payload.is_completed = false;
      Payload.bucketname = bucketname;
    }
    onSave(Payload);
  };
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
    >
      <div className={classes.typography}>
        <span>
          <Typography>{title}</Typography>
          <Input value={name} onChange={onChange} />
          <Icon onClick={handleSave} color="primary" className="clsRight">
            save
          </Icon>
        </span>
      </div>
    </Popover>
  );
};

export default NewBucketComponent;
