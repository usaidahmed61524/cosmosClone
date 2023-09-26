import { NextResponse } from "next/server";

import { UserToAddressData } from "../Module";

import dbConnect from "../Config";

export const GET = async (req, res) => {
  await dbConnect();

  const username = req.nextUrl.searchParams.get("username");

  const id = req.nextUrl.searchParams.get("tokenid");

  const validate = await UserToAddressData.findOne({ username: username });

  if (validate?._id) {
    if (Number(validate?.tokenId) === Number(id)) {
      return NextResponse.json(
        {
          success: true,
          message: "Login Successfull",

          validate,
        },

        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Token Id is Not Valid",
        },

        { status: 405 }
      );
    }
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "User Not Found",
      },

      {
        status: 404,
      }
    );
  }
};
