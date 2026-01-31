"use client";

import { useReducer, useTransition } from "react";
import { useRouter } from "next/navigation";

import { authRoutes } from "@/lib/routes";
import { signUpWithEmail } from "@/features/auth/actions/signup-action";
import {
  signupInitialValues,
  type SignupValues,
} from "@/features/auth/schemas/auth-schema";

/** Form state derived from schema — values, field errors, and global error. */
export type SignupFormState = {
  values: SignupValues;
  fieldErrors: Record<string, string[]>;
  error: string | null;
};

const initialState: SignupFormState = {
  values: { ...signupInitialValues },
  fieldErrors: {},
  error: null,
};

type SignupFormAction =
  | { type: "SET_FIELD"; field: keyof SignupValues; value: string }
  | { type: "SET_FIELD_ERRORS"; fieldErrors: Record<string, string[]> }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "RESET_ERRORS" }
  | { type: "RESET" };

function signupFormReducer(
  state: SignupFormState,
  action: SignupFormAction
): SignupFormState {
  switch (action.type) {
    case "SET_FIELD": {
      const nextFieldErrors = { ...state.fieldErrors };
      delete nextFieldErrors[action.field];
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        fieldErrors: nextFieldErrors,
      };
    }
    case "SET_FIELD_ERRORS":
      return { ...state, fieldErrors: action.fieldErrors };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "RESET_ERRORS":
      return { ...state, error: null, fieldErrors: {} };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useSignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(signupFormReducer, initialState);

  const setField = (field: keyof SignupValues, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;

    dispatch({ type: "RESET_ERRORS" });

    startTransition(async () => {
      const result = await signUpWithEmail(state.values);

      if (result.success) {
        router.push(authRoutes.dashboard);
        router.refresh();
        return;
      }

      if (result.fieldErrors) {
        dispatch({ type: "SET_FIELD_ERRORS", fieldErrors: result.fieldErrors });
      }
      dispatch({ type: "SET_ERROR", error: result.error });
    });
  };

  return {
    values: state.values,
    fieldErrors: state.fieldErrors,
    error: state.error,
    setField,
    handleSubmit,
    isPending,
  };
}
