export type AuthError = {
  message: string;
  field?: string;
};

export type AuthResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };
