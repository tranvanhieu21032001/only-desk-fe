import { ReactSVG } from 'react-svg';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import { Col, Form, Image, Skeleton, Spin } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  actionUpdateIsDetails,
  actionUpdateIsLoading,
  fetchDetailsContact,
  handleRemoveContactAction,
} from '../../store/features/contacts';
import { MAIN_ROUTES } from '@/core/routes/constants';
import { handleEditProfile } from '../../api/contacts.api';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';
import { actionsProfileDetailsOptions } from '@/shared/helper/data/contacts';
import { ActionProfileDetailsOptionsInterface } from '@/shared/model/contacts';
import { ActionProfileDetailsTypeEnums } from '@/shared/helper/enums/contacts';

import Button from '@/shared/components/common/Button';
import Map from '../../components/contact-details/map/Map';
import Data from '../../components/contact-details/data/Data';
import PopoverAction from '@/shared/components/common/Popover';
import Typography from '@/shared/components/common/Typography';
import Breadcrumb from '@/shared/components/common/Breadcrumb';
import UploadImage from '@/shared/components/common/Upload/main';
import Company from '../../components/contact-details/company/Company';
import Segments from '../../components/contact-details/segments/Segments';
// import Campaign from '../../components/contact-details/campaign/Campaign';
// import RecentEvent from '../../components/contact-details/recent-event/RecentEvent';
// import RatingScore from '../../components/contact-details/rating-score/RatingScore';
import Conversation from '../../components/contact-details/conversation/Conversation';
import PrivateNotepad from '../../components/contact-details/private-notepad/PrivateNotepad';
import ContactInformation from '../../components/contact-edit/contact-information/ContactInformation';
// import PageVisitedRecently from '../../components/contact-details/page-visited-recently/PageVisitedRecently';
import LastReportedLocation from '../../components/contact-details/last-reported-location/ContactInformation';

import * as S from './ContactDetails.styles';

import icUser from '@/assets/icons/contact/ic-user.svg';
import icLeft from '@/assets/icons/contact/ic-arrow-left.svg';
import icContact from '@/assets/icons/contact/ic-contact.svg';
import icAvatarDefault from '@/assets/images/avatar-default.png';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import icSendMessage from '@/assets/icons/contact/ic-send-message.svg';
import icActionRemove from '@/assets/icons/contact/ic-action-remove.svg';
import icConversation from '@/assets/icons/contact/ic-new-conversation.svg';
import icOnline from '@/assets/icons/contact/ic-online.svg';
import icNoitify from '@/assets/icons/contact/ic-notify-contact.svg';
import flagList from '@/shared/helper/data/flagIcon';
import { format } from 'timeago.js';
import Modal from '@/shared/components/common/Modal';
import { getId } from '@/shared/utils/decode';
import { useCreateConversation } from '../../helpers/conversation.helper';

