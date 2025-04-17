import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 94px;
  height: 100vh;
  background-color: #333333;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  border-right: 1px solid #ddd;
`;

export const TopContainer = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

export const BottomContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const TopSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Underline = styled.div`
  width: 40%;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
`;

export const Avatar = styled.image<{ src?: string }>`
  width: 40px;
  height: 40px;
  object-fit: contain;
  background: url(${(props) => props.src}) center/cover no-repeat;
`;

export const BottomAvatar = styled(Avatar)`
  margin: 1rem 0 0;
`;

export const IconWrapper = styled.div<{ active?: boolean }>`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? "#5e5e5e" : "transparent")};
  cursor: pointer;
  border-left: ${(props) =>
    props.active ? "4px solid red" : "4px solid transparent"};
  transition: all 0.2s ease;

  &:hover {
    background-color: #5e5e5e;
    border-left: 4px solid red;
  }

  img,
  svg {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
  }
`;
