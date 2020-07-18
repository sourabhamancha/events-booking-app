import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_USER_BOOKINGS } from "../components/Bookings";
import { FETCH_ALL_EVENTS_QUERY } from "../components/AllEvents";
import { AuthContext } from "../context/auth";

// sem-ui
import { Button, Confirm } from "semantic-ui-react";

function CancelButton(props) {
  const context = useContext(AuthContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const { bookingId } = props;

  const [
    deleteBooking,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_BOOKING_MUTATION, {
    variables: {
      bookingId,
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

  const handleCancel = () => {
    deleteBooking();
    setShowConfirm(false);
  };
  if (mutationError) {
    return <h1>Error...</h1>;
  }
  return (
    <div className="ui two buttons">
      <Button type="submit" color="red" onClick={(e) => setShowConfirm(true)}>
        Cancel Booking
      </Button>
      <Confirm
        className={mutationLoading ? "loading" : ""}
        open={showConfirm}
        cancelButton="Never mind"
        confirmButton="Let's do it"
        onCancel={(e) => setShowConfirm(false)}
        onConfirm={handleCancel}
      />
    </div>
  );
}

const DELETE_BOOKING_MUTATION = gql`
  mutation deleteBooking($bookingId: String!) {
    deleteBooking(bookingId: $bookingId) {
      _id
    }
  }
`;

export default CancelButton;
