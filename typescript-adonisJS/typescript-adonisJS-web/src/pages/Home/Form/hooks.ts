import { useEffect } from "react";

import { useAuth } from "@store/auth";
import { usePrevious } from "utils/hooks";
import { errorNotification, successNotification } from 'utils/notifications';

function useHomeFormHook(): void {
    const auth = useAuth();
    // usePrevious requires a parameter
    const prevAuth = usePrevious(auth);

    useEffect(() => {
        if (!prevAuth?.signInState?.error && auth.signInState.error) {
            errorNotification("Failed to logIn", auth.signInState)
        }
    }, [])
}