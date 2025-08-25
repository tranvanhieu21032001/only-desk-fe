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
import {
  listenUserStatus,
  offUserStatus,
} from '@/shared/chat-logic/services/socket';
import { DEFAULT_FULL_NAME } from '@/core/settings/constants';

export enum ProfileType {
  CONTACT = 'CONTACT',
  USER = 'USER',
}
interface ProfileInfo {
  id: string;
  type: ProfileType;
  name?: string;
  email?: string;
  avatar?: string;
  context?: {
    countryCode?: string;
  };
}

interface ProfileCardProps {
  profileInfo: ProfileInfo;
  avatarSize?: number;
  flagSize?: number;
  lastActiveStyle?: React.CSSProperties;
  hiddenInfo?: boolean;
  hiddenLastActive?: boolean;
}

const ProfileCard = ({
  profileInfo,
  avatarSize = 40,
  flagSize = 14,
  lastActiveStyle,
  hiddenInfo = true,
  hiddenLastActive = false,
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

  const isDataMissing =
    !profileInfo.name && !profileInfo.email && !profileInfo.avatar;

  useEffect(() => {
    if (!isDataMissing) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (profileInfo.type == ProfileType.CONTACT) {
          const res = await dispatch(
            fetchContactProfileCard({ id: profileInfo.id }),
          );
          const data = res.payload as {
            name?: string;
            email?: string;
            avatar?: string;
            context?: {
              countryCode?: string;
            };
          };
          setFetchedData({
            name: data?.name,
            email: data?.email,
            avatar: data?.avatar,
            countryCode: data?.context?.countryCode,
          });
        } else if (profileInfo.type == ProfileType.USER) {
          const res = await dispatch(
            fetchUserProfileCard({ id: profileInfo.id }),
          );
          const data = res.payload as {
            firstName?: string;
            lastName?: string;
            email?: string;
            avatar?: string;
          };
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
  }, [profileInfo.id, profileInfo.type, isDataMissing, dispatch]);

  useEffect(() => {
    const handleStatus = (data: {
      userId?: string;
      contactId?: string;
      isOnline: boolean;
      lastActivityAt?: string | Date;
    }) => {
      const isTarget =
        (profileInfo.type === ProfileType.CONTACT &&
          data.contactId === profileInfo.id) ||
        (profileInfo.type === ProfileType.USER &&
          data.userId === profileInfo.id);

      if (!isTarget) return;

      setIsOnline(data.isOnline);

      if (!data.isOnline && data.lastActivityAt) {
        setLastActive(format(new Date(data.lastActivityAt)));
      }
    };

    listenUserStatus(handleStatus);
    return () => offUserStatus(handleStatus);
  }, [profileInfo.id, profileInfo.type]);

  const avatar = profileInfo.avatar || fetchedData.avatar || defaultAvatar;
  const displayName =
    profileInfo.name?.trim() || fetchedData.name?.trim() || DEFAULT_FULL_NAME;
  const displayEmail =
    profileInfo.email?.trim() || fetchedData.email?.trim() || '';
  const flagIcon =
    flagList.find(
      (item) =>
        item.code ===
        (profileInfo.context?.countryCode || fetchedData.countryCode),
    )?.image || null;

  return (
    <S.ProfileSection>
      {isLoading ? (
        <>
          <Skeleton.Avatar active size={avatarSize} shape="circle" />
          {!hiddenInfo && (
            <div style={{ marginLeft: 12, flex: 1 }}>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 120, marginBottom: 6 }}
              />
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
              <S.WrappIcon width={flagSize} height={flagSize}>
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

              {!isOnline && lastActive && !hiddenLastActive && (
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
