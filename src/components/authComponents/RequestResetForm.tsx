import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlert } from "../../contexts/AlertContext";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API;

type FormData = {
  email: string;
};

export default function RequestResetForm() {
  const emailError = useRef<HTMLInputElement>(null);
  const { addAlert } = useAlert();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch(baseApiUrl + "/reset-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    });
    if (res.ok) {
      navigate("/reset-password");
      addAlert("success", `An email has been sent to you with a reset token.`);
    } else {
      const data = await res.json();
      if (data.email) {
        emailError.current!.innerText = data.email;
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
          To reset your password please enter the email associated with the
          account.
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-primary-content shadow-sm hover:bg-primary-focus">
              Request A Reset
            </button>
          </div>
        </form>

        <p className="mt-10 text-sm text-center text-gray-300">
          If you already have a reset token?{" "}
          <Link
            to={"/reset-password"}
            className="font-semibold leading-6 text-primary-content hover:text-secondary">
            Click Here
          </Link>
        </p>
      </div>
      <p className="mt-10 text-sm text-center text-gray-300">
        Remember your password?{" "}
        <Link
          to={"/login"}
          className="font-semibold leading-6 text-primary-content hover:text-secondary">
          Click Here to Login
        </Link>
      </p>
    </div>
  );
}
