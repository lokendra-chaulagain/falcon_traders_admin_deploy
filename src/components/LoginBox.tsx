import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function LoginBox() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let handleAllField = watch();

  const login = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signin`, handleAllField);
      console.log(res.data);
      const { accessToken } = res.data;
      console.log(accessToken);
      localStorage.setItem("accessToken", accessToken);
      window.location.replace("/banner");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center h100 w100">
      <div className="customCard w-50 p-5">
        <div>
          <h3 className="text-center">Login</h3>
          <p className="text-center">Access to our dashboard</p>
        </div>

        <form
          action=""
          onSubmit={handleSubmit(login)}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label  h6">
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-lg rounded-1 login_input_form "
              {...register("email", { required: "email is required" })}
              placeholder="Email Address "
            />
            {errors.email && <p className="form_hook_error">{`${errors.email.message}`}</p>}
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label g h6">
              Email Address
            </label>
            <input
              autoComplete="off"
              type="password"
              className="form-control form-control-lg rounded-1 login_input_form"
              {...register("password", { required: "password is required" })}
              placeholder="Password "
            />
            {errors.password && <p className="form_hook_error">{`${errors.password.message}`}</p>}
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="btn btn-primary w-100 btn-lg rounded-1">
              Login
            </button>
          </div>
        </form>

        <h6 className="pt-4 text-center">
          Dont have an account yet ?<a className="register_span"> Register</a>
        </h6>
      </div>
    </div>
  );
}

export default LoginBox;
