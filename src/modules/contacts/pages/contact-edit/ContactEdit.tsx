import { ReactSVG } from 'react-svg';
import { Col, Form, Image } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

import { MAIN_ROUTES } from '@/core/routes/constants';

import Button from '@/shared/components/common/Button';
import Map from '../../components/contact-edit/map/Map';
import Data from '../../components/contact-edit/data/Data';
import Typography from '@/shared/components/common/Typography';
import Breadcrumb from '@/shared/components/common/Breadcrumb';
import { ToastMessageType } from '@/shared/helper/enums/common';
import ToastMessage from '@/shared/components/common/ToastMessage';
import Company from '../../components/contact-edit/company/Company';
import Segments from '../../components/contact-edit/segments/Segments';
import Campaign from '../../components/contact-edit/campaign/Campaign';
import RecentEvent from '../../components/contact-edit/recent-event/RecentEvent';
import RatingScore from '../../components/contact-edit/rating-score/RatingScore';
import Conversation from '../../components/contact-edit/conversation/Conversation';
import PrivateNotepad from '../../components/contact-edit/private-notepad/PrivateNotepad';
import ContactInformation from '../../components/contact-edit/contact-information/ContactInformation';
import LastReportedLocation from '../../components/contact-edit/last-reported-location/ContactInformation';
import PageVisitedRecently from '../../components/contact-details/page-visited-recently/PageVisitedRecently';

import * as S from './ContactEdit.styles';

import icUser from '@/assets/icons/contact/ic-user.svg';
import icLeft from '@/assets/icons/contact/ic-arrow-left.svg';
import icContact from '@/assets/icons/contact/ic-contact.svg';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import icAvatarMockup from '@/assets/icons/layout/ic-avatar-mock.svg';

function ContactEdit() {
  const { t } = useTranslation('contacts');
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading((prev) => !prev);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  function handleEditContact() {
    toast(
      React.createElement(ToastMessage, {
        typeToast: ToastMessageType?.SUCCESS,
        message: t('contact-profile'),
      }),
    );
  }

  return (
    <S.ContactsContainer>
      <S.BreadcrumbContainer>
        <Breadcrumb items={breadcrumbContactDetails} />
      </S.BreadcrumbContainer>
      <Form form={form} onFinish={handleEditContact}>
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
              <Typography margin="2px 0 0 0">
                Last active: 5 hour ago
              </Typography>
            </S.ContactInfo>
          </S.ContactInfoWrap>

          <S.FilterPopoverWrap>
            <Button type="primary" onClick={form.submit}>
              {t('contact-profile.save')}
            </Button>
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
            <Data isLoading={isLoading} form={form} />
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
      </Form>
    </S.ContactsContainer>
  );
}

export default ContactEdit;
