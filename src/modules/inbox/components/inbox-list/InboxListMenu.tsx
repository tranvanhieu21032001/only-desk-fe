import { Image } from 'antd';
import * as S from './InboxList.styles';
import { useEffect, useRef } from 'react';
import check from '@/assets/icons/common/ic-check-black.svg';
import unreadIcon from '@/assets/icons/common/ic-unread.svg';
import deleteIcon from '@/assets/icons/common/ic-delete-red.svg';
import { decodeGlobalId } from '@/shared/utils/decode';
import { deleteConversation } from '../../api/inbox.api';
import { commitLocalUpdate, ConnectionHandler } from 'react-relay';
import environment from '@/relay/RelayEnvironment';
import { RecordSourceSelectorProxy } from 'relay-runtime';
import { useNavigate } from 'react-router-dom';
import { openConversation } from '@/core/services/socket/socket';
import {
  updateConversationUnreadCount,
  updateSelectedConversation,
} from '../../store/features/inbox';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';
import { useTranslation } from 'react-i18next';
import { handleUpdateConversation } from '../../api/conversations.api';

type Props = {
  unreadCount?: number;
  resolved?: boolean;
  conversationId?: string;
  onToggleResolved?: (newResolved: boolean) => void;
  onCloseMenu: () => void;
  openMenuButtonRef: React.RefObject<HTMLDivElement>;
};

const InboxListMenu: React.FC<Props> = ({
  unreadCount,
  resolved,
  conversationId,
  onToggleResolved,
  onCloseMenu,
  openMenuButtonRef,
}) => {
  const menuDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('inbox');
  const workspaceId = useSelector(selectCurrentWorkspaceId);

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

  const onMarkAsResolved = async () => {
    if (!conversationId) return;

    try {
      onCloseMenu();

      const rawId = decodeGlobalId(conversationId);
      const newResolved = !resolved;

      await handleUpdateConversation(rawId, { resolved: newResolved }, t);

      onToggleResolved?.(newResolved);
      dispatch(updateSelectedConversation({ resolved: newResolved }));
    } catch (err) {
      console.error('Failed to update conversation resolved state:', err);
    }
  };

  const onMarkAsUnread = () => {
    if (!conversationId) return;
    try {
      const rawId = decodeGlobalId(conversationId);
      openConversation(rawId);

      if (workspaceId) {
        dispatch(
          updateConversationUnreadCount({
            workspaceId,
            conversationId,
            unreadCount: 0,
          }),
        );
      }
    } catch (err) {
      console.error('Failed to mark as unread:', err);
    }
  };
  const onDelete = async () => {
    if (!conversationId) return;

    try {
      onCloseMenu();

      const realId = decodeGlobalId(conversationId);
      await deleteConversation(realId);

      commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
        const root = store.getRoot();

        const connection = ConnectionHandler.getConnection(
          root,
          'ConversationListFragment_conversations',
        );

        if (!connection) return;

        ConnectionHandler.deleteNode(connection, conversationId);
        store.delete(conversationId);

        const edges = connection.getLinkedRecords('edges') || [];
        const firstEdge = edges[0];
        const firstNode = firstEdge?.getLinkedRecord('node');
        const nextConversationGlobalId = firstNode?.getValue('id') as
          | string
          | undefined;

        if (nextConversationGlobalId) {
          navigate(
            `/inbox?conversationId=${encodeURIComponent(nextConversationGlobalId)}`,
          );
        } else {
          navigate('/inbox');
        }
      });
    } catch (err) {
      console.error('Failed to delete conversation:', err);
    }
  };

  return (
    <S.MenuDropdown
      ref={menuDropdownRef}
      isOpen={true}
      onClick={(e) => e.stopPropagation()}
    >
      <S.MenuItem onClick={onMarkAsResolved}>
        <Image src={check} preview={false} />
        {resolved ? 'Mark as unresolved' : 'Mark as resolved'}
      </S.MenuItem>
      {(unreadCount ?? 0) > 0 && (
        <S.MenuItem onClick={onMarkAsUnread}>
          <Image src={unreadIcon} preview={false} />
          Mark as unread
        </S.MenuItem>
      )}
      <S.MenuItem
        tabIndex={0}
        role="button"
        className="delete"
        onClick={onDelete}
      >
        <Image src={deleteIcon} preview={false} />
        Delete conversation
      </S.MenuItem>
    </S.MenuDropdown>
  );
};

export default InboxListMenu;
