import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addSnack } from "../../store/action-creators/snackbar";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(addSnack, dispatch);
};
