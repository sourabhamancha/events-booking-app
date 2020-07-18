import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth";
// components
import Register from "./Register";

// sem-ui
import {
  Button,
  Divider,
  Form,
  Segment,
  Grid,
  Container,
} from "semantic-ui-react";

function Login() {
  const context = useContext(AuthContext);
  const history = useHistory();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [showRegForm, setShowRegForm] = useState(false);

  const [loginUser, { loading: mutationLoading, error }] = useMutation(
    LOGIN_USER_MUTATION,
    {
      update(_, result) {
        context.login(result.data.login);
        history.push("/");
        context.setHome();
      },
      variables: loginValues,
      onError(err) {},
    }
  );

  const handleOnChange = (e) => {
    //
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Container>
      <Segment
        style={{ marginTop: "50px" }}
        placeholder
        padded="very"
        fluid="true"
      >
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column verticalAlign="middle">
            <h1>Login</h1>
            <hr style={{ visibility: "hidden" }} />
            <Form
              onSubmit={handleSubmit}
              className={mutationLoading ? "loading" : ""}
            >
              <Form.Input
                icon="mail"
                iconPosition="left"
                label="Email"
                placeholder="Email.."
                name="email"
                value={loginValues.email}
                onChange={handleOnChange}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                type="password"
                placeholder="Password.."
                name="password"
                value={loginValues.password}
                onChange={handleOnChange}
              />
              <Button content="Login" primary />
            </Form>
            <div className={error ? "ui error message" : ""}>
              {error && error.graphQLErrors[0].message}
              <br />
              <br />
              {error && <span>Please try again</span>}
            </div>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            {!showRegForm && (
              <Button
                content="Sign up"
                icon="signup"
                size="big"
                onClick={(e) => {
                  setShowRegForm(true);
                }}
              />
            )}
            {showRegForm && <Register />}
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </Container>
  );
}

const LOGIN_USER_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      userId
      token
      tokenExp
    }
  }
`;

export default Login;
