import styled from "styled-components";

export const InboxWrapper = styled.div`
  flex: 1;
  display: flex;
`;

export const InboxList = styled.div`
  width: 300px;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  overflow-y: auto;
`;

export const InboxDetail = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 1rem;
`;

export const InboxProfile = styled.div`
  width: 300px;
  background-color: #fff;
  border-left: 1px solid #ddd;
  padding: 1rem;
  overflow-y: auto;
`;
