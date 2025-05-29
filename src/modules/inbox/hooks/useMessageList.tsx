import { useState, useEffect, useCallback } from 'react';
import { getMessageList } from '../api/inbox.api';
import { Message } from '../interfaces/inbox';
import { eventBus } from '@/core/event-bus';
import { EVENTBUS_INBOX_MESSAGE } from '@/core/settings/constants';
import { InboxMessageType } from '@/modules/settings/helpers/enums/inbox.enums';

interface UseMessageListProps {
    conversationId: string | null;
}

const MESSAGE_LIMIT = 20;

function isValidMessage(msg: Message): boolean {
    if (!msg || !msg.type) return false;
    if (msg.type === InboxMessageType.Text || msg.type === InboxMessageType.Note) {
        return !!msg.content && msg.content.trim() !== '';
    }
    if (msg.type === InboxMessageType.Image) {
        return !!msg.metadata?.fileUrl;
    }
    return false;
}

export function useMessageList({ conversationId }: UseMessageListProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [page, setPage] = useState(1);

    // Fetch initial messages
    useEffect(() => {
        if (!conversationId) return;
        const fetchInitial = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getMessageList(conversationId, 1, MESSAGE_LIMIT);
                const filtered = response.data.filter(isValidMessage);
                setMessages(filtered);
                setHasNextPage(response.hasNextPage);
                setPage(1);
            } catch (err: any) {
                setError(err.message || 'Error fetching messages');
            } finally {
                setLoading(false);
            }
        };
        fetchInitial();
    }, [conversationId]);

    // Load more messages
    const loadMore = useCallback(async () => {
        if (!conversationId || !hasNextPage || loadingMore) return;
        setLoadingMore(true);
        setError(null);
        try {
            const nextPage = page + 1;
            const response = await getMessageList(conversationId, nextPage, MESSAGE_LIMIT);
            const filtered = response.data.filter(isValidMessage);
            // Tránh trùng lặp
            setMessages((prev) => {
                const prevIds = new Set(prev.map((msg) => msg.id));
                const unique = filtered.filter((msg) => !prevIds.has(msg.id));
                return [...prev, ...unique];
            });
            setHasNextPage(response.hasNextPage);
            setPage(nextPage);
        } catch (err: any) {
            setError(err.message || 'Error loading more messages');
        } finally {
            setLoadingMore(false);
        }
    }, [conversationId, hasNextPage, loadingMore, page]);

    // Real-time: listen for new messages
    useEffect(() => {
        const handleNewMessage = (msg: Message) => {
            if (!isValidMessage(msg)) return;
            setMessages((prev) => [msg, ...prev.filter((m) => m.id !== msg.id)]);
        };
        eventBus.on(EVENTBUS_INBOX_MESSAGE, handleNewMessage);
        return () => {
            eventBus.off(EVENTBUS_INBOX_MESSAGE, handleNewMessage);
        };
    }, []);

    // Add message (for Local UI)
    const addMessage = useCallback((msg: Message) => {
        if (!isValidMessage(msg)) return;
        setMessages((prev) => [msg, ...prev.filter((m) => m.id !== msg.id)]);
    }, []);

    // Update message
    const updateMessage = useCallback((messageId: string, updates: Partial<Message>) => {
        setMessages((prev) =>
            prev.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg))
        );
    }, []);

    // Remove message
    const removeMessage = useCallback((messageId: string) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    }, []);

    return {
        messages,
        loading,
        loadingMore,
        error,
        hasNextPage,
        loadMore,
        addMessage,
        updateMessage,
        removeMessage,
    };
}
