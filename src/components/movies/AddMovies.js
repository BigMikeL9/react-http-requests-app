import React, { useRef } from "react";
import styled from "styled-components";

import Button from "../UI/Button/Button";

const Control = styled.div`
  margin: 1rem 0;

  & label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  & input,
  & textarea {
    display: block;
    width: 100%;
    font: inherit;
    padding: 0.2rem;
    border-radius: 12px;
    border: 1px solid #ccc;
  }

  & input:focus,
  & textarea:focus {
    outline: none;
    border-color: #230052;
  }
`;

const AddMovies = (props) => {
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const dateRef = useRef("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // could add validation here...

    const submittedMovie = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
    };

    props.onSubmit(submittedMovie);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Control>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" ref={titleRef} />
      </Control>

      <Control>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" type="text" id="opening-text" ref={descriptionRef} />
      </Control>

      <Control>
        <label htmlFor="date">Date:</label>
        <input type="text" id="date" ref={dateRef} />
      </Control>

      <Button type="submit">Submit Movie</Button>
    </form>
  );
};

export default AddMovies;
