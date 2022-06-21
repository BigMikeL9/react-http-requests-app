import React from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Button from "./components/UI/Button/Button";

const AppContainer = styled.div`
  margin: 3rem auto;
  width: 30rem;
  padding: 1rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  text-align: center;

  & h1 {
    margin: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <h1>Hi there!</h1>
        <Button>Click me</Button>
      </AppContainer>
    </>
  );
}

export default App;
