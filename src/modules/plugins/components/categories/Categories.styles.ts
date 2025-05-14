import { styled } from 'styled-components';

export const CategoryContainer = styled.section`
  padding: 24px;
  height: 100%;

  border-radius: 8px 0 0 8px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    padding: 12px 12px 0;
    margin-bottom: 0px;
  }
`;

export const LabelCategories = styled.div``;

export const Categories = styled.div`
  padding: 12px 0;

  gap: 4px;
  display: flex;
  flex-direction: column;

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const CategoryWrap = styled.div`
  padding: 8px;

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

export const Count = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props?.theme?.colors?.newtral};
  padding: 5px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: ${(props) => props?.theme?.fontSize?.sm};
    color: ${(props) => props?.theme?.colors?.newtralLight};
  }
`;
