import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API;

type FormData = {
  token: string;
  password: string;
  verifyPassword: string;
};

export default function PasswordResetForm() {
  const tokenError = useRef<HTMLInputElement>(null);
  const passwordError = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      token: "",
      password: "",
      verifyPassword: "",
    },
  });

  const password = watch("password").toString();

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const onSubmit = async (data: FormData) => {
    const res = await fetch(baseApiUrl + "/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reset_token: data.token,
        password: data.password,
      }),
    });
    if (res.ok) {
      navigate("/login");
    } else {
      const data = await res.json();
      if (data.token) {
        tokenError.current!.innerText = data.token;
      }
      if (data.password) {
        passwordError.current!.innerText = data.password;
      }
    }
  };

  useEffect(() => {
    if (user.username) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 pt-4 pb-12 lg:px-8">
      <div className="px-8 py-5 shadow-2xl pmb-10 rounded-3xl bg-neutral-focus sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="mb-10 text-2xl font-bold leading-9 tracking-tight text-center text-current-color">
          Enter your token and new password
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
              Reset Token
            </label>
            <div className="mt-2">
              <input
                {...register("token", {
                  required: "Required.",
                  minLength: {
                    value: 20,
                    message: "Must be a token.",
                  },
                })}
                id="token"
                name="token"
                type="text"
                placeholder="The personal reset token that was sent to your email"
                className="block w-full rounded-md border-0 py-1.5 px-3 bg-white text-black shadow-sm placeholder:text-gray-500 sm:text-sm sm:leading-6"
              />
              <p
                ref={tokenError}
                className="block text-sm font-medium leading-6 text-red-500">
                {errors.token?.message}
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
                  maxLength: {
                    value: 25,
                    message: "Must be 8 to 25 characters long.",
                  },
                  minLength: {
                    value: 8,
                    message: "Must be 8 to 25 characters long.",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,25}$/g,
                    message:
                      "Valid password will be 8-25 characters containing a capital letter, a lowercase letter, a number, and a special character.",
                  },
                })}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="block w-full px-3 rounded-md border-0 py-1.5 bg-white text-black shadow-sm ring-1 ring-inset  placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
              <p
                ref={passwordError}
                className="block text-sm font-medium leading-6 text-red-500">
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
              Reset Password
            </button>
          </div>
        </form>

        <p className="mt-10 text-sm text-center text-gray-300">
          Don't have a token yet?{" "}
          <Link
            to={"/reset-request"}
            className="font-semibold leading-6 text-primary-content hover:text-secondary">
            Click Here
          </Link>
        </p>
      </div>
    </div>
  );
}
