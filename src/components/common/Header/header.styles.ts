import styled from "styled-components";

export const Header = styled.div`
  height: 76px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font-size: 18px;
  color: #333333;
  line-height: 29px;
  font-weight: 600;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 23px;
  color: #8a8a8a;
  margin: 0;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  padding: 4px;
  display: flex;
  align-items: center;

  &:hover {
    color: #000;
  }
`;

export const AddNewButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  color: white;
  border: none;
  width: 116px;
  height: 39px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: 14px;

  &:hover {
    background-color: #162755;
  }

  .plus {
    font-size: 18px;
    font-weight: bold;
  }
`;
