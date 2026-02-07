"use client";

import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Sign up</h3>
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

        <Form.Group className="mb-3">
          <Form.Control
            id="wd-password-verify"
            className="wd-password-verify"
            type="password"
            placeholder="verify password"
            defaultValue="mypassword"
          />
        </Form.Group>

        <Link href="/account/profile" passHref legacyBehavior>
          <Button
            as="a"
            variant="primary"
            className="w-100 mb-2"
            id="wd-signup-btn"
          >
            Sign up
          </Button>
        </Link>
      </Form>

      <Link href="/account/signin" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}