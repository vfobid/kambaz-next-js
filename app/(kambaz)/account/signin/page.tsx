"use client";

import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Sign in</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            id="wd-username"
            className="wd-username"
            type="text"
            placeholder="username"
            defaultValue="vanessa"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            id="wd-password"
            className="wd-password"
            type="password"
            placeholder="password"
            defaultValue="mypassword"
          />
        </Form.Group>

        <Link href="/dashboard" passHref legacyBehavior>
          <Button
            as="a"
            variant="primary"
            className="w-100 mb-2"
            id="wd-signin-btn"
          >
            Sign in
          </Button>
        </Link>
      </Form>

      <Link href="/account/signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}
