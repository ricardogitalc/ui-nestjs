import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { initiateGoogleAuth } from "../../auth/calls/fetch-calls";

export function GoogleButton() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      <Button
        onClick={() => initiateGoogleAuth()}
        variant="outline"
        className="w-full bg-muted-foreground/5 hover:bg-muted-foreground/15"
      >
        <FcGoogle className="h-5 w-5" />
        Google
      </Button>
    </>
  );
}
