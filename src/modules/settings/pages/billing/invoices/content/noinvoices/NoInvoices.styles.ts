import { styled } from 'styled-components';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import Typography from '@/shared/components/common/Typography';


export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 90vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;


export const Title = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
`;

export const Description = styled(Typography)`
  font-size: 14px;
  color: #888;
  margin-top: 8px;
`;