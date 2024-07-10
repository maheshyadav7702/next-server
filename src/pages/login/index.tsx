import LoginComp from "@/components/login/loginComp";
import axios from "axios";
import React, { useState } from "react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setEmail("");
        setPassword("");
        alert("Login successful");
      })
      .catch((error) => {
        console.error(error);
        alert("Login failed");
      });
  };

  return (
    <div>
      <LoginComp />
    </div>
  );
};

export default Index;
