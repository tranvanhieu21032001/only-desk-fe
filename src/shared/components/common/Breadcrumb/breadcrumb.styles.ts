import { styled } from 'styled-components';

export const BreadcrumbContainer = styled.section`
  margin-bottom: 24px;

  .breadcrumb-contact {
    display: flex;
    align-items: center;
    gap: 12px;

    div {
      height: 21px;
    }
  }

  a:hover {
    background-color: transparent;

    div {
      color: ${(props) => props.theme.colors.secondaryDarker};
    }
  }

  .ant-breadcrumb li:last-child .breadcrumb-contact {
    color: ${(props) => props?.theme?.colors?.secondaryDarker};
  }

  .ant-breadcrumb-separator {
    height: fit-content;
  }

  @media ${(props) => props?.theme?.breakpoints?.xlMax} {
    margin-bottom: 0px;
  }
`;
