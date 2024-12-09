"use server";

import { graphqlClient } from "@/auth/client/graphql-client";
import { LOGIN_MUTATION } from "@/auth/graphql/auth-querys-mutations";
import { LoginInput, LoginResponse } from "@/auth/types/auth-types";
import { cookies } from "next/headers";
import { getErrorMessage } from "@/auth/utils/error-handler";
import { redirect } from "next/navigation";

export async function loginAction(
  credentials: LoginInput
): Promise<LoginResponse> {
  try {
    const variables = {
      loginUserInput: credentials,
    };

    const response = await graphqlClient.request<{ loginUser: LoginResponse }>(
      LOGIN_MUTATION,
      variables
    );
    const { accessToken, refreshToken } = response.loginUser;

    const cookieStore = cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response.loginUser;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function logoutAction() {
  const cookieStore = cookies();

  const accessToken = await cookieStore.get("accessToken");
  const refreshToken = await cookieStore.get("refreshToken");

  if (!accessToken && !refreshToken) {
    return;
  }

  cookieStore.set("accessToken", "", { expires: new Date(0) });
  cookieStore.set("refreshToken", "", { expires: new Date(0) });
  redirect("/entrar");
}
