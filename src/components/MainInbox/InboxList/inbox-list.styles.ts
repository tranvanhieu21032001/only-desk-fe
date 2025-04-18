import styled from "styled-components";

export const Container = styled.div`
  padding: 12px;
  background-color: #fff;
  border-right: 1px solid #ddd;
  overflow-y: auto;
`;

export const SearchFilterWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
`;

export const SearchInputWrapper = styled.div`
  flex: 1;
  height: 39px;
  width: 222px;
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 12px;

  img,
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  height: 39px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 23px;
  color: #333;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;

  img,
  svg {
    width: 20px;
    height: 20px;
    padding-right: 5px;
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 14px;
  line-height: 23px;
  font-weight: 600;
`;

export const Subtitle = styled.div`
  color: #8a8a8a;
  line-height: 23px;
  font-weight: 400;
  font-size: 14px;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Time = styled.div`
  color: #999;
  font-weight: 400;
  line-height: 20px;
  font-size: 12px;
`;

export const Badge = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d91f11;
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
  margin-top: 4px;
`;
