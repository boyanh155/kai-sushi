"use client";

import styled, { keyframes } from "styled-components";

const pulsIn = keyframes`
  0% {
    box-shadow: inset 0 0 0 1rem #fff;
    opacity: 1;
  }
  50%, 100% {
    box-shadow: inset 0 0 0 0 #fff;
    opacity: 0;
  }
`;
const LoadingContainer = styled.div`
  inset: 0;
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex-grow: 1;
  width: 100vw;
  height: auto;
  z-index: 200;
  overflow: hidden;
`;
const pulsOut = keyframes`
  0%, 50% {
    box-shadow: 0 0 0 0 #fff;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 1rem #fff;
    opacity: 1;
  }
`;

const Loader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 6rem;
  min-width: 6rem;
  min-height: 6rem;
  margin: auto;

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    animation: ${pulsOut} 1.8s ease-in-out infinite;
    filter: drop-shadow(0 0 1rem rgba(255, 255, 255, 0.75));
  }

  &:before {
    width: 100%;
    padding-bottom: 100%;
    box-shadow: inset 0 0 0 1rem #fff;
    animation-name: ${pulsIn};
  }

  &:after {
    width: calc(100% - 2rem);
    padding-bottom: calc(100% - 2rem);
    box-shadow: 0 0 0 0 #fff;
  }
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  z-index: 50;
`;
const Loading = () => {
  return (
    <LoadingContainer>
      <Overlay />
      <Loader className="absolute z-[101] top-[38%]" />
    </LoadingContainer>
  );
};

export default Loading;
