import styled from "styled-components";
import { transparentize } from "polished";
type RadioGroupProps = {
  legend: string;
};

export const StyledFieldSet = styled.fieldset`
  display: flex;
  position: relative;
  justify-content: space-between;
  height: 5rem;
  width: 25rem;
  border-radius: 1rem;
  background-color: ${(p) => p.theme.colors.green1};
  legend {
    font-size: 175%;
    font-weight: normal;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.12);
    display: inline-block;
    border-radius: 0.3rem;
    background-color: ${(p) => transparentize(0.1, p.theme.colors.gray2)};
    margin: 0;
    line-height: 1.5;
    color: ${(p) => p.theme.colors.gray6};
    position: absolute;
    top: -40px;
    padding: 0 5px 0 10px;
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
