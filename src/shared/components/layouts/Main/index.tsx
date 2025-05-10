import { isEmpty } from 'lodash';
import React, { ReactNode, useState } from 'react';
import { Image, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PlusCircleOutlined } from '@ant-design/icons';

import {
  chatsPaths,
  pluginsPaths,
  settingsPaths,
} from '@/shared/helper/data/layout';
import { useAppDispatch } from '@/shared/hooks';
import { MAIN_ROUTES } from '@/core/routes/constants';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { MAX_COUNT } from '@/modules/plugins/helper/data/allPlugins';
import NewSubInboxPage from '@/modules/inbox/pages/new-sub-inbox-page/NewSubInboxPage';

import Header from '../../common/header/Main';
import Typography from '../../common/Typography';

import * as S from './main.styles';

import icUser from '@/assets/icons/layout/ic-user.svg';
import icPlus from '@/assets/icons/layout/ic-plus.svg';
import icChats from '@/assets/icons/layout/ic-chats.svg';
import icGlobal from '@/assets/icons/layout/ic-global.svg';
import icPlugins from '@/assets/icons/layout/ic-plugins.svg';
import icAllChats from '@/assets/icons/layout/ic-all-chat.svg';
import icCampaign from '@/assets/icons/layout/ic-campaign.svg';
import icUserTick from '@/assets/icons/layout/ic-user-tick.svg';
import icSpamChats from '@/assets/icons/layout/ic-spam-chats.svg';
import icKnowledge from '@/assets/icons/layout/ic-knowledge.svg';
import icPlusCircle from '@/assets/icons/layout/ic-plus-circle.svg';
import icAiAutomation from '@/assets/icons/layout/ic-ai-automation.svg';
import icMockupWorkSpaces from '@/assets/icons/layout/ic-mockup-workspaces.svg';

//AI Automation
import icAiChatBox from '@/assets/icons/layout/ic-ai-chatbox.svg';
import icWebContent from '@/assets/icons/layout/ic-web-content.svg';
import icInboxMessage from '@/assets/icons/layout/ic-inbox-message.svg';
import icKnowledgeBase from '@/assets/icons/layout/ic-knowledge-base.svg';
import icAnswerSnippets from '@/assets/icons/layout/ic-answer-snippets.svg';
import icAiChatBoxTrigger from '@/assets/icons/layout/ic-ai-chatbox-trigger.svg';

//Knowledge Base
import icArticles from '@/assets/icons/layout/ic-articles.svg';
import icCategories from '@/assets/icons/layout/ic-categories.svg';

//Plugins
import icAllPlugins from '@/assets/icons/layout/ic-all-plugins.svg';
import icInstalledPlugins from '@/assets/icons/layout/ic-installed-plugins.svg';

//Settings
import icEmail from '@/assets/icons/layout/ic-email.svg';
import icAccount from '@/assets/icons/layout/ic-account.svg';
import icBilling from '@/assets/icons/layout/ic-billing.svg';
import icWorkspace from '@/assets/icons/layout/ic-workspace.svg';
import icSettings from '@/assets/icons/layout/ic-settings.svg';
import icAvatarMockup from '@/assets/icons/layout/ic-avatar-mock.svg';

//Profiles
import icGuide from '@/assets/icons/layout/ic-guide.svg';
import icLogout from '@/assets/icons/layout/ic-logout.svg';
import icVector from '@/assets/icons/layout/ic-vector.svg';
import icUserEdit from '@/assets/icons/layout/ic-user-edit.svg';
import icHeadPhone from '@/assets/icons/layout/ic-headphone.svg';
import icArrowRight from '@/assets/icons/layout/ic-arrow-right.svg';
import { actionLogout } from '@/modules/auth/store/features/auth';

