'use client';
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
export default function TOC() {
 return (
   <Nav variant="pills">
      <Nav.Item>
        <Nav.Link as={Link} href="/labs">Labs</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} href="/labs/lab1">Lab 1</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} href="/labs/lab2">Lab 2</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} href="/labs/lab3">Lab 3</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} href="/">Kambaz</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          id="wd-github"
          href="https://github.com/vfobid"
          target="_blank"
          rel="noopener noreferrer"
        >
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
);}
