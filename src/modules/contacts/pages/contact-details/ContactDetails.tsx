import { useState, useEffect } from 'react';
import { Col, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';

import { MAIN_ROUTES } from '@/core/routes/constants';
import { actionsProfileDetailsOptions } from '@/shared/helper/data/contacts';
import { ActionProfileDetailsOptionsInterface } from '@/shared/model/contacts';
import { ActionProfileDetailsTypeEnums } from '@/shared/helper/enums/contacts';

import Map from '../../components/contact-details/map/Map';
import Data from '../../components/contact-details/data/Data';
import PopoverAction from '@/shared/components/common/Popover';
import Typography from '@/shared/components/common/Typography';
import Breadcrumb from '@/shared/components/common/Breadcrumb';
import Company from '../../components/contact-details/company/Company';
import Segments from '../../components/contact-details/segments/Segments';
import Campaign from '../../components/contact-details/campaign/Campaign';
import RecentEvent from '../../components/contact-details/recent-event/RecentEvent';
import RatingScore from '../../components/contact-details/rating-score/RatingScore';
import Conversation from '../../components/contact-details/conversation/Conversation';
import PrivateNotepad from '../../components/contact-details/private-notepad/PrivateNotepad';
import ContactInformation from '../../components/contact-details/contact-information/ContactInformation';
import PageVisitedRecently from '../../components/contact-details/page-visited-recently/PageVisitedRecently';
import LastReportedLocation from '../../components/contact-details/last-reported-location/ContactInformation';

import * as S from './ContactDetails.styles';

import icUser from '@/assets/icons/contact/ic-user.svg';
import icPhone from '@/assets/icons/contact/ic-phone.svg';
import icLeft from '@/assets/icons/contact/ic-arrow-left.svg';
import icContact from '@/assets/icons/contact/ic-contact.svg';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import icAvatarMockup from '@/assets/icons/layout/ic-avatar-mock.svg';
import icSendMessage from '@/assets/icons/contact/ic-send-message.svg';
import icActionRemove from '@/assets/icons/contact/ic-action-remove.svg';
import icConversation from '@/assets/icons/contact/ic-new-conversation.svg';

function ContactDetails() {
  const { t } = useTranslation('contacts');

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading((prev) => !prev);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function handleFilterContact() {}

  function handleActionFilterContact(
    actionType: ActionProfileDetailsTypeEnums,
  ) {
    switch (actionType) {
      case ActionProfileDetailsTypeEnums?.EDIT:
        //TODO handle later
        return;
      case ActionProfileDetailsTypeEnums?.COPY:
        //TODO handle later
        return;
      case ActionProfileDetailsTypeEnums?.REMOVE:
        //TODO handle later
        return;
      default:
        break;
    }
  }

  const renderActionFilter = () => {
    return (
      <S.FilterActionWrap>
        {actionsProfileDetailsOptions?.map(
          (option: ActionProfileDetailsOptionsInterface) => (
            <S.FilterAction
              key={option?.key}
              $isRemove={
                option?.actionType === ActionProfileDetailsTypeEnums?.REMOVE
              }
              onClick={() => handleActionFilterContact(option?.actionType)}
            >
              <ReactSVG src={option?.icon} width={24} height={24} />
              <Typography>{t(`contact-profile.${option?.label}`)}</Typography>
            </S.FilterAction>
          ),
        )}
      </S.FilterActionWrap>
    );
  };

  function handleSendMessage() {
    //TODO handle later
  }
  function handleConversation() {
    //TODO handle later
  }
  function handleCall() {
    //TODO handle later
  }

  const breadcrumbContactDetails = [
    {
      title: (
        <Link to={MAIN_ROUTES?.CONTACTS}>
          <div className="breadcrumb-contact">
            <ReactSVG src={icLeft} />
            <ReactSVG src={icContact} />
            {t('contact-profile.contact')}
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div>
          <div className="breadcrumb-contact">
            <ReactSVG src={icUser} />
            {t('contact-profile.profile')}
          </div>
        </div>
      ),
    },
  ];

  return (
    <S.ContactsContainer>
      <S.BreadcrumbContainer>
        <Breadcrumb items={breadcrumbContactDetails} />
      </S.BreadcrumbContainer>
      <S.ContactContainer>
        <S.ContactInfoWrap>
          <Image
            src={icAvatarMockup}
            preview={false}
            alt="Avatar"
            width={90}
            height={90}
          />
          <S.ContactInfo>
            <Typography variant="h3" fontWeight={fontWeight?.semiBold}>
              Sophia Williams
            </Typography>
            <Typography margin="2px 0 0 0">Last active: 5 hour ago</Typography>
          </S.ContactInfo>
        </S.ContactInfoWrap>

        <S.FilterPopoverWrap>
          <S.ButtonFilter
            width="fit-content"
            onClick={handleSendMessage}
            iconPosition="left"
            icon={
              <Image
                src={icSendMessage}
                preview={false}
                width={15}
                height={18}
              />
            }
          >
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('contact-profile.send-a-message')}
            </Typography>
          </S.ButtonFilter>
          <S.ButtonFilter
            width="fit-content"
            onClick={handleConversation}
            iconPosition="left"
            icon={
              <Image
                src={icConversation}
                preview={false}
                width={15}
                height={18}
              />
            }
          >
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('contact-profile.new-conversation')}
            </Typography>
          </S.ButtonFilter>
          <S.ButtonFilter
            width="fit-content"
            onClick={handleCall}
            iconPosition="left"
            icon={
              <Image src={icPhone} preview={false} width={15} height={18} />
            }
          >
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('contact-profile.start-a-call')}
            </Typography>
          </S.ButtonFilter>
          <PopoverAction
            content={renderActionFilter()}
            placement="bottomRight"
            btnContent={
              <S.ButtonAction
                width="fit-content"
                onClick={handleFilterContact}
                iconPosition="left"
              >
                <ReactSVG src={icActionRemove} width={20} height={20} />
              </S.ButtonAction>
            }
          />
        </S.FilterPopoverWrap>
      </S.ContactContainer>

      <S.ContactContainerWrap gutter={[10, 10]} justify="space-between">
        <Col xs={24} lg={10} xl={6}>
          <Map />
          <ContactInformation isLoading={isLoading} />
          <Segments isLoading={isLoading} />
          <Company isLoading={isLoading} />
        </Col>
        <Col xs={24} lg={14} xl={12}>
          <Data isLoading={isLoading} />
          <Conversation isLoading={isLoading} />
          <PageVisitedRecently isLoading={isLoading} />
          <Campaign isLoading={isLoading} />
          <PrivateNotepad isLoading={isLoading} />
        </Col>
        <Col xs={24} xl={6}>
          <LastReportedLocation isLoading={isLoading} />
          <RecentEvent isLoading={isLoading} />
          <RatingScore isLoading={isLoading} />
        </Col>
      </S.ContactContainerWrap>
    </S.ContactsContainer>
  );
}

export default ContactDetails;