// const { Header, Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation('layout');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isNewSubInboxModalOpen, setIsNewSubInboxModalOpen] = useState(false);
  const [isChatsPopoverOpen, setIsChatsPopoverOpen] = useState(false);

  const routePath = window?.location?.pathname;

  function handleClickChildrenMenu(key: string) {
    if (key) {
      navigate(`${key}`, { replace: true });
    } else {
      navigate(`${MAIN_ROUTES?.HOME}`, { replace: true });
    }
  }

  const menus = [
    {
      key: 'chats',
      icon: icChats,
      childrenPath: chatsPaths || [],
      children: (
        <S.PopoverContent>
          <Typography
            fontWeight={fontWeight?.semiBold}
            variant="body-text-larger"
          >
            {t('chats')}
          </Typography>
          <S.Line />
          <S.PopoverLabelWrap>
            <S.ChildrenMenuWrap
              onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.INBOX)}
              $isActive={routePath === MAIN_ROUTES?.INBOX}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icAllChats}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('all-chats')}</Typography>
              </S.ChildrenMenuLabel>
              <S.ChildrenMenuCount>
                <Typography>
                  {2 <= MAX_COUNT ? 2 : 10}
                  {11 > MAX_COUNT && '+'}
                </Typography>
              </S.ChildrenMenuCount>
            </S.ChildrenMenuWrap>

            <S.ChildrenMenuWrap
              onClick={() =>
                handleClickChildrenMenu(MAIN_ROUTES?.ASSIGNED_TO_ME)
              }
              $isActive={routePath === MAIN_ROUTES?.ASSIGNED_TO_ME}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icUserTick}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('assigned-to-me')}</Typography>
              </S.ChildrenMenuLabel>
              <S.ChildrenMenuCount>
                <Typography>
                  {2 <= MAX_COUNT ? 2 : 10}
                  {11 > MAX_COUNT && '+'}
                </Typography>
              </S.ChildrenMenuCount>
            </S.ChildrenMenuWrap>
          </S.PopoverLabelWrap>

          <S.LineDash />

          <S.PopoverLabelWrap>
            <S.ChildrenMenuWrap
              onClick={() => {
                setIsNewSubInboxModalOpen(true);
                setIsChatsPopoverOpen(false);
              }}
              $isActive={false}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icPlusCircle}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('new-sub-inbox')}</Typography>
              </S.ChildrenMenuLabel>
            </S.ChildrenMenuWrap>
          </S.PopoverLabelWrap>

          <S.LineDash />

          <S.ChildrenMenuWrap
            onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.SPAM_CHATS)}
            $isActive={routePath === MAIN_ROUTES?.SPAM_CHATS}
          >
            <S.ChildrenMenuLabel>
              <Image src={icSpamChats} preview={false} width={24} height={24} />
              <Typography color={themeColors?.errorDark}>
                {t('spam-chats')}
              </Typography>
            </S.ChildrenMenuLabel>
          </S.ChildrenMenuWrap>
        </S.PopoverContent>
      ),
    },
    {
      key: 'global',
      icon: icGlobal,
      redirect: `${MAIN_ROUTES?.GLOBAL}`,
    },
    {
      key: 'contacts',
      icon: icUser,
      redirect: `${MAIN_ROUTES?.CONTACTS}`,
    },
    {
      key: 'ai-knowledge',
      icon: icAiAutomation,
      children: (
        <S.PopoverContent>
          <Typography
            fontWeight={fontWeight?.semiBold}
            variant="body-text-larger"
          >
            {t('ai-knowledge.ai-automation')}
          </Typography>
          <S.Line />
          <S.PopoverLabelWrap>
            <S.ChildrenMenuWrap
              onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.AI_CHATBOT)}
              $isActive={routePath === MAIN_ROUTES?.AI_CHATBOT}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icAiChatBox}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('ai-knowledge.ai-chatbot')}</Typography>
              </S.ChildrenMenuLabel>
            </S.ChildrenMenuWrap>

            <S.ChildrenMenuWrap
              onClick={() =>
                handleClickChildrenMenu(MAIN_ROUTES?.CHATBOX_TRIGGER)
              }
              $isActive={routePath === MAIN_ROUTES?.CHATBOX_TRIGGER}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icAiChatBoxTrigger}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('ai-knowledge.chatbox-triggers')}</Typography>
              </S.ChildrenMenuLabel>
            </S.ChildrenMenuWrap>
          </S.PopoverLabelWrap>

          <S.LineDash />

          <S.PopoverLabelWrapNoBorder>
            <S.ChildrenMenuWrap
              onClick={() =>
                handleClickChildrenMenu(MAIN_ROUTES?.ANSWER_SNIPPETS)
              }
              $isActive={routePath === MAIN_ROUTES?.ANSWER_SNIPPETS}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icAnswerSnippets}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('ai-knowledge.answer-snippets')}</Typography>
              </S.ChildrenMenuLabel>
            </S.ChildrenMenuWrap>
            <S.ChildrenMenuWrap
              onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.WEB_CONTENT)}
              $isActive={routePath === MAIN_ROUTES?.WEB_CONTENT}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icWebContent}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('ai-knowledge.web-content')}</Typography>
              </S.ChildrenMenuLabel>
            </S.ChildrenMenuWrap>
            <S.ChildrenMenuWrap
              onClick={() =>
                handleClickChildrenMenu(MAIN_ROUTES?.INBOX_MESSAGES)
              }
              $isActive={routePath === MAIN_ROUTES?.INBOX_MESSAGES}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icInboxMessage}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('ai-knowledge.inbox-messages')}</Typography>
              </S.ChildrenMenuLabel>
            </S.ChildrenMenuWrap>
            <S.ChildrenMenuWrap
              onClick={() =>
                handleClickChildrenMenu(MAIN_ROUTES?.KNOWLEDGE_BASE_ARTICLE)
              }
              $isActive={routePath === MAIN_ROUTES?.KNOWLEDGE_BASE_ARTICLE}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icKnowledgeBase}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>
                  {t('ai-knowledge.knowledge-base-articles')}
                </Typography>
              </S.ChildrenMenuLabel>
            </S.ChildrenMenuWrap>
          </S.PopoverLabelWrapNoBorder>
        </S.PopoverContent>
      ),
    },
    {
      key: 'campaigns',
      icon: icCampaign,
      redirect: `${MAIN_ROUTES?.CAMPAIGNS}`,
    },
    {
      key: 'knowledge',
      icon: icKnowledge,
      children: (
        <S.PopoverContent>
          <Typography
            fontWeight={fontWeight?.semiBold}
            variant="body-text-larger"
          >
            {t('knowledge-base.knowledge-base')}
          </Typography>
          <S.Line />
          <S.PopoverLabelWrapNoBorder>
            <S.ChildrenMenuWrap
              onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.ARTICLES)}
              $isActive={routePath === MAIN_ROUTES?.ARTICLES}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icArticles}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('knowledge-base.articles')}</Typography>
              </S.ChildrenMenuLabel>
              <S.ChildrenMenuCount>
                <Typography>
                  {2 <= MAX_COUNT ? 2 : 10}
                  {11 > MAX_COUNT && '+'}
                </Typography>
              </S.ChildrenMenuCount>
            </S.ChildrenMenuWrap>

            <S.ChildrenMenuWrap
              onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.CATEGORIES)}
              $isActive={routePath === MAIN_ROUTES?.CATEGORIES}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icCategories}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('knowledge-base.categories')}</Typography>
              </S.ChildrenMenuLabel>
              <S.ChildrenMenuCount>
                <Typography>
                  {2 <= MAX_COUNT ? 2 : 10}
                  {11 > MAX_COUNT && '+'}
                </Typography>
              </S.ChildrenMenuCount>
            </S.ChildrenMenuWrap>
          </S.PopoverLabelWrapNoBorder>
        </S.PopoverContent>
      ),
    },
    {
      key: 'charts',
      icon: icPlugins,
      redirect: `${MAIN_ROUTES?.CHARTS}`,
    },
    {
      key: 'plugins',
      icon: icPlus,
      childrenPath: pluginsPaths || [],
      children: (
        <S.PopoverContent>
          <Typography
            fontWeight={fontWeight?.semiBold}
            variant="body-text-larger"
          >
            {t('plugins.plugins')}
          </Typography>
          <S.Line />
          <S.PopoverLabelWrapNoBorder>
            <S.ChildrenMenuWrap
              onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.ALL_PLUGINS)}
              $isActive={routePath === MAIN_ROUTES?.ALL_PLUGINS}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icAllPlugins}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('plugins.all-plugins')}</Typography>
              </S.ChildrenMenuLabel>
            </S.ChildrenMenuWrap>

            <S.ChildrenMenuWrap
              onClick={() =>
                handleClickChildrenMenu(MAIN_ROUTES?.INSTALLED_PLUGINS)
              }
              $isActive={routePath === MAIN_ROUTES?.INSTALLED_PLUGINS}
            >
              <S.ChildrenMenuLabel>
                <Image
                  src={icInstalledPlugins}
                  preview={false}
                  width={24}
                  height={24}
                />
                <Typography>{t('plugins.installed-plugins')}</Typography>
              </S.ChildrenMenuLabel>
            </S.ChildrenMenuWrap>
          </S.PopoverLabelWrapNoBorder>
        </S.PopoverContent>
      ),
    },
  ];

  function handleCreateWorkspace() {
    //TODO handle later
  }

  function handleProfileDetail() {
    //TODO handle later
  }

  function handleLogout() {
    dispatch(actionLogout());
  }

  const renderWorkSpaces = (
    <S.PopoverContent>
      <Typography fontWeight={fontWeight?.semiBold} variant="body-text-larger">
        {t('work-spaces')}
      </Typography>
      <S.Line />
      <S.PopoverLabel>
        {Array(3)
          ?.fill(0)
          ?.map((_, index: number) => (
            <S.WorkSpacesCard key={index}>
              <Image
                src={icMockupWorkSpaces}
                preview={false}
                width={40}
                height={40}
              />
              <S.WorkSpacesLabel>
                <Typography fontWeight={fontWeight?.semiBold}>Apex</Typography>
                <Typography>apex.com</Typography>
              </S.WorkSpacesLabel>
            </S.WorkSpacesCard>
          ))}
      </S.PopoverLabel>

      <S.PopoverAction onClick={handleCreateWorkspace} type="primary">
        <PlusCircleOutlined />
        <Typography
          color={themeColors?.newtralLightest}
          fontWeight={fontWeight?.semiBold}
        >
          {t('create-work-space')}
        </Typography>
      </S.PopoverAction>
    </S.PopoverContent>
  );

  const renderSettings = (
    <S.PopoverContent>
      <Typography fontWeight={fontWeight?.semiBold} variant="body-text-larger">
        {t('settings.settings')}
      </Typography>
      <S.Line />
      <S.PopoverLabelWrapNoBorder>
        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.ACCOUNT)}
          $isActive={routePath === MAIN_ROUTES?.ACCOUNT}
        >
          <S.ChildrenMenuLabel>
            <Image src={icAccount} preview={false} width={24} height={24} />
            <Typography>{t('settings.account')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>
        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.BILLING)}
          $isActive={routePath === MAIN_ROUTES?.BILLING}
        >
          <S.ChildrenMenuLabel>
            <Image src={icBilling} preview={false} width={24} height={24} />
            <Typography>{t('settings.billing')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>
        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.WORKSPACE)}
          $isActive={routePath === MAIN_ROUTES?.WORKSPACE}
        >
          <S.ChildrenMenuLabel>
            <Image src={icWorkspace} preview={false} width={24} height={24} />
            <Typography>{t('settings.Workspace')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>
        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.CHATBOX)}
          $isActive={routePath === MAIN_ROUTES?.CHATBOX}
        >
          <S.ChildrenMenuLabel>
            <Image src={icAllChats} preview={false} width={24} height={24} />
            <Typography>{t('settings.chatbox')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>
        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.EMAIL)}
          $isActive={routePath === MAIN_ROUTES?.EMAIL}
        >
          <S.ChildrenMenuLabel>
            <Image src={icEmail} preview={false} width={24} height={24} />
            <Typography>{t('settings.email')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>
        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.KNOWLEDGE_BASE)}
          $isActive={routePath === MAIN_ROUTES?.KNOWLEDGE_BASE}
        >
          <S.ChildrenMenuLabel>
            <Image
              src={icKnowledgeBase}
              preview={false}
              width={24}
              height={24}
            />
            <Typography>{t('settings.knowledge-base')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>
        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.STATUS_PAGE)}
          $isActive={routePath === MAIN_ROUTES?.STATUS_PAGE}
        >
          <S.ChildrenMenuLabel>
            <Image
              src={icInstalledPlugins}
              preview={false}
              width={24}
              height={24}
            />
            <Typography>{t('settings.status-page')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>
      </S.PopoverLabelWrapNoBorder>
    </S.PopoverContent>
  );

  const renderProfiles = (
    <S.PopoverContent>
      <S.ProfilesWrap>
        <Image src={icAvatarMockup} preview={false} width={40} height={40} />
        <S.ProfilesInfo>
          <S.ProfilesName>
            <Typography fontWeight={fontWeight?.semiBold}>
              Sophia William
            </Typography>
            <Image src={icVector} preview={false} width={13} height={13} />
          </S.ProfilesName>
          <Typography>sophia@alignui.com</Typography>
        </S.ProfilesInfo>
        <S.ProfileDetail
          onClick={handleProfileDetail}
          src={icArrowRight}
          preview={false}
          width={16}
          height={16}
        />
      </S.ProfilesWrap>

      <S.Line />
      <S.PopoverLabelWrap>
        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.ACCOUNT_SETTINGS)}
          $isActive={routePath === MAIN_ROUTES?.ACCOUNT_SETTINGS}
        >
          <S.ChildrenMenuLabel>
            <Image src={icUserEdit} preview={false} width={24} height={24} />
            <Typography>{t('profiles.account-settings')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>

        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.INTEGRATIONS)}
          $isActive={routePath === MAIN_ROUTES?.INTEGRATIONS}
        >
          <S.ChildrenMenuLabel>
            <Image src={icAllPlugins} preview={false} width={24} height={24} />
            <Typography>{t('profiles.integrations')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>
      </S.PopoverLabelWrap>

      <S.LineDash />

      <S.PopoverLabelWrap>
        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.GUIDE)}
          $isActive={routePath === MAIN_ROUTES?.GUIDE}
        >
          <S.ChildrenMenuLabel>
            <Image src={icGuide} preview={false} width={24} height={24} />
            <Typography>{t('profiles.guide')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>

        <S.ChildrenMenuWrap
          onClick={() => handleClickChildrenMenu(MAIN_ROUTES?.INTEGRATIONS)}
          $isActive={routePath === MAIN_ROUTES?.INTEGRATIONS}
        >
          <S.ChildrenMenuLabel>
            <Image src={icHeadPhone} preview={false} width={24} height={24} />
            <Typography>{t('profiles.help-center')}</Typography>
          </S.ChildrenMenuLabel>
        </S.ChildrenMenuWrap>
      </S.PopoverLabelWrap>

      <S.LineDash />

      <S.ChildrenMenuWrap onClick={handleLogout}>
        <S.ChildrenMenuLabel>
          <Image src={icLogout} preview={false} width={24} height={24} />
          <Typography color={themeColors?.errorDark}>
            {t('profiles.logout')}
          </Typography>
        </S.ChildrenMenuLabel>
      </S.ChildrenMenuWrap>
    </S.PopoverContent>
  );

  const renderMenu = ({
    key,
    icon,
    children,
    childrenPath,
    redirect,
  }: {
    key: string;
    icon: string;
    children?: ReactNode;
    childrenPath: string[];
    redirect?: string;
  }) => {
    if (!isEmpty(children)) {
      return (
        <S.MenuPopover
          placement="rightTop"
          content={children}
          rootClassName="menu-popover"
          $isActive={childrenPath?.includes(routePath)}
          open={key === 'chats' ? isChatsPopoverOpen : undefined}
          onOpenChange={(visible) => {
            if (key === 'chats') {
              setIsChatsPopoverOpen(visible);
            }
          }}
        >
          <S.MenuIcon>
            <Image src={icon} preview={false} width={24} height={24} />
          </S.MenuIcon>
        </S.MenuPopover>
      );
    }

    return (
      <S.MenuPopover
        placement="right"
        content={<Typography>{t(key)}</Typography>}
        rootClassName="menu-no-children-popover"
        $isActive={childrenPath?.includes(routePath)}
      >
        <S.MenuIcon
          onClick={() => {
            redirect && handleClickChildrenMenu(redirect);
          }}
        >
          <Image src={icon} preview={false} width={24} height={24} />
        </S.MenuIcon>
      </S.MenuPopover>
    );
  };

  return (
    <S.LayoutWrapper>
      <S.SiderWrap>
        <S.SiderTop>
          <S.WorkSpaces>
            <Popover
              placement="right"
              content={renderWorkSpaces}
              rootClassName="workspaces-popover"
            >
              <Image
                src={icMockupWorkSpaces}
                preview={false}
                width={36}
                height={36}
              />
            </Popover>
          </S.WorkSpaces>
          <S.MenuWrapper>
            {menus?.map((menu) => (
              <S.MenuIconWrap key={menu?.key}>
                {renderMenu({
                  key: menu.key,
                  icon: menu.icon,
                  children: menu.children,
                  childrenPath: menu.childrenPath || [],
                  redirect: menu?.redirect,
                })}
              </S.MenuIconWrap>
            ))}
          </S.MenuWrapper>
        </S.SiderTop>
        <S.SiderBottom>
          <Popover
            placement="right"
            content={renderSettings}
            rootClassName="settings-popover"
          >
            <S.Settings $isActive={settingsPaths?.includes(routePath)}>
              <Image src={icSettings} preview={false} width={24} height={24} />
            </S.Settings>
          </Popover>
          <Popover
            placement="right"
            content={renderProfiles}
            rootClassName="profile-popover"
          >
            <S.Profiles>
              <Image
                src={icAvatarMockup}
                preview={false}
                width={36}
                height={36}
              />
            </S.Profiles>
          </Popover>
        </S.SiderBottom>
      </S.SiderWrap>
      <S.LayoutWrap>
        <Header />
        <S.Body>{children}</S.Body>
      </S.LayoutWrap>
      {isNewSubInboxModalOpen && (
        <NewSubInboxPage
          isOpen={isNewSubInboxModalOpen}
          onClose={() => setIsNewSubInboxModalOpen(false)}
        />
      )}
    </S.LayoutWrapper>
  );
};

export default MainLayout;
