import Typography from '@/shared/components/common/Typography';

import * as S from './forbidden.styles';

function Forbidden() {
  return (
    <S.Wrapper>
      <S.Content>
        <Typography variant="h5" margin="0 0 40px 0">
          You don't have permission to access this resource.
        </Typography>
      </S.Content>
    </S.Wrapper>
  );
}

export default Forbidden;
