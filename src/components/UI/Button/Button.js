import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font: inherit;
  border: 1px solid #4f005f;
  background: ${(props) => (props.primary ? "orangered" : "#4f005f")};
  color: ${(props) => (props.primary ? "black" : "white")};
  padding: ${(props) => (props.big ? "4rem 6rem" : "0.75rem 3.5rem")};
  cursor: pointer;
  font-size: 1.15rem;
  border-radius: 30px;
  transition: all 0.3s;
  margin-top: 2rem;

  &:hover,
  &:active,
  &:focus {
    background: #741188;
    border-color: #741188;
    outline: none;
  }

  &:disabled,
  &:focus:disabled,
  &:hover:disabled,
  &:active:disabled {
    background: #ccc;
    border-color: #ccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

const Button = (props) => {
  return (
    <StyledButton
      type={props.type || "button"}
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
      big={props.big}
      primary={props.primary}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
