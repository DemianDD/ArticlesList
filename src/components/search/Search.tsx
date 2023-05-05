import React, {ChangeEvent} from "react";
import "./Search.css"
import { connect, useDispatch } from "react-redux";
import { actionCreators } from "../../store/Articles";
import { ApplicationState } from "../../store";

export const Search = () => {

const dispatch = useDispatch();

  return(
      <div>
        <input 
            type="text"
            placeholder="Search for.."
            onChange ={(event) => dispatch(actionCreators.search(event.currentTarget.value))}
        />
    </div>
 
  );
}

connect(
    (state: ApplicationState) => state.article,
    actionCreators
  )(Search);
