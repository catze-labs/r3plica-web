import axios from "axios";
import { useMutation, useQuery } from "react-query";
import client from "./client";

export const useAuthAPI = () => {
    const login = async (payload: Auth.Login.Payload) => {
        try {
            const { data } = await client.post<Auth.Login.Response>(
                "/playfab/login",
                payload
            );
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(error.response?.data);
            }
        }
    };

    const signup = async (payload: Auth.Signup.Payload) => {
        try {
            const { data } = await client.post<Auth.Signup.Response>(
                "/playfab/register",
                payload
            );
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(error.response?.data);
            }
        }
    };

    return {
        login,
        signup,
    };
};

export function useLogin(
    onSuccess?: (data: Auth.Login.Response) => void,
    onError?: (error: ServerError) => void
) {
    const { login } = useAuthAPI();
    const { mutate, isLoading, isError } = useMutation(
        "login",
        (payload: Auth.Login.Payload) =>
            login(payload) as Promise<Auth.Login.Response>,
        {
            onSuccess,
            onError,
        }
    );

    return {
        mutate,
        isLoading,
        isError,
    };
}

export function useSignup(
    onSuccess?: (data: Auth.Signup.Response) => void,
    onError?: (error: ServerError) => void
) {
    const { signup } = useAuthAPI();
    const { mutate, isLoading, isError } = useMutation(
        "signup",
        (payload: Auth.Signup.Payload) =>
            signup(payload) as Promise<Auth.Signup.Response>,
        {
            onSuccess,
            onError,
        }
    );

    return {
        mutate,
        isLoading,
        isError,
    };
}
