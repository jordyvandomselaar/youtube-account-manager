import {Dispatch, FC, useEffect, useReducer} from "react";

export interface LoggedInProps {
    loggedIn: boolean;
    loggedInDispatch: Dispatch<Action>
};

export interface Action {
    type: "LOGIN" | "LOGOUT" | "INIT",
}

type State = boolean;

const reducerFunc = (state: State, action: Action) => {
    switch (action.type) {
        case "INIT":
            return !!window.localStorage.getItem("loggedIn");
        case "LOGIN":
            window.localStorage.setItem("loggedIn", "true")
            return true;
        case "LOGOUT":
            window.localStorage.removeItem("loggedIn")
            return false;
        default:
            return state;
    }
}

const useLoggedIn = (): [boolean, Dispatch<Action>] => {
    const [state, dispatch] =  useReducer(reducerFunc, false)

    useEffect(() => {
        dispatch({
            type: "INIT"
        })
    }, []);

    return [state, dispatch];
};

export interface LoggedInRenderProps {
    render: (props: [boolean, Dispatch<Action>]) => FC
}

export const LoggedIn = ({render}: LoggedInRenderProps) => {
    const loggedIn = useLoggedIn();

    return render(loggedIn);
};

export default useLoggedIn;
