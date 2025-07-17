import { useEffect, useState } from 'react';
import * as S from './profile-card.styles';
import defaultAvatar from '@/assets/images/avatar-default.png';
import { format } from 'timeago.js';
import { fetchDetailsContact } from '@/modules/contacts/store/features/contacts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import flagList from '@/shared/helper/data/flagIcon';
import { listenUserStatus, offUserStatus } from '@/core/services/socket/socket';

interface ProfileCardProps {
  id?: string;
  avatarSrc?: string;
  avatarWidth?: number;
  avatarHeight?: number;
  name?: string;
  email?: string;
  lastActiveFontSize?: number;
  lastActiveItalic?: boolean;
}

const ProfileCard = ({
  id,
  avatarSrc,
  avatarWidth,
  avatarHeight,
  name,
  email,
  lastActiveFontSize,
  lastActiveItalic,
}: ProfileCardProps) => {
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<string | null>(null);
  const [type, setType] = useState<'user' | 'contact' | null>(null);

  const dispatch = useAppDispatch();
  const { contactDetails } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    if (type === 'contact' && id) {
      dispatch(fetchDetailsContact({ idContact: id }));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    const handleStatus = (data: {
      userId?: string;
      contactId?: string;
      isOnline: boolean;
      lastActivityAt?: string | Date;
    }) => {
      if (data.userId === id) {
        setType('user');
      } else if (data.contactId === id) {
        setType('contact');
      } else {
        return;
      }

      setIsOnline(data.isOnline);
      if (!data.isOnline && data.lastActivityAt) {
        setLastSeen(format(new Date(data.lastActivityAt)));
      }
    };

    listenUserStatus(handleStatus);
    return () => offUserStatus(handleStatus);
  }, [id]);

  // ✅ Lấy dữ liệu từ contactDetails nếu là contact
  const avatar = type === 'contact'
    ? contactDetails?.avatar || defaultAvatar
    : avatarSrc || defaultAvatar;

  const displayName = type === 'contact'
    ? contactDetails?.name
    : name;

  const displayEmail = type === 'contact'
    ? contactDetails?.email
    : email;

  const flagIcon = flagList.find(
    (item) => item.code === contactDetails?.context?.countryCode,
  )?.image;

  return (
    <S.ProfileSection>
      <S.AvatarWrapper>
        <S.Avatar
          src={avatar}
          alt="Avatar"
          width={avatarWidth}
          height={avatarHeight}
        />
        {flagIcon && (
          <S.WrappIcon>
            <S.FlagIcon src={flagIcon} />
          </S.WrappIcon>
        )}
        {isOnline && <S.Status isOnline />}
      </S.AvatarWrapper>

      <S.ProfileInfo>
        <S.NameRow>
          <S.Name>{displayName}</S.Name>
        </S.NameRow>
        <S.Email>{displayEmail}</S.Email>
        {!isOnline && lastSeen && (
          <S.LastActive fontSize={lastActiveFontSize} italic={lastActiveItalic}>
            Last active: {lastSeen}
          </S.LastActive>
        )}
      </S.ProfileInfo>
    </S.ProfileSection>
  );
};

export default ProfileCard;
