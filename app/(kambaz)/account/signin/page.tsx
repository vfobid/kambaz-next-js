"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        defaultValue={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        defaultValue={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>

      <hr className="mt-4" />
      <footer className="mt-3 text-muted small">
        <p className="mb-1">
          <strong>Vanessa Fobid</strong> — Section 02
        </p>
        <p className="mb-1">
          <a
            href="https://github.com/vfobid/kambaz-next-js"
            target="_blank"
            rel="noreferrer"
          >
            Frontend GitHub Repository
          </a>
        </p>
        <p className="mb-0">
          <a
            href="https://github.com/vfobid/kambaz-node-server-app"
            target="_blank"
            rel="noreferrer"
          >
            Backend GitHub Repository
          </a>
        </p>
      </footer>
    </div>
  );
}
