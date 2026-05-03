export const AUTH_KEY = "logisight-auth";

export const auth = {
  isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(AUTH_KEY) === "1";
  },
  login(email: string) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(AUTH_KEY, "1");
    window.localStorage.setItem("logisight-user", email);
  },
  logout() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(AUTH_KEY);
  },
};
