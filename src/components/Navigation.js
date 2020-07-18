import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";
// sem-ui
import { Icon, Menu, Button, Modal, Header } from "semantic-ui-react";

function Navigation() {
  const [showModal, setShowModal] = useState(false);
  const context = useContext(AuthContext);

  const history = useHistory();

  const handleLogoutButton = () => {
    setShowModal(!showModal);
  };

  const navBar = !context.user ? (
    <Menu color="blue">
      <Menu.Item>
        <h1>
          <a href="/">eB</a>
        </h1>
      </Menu.Item>

      <Menu.Item
        name="home"
        active={context.navItem === "home"}
        as={Link}
        to="/"
        onClick={context.setHome}
        position="right"
      >
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item
        name="login"
        active={context.navItem === "login"}
        as={Link}
        to="/login"
        onClick={context.setLogin}
      >
        <Icon name="user" />
        Login
      </Menu.Item>
    </Menu>
  ) : (
    <>
      <Menu color="blue">
        <Menu.Item>
          <h1>
            <a href="/">eB</a>
          </h1>
        </Menu.Item>

        <Menu.Item
          name="home"
          active={context.navItem === "home"}
          as={Link}
          to="/"
          onClick={context.setHome}
          position="right"
        >
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item name="logout" onClick={handleLogoutButton}>
          <Icon name="log out" />
          Log Out
        </Menu.Item>
      </Menu>
      <Modal basic size="small" open={showModal}>
        <Header icon="log out" content="Please confirm" />
        <Modal.Content>
          <p>Are you sure you want to log out?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={handleLogoutButton}>
            <Icon name="remove" /> No
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              context.logout();
              handleLogoutButton();
              history.push("/login");
              context.setLogin();
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
  return navBar;
}

export default Navigation;
