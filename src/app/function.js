"use client";

import axios from "axios";

export const loginwithDomain = async (d, i) => {
  let useObj;

  try {
    const response = await axios.get(
      `http://localhost:3000/login?username=${d}&tokenid=${i}`
    );
    console.log(response.data);
    useObj = response.data;
  } catch (error) {
    alert("Error not verify: ", error.message);
  }

  console.log("user object", useObj);

  return { d, i , useObj};
};
