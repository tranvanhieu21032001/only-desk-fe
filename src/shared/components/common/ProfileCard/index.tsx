import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import * as S from './profile-card.styles';
import defaultAvatar from '@/assets/images/avatar-default.png';
import { format } from 'timeago.js';
import {
  fetchContactProfileCard,
  fetchUserProfileCard,
} from '@/modules/contacts/store/features/contacts';
import { useAppDispatch } from '@/shared/hooks';
import flagList from '@/shared/helper/data/flagIcon';
import { listenUserStatus, offUserStatus } from '@/core/services/socket/socket';

interface ContactProfile {
  name?: string;
  email?: string;
  avatar?: string;
  context?: {
    countryCode?: string;
  };
}

interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

interface ProfileCardProps {
  contactId?: string;
  userId?: string;
  avatarSize?: number;
  name?: string;
  email?: string;
  avatarUrl?: string;
  countryCode?: string;
  flagSrc?: string;
  lastActiveStyle?: React.CSSProperties;
  hiddenInfo?: boolean;
}

const ProfileCard = ({
  contactId,
  userId,
  avatarSize = 40,
  name,
  email,
  avatarUrl,
  countryCode,
  flagSrc,
  lastActiveStyle,
  hiddenInfo = false,
}: ProfileCardProps) => {
  const dispatch = useAppDispatch();

  const [isOnline, setIsOnline] = useState(false);
  const [lastActive, setLastActive] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<{
    name?: string;
    email?: string;
    avatar?: string;
    countryCode?: string;
  }>({});

  const isDataMissing = !name && !email && !avatarUrl;

  useEffect(() => {
    if (!isDataMissing) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (contactId) {
          const res = await dispatch(fetchContactProfileCard({ id: contactId }));
          const data = res.payload as ContactProfile;
          setFetchedData({
            name: data?.name,
            email: data?.email,
            avatar: data?.avatar,
            countryCode: data?.context?.countryCode,
          });
        } else if (userId) {
          const res = await dispatch(fetchUserProfileCard({ id: userId }));
          const data = res.payload as UserProfile;
          setFetchedData({
            name: `${data?.firstName ?? ''} ${data?.lastName ?? ''}`.trim(),
            email: data?.email,
            avatar: data?.avatar,
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [contactId, userId, isDataMissing, dispatch]);

  useEffect(() => {
    const handleStatus = (data: {
      userId?: string;
      contactId?: string;
      isOnline: boolean;
      lastActivityAt?: string | Date;
    }) => {
      const isTarget =
        (contactId && data.contactId === contactId) ||
        (userId && data.userId === userId);

      if (!isTarget) return;

      setIsOnline(data.isOnline);

      if (!data.isOnline && data.lastActivityAt) {
        setLastActive(format(new Date(data.lastActivityAt)));
      }
    };

    listenUserStatus(handleStatus);
    return () => offUserStatus(handleStatus);
  }, [contactId, userId]);

  const avatar = avatarUrl || fetchedData.avatar || defaultAvatar;
  const displayName = name || fetchedData.name || '';
  const displayEmail = email || fetchedData.email || '';
  const flagIcon =
    flagSrc ||
    flagList.find(
      (item) => item.code === (countryCode || fetchedData.countryCode),
    )?.image || null;

  return (
    <S.ProfileSection>
      {isLoading ? (
        <>
          <Skeleton.Avatar active size={avatarSize} shape="circle" />
          {!hiddenInfo && (
            <div style={{ marginLeft: 12, flex: 1 }}>
              <Skeleton.Input active size="small" style={{ width: 120, marginBottom: 6 }} />
              <Skeleton.Input active size="small" style={{ width: 160 }} />
            </div>
          )}
        </>
      ) : (
        <>
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

          {!hiddenInfo && (
            <S.ProfileInfo>
              <S.NameRow>
                <S.Name>{displayName}</S.Name>
              </S.NameRow>
              <S.Email>{displayEmail}</S.Email>
              {!isOnline && lastActive && (
                <S.LastActive style={lastActiveStyle}>
                  Last active: {lastActive}
                </S.LastActive>
              )}
            </S.ProfileInfo>
          )}
        </>
      )}
    </S.ProfileSection>
  );
};

export default ProfileCard;
