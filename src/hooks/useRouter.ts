import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from ".";
import { actionUpdateObjHistory } from "@/store/features/historyRoute";

interface QueryParams {
  [key: string]: string | number | boolean;
}

const useRouter = (defaultValue?: QueryParams[]) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [objHistory, setObjHistory] = useState(defaultValue || []);

  const replaceState = (newParams: QueryParams | QueryParams[]) => {
    const searchParamsObj = new URLSearchParams(window.location.search);
    searchParamsObj.sort = () => {};

    const paramsToUpdate = Array.isArray(newParams) ? newParams : [newParams];
    paramsToUpdate.forEach((params) => {
      Object.entries(params).forEach(([key, value]) => {
        const stringValue = value.toString();
        if (stringValue) {
          searchParamsObj.set(key, stringValue);
        } else {
          searchParamsObj.delete(key);
        }
      });
    });
    const filtersQuery = searchParamsObj
      .toString()
      .split("&")
      .map((value) => {
        const pair = value.split("=");
        return { key: pair[0], value: pair[1] };
      });

    setObjHistory(filtersQuery);
    dispatch(actionUpdateObjHistory(filtersQuery));
    window.history.replaceState({}, "", `?${searchParamsObj.toString()}`);
  };

  return { replaceState, navigate, objHistory };
};

export { useRouter };
