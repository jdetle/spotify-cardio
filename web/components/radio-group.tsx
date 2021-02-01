import styled from "styled-components";
type RadioGroupProps = {
  legend: string;
};

export const StyledFieldSet = styled.fieldset`
  display: flex;
  justify-content: flex-start;
  height: 5rem;
  width: 25rem;
  border-radius: 1rem;
  background: linear-gradient(
    293deg,
    ${(props) => props.theme.colors.green3} 0%,
    ${(props) => props.theme.colors.purple2} 35%,
    ${(props) => props.theme.colors.blue2} 100%
  );
  legend {
    font-weight: bold;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.22);
    margin: 0;
    background: linear-gradient(
      -180deg,
      black 0%,
      ${(props) => props.theme.colors.gray1} 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
const RadioGroup: React.FC<RadioGroupProps> = ({ children, legend }) => {
  return (
    <StyledFieldSet>
      <legend>{legend}</legend>
      {children}
    </StyledFieldSet>
  );
};

export default RadioGroup;
