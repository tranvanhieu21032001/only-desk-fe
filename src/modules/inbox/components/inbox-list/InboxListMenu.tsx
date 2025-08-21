import { Image } from 'antd';
import * as S from './InboxList.styles';
import * as CM from '@/shared/styles/themes/ContextMenu.styles';
import { useEffect, useRef } from 'react';
import check from '@/assets/icons/common/ic-check-black.svg';
import unreadIcon from '@/assets/icons/common/ic-unread.svg';
import deleteIcon from '@/assets/icons/common/ic-delete-red.svg';
import { decodeGlobalId } from '@/shared/utils/decode';
import { deleteConversation } from '../../api/inbox.api';
import { commitLocalUpdate, ConnectionHandler } from 'react-relay';
import environment from '@/relay/RelayEnvironment';
import { RecordSourceSelectorProxy } from 'relay-runtime';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  updateConversationUnreadCount,
  updateSelectedConversation,
} from '../../store/features/inbox';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';
import { useTranslation } from 'react-i18next';
import { handleUpdateConversation } from '../../api/conversations.api';
import { useAppSelector } from '@/shared/hooks';
import { openConversation } from '@/shared/chat-logic/services/socket';

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
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation('inbox');
  const workspaceId = useSelector(selectCurrentWorkspaceId);
  const { selectedConversation } = useAppSelector((state) => state.inbox);

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

      if (selectedConversation?.id === conversationId) {
        dispatch(updateSelectedConversation({ resolved: newResolved }));
      }
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
      onCloseMenu?.();
      const realId = decodeGlobalId(conversationId);
      await deleteConversation(realId);

      const isAssignedToMe = location.pathname === '/assigned-to-me';
      commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
        const root = store.getRoot();
        const connection = ConnectionHandler.getConnection(
          root,
          'ConversationListFragment_conversations',
          { assignedToMe: isAssignedToMe },
        );

        if (!connection) return;

        ConnectionHandler.deleteNode(connection, conversationId);
        store.delete(conversationId);

        const edges = connection.getLinkedRecords('edges') || [];
        const nextEdge = edges.find(
          (edge) =>
            edge?.getLinkedRecord('node')?.getValue('id') !== conversationId,
        );
        const nextId = nextEdge?.getLinkedRecord('node')?.getValue('id') as
          | string
          | undefined;

        navigate(
          nextId
            ? `/inbox?conversationId=${encodeURIComponent(nextId)}`
            : '/inbox',
        );
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
      <CM.ContextMenu>
        <CM.ContextMenuItem onClick={onMarkAsResolved}>
          <Image height={20} width={20} src={check} preview={false} />
          <div style={{display:'flex', alignItems:'center'}}>{resolved ? 'Mark as unresolved' : 'Mark as resolved'}</div>
        </CM.ContextMenuItem>
        {(unreadCount ?? 0) > 0 && (
          <CM.ContextMenuItem onClick={onMarkAsUnread}>
            <Image height={20} width={20} src={unreadIcon} preview={false} />
            <div style={{display:'flex', alignItems:'center'}}>Mark as unread</div>
          </CM.ContextMenuItem>
        )}
        <CM.ContextMenuItem
          tabIndex={0}
          role="button"
          className="delete"
          onClick={onDelete}
        >
          <Image src={deleteIcon} preview={false} height={20} width={20} />
          <div style={{display:'flex', alignItems:'center'}}>Delete conversation</div>
        </CM.ContextMenuItem>
      </CM.ContextMenu>
    </S.MenuDropdown>
  );
};

export default InboxListMenu;
