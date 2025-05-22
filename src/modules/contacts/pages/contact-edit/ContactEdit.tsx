import { ReactSVG } from 'react-svg';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Image, Skeleton } from 'antd';
import { Link, useParams } from 'react-router-dom';

import { MAIN_ROUTES } from '@/core/routes/constants';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import {
  actionUpdateIsDetails,
  fetchDetailsContact,
} from '../../store/features/contacts';

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
import icAvatarDefault from '@/assets/images/avatar-default.png';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

function ContactEdit() {
  const { t } = useTranslation('contacts');
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const { isLoading, contactDetails } = useAppSelector(
    (state) => state.contacts,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailsContact({ idContact: id as string }));
      dispatch(actionUpdateIsDetails(false));
    }
  }, [dispatch, id]);

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
          {isLoading ? (
            <S.ContactInfoWrap>
              <Skeleton.Avatar
                active
                style={{
                  height: 90,
                  width: 90,
                }}
              />

              <S.ContactInfo>
                <Skeleton.Input
                  active
                  style={{
                    height: '28px',
                    width: '100%',
                  }}
                />
                <Skeleton.Input
                  active
                  style={{
                    height: '23px',
                    width: '100px',
                    minWidth: '100px',
                  }}
                />
              </S.ContactInfo>
            </S.ContactInfoWrap>
          ) : (
            <S.ContactInfoWrap>
              <Image
                src={contactDetails?.avatar || icAvatarDefault}
                preview={false}
                alt="Avatar"
                width={90}
                height={90}
                onError={(e) => (e.currentTarget.src = icAvatarDefault)}
              />
              <S.ContactInfo>
                <Typography variant="h3" fontWeight={fontWeight?.semiBold}>
                  {contactDetails?.name}
                </Typography>
                <Typography margin="2px 0 0 0">
                  {contactDetails?.lastActivityAt}
                </Typography>
              </S.ContactInfo>
            </S.ContactInfoWrap>
          )}

          <S.FilterPopoverWrap>
            <Button type="primary" onClick={form.submit}>
              {t('contact-profile.save')}
            </Button>
          </S.FilterPopoverWrap>
        </S.ContactContainer>

        <S.ContactContainerWrap gutter={[10, 10]} justify="space-between">
          <Col xs={24} lg={10} xl={6}>
            <Map />
            <ContactInformation />
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
