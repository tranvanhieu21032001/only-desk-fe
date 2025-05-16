import React, { createContext, useContext } from 'react';
import { useRelayQuery } from '@/shared/hooks/useRelayQuery';
import { MeQuery } from '@/relay/__generated__/MeQuery.graphql';
import { meQuery } from '@/relay/MeQuery';

const UserContext = createContext<MeQuery['response']['me'] | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const data = useRelayQuery<MeQuery>(meQuery, {}, { fetchPolicy: 'store-or-network' });
    return <UserContext.Provider value={data.me}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);