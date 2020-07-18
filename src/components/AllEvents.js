import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
// components
import BookButton from "./BookButton";
// sem-ui
import { Button, Icon, Item } from "semantic-ui-react";

function AllEvents() {
  const context = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_ALL_EVENTS_QUERY);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <Item.Group divided>
        {data.events &&
          data.events.map((event) => (
            <Item key={event._id}>
              <Item.Image src={event.creator.avator} />

              <Item.Content>
                <Item.Header>{event.title}</Item.Header>
                <Item.Meta>
                  <span className="price">${event.price},</span>{" "}
                  <span className="date">{event.date}</span>
                </Item.Meta>
                <Item.Description>{event.description}</Item.Description>
                <Item.Extra>
                  {context.user ? (
                    context.user.userId === event.creatorId ? null : (
                      <BookButton
                        eventId={event._id}
                        userId={context.user ? context.user.userId : null}
                        bookings={event.bookings}
                      />
                    )
                  ) : (
                    <Button
                      as={Link}
                      to="/login"
                      primary
                      floated="right"
                      onClick={context.setLogin}
                    >
                      Book
                      <Icon name="right chevron" />
                    </Button>
                  )}
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
      </Item.Group>
    </div>
  );
}

export default AllEvents;

export const FETCH_ALL_EVENTS_QUERY = gql`
  query {
    events {
      _id
      title
      description
      price
      date
      creatorId
      creator {
        username
        avator
      }
      bookings {
        userId
      }
    }
  }
`;
