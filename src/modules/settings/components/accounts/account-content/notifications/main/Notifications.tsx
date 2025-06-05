import { useState } from 'react';

import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';

import * as S from './Notifications.styles';

import iconWarning from '@/assets/icons/setting/ic-warning-red.svg';
import iconTickCircle from '@/assets/icons/setting/ic-tick.svg';

const NotificationSettings = () => {
  const [isPublic, setIsPublic] = useState(false);

  return (
    <S.NitificationsColumn>
      <S.NotificationsContainer>
        <S.Notifications>
          <S.NotificationsLabel>
            <Typography
              fontWeight={fontWeight?.semiBold}
              color={themeColors?.secondaryDarker}
            >
              Notifications
            </Typography>
          </S.NotificationsLabel>

          <S.NotificationsWarning>
            <S.WarningBox>
              <img src={iconWarning} alt="" />
              <p>
                It seems that notifications are disable in your browser
                settings.
              </p>
            </S.WarningBox>

            <span>How to enable notificaitons?</span>
          </S.NotificationsWarning>

          <S.ManageNotifications>
            <Typography
              fontWeight={fontWeight?.semiBold}
              color={themeColors?.secondaryDarker}
              variant="h5"
            >
              Choose how you want to manage your notifications.
            </Typography>

            <p>
              It is not recommended to disable them, as you won’t get notified
              when you receive new messages.
            </p>

            <S.ManageNotificationsFooter>
              <p>Disable all notifications</p>

              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.ManageNotificationsFooter>
          </S.ManageNotifications>

          <S.ManageNotifications>
            <S.PushNotifications>
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.secondaryDarker}
                variant="h5"
              >
                Push notifications
              </Typography>

              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.PushNotifications>

            <S.ManageNotificationsFooter>
              <p>Notify me of messages when I am online</p>

              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.ManageNotificationsFooter>

            <S.ManageNotificationsFooter>
              <p>Notify me of messages when I am offline</p>

              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.ManageNotificationsFooter>

            <S.ManageNotificationsFooter>
              <p>Notify me when a visitor is browsing my website</p>

              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.ManageNotificationsFooter>

            <S.ManageNotificationsFooter>
              <p>Play notification sounds</p>

              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.ManageNotificationsFooter>
          </S.ManageNotifications>

          <S.ManageNotifications>
            <S.PushNotifications>
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.secondaryDarker}
                variant="h5"
              >
                Email notifications
              </Typography>

              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.PushNotifications>

            <S.ManageNotificationsFooter>
              <p>Email me unread messages</p>

              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.ManageNotificationsFooter>

            <S.ManageNotificationsFooter>
              <p>Email me transcripts of conversations</p>

              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.ManageNotificationsFooter>

            <S.ManageNotificationsFooter>
              <p>Email me user ratings</p>

              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.ManageNotificationsFooter>

            <S.ManageNotificationsFooter>
              <p>Email me paid invoices (only if you use a paid plan)</p>
              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.ManageNotificationsFooter>
          </S.ManageNotifications>
        </S.Notifications>
      </S.NotificationsContainer>

      <S.DiffrentContainer>
        <div></div>
        <S.AutoSaveIndicator>
          <img src={iconTickCircle} alt="auto-save" />
          <p>Automatically saved</p>
        </S.AutoSaveIndicator>
      </S.DiffrentContainer>
    </S.NitificationsColumn>
  );
};

export default NotificationSettings;
