import { useEffect, useState } from 'react';
import * as S from './profile-card.styles';
import defaultAvatar from '@/assets/images/avatar-default.png';
import { format } from 'timeago.js';
import { fetchDetailsContact } from '@/modules/contacts/store/features/contacts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import flagList from '@/shared/helper/data/flagIcon';
import { listenUserStatus, offUserStatus } from '@/core/services/socket/socket';

interface ProfileCardProps {
  contactId?: string;
  userId?: string;
  avatarSize?: number;
  name?: string;
  email?: string;
  lastActiveStyle?: React.CSSProperties;
}

const ProfileCard = ({
  contactId,
  userId,
  avatarSize = 40,
  name,
  email,
  lastActiveStyle,
}: ProfileCardProps) => {
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { contactDetails } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    if (contactId) {
      dispatch(fetchDetailsContact({ idContact: contactId }));
    } else if (userId) {
      //handle fetch userDetail
    }
  }, [contactId, userId, dispatch]);

  useEffect(() => {
    const handleStatus = (data: {
      userId?: string;
      contactId?: string;
      isOnline: boolean;
      lastActivityAt?: string | Date;
    }) => {
      // const isTarget =
      //   (contactId && data.contactId === contactId) ||
      //   (userId && data.userId === userId);
      // if (!isTarget) return;

      setIsOnline(data.isOnline);
      if (!data.isOnline && data.lastActivityAt) {
        setLastSeen(format(new Date(data.lastActivityAt)));
      }
    };

    listenUserStatus(handleStatus);
    return () => offUserStatus(handleStatus);
  }, [contactId, userId]);

  const avatar = contactId
    ? contactDetails?.avatar || defaultAvatar
    : defaultAvatar;

  const displayName = contactId ? contactDetails?.name : name;
  const displayEmail = contactId ? contactDetails?.email : email;

  const flagIcon = flagList.find(
    (item) => item.code === contactDetails?.context?.countryCode,
  )?.image;

  return (
    <S.ProfileSection>
      <S.AvatarWrapper>
        <S.Avatar
          src={avatar}
          alt="Avatar"
          width={avatarSize}
          height={avatarSize}
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
          <S.LastActive style={lastActiveStyle}>
            Last active: {lastSeen}
          </S.LastActive>
        )}
      </S.ProfileInfo>
    </S.ProfileSection>
  );
};

export default ProfileCard;
