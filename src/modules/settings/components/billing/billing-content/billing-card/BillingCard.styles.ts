import { styled } from 'styled-components';

export const AccountInformationContainer = styled.section`
  height: calc(100vh - 80px);
  overflow-y: scroll;
  dislay: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 4px;
    height: 9px;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    height: calc(100vh - 140px);
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    height: calc(100vh - 140px);
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    height: calc(100vh - 180px);
  }

  @media ${(props) => props?.theme?.breakpoints?.xsMax} {
    height: calc(100vh - 220px);
  }
`;

export const AccountInformation = styled.div`
  padding: 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  .ant-form {
    overflow-y: auto;
  }
`;

export const AccountInformationLabel = styled.div`
  p {
    font-size: 20px;
  }
`;

export const BillingRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;

  padding-top: 10px;
  img,
  svg {
    width: 20px;
    height: 20px;
    objt-fit: contain;
  }
`;

export const CopyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;

  h2 {
    font-size: 18px;
    line-height: 29px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: #333;
    line-height: 23px;
    font-weight: 400;
    padding-bottom: 10px;
  }

  img,
  svg {
    width: 200px;
    height: 200px;
    objt-fit: contain;
  }
`;

export const WrapperStep2 = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const Step2Col = styled.div`
  flex: 1;
`;

export const Step1Container = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;

  margin-top: 20px;
`;

export const Step2Form = styled.div`
  padding: 24px 0 0 0;
`;

export const Step1Wrapper = styled.div`
  padding: 24px 0 0 0;
`;

export const PaymentMethodBox = styled.div<{ active?: boolean }>`
  border: ${({ active }) =>
    active ? '2px solid #2D3A96' : '1px solid #E0E0E0'};
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 54px;
  background: ${({ active }) => (active ? '#F5F7FF' : '#fff')};
  font-weight: 600;
  font-size: 18px;
  color: ${({ active }) => (active ? '#2D3A96' : '#222')};
  transition:
    border 0.2s,
    background 0.2s,
    color 0.2s;
`;

export const Step1Desc = styled.div`
  color: #222;
  font-weight: 600;
  font-size: 14px;
  line-height: 23px;
  margin-bottom: 8px;
`;

export const Step2Button = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const Step1DescSub = styled.div`
  color: #8a8a8a;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
`;

export const RemoveCardButton = styled.button`
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  color: #2d3a96 !important;
  text-decoration: underline;
  width: auto !important;
  padding: 0 8px !important;
  min-width: 0 !important;
  height: auto !important;
`;

export const EmptyCardImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

export const EmptyCardTitle = styled.h2`
  font-size: 18px;
  line-height: 29px;
  font-weight: 600;
`;

export const EmptyCardDesc = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 23px;
  font-weight: 400;
  padding-bottom: 10px;
`;

export const EmptyCardActions = styled.div`
  padding-top: 10px;
  display: flex;
  gap: 20px;
`;

export const CardListWrapper = styled.div`
  padding: 16px;
`;

export const CardItem = styled.div`
  display: flex;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
  padding: 20px;
  align-items: center;
`;

export const CardLeft = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  min-width: 280px;
  margin-right: 32px;
`;

export const CardLeftHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardValid = styled.div`
  display: flex;
  padding: 6px;
  gap: 2px;
  align-items: center;

  border-radius: 8px;
  border: 1px solid #ccc;
  color: #333;
  font-weight: 500;
`;

export const CardInfoLabel = styled.div`
  color: #888;
  font-size: 13px;
  margin-top: 20px;
  margin-bottom: 10px;

  display: flex;

  p {
    font-weight: 600;
    color: black;
  }

  span {
    width: 200px;
  }
`;

export const CardInfoValue = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

export const CardFlex = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const CardNumber = styled.div`
  letter-spacing: 2px;
`;

export const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CardRightRow = styled.div`
  display: flex;
  gap: 32px;
`;

export const CardRightCol = styled.div`
  min-width: 120px;
`;

export const CardWorkspaceTag = styled.div`
  display: flex;
  align-items: center;
  background: #edf1f8;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 500;
  gap: 6px;
`;

export const CardRightActions = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 8px;
`;

export const CardActionRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  p {
    color: #3750b2;
    font-weight: 600;
    font-size: 14px;
    line-height: 23px;
    cursor: pointer;
  }
`;

export const LookingAccountInformation = styled.div`
  margin-top: 4px;
  padding: 20px 16px;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const LookingAccountWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Automatically = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;

  padding: 8px 12px;
  border-radius: ${(props) => props.theme.radius?.normalRadius};
  border: 1px solid ${(props) => props.theme.colors.newtral};
`;
