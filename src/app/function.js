"use client";

import axios from "axios";

export const loginwithDomain = async (d, i) => {
  let useObj;

  try {
    const response = await axios.get(`/login?username=${d}&tokenid=${i}`);
    // console.log(response.data);
    useObj = response.data;
    alert("successfully Login With MMIT Domain:");
  } catch (error) {
    alert("Error not verify: ", error.message);
  }



  return { d, i, useObj };
};
