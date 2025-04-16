import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 94px;
  height: 100vh;
  background-color: #fff;
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
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

export const BottomContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Underline = styled.div`
  width: 60%;
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

export const SectionLabel = styled.div`
  font-size: 12px;
  color: #8a8a8a;
  margin: 1rem 0 0.5rem;
`;

export const IconWrapper = styled.div<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  margin: 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? "#e7edff" : "transparent")};
  cursor: pointer;
  position: relative;

  svg,
  img {
    width: 20px;
    height: 20px;
    fill: ${(props) => (props.active ? "#2C4ECF" : "#555")};
  }

  &:hover {
    background-color: #f3f3f3;
  }
`;
