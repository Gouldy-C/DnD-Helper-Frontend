import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlert } from "../../contexts/AlertContext";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API;

type FormData = {
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
};

export default function SignUpForm() {
  const usernameError = useRef<HTMLInputElement>(null);
  const emailError = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
  });

  const password = watch("password").toString();

  const navigate = useNavigate();
  const { addAlert } = useAlert();
  const { user, setUser } = useContext(UserContext);

  const onSubmit = async (data: FormData) => {
    const res = await fetch(baseApiUrl + "/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      updateUserState(data.username, data.access_token);
      addAlert("success", `Logged in as ${data.username}`);
    } else {
      const data = await res.json();
      if (data.email) {
        emailError.current!.innerText = data.email;
      }
      if (data.username) {
        usernameError.current!.innerText = data.username;
      }
    }
  };

  function updateUserState(username: string, token: string) {
    setUser({
      username: username,
      token: token,
    });
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("username", JSON.stringify(username));
  }

  useEffect(() => {
    if (user.username) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 pt-4 pb-12 lg:px-8">
      <div className="px-8 py-5 shadow-2xl pmb-10 rounded-3xl bg-neutral-focus sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="mb-10 text-2xl font-bold leading-9 tracking-tight text-center text-current-color">
          Sign up for an account
        </h2>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-primary-content">
              Username
            </label>
            <div className="mt-2">
              <input
                {...register("username", {
                  required: "Required.",
                  maxLength: {
                    value: 25,
                    message: "Must be 6 to 25 characters long.",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 to 25 characters long.",
                  },
                })}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Username"
                className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm placeholder:text-gray-500 sm:text-sm sm:leading-6"
              />
              <p
                ref={usernameError}
                className="block text-sm font-medium leading-6 text-red-500">
                {errors.username?.message}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-primary-content">
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email", {
                  required: "Required.",
                  minLength: {
                    value: 6,
                    message: "Must be 6+ characters long.",
                  },
                })}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Yourmail@email.com"
                className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm placeholder:text-gray-500 sm:text-sm sm:leading-6"
              />
              <p
                ref={emailError}
                className="block text-sm font-medium leading-6 text-red-500">
                {errors.email?.message}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-primary-content">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                {...register("password", {
                  required: "Required.",
                  minLength: {
                    value: 8,
                    message: "Must be 8+ characters long.",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,500}$/g,
                    message:
                      "Valid password must be 8+ characters containing a capital letter, a lowercase letter, a number, and a special character.",
                  },
                })}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="block w-full px-3 rounded-md border-0 py-1.5 bg-white text-black shadow-sm ring-1 ring-inset  placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
              <p className="block text-sm font-medium leading-6 text-red-500">
                {errors.password?.message}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-primary-content">
                Password Confirmation
              </label>
            </div>
            <div className="mt-2">
              <input
                {...register("verifyPassword", {
                  required: "Required.",
                  pattern: {
                    value: RegExp(`^${password}$`, "g"),
                    message: `Passwords must match.`,
                  },
                })}
                id="verifyPassword"
                name="verifyPassword"
                type="password"
                placeholder="Password"
                className="block w-full px-3 rounded-md border-0 py-1.5 bg-white text-black shadow-sm ring-1 ring-inset  placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
              <p className="block text-sm font-medium leading-6 text-red-500">
                {errors.verifyPassword?.message}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-primary-content shadow-sm hover:bg-primary-focus">
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-sm text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold leading-6 text-primary-content hover:text-secondary">
            Click Here to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
