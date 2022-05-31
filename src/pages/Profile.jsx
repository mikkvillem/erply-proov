import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TopNav from "../layout/TopNav";

const Login = () => {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [name, setName] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (user.apiKey) setApiKey(user.apiKey);
    if (user.email) setEmail(user.email);
    if (user.name) setName(user.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "apiKey") {
      setApiKey(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleSubmit = (event) => {
    if (email && apiKey) {
      sessionStorage.setItem("user", JSON.stringify({ email, apiKey, name }));
    }
  };

  return (
    <>
      <TopNav></TopNav>
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => handleChange(e)}
              name="name"
              value={name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder={user.email}
              name="email"
              onChange={(e) => handleChange(e)}
              value={email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>API Key</Form.Label>
            <Form.Control
              type="text"
              placeholder={user.apiKey}
              onChange={(e) => handleChange(e)}
              name="apiKey"
              value={apiKey}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mr-1"
            disabled={
              !email.length > 0 ||
              !apiKey.length > 0 ||
              (user?.email === email &&
                user?.apiKey === apiKey &&
                user?.name === name)
            }>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
