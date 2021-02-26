import React from "react";
import { connect } from "react-redux";
import { addBattles } from "./../redux/gwestActions.js";

const Battles = (props) => {
  return <h2>Battle</h2>;
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userID: state.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBattles: (battles) => dispatch(addBattles(battles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battles);
