import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import TopNav from "../layout/TopNav";
import { useDispatch } from "react-redux";
import { signInUser } from "../state/actions/auth";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "apiKey") {
      setApiKey(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && apiKey) {
      sessionStorage.setItem("user", JSON.stringify({ email, apiKey }));
      dispatch(signInUser());
      history.push("/Home");
    }
  };

  return (
    <>
      <TopNav></TopNav>
      <Container>
        <Alert variant="info">
          <Alert.Heading className="mb-4">
            How to get an API token?
          </Alert.Heading>
          <p>
            You can get an API token from{" "}
            <Alert.Link href="https://newsapi.org/register">here</Alert.Link>!
          </p>
          <hr />
          <p className="mb-0">
            Once you've entered both the email and the API key, you will be able
            to submit the login form.
          </p>
        </Alert>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => handleChange(e)}
              value={email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="API Key"
              onChange={(e) => handleChange(e)}
              name="apiKey"
              value={apiKey}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mr-1"
            disabled={!email.length > 0 || !apiKey.length > 0}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
