"use client";

import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: "500px" }}>
      <h3>Profile</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-username">Username</Form.Label>
          <Form.Control
            id="wd-username"
            className="wd-username"
            type="text"
            placeholder="username"
            defaultValue="vanessa"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-password">Password</Form.Label>
          <Form.Control
            id="wd-password"
            className="wd-password"
            type="password"
            placeholder="password"
            defaultValue="mypassword"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-firstname">First Name</Form.Label>
          <Form.Control
            id="wd-firstname"
            type="text"
            placeholder="First Name"
            defaultValue="Vanessa"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-lastname">Last Name</Form.Label>
          <Form.Control
            id="wd-lastname"
            type="text"
            placeholder="Last Name"
            defaultValue="Fobid"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-dob">Date of Birth</Form.Label>
          <Form.Control
            id="wd-dob"
            type="date"
            defaultValue="2000-01-01"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-email">Email</Form.Label>
          <Form.Control
            id="wd-email"
            type="email"
            placeholder="email"
            defaultValue="vanessa@wonderland"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-role">Role</Form.Label>
          <Form.Select id="wd-role" defaultValue="STUDENT">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>

        <Link href="/account/signin" passHref legacyBehavior>
          <Button
            as="a"
            variant="danger"
            className="w-100"
            id="wd-signout-btn"
          >
            Sign out
          </Button>
        </Link>
      </Form>
    </div>
  );
}