import themeColors from "@/shared/styles/themes/default/colors";
import styled from "styled-components";

// Styled Components
export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const InfoOverlay = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  color:${themeColors?.newtralLightest};
  font-size: 14px;
  line-height: 1.6;
  min-width: 180px;
  justify-content: center;
  width: 248px;
  height: 126px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

