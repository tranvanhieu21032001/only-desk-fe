import { Image } from 'antd';
import * as S from './InboxList.styles';
import { useEffect, useRef } from 'react';
import check from '@/assets/icons/common/ic-check-black.svg';
import unreadIcon from '@/assets/icons/common/ic-unread.svg';
import deleteIcon from '@/assets/icons/common/ic-delete-red.svg';
import { decodeGlobalId } from '@/shared/utils/decode';
import { deleteConversation } from '../../api/inbox.api';

type Props = {
  unreadCount?: number;
  conversationId?: string;
  onCloseMenu: () => void;
  openMenuButtonRef: React.RefObject<HTMLDivElement>; // <-- ref tới icon ba chấm bên ngoài
};

const InboxListMenu: React.FC<Props> = ({
  unreadCount,
  conversationId,
  onCloseMenu,
  openMenuButtonRef,
}) => {
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  //close menu when click outside menu and ... button
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        openMenuButtonRef.current &&
        !openMenuButtonRef.current.contains(target) &&
        menuDropdownRef.current &&
        !menuDropdownRef.current.contains(target)
      ) {
        onCloseMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuButtonRef]);

  const onMarkAsResolved = () => {
    if (!conversationId) return;
    //call api update conversation
  };

  const onMarkAsUnread = () => {
    if (!conversationId) return;
    //call socket event openConversation
  };

  const onDelete = async () => {
    if (!conversationId) return;
    try {
      onCloseMenu();
      const realId = decodeGlobalId(conversationId);
      await deleteConversation(realId);
      //remove conversation from relay store based on conversationId
    } catch (err) {
      //
    }
  };

  return (
    <S.MenuDropdown
      ref={menuDropdownRef}
      isOpen={true}
      onClick={(e) => e.stopPropagation()}
    >
      <S.MenuItem onClick={() => onMarkAsResolved()}>
        <Image src={check} preview={false} />
        Mark as resolved
      </S.MenuItem>
      {(unreadCount ?? 0) > 0 && (
        <S.MenuItem onClick={() => onMarkAsUnread()}>
          <Image src={unreadIcon} preview={false} />
          Mark as unread
        </S.MenuItem>
      )}
      <S.MenuItem
        tabIndex={0}
        role="button"
        className="delete"
        onClick={() => onDelete()}
      >
        <Image src={deleteIcon} preview={false} />
        Delete conversation
      </S.MenuItem>
    </S.MenuDropdown>
  );
};

export default InboxListMenu;
