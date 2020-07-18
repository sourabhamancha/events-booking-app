import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FETCH_ALL_EVENTS_QUERY } from "./AllEvents";
import { FETCH_USER_BOOKINGS } from "./Bookings";
import { AuthContext } from "../context/auth";

// sem-ui
import { Button, Icon, Confirm } from "semantic-ui-react";

function BookButton({ eventId, userId, bookings }) {
  const context = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [
    createBooking,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_BOOKING_MUTATION, {
    update(_, result) {
      console.log(result);
    },
    variables: {
      eventId,
      userId,
    },
    onError(err) {},
    refetchQueries: [
      { query: FETCH_ALL_EVENTS_QUERY },
      {
        query: FETCH_USER_BOOKINGS,
        variables: {
          userId: context.user ? context.user.userId : null,
        },
      },
    ],
  });

  const handleBooking = () => {
    createBooking();
    setOpen(false);
  };

  if (mutationError) {
    return <p>Error...</p>;
  }
  if (bookings && bookings.length > 0) {
    const result = bookings.filter((booking) => booking.userId === userId);
    if (result.length > 0) {
      return (
        <>
          <Button color="green" floated="right">
            Booked
          </Button>
        </>
      );
    }
  }

  return (
    <>
      <Button primary floated="right" onClick={(e) => setOpen(true)}>
        Book
        <Icon name="right chevron" />
      </Button>
      <Confirm
        open={open}
        onCancel={(e) => setOpen(false)}
        onConfirm={handleBooking}
        className={mutationLoading ? "loading" : ""}
      />
    </>
  );
}

const CREATE_BOOKING_MUTATION = gql`
  mutation createBooking($eventId: String!, $userId: String!) {
    createBooking(input: { eventId: $eventId, userId: $userId }) {
      _id
    }
  }
`;

export default BookButton;
