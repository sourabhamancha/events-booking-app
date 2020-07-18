import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth";

// sem-ui
import { Button, Form } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";

function Register() {
  const context = useContext(AuthContext);

  const history = useHistory();

  const [regValues, setRegValues] = useState({
    username: "",
    email: "",
    password: "",
    avator: "",
  });

  const [addUser, { loading: mutationLoading, error }] = useMutation(
    REGISTER_USER_MUTATION,
    {
      update(_, result) {
        context.login(result.data.registerUser);
        history.push("/");
        context.setHome();
      },
      variables: regValues,
      onError(err) {},
    }
  );
  const friendOptions = [
    {
      key: "Jenny",
      text: "Jenny",
      value: "https://react.semantic-ui.com/images/avatar/large/jenny.jpg",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/jenny.jpg",
      },
    },
    {
      key: "Elliot",
      text: "Elliot",
      value: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
      },
    },
    {
      key: "Stevie",
      text: "Stevie",
      value: "https://react.semantic-ui.com/images/avatar/large/stevie.jpg",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/stevie.jpg",
      },
    },
    {
      key: "Christian",
      text: "Christian",
      value: "https://react.semantic-ui.com/images/avatar/large/christian.jpg",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/christian.jpg",
      },
    },
    {
      key: "Matt",
      text: "Matt",
      value: "https://react.semantic-ui.com/images/avatar/large/matt.jpg",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/matt.jpg",
      },
    },
    {
      key: "Justen",
      text: "Justen",
      value: "https://react.semantic-ui.com/images/avatar/large/justen.jpg",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/justen.jpg",
      },
    },
    {
      key: "Daniel",
      text: "Daniel",
      value: "https://react.semantic-ui.com/images/avatar/large/daniel.jpg",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/daniel.jpg",
      },
    },
    {
      key: "Tom",
      text: "Tom",
      value: "https://react.semantic-ui.com/images/avatar/large/tom.jpg",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/tom.jpg",
      },
    },
    {
      key: "Rachel",
      text: "Rachel",
      value: "https://react.semantic-ui.com/images/avatar/large/rachel.png",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/rachel.png",
      },
    },
    {
      key: "Veronika",
      text: "Veronika",
      value: "https://react.semantic-ui.com/images/avatar/large/veronika.jpg",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/veronika.jpg",
      },
    },
    {
      key: "Matthew",
      text: "Matthew",
      value: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
      },
    },
    {
      key: "Molly",
      text: "Molly",
      value: "https://react.semantic-ui.com/images/avatar/large/molly.png",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/large/molly.png",
      },
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };
  const handleOnChange = (e) => {
    //
    setRegValues({ ...regValues, [e.target.name]: e.target.value });
  };
  const handleDropdown = (e, { value }) => {
    //
    setRegValues({ ...regValues, avator: value });
  };

  return (
    <div>
      <h1>Register</h1>
      <hr style={{ visibility: "hidden" }} />
      <Form
        onSubmit={handleSubmit}
        className={mutationLoading ? "loading" : ""}
      >
        <Form.Input
          icon="user"
          iconPosition="left"
          label="Username"
          placeholder="Username.."
          name="username"
          value={regValues.username}
          onChange={handleOnChange}
        />
        <Form.Input
          icon="mail"
          iconPosition="left"
          label="Email"
          placeholder="Email.."
          name="email"
          value={regValues.email}
          onChange={handleOnChange}
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          label="Password"
          type="password"
          placeholder="Password.."
          name="password"
          value={regValues.password}
          onChange={handleOnChange}
        />
        <hr style={{ visibility: "hidden" }} />
        <Dropdown
          placeholder="Choose an avator"
          selection
          options={friendOptions}
          name="avator"
          value={regValues.avator}
          onChange={handleDropdown}
        />
        <hr style={{ visibility: "hidden" }} />
        <Button content="Sign up" primary />
      </Form>
      <div className={error ? "ui error message" : ""}>
        {error && error.graphQLErrors[0].message}
        <br />
        <br />
        {error && <span>Please try again</span>}
      </div>
    </div>
  );
}

const REGISTER_USER_MUTATION = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $avator: String!
  ) {
    registerUser(
      input: {
        username: $username
        email: $email
        password: $password
        avator: $avator
      }
    ) {
      userId
      token
      tokenExp
    }
  }
`;

export default Register;
