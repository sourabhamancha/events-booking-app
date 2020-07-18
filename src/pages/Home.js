import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_ALL_EVENTS_QUERY } from "../components/AllEvents";
// components
import AllEvents from "../components/AllEvents";
import CreatedEvents from "../components/CreatedEvents";
import Bookings from "../components/Bookings";
// sem-ui
import {
  Menu,
  Tab,
  Header,
  Button,
  Popup,
  Modal,
  Form,
} from "semantic-ui-react";
import gql from "graphql-tag";

function Home() {
  const [newEventValues, setNewEventValues] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
  });
  const [showEventModal, setShowEventModal] = useState(false);
  const context = useContext(AuthContext);
  const showModal = () => {
    //
    setShowEventModal(true);
  };
  const closeModal = () => {
    //
    setShowEventModal(false);
  };
  const handleOnChange = (e) => {
    //
    setNewEventValues({ ...newEventValues, [e.target.name]: e.target.value });
  };

  const [
    createEvent,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_EVENT_MUTATION, {
    update(_, result) {
      //
    },
    variables: {
      ...newEventValues,
      creatorId: context.user ? context.user.userId : null,
      price: parseFloat(newEventValues.price),
    },
    onError(err) {},
    refetchQueries: [{ query: FETCH_ALL_EVENTS_QUERY }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent();
    setNewEventValues({
      title: "",
      description: "",
      price: "",
      date: "",
    });
    setShowEventModal(false);
  };
  const panes = [
    {
      menuItem: (
        <Menu.Item key="all-events">
          All Events
          <hr style={{ visibility: "hidden" }} />
          <Popup
            content="Add an event"
            trigger={<Button icon="plus" circular onClick={showModal} />}
            position="right center"
          />
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <AllEvents />
        </Tab.Pane>
      ),
    },
    context.user && {
      menuItem: <Menu.Item key="created-events">Created Events</Menu.Item>,
      render: () => (
        <Tab.Pane>
          <CreatedEvents />
        </Tab.Pane>
      ),
    },
    context.user && {
      menuItem: <Menu.Item key="bookings">Bookings</Menu.Item>,
      render: () => (
        <Tab.Pane>
          <Bookings />
        </Tab.Pane>
      ),
    },
  ];

  const unAuthModel = (
    <>
      {" "}
      <Modal.Header>Please Login or Signup to add a new event.</Modal.Header>
      <Modal.Content>
        <Modal.Actions>
          <Button
            as={Link}
            to="/login"
            positive
            icon="user"
            labelPosition="right"
            content="Login"
            onClick={context.setLogin}
          />
          <Button
            as={Link}
            to="/login"
            positive
            icon="signup"
            labelPosition="right"
            content="Signup"
            onClick={context.setLogin}
          />
        </Modal.Actions>
      </Modal.Content>
    </>
  );

  const authModel = (
    <>
      <Modal.Header>Add an event</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Enter below details</Header>
          <Form
            onSubmit={handleSubmit}
            className={mutationLoading ? "loading" : ""}
          >
            <Form.Input
              icon="star"
              iconPosition="right"
              label="Title"
              placeholder="Name of the event.."
              name="title"
              value={newEventValues.title}
              onChange={handleOnChange}
            />
            <Form.TextArea
              label="Description"
              placeholder="Tell us about the event.."
              name="description"
              value={newEventValues.description}
              onChange={handleOnChange}
            />
            <Form.Input
              icon="dollar sign"
              iconPosition="right"
              label="Price"
              placeholder="How much does it cost.."
              name="price"
              value={newEventValues.price}
              onChange={handleOnChange}
            />
            <Form.Input
              label="Date"
              placeholder="When is it.."
              name="date"
              type="date"
              value={newEventValues.date}
              onChange={handleOnChange}
            />
            <Button
              floated="right"
              color="red"
              icon="cancel"
              labelPosition="right"
              content="No, I changed my mind!"
              onClick={closeModal}
            />
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yep, add it!"
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
    </>
  );

  if (mutationError) {
    console.log(mutationError);
  }
  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: "right" }}
          panes={panes}
        />
      </div>
      <Modal
        dimmer="blurring"
        open={showEventModal}
        closeOnEscape={showEventModal}
        closeOnDimmerClick={showEventModal}
        onClose={closeModal}
        size="tiny"
      >
        {context.user ? authModel : unAuthModel}
      </Modal>
    </>
  );
}

const CREATE_EVENT_MUTATION = gql`
  mutation createEvent(
    $creatorId: String!
    $title: String!
    $description: String!
    $price: Float!
    $date: String!
  ) {
    createEvent(
      input: {
        creatorId: $creatorId
        title: $title
        description: $description
        price: $price
        date: $date
      }
    ) {
      _id
      title
      description
      price
      date
      creatorId
    }
  }
`;

export default Home;
