import { FormEvent, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useAlert } from "../../contexts/AlertContext";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API;

export default function LoginForm() {
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const errorMassage = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { addAlert } = useAlert();
  const { user, setUser } = useContext(UserContext);

  async function loginFormSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(baseApiUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailField.current!.value,
        password: passwordField.current!.value,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      updateUserState(data.username, data.access_token);
      addAlert("success", `Logged in as ${data.username}`);
      resetForm();
    } else {
      const data = await res.json();
      errorMassage.current!.innerText = data.error;
    }
  }

  function updateUserState(username: string, token: string) {
    setUser({
      username: username,
      token: token,
    });
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("username", JSON.stringify(username));
  }

  function resetForm() {
    emailField.current!.value = "";
    passwordField.current!.value = "";
  }

  useEffect(() => {
    if (user.username) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 pt-4 pb-12 lg:px-8">
      <div className="p-5 mb-10 shadow-2xl rounded-3xl bg-neutral-focus sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="mb-10 text-2xl font-bold leading-9 tracking-tight text-center text-current-color">
          Login to your account
        </h2>
        <form className="space-y-6" onSubmit={loginFormSubmit} method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-primary-content">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                ref={emailField}
                placeholder="Yourmail@email.com"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm placeholder:text-gray-500  sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block font-medium leading-6 text-primary-content">
                Password
              </label>
              <div className="text-sm">
                <Link
                  to={"/reset-request"}
                  className="font-semibold text-primary-content hover:text-secondary">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordField}
                autoComplete="current-password"
                placeholder="Password"
                required
                className="block w-full px-3 rounded-md border-0 py-1.5 bg-white text-black shadow-sm ring-1 ring-inset  placeholder:text-gray-500 focus:ring-2 focus:ring-inset  sm:leading-6"
              />
            </div>
          </div>
          <p
            ref={errorMassage}
            className="block text-sm font-medium leading-6 text-red-500"></p>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-primary-content shadow-sm hover:bg-primary-focus">
              Login
            </button>
          </div>
        </form>

        <p className="mt-10 text-sm text-center text-gray-300">
          Need to Sign up?{" "}
          <Link
            to={"/sign-up"}
            className="font-semibold leading-6 text-primary-content hover:text-secondary">
            Click Here to Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
