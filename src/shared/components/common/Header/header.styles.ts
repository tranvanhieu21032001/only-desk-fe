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

export const DropdownMenu = styled.div`
  position: absolute;
  top: 76px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 200px;
  overflow: hidden;
  padding: 0.5rem 12px;
`;

export const DropdownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #edf1f8;
    color: #162755;
    border-radius: 8px;
  }
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

  .plus {
    font-size: 18px;
  }
`;
