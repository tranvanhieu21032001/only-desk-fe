import styled from 'styled-components';
import themeColors from '@/shared/styles/themes/default/colors';
import { Menu } from 'antd';

export const Container = styled.div`
  gap: 12px;
  padding: 12px;
  background-color: ${themeColors?.newtralLightest};
  height: 100%;
  margin: 0 auto;
  width: 100%;
`;

export const GroupActions = styled.div`
  display: flex;
  gap: 4px;
  background-color: ${themeColors?.newtralLightest};
  margin: 0 auto;
  width: 100%;
`;

export const Input = styled.input`
  flex: 3 3 0;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

export const Select = styled.select`
  flex: 2 2 0;
  padding: 8px 8px 8px 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  max-width: 65px;
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M10%2014.4995C9.41668%2014.4995%208.83335%2014.2745%208.39168%2013.8329L2.95835%208.39954C2.71668%208.15788%202.71668%207.75788%202.95835%207.51621C3.20002%207.27454%203.60002%207.27454%203.84168%207.51621L9.27502%2012.9495C9.67502%2013.3495%2010.325%2013.3495%2010.725%2012.9495L16.1583%207.51621C16.4%207.27454%2016.8%207.27454%2017.0417%207.51621C17.2833%207.75788%2017.2833%208.15788%2017.0417%208.39954L11.6083%2013.8329C11.1667%2014.2745%2010.5833%2014.4995%2010%2014.4995Z%22%20fill%3D%22%238A8A8A%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 10px center;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

export const Filter = styled.div`
  flex: 1 1 0;
  font-size: 1rem;
  color: #555;
  margin: 0;
  max-width: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 8px;
`;


export const MenuBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  text-align: center;
  gap: 8px;
`;


export const WrapperSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #f9f9f9;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const Avatar = styled.div`
  overflow: hidden;
  flex-shrink: 0;
`;

export const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

export const OneLineText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  color:${themeColors?.newtralDarker}
`

export const ThreeDotWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledMenu = styled(Menu)`
  .ant-dropdown-menu-item {
    gap:8px !important;
  }
`;