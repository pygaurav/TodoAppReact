import React, { Fragment } from "react";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import TodoComponent from "./TodoComponent";
import { connect } from "react-redux";
import {
  addAsyncTodo,
  editAsyncTodo,
  removeAsyncTodo,
  actionAsyncTodo
} from "../../reducer/todoreducer/actions/todo/actions";
import NewTodoListComponent from "../shared/NewItemComponent";
const TodoListComponent = (props) => {
  const {
    todo,
    selectedbucket,
    addTodo,
    actionTodo,
    editTodo,
    removeTodo,
    selectedbucketid
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
  const createText = "Create New Todo";
  return (
    <div className="clsTodoComp">
      {selectedbucket ? (
        <Typography variant="h4" component="h2">
          Todo {selectedbucket} - {todo.length} Items
        </Typography>
      ) : null}
      <div className="margTodoApp">
        {todo
          ? todo.map((e) => {
              return (
                <TodoComponent
                  key={e.key}
                  selectedbucketid={selectedbucketid}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                  actionTodo={actionTodo}
                  value={e}
                />
              );
            })
          : null}
        {selectedbucket ? (
          <Fragment>
            <Icon
              onClick={handleClick}
              color="primary"
              className="clsRight"
              style={{ fontSize: 50 }}
            >
              add
            </Icon>
            <NewTodoListComponent
              anchorEl={anchorEl}
              open={open}
              id={id}
              title={createText}
              handleClose={handleClose}
              onSave={addTodo}
              bucketid={selectedbucketid}
              bucketname={selectedbucket}
            />
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todo: state.todo.todo,
    selectedbucket: state.todo.selectedbucket,
    selectedbucketid: state.todo.selectedbucketid
  };
};

const mapActionToProps = (dispatch) => {
  return {
    addTodo: (res) => {
      dispatch(addAsyncTodo(res));
    },
    editTodo: (res) => {
      dispatch(editAsyncTodo(res));
    },
    removeTodo: (res) => {
      dispatch(removeAsyncTodo(res));
    },
    actionTodo: (res) => {
      dispatch(actionAsyncTodo(res));
    }
  };
};

export default connect(mapStateToProps, mapActionToProps)(TodoListComponent);
