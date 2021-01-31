import styled from "styled-components";

export const TrackContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.1rem 0.3rem 0.1rem 0.5rem;
`;

export const AddSongButton = styled.button`
  color: ${(p) => p.theme.colors.gray6};
  padding: 0.5rem;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  margin-right: 1rem;
  background-color: ${(p) => p.theme.colors.green1};
`;

export const TrackActionsContainer = styled.div``;
export const TrackDetailsContainer = styled.div`
  font-weight: 700;
  max-width: 20rem;
  color: ${(p) => p.theme.colors.gray1};
`;
