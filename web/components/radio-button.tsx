import { HTMLProps } from "react";
import styled, { css } from "styled-components";

type RadioButtonProps = {
  isActive?: boolean;
  onSelect?: () => void;
};

const StyledButton = styled.button<{ isActive: boolean }>`
  margin-right: 0.5rem;
  border-radius: 0.75rem;
  color: ${(p) => p.theme.colors.gray6};
  background: linear-gradient(
    293deg,
    ${(props) => props.theme.colors.gray1} 0%,
    ${(props) => props.theme.colors.purple6} 35%,
    ${(props) => props.theme.colors.blue1} 100%
  );
  width: 3rem;
  ${(props) =>
    props.isActive &&
    css`
      color: ${props.theme.colors.blue3};
      border: 0.2rem solid ${props.theme.colors.blue3};
    `}
`;

export const RadioButton: React.FC<RadioButtonProps &
  HTMLProps<HTMLButtonElement>> = ({
  isActive,
  disabled,
  onSelect,
  children,
}) => {
  return (
    <StyledButton
      disabled={disabled ?? false}
      isActive={isActive ?? false}
      onKeyPress={(e) => {
        if (e.charCode == 13 && onSelect) {
          onSelect();
        }
      }}
      onClick={onSelect}
    >
      {children}
    </StyledButton>
  );
};
export default RadioButton;
