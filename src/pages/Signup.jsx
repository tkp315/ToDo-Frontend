import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signupThunk } from "../Redux/Slice/userSlice";
import { BsPersonCircle } from "react-icons/bs";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
    console.log(`${name}:${value}`);
  }

  console.log(signupData);
  function imageHandler(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        console.log(this.result);
        setPreviewImage(this.result);
      });
    }
  }

  // send data through axios
  async function createNewAccount(e) {
    e.preventDefault();
    if (
      [
        signupData.name,
        signupData.email,
        signupData.password,
        signupData.confirmPassword,
      ].some((e) => e === "")
    ) {
      toast.error("Please Fill All The Details");
      return;
    }
    // checking valid emailId

    if (
      !signupData.email.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )
    ) {
      toast.error("Invalid email id");
      return;
    }
    if (signupData.profilePhoto === "") toast.error("image is not found");
    const formData = new FormData();
    formData.append("name", signupData.name);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("confirmPassword", signupData.confirmPassword);

    formData.append("avatar", signupData.avatar);

    //dispatch create account action
    const response = await dispatch(signupThunk(formData));

    if (response.payload?.statusCode === 200) {
      navigate("/login");
    }
    setSignupData({
      name: "",
      confirmPassword: "",
      email: "",
      password: "",
      avatar: "",
    });

    setPreviewImage("");
  }

  return (
    <div>
      <div className="flex justify-center items-center  bg-[#45b06a] ">
        {/* signup form  */}
        {/* send form on api through axios*/}
        {/* add on localStorage */}
        {/* create auth slice for storing the data*/}

        <form
          noValidate="true"
          onSubmit={createNewAccount}
          className="flex flex-col w-[600px] min-h-[90vh] shadow-lg bg-white
 shadow-cyan-500/50 justify-center  p-10 gap-5 mt-10 mb-10"
        >
          <div className="text-3xl text-left font-semibold">Registration</div>
          <div className="border border-[#45b06a]"></div>

          <label htmlFor="profilePhoto" className=" cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
                alt="preview_image"
              ></img>
            ) : (
              <BsPersonCircle className="w-16 h-16 rounded-full m-auto"></BsPersonCircle>
            )}
          </label>
          <input
            type="file"
            id="profilePhoto"
            className="hidden"
            // accept=".jpg, .jpeg, .png, .svg"
            name="profilePhoto"
            onChange={imageHandler}
          ></input>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-serif">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter First Name"
              name="name"
              onChange={handleUserInput}
              className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-serif">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleUserInput}
              className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className=" font-serif">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleUserInput}
              className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="font-serif">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              onChange={handleUserInput}
              className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>

          <button className=" btn btn-secondary">Create Account</button>
          <div className="">
            Already Have an Account{" "}
            <span>
              {" "}
              <Link to="/login" className=" link-hover text-blue-400">
                Login
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
