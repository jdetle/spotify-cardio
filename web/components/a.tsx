import styled, { css } from "styled-components";

export default styled.a<{
  primary?: boolean;
  xl?: boolean;
  backgroundColor?: "green1" | "green" | "purple1" | "blue";
  active?: boolean;
}>`
  ${(p) =>
    p.backgroundColor &&
    css`
      &:hover {
        color: #fff;
        background-color: ${p.theme.colors.green3};
      }
      color: #fff;
      background-color: ${p.theme.colors.green2};
    `}
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  font-size: 16px;
  line-height: 16px;
  border-radius: 500px;
  padding: 19px 56px 21px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 0rem 0;
  margin: 0.5rem 1rem;
  font-weight: 600;
  width: 20rem;
  text-decoration: none;
  padding: 2rem;
  transition-duration: .3s;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  z-index: 1;
  display: inline-block;
  margin-bottom: 0;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  @media (max-width: 420px) {
    font-size: 1m;
    height: 4rem;
  }

 
  ${(props) =>
    props.active &&
    css`
      color: ${props.theme.colors.green3};
      border: 0.2rem solid ${props.theme.colors.green3};
    `}
  ${(props) =>
    props.primary &&
    css`
      background: white;
      color: ${props.theme.colors.green1};
    `}
  ${(props) =>
    props.xl &&
    css`
      width: 30rem;
      height: 10rem;
      text-align: center;
      @media (max-width: 420px) {
        height: 6rem;
        width: 18rem;
      }
    `}
`;
