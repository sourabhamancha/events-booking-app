import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// components
import CancelButton from "./CancelButton";

// sem-ui
import { Card, Image } from "semantic-ui-react";

function Bookings() {
  const context = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_USER_BOOKINGS, {
    variables: {
      userId: context.user ? context.user.userId : null,
    },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data.userBookings);
  return (
    <div>
      <Card.Group centered>
        {data.userBookings &&
          data.userBookings.map(
            (booking) =>
              booking.event && (
                <Card key={booking._id}>
                  <Card.Content>
                    <Image
                      floated="right"
                      size="mini"
                      src={
                        booking.event && booking.event.length > 0
                          ? booking.event.creator.avator
                          : null
                      }
                    />
                    <Card.Header>
                      <strong>{booking.event.title}</strong>
                    </Card.Header>
                    <Card.Meta>
                      ${booking.event.price}
                      {", "}
                      {booking.event.date}
                    </Card.Meta>
                    <Card.Description>
                      {booking.event.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <CancelButton bookingId={booking._id} />
                  </Card.Content>
                </Card>
              )
          )}
      </Card.Group>
    </div>
  );
}

export const FETCH_USER_BOOKINGS = gql`
  query userBookings($userId: String!) {
    userBookings(userId: $userId) {
      _id
      event {
        _id
        title
        description
        price
        date
        creator {
          avator
        }
      }
    }
  }
`;

export default Bookings;
