import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 12px;
`;

export const GroupMethod = styled.div`
  display: flex;
    gap: 16px;
`;

export const Wrapper= styled.div`
  align-items: center;
  margin-bottom: 32px;
    padding: 24px;
  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  cursor: pointer;
`;


export const PaymentMethod = styled.div<{ isActive?: boolean }>`
  flex: 50%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
   border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  background-color: ${(props) =>
    props.isActive ? props?.theme?.colors?.secondaryDark : '#fff'};
   color: ${(props) =>
    props.isActive ? props?.theme?.colors?.newtral : ''};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  cursor: pointer;
  transition: all 0.2s ease;
`;



export const PaymentContent = styled.div`
`;
export const OrderSummary = styled.div`
  padding: 24px;
  border-radius: 12px;
  background: ${(props) => props?.theme?.colors?.secondaryLight};
  hr{
   border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  }
`;

export const Title = styled.h3`
    font-size:26px;
    font-weight: ${(props) => props?.theme?.fontWeight?.semiBold};
    color: ${(props) => props?.theme?.colors?.secondaryDark};
    padding:12px 0;
`;


export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
    align-items: center;
 padding:24px 0;
 span{
  color: ${(props) => props?.theme?.colors?.secondaryDark};
 }

`;

export const GroupField = styled.div`
  display: flex;
align-items: center;
gap:8px;
margin-bottom:12px;
`;

export const Price = styled.h3`
    color: ${(props) => props?.theme?.colors?.secondaryDark};

`;

export const SideNote = styled.div`
  padding: 16px;
  background: #f0f2f5;
  border-radius: 8px;
  text-align: center;
`;
