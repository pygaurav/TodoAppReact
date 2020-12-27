import React, { useEffect, useState } from "react";
import BucketComponent from "./BucketComponent";
import MenuList from "@material-ui/core/MenuList";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import NewBucketComponent from "../shared/NewItemComponent";
import {
  getAsyncBucket,
  addAsyncBucket,
  editAsyncBucket,
  removeAsyncBucket
} from "../../reducer/todoreducer/actions/bucket/actions";
import { getAsyncTodo } from "../../reducer/todoreducer/actions/todo/actions";
const BucketListComponent = (props) => {
  const {
    getTodo,
    buckets,
    addBucket,
    editBucket,
    getBucket,
    removeBucket
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const createText = "Create New Bucket";
  useEffect(() => {
    getBucket();
  }, []);
  return (
    <div>
      <ul className="menuList">
        {buckets.map((e) => (
          <BucketComponent
            key={e.key}
            values={e}
            editBucket={editBucket}
            removeBucket={removeBucket}
            getTodo={getTodo}
          />
        ))}
      </ul>
      <Icon
        onClick={handleClick}
        color="primary"
        className="clsRight iconAbs"
        style={{ fontSize: 50 }}
      >
        add_box
      </Icon>
      <NewBucketComponent
        anchorEl={anchorEl}
        open={open}
        id={id}
        title={createText}
        handleClose={handleClose}
        onSave={addBucket}
        bucketid=""
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    buckets: state.todo.buckets
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    getBucket: () => {
      dispatch(getAsyncBucket());
    },
    addBucket: (res) => {
      dispatch(addAsyncBucket(res));
    },
    editBucket: (res) => {
      dispatch(editAsyncBucket(res));
    },
    removeBucket: (res) => {
      dispatch(removeAsyncBucket(res));
    },
    getTodo: (res) => {
      dispatch(getAsyncTodo(res));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(BucketListComponent);
