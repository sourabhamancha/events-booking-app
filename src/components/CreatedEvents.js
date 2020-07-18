import React, { useContext } from "react";
import { FETCH_ALL_EVENTS_QUERY } from "./AllEvents";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

// components
import DeleteButton from "./DeleteButton";
// sem-ui
import { Card } from "semantic-ui-react";

function CreatedEvents() {
  const context = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_ALL_EVENTS_QUERY);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error...</h1>;
  }
  const createdEventsList = data.events.filter((event) => {
    return event.creatorId === context.user.userId;
  });

  return (
    <div>
      <Card.Group centered>
        {createdEventsList &&
          createdEventsList.map((event) => (
            <Card key={event._id}>
              <Card.Content>
                <Card.Header>
                  <strong>{event.title}</strong>
                </Card.Header>
                <Card.Meta>
                  ${event.price}
                  {", "}
                  {event.date}
                </Card.Meta>
                <Card.Description>{event.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <DeleteButton
                  eventId={event._id}
                  creatorId={context.user ? context.user.userId : null}
                />
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </div>
  );
}

export default CreatedEvents;