function ContactDetails() {
  const { t } = useTranslation('contacts');
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { createConversation, isInFlight } = useCreateConversation();

  const { isLoading, contactDetails, isDetails } = useAppSelector(
    (state) => state.contacts,
  );

  const [params, setParams] = useState<{
    isLoading: boolean;
    countUpload: number;
    progressPercent: number;
    isLoadingDifferentField?: boolean;
  }>({
    isLoading: false,
    countUpload: 0,
    progressPercent: 0,
    isLoadingDifferentField: false,
  });

  const locationPath = window.location.pathname;

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailsContact({ idContact: id as string }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    let convertMetadata: { key: string; value: string }[] = [];

    if (Array.isArray(contactDetails?.metadata)) {
      convertMetadata = contactDetails.metadata.map((item) => ({
        key: String(item.key),
        value: String(item.value),
      }));
    } else {
      convertMetadata = Object.entries(contactDetails?.metadata || {}).map(
        ([key, value]) => ({
          key: String(key),
          value: String(value),
        }),
      );
    }

    const defaultValuesForm = {
      ...contactDetails,
      company: contactDetails?.companyInfo?.company,
      jobTitle: contactDetails?.companyInfo?.jobTitle,
      jobRole: contactDetails?.companyInfo?.jobRole,
      websiteCompany: contactDetails?.companyInfo?.website,
      cityCompany: contactDetails?.companyInfo?.city,
      countryCompany: contactDetails?.companyInfo?.country,
      employeesCompany: contactDetails?.companyInfo?.employees,
      metadata: convertMetadata,
    };

    form.setFieldsValue(defaultValuesForm);
    dispatch(
      actionUpdateIsDetails(locationPath.includes('edit') ? false : true),
    );
  }, [
    contactDetails,
    contactDetails?.companyInfo,
    contactDetails?.metadata,
    dispatch,
    form,
    locationPath,
  ]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => setIsScrolled(el.scrollTop > 0);

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  function handleFilterContact() {}

  function handleActionFilterContact(
    actionType: ActionProfileDetailsTypeEnums,
  ) {
    switch (actionType) {
      case ActionProfileDetailsTypeEnums.EDIT:
        return navigate(MAIN_ROUTES.CONTACT_EDIT.replace(':id', id || ''));

      case ActionProfileDetailsTypeEnums.COPY:
        return;

      case ActionProfileDetailsTypeEnums.REMOVE:
        setIsRemoveModalOpen(true);
        return;

      default:
        return;
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
    if (contactDetails?.lastConversations && contactDetails.lastConversations.length > 0) {
      navigate(`/inbox?conversationId=${contactDetails.lastConversations[0].id}`);
    }
  }
  function handleConversation() {
     if (contactDetails?.id) {
      createConversation(contactDetails.id);
    }
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

  function handleConfirmRemove(idContact: string) {
    dispatch(
      handleRemoveContactAction({
        ids: [idContact],
        t: t,
      }),
    );
    navigate('/contacts');
  }
  function handleEditContactProfile(values: any) {
    dispatch(actionUpdateIsLoading(true));
    if (contactDetails?.rawId) {
      handleEditProfile(
        contactDetails?.rawId,
        values,
        t('contact-profile.edit-contact-profile-success'),
        dispatch,
      );
    }
  }

  /**
   * @param {string} avatarPath - The path to the avatar image when was uploaded successfully.
   */
  const handleUpdateAvatarInformation = (avatarPath: string) => {
    form.setFieldsValue({
      avatar: avatarPath,
    });
  };

  const countryCode = contactDetails?.context?.countryCode
  const flagIcon = flagList.find(
    (item) => item.code.toUpperCase() === countryCode?.toUpperCase()
  )?.image;



  return (
    <S.ContactsContainer>
      <S.BreadcrumbContainer $scrolled={isScrolled}>
        <Breadcrumb items={breadcrumbContactDetails} />
      </S.BreadcrumbContainer>
      <S.ScrollArea ref={scrollRef} $showScroll={isScrolled}>
        <Form form={form} onFinish={handleEditContactProfile}>
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
                      height: '32px',
                      width: '100%',
                      minWidth: '300px',
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
                <S.Avatar>
                  <UploadImage
                    onParams={setParams}
                    currentForm={form}
                    fieldName="avatar"
                    maxCount={1}
                    handleUpdateAvatarInformation={
                      handleUpdateAvatarInformation
                    }
                    content={
                      <S.ImageUpload $isLoading={params?.isLoading || false}>
                        <Form.Item name="avatar">
                          <Image
                            src={
                              form?.getFieldValue('avatar') ||
                              contactDetails?.avatar ||
                              icAvatarDefault
                            }
                            preview={false}
                            alt="Avatar"
                            width={90}
                            height={90}
                            onError={(e) =>
                              (e.currentTarget.src = icAvatarDefault)
                            }
                          />
                        </Form.Item>

                        {params?.isLoading && (
                          <>
                            <Spin
                              indicator={
                                <LoadingOutlined
                                  style={{ fontSize: 48 }}
                                  spin
                                />
                              }
                            />
                            <Typography
                              fontWeight={fontWeight?.semiBold}
                              color={themeColors?.successDark}
                            >
                              {params?.progressPercent}%
                            </Typography>
                          </>
                        )}
                      </S.ImageUpload>
                    }
                  />
                  {/* Overlay icons */}
                  {/* <S.FlagIcon src={flagIcon} alt="Flag" /> */}
                  {flagIcon && (
                    <S.WrappIcon>
                      <S.FlagIcon src={flagIcon} />
                    </S.WrappIcon>
                  )}

                  {contactDetails?.isOnline && (
                    <S.OnlineIcon src={icOnline} alt="Online" />
                  )}
                </S.Avatar>

                <S.ContactInfo>
                  <Typography variant="h3" fontWeight={fontWeight?.semiBold}>
                    {contactDetails?.name}
                  </Typography>
                  {contactDetails?.lastActivityAt && (
                    <Typography margin="2px 0 0 0">
                      Last active: {format(contactDetails?.lastActivityAt)}
                    </Typography>
                  )}
                </S.ContactInfo>
              </S.ContactInfoWrap>
            )}

            {isDetails ? (
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
                  isLoading={isInFlight}
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
            ) : (
              <S.FilterPopoverWrap>
                <Button type="primary" onClick={form.submit}>
                  {t('contact-profile.save')}
                </Button>
              </S.FilterPopoverWrap>
            )}
          </S.ContactContainer>

          <S.ContactContainerWrap gutter={[10, 10]} justify="space-between">
            <Col xs={24} lg={10} xl={6}>
              <Map />
              <ContactInformation />
              <Segments />
              <Company />
            </Col>
            <Col xs={24} lg={14} xl={12}>
              <Data form={form} />
              <Conversation isLoading={isLoading} conversations={contactDetails?.lastConversations} />
              {/* <PageVisitedRecently isLoading={isLoading} /> */}
              {/* <Campaign isLoading={isLoading} /> */}
              <PrivateNotepad />
            </Col>
            <Col xs={24} xl={6}>
              <LastReportedLocation isLoading={isLoading} />
              {/* <RecentEvent isLoading={isLoading} /> */}
              {/* <RatingScore isLoading={isLoading} /> */}
            </Col>
          </S.ContactContainerWrap>
        </Form>
      </S.ScrollArea>
      <Modal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        hideHeader={true}
        width={440}
        children={
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <ReactSVG src={icNoitify} />
            <div>
              <Typography fontWeight={fontWeight?.semiBold} margin="0 0 12px 0">
                {t('contact-profile.confirm-delete-title')}
              </Typography>
              <Typography color="#5B5B5B">
                {t('contact-profile.confirm-delete-desc')}
              </Typography>
            </div>
          </div>
        }
        footer={
          <S.WrappButton>
            <Button onClick={() => setIsRemoveModalOpen(false)}>
              {t('contact-profile.cancel')}
            </Button>
            <Button
              type="danger"
              onClick={() =>
                handleConfirmRemove(getId(contactDetails?.id) || '')
              }
            >
              {t('contact-profile.remove')}
            </Button>
          </S.WrappButton>
        }
      />
    </S.ContactsContainer>
  );
}

export default ContactDetails;
