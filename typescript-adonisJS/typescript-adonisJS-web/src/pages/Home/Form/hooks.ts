import { useEffect } from "react";

import { useAuth } from "@store/auth";
import { usePrevious } from "utils/hooks";
import { errorNotification, successNotification } from 'utils/notifications';

export default function useHomeFormHook(): void {
    const auth = useAuth();
    // usePrevious requires a parameter
    const prevAuth = usePrevious(auth);

    useEffect(() => {
        if (!prevAuth?.signInState?.error && auth.signInState.error) {
            errorNotification("Failed to logIn", auth.signInState)
        } 
        else if (prevAuth?.signInState?.loading && !auth.signInState.loading) {
            successNotification("LoggedIn", auth.signInState.message)
        }
        if (!prevAuth?.signUpState?.error && auth.signUpState.error) {
            errorNotification("Failed to registered", auth.signUpState)
        } 
        else if (prevAuth?.signUpState.loading && !auth.signUpState.loading) {
            successNotification("User registered", auth.signUpState.message)
        }
    }, [auth.signInState, auth.signUpState])
}