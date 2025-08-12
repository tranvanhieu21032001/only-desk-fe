import icDefaultWorkspace from '@/assets/images/workspace-default.png';
import * as S from './profile-card.styles';
export const SystemAvatar = ({ avatarSize = 40 }: { avatarSize?: number }) => {
  return (
    <S.ProfileSection>
      <S.AvatarWrapper>
        <S.Avatar
          src={icDefaultWorkspace}
          alt="Avatar"
          width={avatarSize}
          height={avatarSize}
        />
      </S.AvatarWrapper>
    </S.ProfileSection>
  );
};
