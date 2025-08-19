import { DEFAULT_FULL_NAME } from '@/core/settings/constants';
import ProfileCard from '@/shared/components/common/ProfileCard';
import { useAppSelector } from '@/shared/hooks';
import { useState, useCallback } from 'react';
import MessageInput from '../message-input/MessageInput';
import * as DetailS from './InboxDetail.styles';
import check from '@/assets/icons/common/ic-check.svg';
import barOpen from '@/assets/icons/common/ic-bar-open.svg';
import barClose from '@/assets/icons/common/ic-bar.svg';
import * as S from '../../pages/inbox-page/InboxPage.styles';

const DetailSkeleton = () => {
  const { selectedConversation } = useAppSelector((state) => state.inbox);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, _setActiveTab] = useState<string | null>(null);
  const [selectedReminder, _setSelectedReminder] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSendMessage = () => {
    // Do nothing in skeleton mode
  };

  return (
    <DetailS.Container>
      {/* Header - Real UI component */}
      <DetailS.Header>
        <DetailS.HeaderLeft>
          <ProfileCard
            contactId={selectedConversation?.contact?.id}
            name={selectedConversation?.contact?.name || DEFAULT_FULL_NAME}
            avatarUrl={selectedConversation?.contact?.avatar}
            countryCode={selectedConversation?.contact?.countryCode}
            hiddenInfo
          />
          <DetailS.Info>
            <DetailS.Name>
              {selectedConversation?.contact?.name || DEFAULT_FULL_NAME}
            </DetailS.Name>
          </DetailS.Info>
        </DetailS.HeaderLeft>
        <DetailS.HeaderRight>
          <DetailS.MarkResolvedButton>
            <img src={check} alt="check" /> Mark Resolved
          </DetailS.MarkResolvedButton>
          <DetailS.ToggleSidebarButton onClick={toggleSidebar}>
            <img src={isSidebarOpen ? barClose : barOpen} alt="toggle" />
          </DetailS.ToggleSidebarButton>
        </DetailS.HeaderRight>
      </DetailS.Header>

      {/* Messages Area - Skeleton Only */}
      <DetailS.MainContent>
        <DetailS.MessageContainer $isSidebarOpen={isSidebarOpen}>
          {/* Message skeletons */}
          {[1, 2, 3, 4, 5].map((i) => (
            <S.SkeletonMessageRow key={i} $isAgent={i % 2 === 0}>
              {i % 2 === 0 ? (
                // Agent message (right side)
                <S.SkeletonAgentMessage>
                  <S.SkeletonAgentBubble>
                    <S.SkeletonText
                      $width="120px"
                      $backgroundColor="rgba(255,255,255,0.8)"
                    />
                  </S.SkeletonAgentBubble>
                  <S.SkeletonTime>08:41 AM</S.SkeletonTime>
                </S.SkeletonAgentMessage>
              ) : (
                // Guest message (left side)
                <S.SkeletonGuestMessage>
                  <S.SkeletonGuestAvatar />
                  <S.SkeletonGuestContent>
                    <S.SkeletonGuestBubble>
                      <S.SkeletonText $width="100px" $backgroundColor="#ddd" />
                    </S.SkeletonGuestBubble>
                    <S.SkeletonTime>08:40 AM</S.SkeletonTime>
                  </S.SkeletonGuestContent>
                </S.SkeletonGuestMessage>
              )}
            </S.SkeletonMessageRow>
          ))}
        </DetailS.MessageContainer>
      </DetailS.MainContent>

      {/* Footer - Real MessageInput component */}
      <DetailS.Footer>
        <MessageInput
          activeTab={activeTab}
          selectedReminder={selectedReminder}
          inputValue={inputValue}
          setInputValue={setInputValue}
          // setActiveTab={setActiveTab}
          // setSelectedReminder={setSelectedReminder}
          onSendMessage={handleSendMessage}
        />
      </DetailS.Footer>
    </DetailS.Container>
  );
};

export default DetailSkeleton;
