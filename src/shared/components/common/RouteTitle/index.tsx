import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useTitle } from '@/core/context/TitleContext';
import { MAIN_ROUTES } from '@/core/routes/constants';

const RouteTitleManager: React.FC = () => {
    const location = useLocation();
    const { t } = useTranslation("inbox");
    const { setTitle } = useTitle();

    useEffect(() => {
        switch (location.pathname) {
            case MAIN_ROUTES.INBOX:
                setTitle(t('inbox.title'));
                break;
            case MAIN_ROUTES.SPAM_CHATS:
                setTitle(t('spam.title'));
                break;
            case MAIN_ROUTES.ALL_PLUGINS:
                setTitle(t('plugins.title'));
                break;
            default:
                setTitle(t('header.title'));
        }
    }, [location.pathname, setTitle, t]);

    return null;
};

export default RouteTitleManager; 