import { useEffect } from 'react';
import { eventBus } from '@/core/event-bus';
import { EVENTBUS_INBOX_MESSAGE } from '@/core/settings/constants';

interface UseSocketEventProps {
    onMessage?: (msg: any) => void;
    onTyping?: (data: any) => void;
    onConnect?: (data: any) => void;
    onDisconnect?: () => void;
}

export function useSocketEvent({ onMessage, onTyping, onConnect, onDisconnect }: UseSocketEventProps) {
    useEffect(() => {
        if (onMessage) eventBus.on(EVENTBUS_INBOX_MESSAGE, onMessage);
        return () => {
            if (onMessage) eventBus.off(EVENTBUS_INBOX_MESSAGE, onMessage);
        };
    }, [onMessage, onTyping, onConnect, onDisconnect]);
}
