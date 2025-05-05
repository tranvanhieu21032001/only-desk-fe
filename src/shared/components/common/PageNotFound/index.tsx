import { Image } from 'antd';

import * as S from './page-not-found.styled';

import bgNotFount from '@/assets/images/layout/bg-error.jpeg';

function PageNotFound() {
  return (
    <S.NotFound>
      <Image src={bgNotFount} preview={false} />
    </S.NotFound>
  );
}

export default PageNotFound;
