"use client";

import { useReducer, useTransition } from "react";
import { useRouter } from "next/navigation";

import { authRoutes } from "@/lib/routes";
import { authClient } from "@/lib/auth-client";
import { validateCredentials } from "@/features/auth/actions/validate-credentials-action";
import { sendLoginOtp } from "@/features/auth/actions/send-login-otp-action";
import { verifyLoginOtp } from "@/features/auth/actions/verify-login-otp-action";
import {
  loginSchema,
  loginOtpSchema,
  loginInitialValues,
  type LoginValues,
  type LoginOtpChannel,
} from "@/features/auth/schemas/auth-schema";

export type LoginStep = "credentials" | "channel" | "otp";

export type LoginFormState = {
  step: LoginStep;
  credentials: LoginValues;
  channel: LoginOtpChannel | null;
  otp: string;
  error: string | null;
  fieldErrors: Record<string, string[]>;
};

const initialState: LoginFormState = {
  step: "credentials",
  credentials: { ...loginInitialValues },
  channel: null,
  otp: "",
  error: null,
  fieldErrors: {},
};

type LoginFormAction =
  | { type: "SET_CREDENTIALS"; field: keyof LoginValues; value: string }
  | { type: "SET_CHANNEL"; channel: LoginOtpChannel | null }
  | { type: "SET_OTP"; otp: string }
  | { type: "SET_STEP"; step: LoginStep }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "SET_FIELD_ERRORS"; fieldErrors: Record<string, string[]> }
  | { type: "RESET_ERRORS" }
  | { type: "GO_TO_CHANNEL" }
  | { type: "GO_TO_OTP" }
  | { type: "BACK_TO_CREDENTIALS" }
  | { type: "BACK_TO_CHANNEL" };

function loginFormReducer(
  state: LoginFormState,
  action: LoginFormAction
): LoginFormState {
  switch (action.type) {
    case "SET_CREDENTIALS": {
      const next = { ...state.fieldErrors };
      delete next[action.field];
      return {
        ...state,
        credentials: { ...state.credentials, [action.field]: action.value },
        fieldErrors: next,
      };
    }
    case "SET_CHANNEL":
      return { ...state, channel: action.channel };
    case "SET_OTP":
      return { ...state, otp: action.otp.replace(/\D/g, "").slice(0, 6) };
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_FIELD_ERRORS":
      return { ...state, fieldErrors: action.fieldErrors };
    case "RESET_ERRORS":
      return { ...state, error: null, fieldErrors: {} };
    case "GO_TO_CHANNEL":
      return {
        ...state,
        step: "channel",
        error: null,
        fieldErrors: {},
      };
    case "GO_TO_OTP":
      return { ...state, step: "otp", error: null };
    case "BACK_TO_CREDENTIALS":
      return {
        ...initialState,
        credentials: { ...state.credentials },
      };
    case "BACK_TO_CHANNEL":
      return {
        ...state,
        step: "channel",
        otp: "",
        error: null,
      };
    default:
      return state;
  }
}

export function useLoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(loginFormReducer, initialState);

  const setCredentialsField = (field: keyof LoginValues, value: string) => {
    dispatch({ type: "SET_CREDENTIALS", field, value });
  };

  const setChannel = (channel: LoginOtpChannel | null) => {
    dispatch({ type: "SET_CHANNEL", channel });
  };

  const setOtp = (otp: string) => {
    dispatch({ type: "SET_OTP", otp });
  };

  const handleCredentialsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    dispatch({ type: "RESET_ERRORS" });

    const raw = {
      email: state.credentials.email.trim(),
      password: state.credentials.password,
    };
    const parsed = loginSchema.safeParse(raw);

    if (!parsed.success) {
      dispatch({
        type: "SET_FIELD_ERRORS",
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
      dispatch({
        type: "SET_ERROR",
        error: parsed.error.issues.map((issue) => issue.message).join(" "),
      });
      return;
    }

    startTransition(async () => {
      const result = await validateCredentials(parsed.data.email, parsed.data.password);
      if (!result.success) {
        dispatch({ type: "SET_ERROR", error: result.error });
        return;
      }
      dispatch({ type: "GO_TO_CHANNEL" });
    });
  };

  const handleChannelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending || !state.channel) return;
    dispatch({ type: "RESET_ERRORS" });

    startTransition(async () => {
      const result = await sendLoginOtp(state.channel!);
      if (!result.success) {
        dispatch({ type: "SET_ERROR", error: result.error });
        return;
      }
      dispatch({ type: "GO_TO_OTP" });
    });
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending || !state.channel) return;
    dispatch({ type: "RESET_ERRORS" });

    const parsed = loginOtpSchema.safeParse({ otp: state.otp });
    if (!parsed.success) {
      dispatch({
        type: "SET_FIELD_ERRORS",
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
      dispatch({
        type: "SET_ERROR",
        error: parsed.error.issues.map((issue) => issue.message).join(" "),
      });
      return;
    }

    startTransition(async () => {
      const result = await verifyLoginOtp(parsed.data.otp, state.channel!);
      if (!result.success) {
        dispatch({ type: "SET_ERROR", error: result.error });
        return;
      }

      const signInResult = await authClient.signIn.emailOtp({
        email: state.credentials.email.trim().toLowerCase(),
        otp: parsed.data.otp,
      });

      if (signInResult?.error) {
        dispatch({
          type: "SET_ERROR",
          error: signInResult.error?.message ?? "Something went wrong. Please try again.",
        });
        return;
      }

      router.push(authRoutes.dashboard);
      router.refresh();
    });
  };

  const backToCredentials = () => dispatch({ type: "BACK_TO_CREDENTIALS" });
  const backToChannel = () => dispatch({ type: "BACK_TO_CHANNEL" });

  return {
    step: state.step,
    credentials: state.credentials,
    channel: state.channel,
    otp: state.otp,
    error: state.error,
    fieldErrors: state.fieldErrors,
    setCredentialsField,
    setChannel,
    setOtp,
    handleCredentialsSubmit,
    handleChannelSubmit,
    handleOtpSubmit,
    backToCredentials,
    backToChannel,
    isPending,
  };
}
