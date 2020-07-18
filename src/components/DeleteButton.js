import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_ALL_EVENTS_QUERY } from "../components/AllEvents";

// sem-ui
import { Button, Confirm } from "semantic-ui-react";

function DeleteButton(props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { eventId: _id, creatorId } = props;

  const [
    deleteEvent,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_EVENT_MUTATION, {
    variables: {
      _id,
      creatorId,
    },
    onError(err) {},
    refetchQueries: [{ query: FETCH_ALL_EVENTS_QUERY }],
  });

  const handleDelete = () => {
    deleteEvent();
    setShowConfirm(false);
  };
  if (mutationError) {
    return <h1>Error...</h1>;
  }
  return (
    <div className="ui two buttons">
      <Button type="submit" color="red" onClick={(e) => setShowConfirm(true)}>
        Delete
      </Button>
      <Confirm
        className={mutationLoading ? "loading" : ""}
        open={showConfirm}
        cancelButton="Never mind"
        confirmButton="Let's do it"
        onCancel={(e) => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

const DELETE_EVENT_MUTATION = gql`
  mutation deleteEvent($_id: String!, $creatorId: String!) {
    deleteEvent(input: { _id: $_id, creatorId: $creatorId }) {
      _id
    }
  }
`;

export default DeleteButton;
