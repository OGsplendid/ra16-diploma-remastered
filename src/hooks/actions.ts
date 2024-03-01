import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit"
import { localhostActions } from "../store/localhost.slice";

const actions = {
  ...localhostActions,
}

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
}