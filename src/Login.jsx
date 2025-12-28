import React from "react";
import { replace, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/Authcontext";
import { useEffect } from "react";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true }); // Already logged in, redirect
    }
  }, [user, navigate]);
  const Handlelogin = async (e) => {
    e.preventDefault();

    const res = await login(email, password);

    setTimeout(() => {
      if (res.success) {
        if (res.user.role === "admin") {
          alert("Login as an admin Successful");
          navigate("/admin");
          return;
        } else if (res.user.role === "user") {
          alert("Login  Successful");
          navigate("/user");
          return;
        } else {
        }
      }
      alert(res.message);
    }, 200);
    setPassword("");
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="bg-black text-white w-fit text-center m-10 p-10 rounded-lg">
          <h1 className="text-3xl">Login </h1>
          <form onSubmit={Handlelogin} className="flex items-end  flex-col ">
            <div className="text-left ">
              <label className="pl-2" id="Email">
                Email
              </label>
              <br />
              <input
                type="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="Email"
                className=" bg-white text-black m-2 p-2 rounded-lg outline-none"
              />
            </div>
            <br />{" "}
            <div className="text-left ">
              <label className="pl-2" id="password">
                Password
              </label>
              <br />
              <input
                type="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" bg-white text-black m-2 p-2 rounded-lg outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-700 p-2 rounded-lg w-fit mr-2 cursor-pointer"
            >
              Submit
            </button>
          </form>
          <p className="mt-3">
            If you don't have an account <br /> please register first{" "}
            <span
              className="text-red-400 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              register now
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
