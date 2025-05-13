import { Image } from 'antd';

import * as S from './Map.styles';

import imgMapMockup from '@/assets/images/contact/img-map-mockup.png';

function Map() {
  return (
    <S.MapContainer>
      <Image preview={false} src={imgMapMockup} alt="map" />
    </S.MapContainer>
  );
}

export default Map;
