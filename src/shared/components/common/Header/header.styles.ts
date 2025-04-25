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

export const CreateButton = styled.button`
  background-color: #1E266D,
  color: #fff,
  border: none,
  padding: 12px 20px,
  border-radius: 8px,
  font-size: 14px,
  display: flex,
  align-items: center,
  gap: 6px,
  cursor: pointer,
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

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FormGap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  line-height: 23px;
  font-weight: 400;

  span {
    color: red;
  }
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
`;

export const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
`;

export const ParticipantsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

export const ParticipantTag = styled.span`
  background-color: #f2f2f2;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
`;

export const DropdownRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;
`;

export const DropdownHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;

  span {
   color: #757575;
   font-size: 14px;
  }
`;

export const ArrowIcon = styled.span<{ isOpen: boolean }>`
  margin-left: auto;
  font-size: 12px;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  transition: transform 0.2s ease;
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 4px;
  overflow: hidden;
  z-index: 10;
`;

export const TagsWrapper = styled.div`
  display: flex;
  padding: 8px;
  border-radius: 8px;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  position: relative;
  border: 1px solid #e8e8e8;
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  background: #FAFAFA;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  color: #000;
`;

export const RemoveTagButton = styled.div`
  background: none;
  border: none;
  color: #666;
  margin-left: 4px;
  cursor: pointer;
  font-size: 12px;

  img, 
  svg {
   width: 10px;
   height: 10px;
  }
`;

export const RemoveImage = styled.div`
   width: 14px;
   height: 10px;
   display: flex;
   justify-content: center;
   align-items: center; 
`;

export const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 16px;
  margin-left: auto;
`;

