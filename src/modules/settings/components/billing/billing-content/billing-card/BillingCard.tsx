import { Image } from 'antd';
import { useState } from 'react';
import { Form, Input, Select } from 'antd';

import Button from '@/shared/components/common/Button';
import Modal from '@/shared/components/common/Modal';
import Stepper from '@/shared/components/common/StepProcess';
import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';

import * as S from './BillingCard.styles';

import imageEmptyCard from '@/assets/images/settings/img-empty-card.png';
import iconTags from '@/assets/icons/setting/ic-tags.svg';
import iconCard from '@/assets/icons/setting/ic-card.svg';
import icCard from '@/assets/icons/billing/ic-card.svg';
import icPaypal from '@/assets/icons/billing/ic-paypal.svg';
import icDetail from '@/assets/icons/setting/ic-detail.svg';
import icCardBlue from '@/assets/icons/setting/ic-card-blue.svg';
import visaLogo from '@/assets/icons/setting/ic-visa.svg';
import mastercardLogo from '@/assets/icons/setting/ic-visa.svg';
import icValid from '@/assets/icons/setting/ic-tick-circle.svg';
import flagVN from '@/assets/icons/setting/ic-flag.svg';
import iconFile from '@/assets/icons/setting/ic-file.svg';
import avatarDefault from '@/assets/images/avatar-default.png';

const BillingCard = () => {
  const [isModalNewPayment, setIsModalNewPayment] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeMethod, setActiveMethod] = useState<'card' | 'paypal' | null>(
    null,
  );
  const [form] = Form.useForm();
  const [cards, setCards] = useState<any[]>([]);

  const getSteps = () => [
    {
      label: 'Payment Method',
      icon: <Image src={icCardBlue} preview={false} />,
    },
    {
      label: 'Detail',
      icon: <Image src={icDetail} preview={false} />,
    },
  ];

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <S.Step1Wrapper>
          <S.Step1Desc>
            Once your payment method is added, it will be automatically linked
            to OnlyChat workspaces without a valid payment method
          </S.Step1Desc>
          <S.Step1DescSub>
            If you have any active paid trial expiring, this payment method will
            be used to automatically renew your paid subscription.
          </S.Step1DescSub>

          <S.Step1Container>
            <S.PaymentMethodBox
              active={activeMethod === 'card'}
              onClick={() => setActiveMethod('card')}
            >
              <Image src={icCard} preview={false} width={30} height={30} />
              <span>Pay using Credit Card</span>
            </S.PaymentMethodBox>
            <S.PaymentMethodBox
              active={activeMethod === 'paypal'}
              onClick={() => setActiveMethod('paypal')}
            >
              <Image src={icPaypal} preview={false} width={30} height={30} />
              <span>Pay using PayPal</span>
            </S.PaymentMethodBox>
          </S.Step1Container>
        </S.Step1Wrapper>
      );
    }
    if (currentStep === 1) {
      return (
        <Form
          form={form}
          layout="vertical"
          initialValues={{ country: undefined }}
        >
          <S.Step2Form>
            <S.WrapperStep2>
              <S.Step2Col>
                <Form.Item
                  label="Card number"
                  name="cardNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your card number',
                    },
                  ]}
                >
                  <Input placeholder="Enter your card number" />
                </Form.Item>
                <Form.Item
                  label="Name on card"
                  name="nameOnCard"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your name on card',
                    },
                  ]}
                >
                  <Input placeholder="Enter your name on card" />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: 'Please enter your address' },
                  ]}
                >
                  <Input placeholder="Enter your address" />
                </Form.Item>
                <Form.Item label="Information for invoices" name="invoiceInfo">
                  <Input placeholder="Enter your company name" />
                </Form.Item>
                <Form.Item
                  label="Email to send invoices to"
                  name="invoiceEmail"
                >
                  <Input placeholder="Enter you email" />
                </Form.Item>
              </S.Step2Col>
              <S.Step2Col>
                <Form.Item
                  label="Expiration date"
                  name="expirationDate"
                  rules={[
                    { required: true, message: 'Please enter expiration date' },
                  ]}
                >
                  <Input placeholder="MM/YYYY" />
                </Form.Item>
                <Form.Item
                  label="Security code"
                  name="securityCode"
                  rules={[
                    { required: true, message: 'Please enter security code' },
                  ]}
                >
                  <Input placeholder="CVV" />
                </Form.Item>
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[
                    { required: true, message: 'Please select your country' },
                  ]}
                >
                  <Select placeholder="Select your country">
                    <Select.Option value="vn">Vietnam</Select.Option>
                    <Select.Option value="us">United States</Select.Option>
                    <Select.Option value="uk">United Kingdom</Select.Option>
                    <Select.Option value="fr">France</Select.Option>
                    <Select.Option value="de">Germany</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="VAT number" name="vatNumber">
                  <Input placeholder="Enter your VAT number" />
                </Form.Item>
                <Form.Item label="Phone number" name="phoneNumber">
                  <Input placeholder="Enter your phone number" />
                </Form.Item>
              </S.Step2Col>
            </S.WrapperStep2>
          </S.Step2Form>
        </Form>
      );
    }
    return null;
  };

  const renderFooter = () => {
    if (currentStep === 0) {
      return (
        <Button
          type="primary"
          disabled={!activeMethod}
          onClick={() => setCurrentStep(1)}
          width="180px"
        >
          Next
        </Button>
      );
    }
    if (currentStep === 1) {
      return (
        <S.Step2Button>
          <Button
            type="default"
            onClick={() => setCurrentStep(0)}
            width="120px"
          >
            Back
          </Button>
          <Button
            type="primary"
            width="180px"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleAddCard(values);
                  setIsModalNewPayment(false);
                  setCurrentStep(0);
                  setActiveMethod(null);
                  form.resetFields();
                })
                .catch(() => {});
            }}
          >
            Save & Finish
          </Button>
        </S.Step2Button>
      );
    }
    return null;
  };

  const handleAddCard = (values: any) => {
    setCards([
      ...cards,
      {
        type: values.cardNumber?.startsWith('5') ? 'mastercard' : 'visa',
        owner: 'LE BAO CHAU',
        address: 'Da Nang',
        vat: '-',
        workspaces: [
          { name: 'ChâuLB', img: avatarDefault, file: iconFile },
          { name: 'Freelancer', img: avatarDefault, file: iconFile },
        ],
        cardNumber: values.cardNumber,
        exp: values.expirationDate,
        valid: true,
      },
    ]);
  };

  return (
    <S.AccountInformationContainer>
      <div>
        <S.AccountInformation>
          <S.AccountInformationLabel>
            <Typography
              fontWeight={fontWeight?.semiBold}
              color={themeColors?.secondaryDarker}
            >
              Card
            </Typography>
          </S.AccountInformationLabel>

          {cards.length > 0 ? (
            <S.CardListWrapper>
              {cards.map((card, idx) => (
                <>
                  <S.CardItem key={idx}>
                    <S.CardLeft>
                      <S.CardLeftHeader>
                        <S.CardValid>
                          <img
                            src={icValid}
                            alt="valid"
                            style={{ width: 20 }}
                          />
                          <span>Valid</span>
                        </S.CardValid>
                        <img
                          src={card.type === 'visa' ? visaLogo : mastercardLogo}
                          alt="logo"
                          style={{ width: 48 }}
                        />
                      </S.CardLeftHeader>
                      <S.CardInfoLabel>Card Holder</S.CardInfoLabel>
                      <S.CardInfoValue>{card.owner}</S.CardInfoValue>
                      <div
                        style={{
                          marginTop: 16,
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 13,
                        }}
                      >
                        <div>
                          <S.CardInfoLabel>Card Number</S.CardInfoLabel>
                          <S.CardNumber>
                            •••• •••• ••••{' '}
                            {card.cardNumber?.slice(-4) || '1234'}
                          </S.CardNumber>
                        </div>
                        <div>
                          <S.CardInfoLabel>Exp</S.CardInfoLabel>
                          <div>{card.exp || '10/30'}</div>
                        </div>
                      </div>
                    </S.CardLeft>

                    <S.CardRight>
                      <S.CardRightRow>
                        <S.CardRightCol>
                          <S.CardInfoLabel>
                            <span>Owner</span>
                            <p>{card.owner}</p>
                          </S.CardInfoLabel>
                          <S.CardInfoLabel style={{ marginTop: 12 }}>
                            <span>Address</span>
                            <S.CardFlex>
                              <img
                                src={flagVN}
                                alt="vn"
                                style={{ width: 20 }}
                              />
                              <span>Da Nang</span>
                            </S.CardFlex>
                          </S.CardInfoLabel>
                          <S.CardInfoLabel>
                            <span>VAT ID</span>
                            <p>-</p>
                          </S.CardInfoLabel>
                          <S.CardInfoLabel style={{ marginTop: 20 }}>
                            <span>Linked workspaces</span>
                            <div
                              style={{ display: 'flex', gap: 8, marginTop: 4 }}
                            >
                              {card.workspaces.map((ws: any, i: number) => (
                                <S.CardWorkspaceTag key={i}>
                                  <img
                                    src={ws.img}
                                    alt={ws.name}
                                    style={{ width: 20, borderRadius: '50%' }}
                                  />
                                  {ws.name}
                                  <img
                                    src={ws.file}
                                    alt=""
                                    style={{ width: 20, borderRadius: '50%' }}
                                  />
                                </S.CardWorkspaceTag>
                              ))}
                            </div>
                          </S.CardInfoLabel>
                        </S.CardRightCol>
                      </S.CardRightRow>
                      <S.CardRightActions>
                        <S.CardActionRow>
                          <p>Remove Card</p>
                          <Button type="default" width="140px">
                            See Invoices
                          </Button>
                          <Button type="primary" width="140px">
                            Edit Card
                          </Button>
                        </S.CardActionRow>
                      </S.CardRightActions>
                    </S.CardRight>
                  </S.CardItem>
                </>
              ))}
            </S.CardListWrapper>
          ) : (
            <S.CopyBox>
              <S.EmptyCardImage src={imageEmptyCard} alt="" />
              <S.EmptyCardTitle>There are no payment method</S.EmptyCardTitle>
              <S.EmptyCardDesc>
                Add a payment method to start adding subscriptions to your
                workspaces!
              </S.EmptyCardDesc>
              <S.EmptyCardActions>
                <Button
                  type="default"
                  width="170px"
                  icon={<Image src={iconTags} alt="" preview={false} />}
                  iconPosition="left"
                >
                  See All Invoice
                </Button>
                <Button
                  type="primary"
                  width="270px"
                  icon={<Image src={iconCard} alt="" preview={false} />}
                  iconPosition="left"
                  onClick={() => {
                    setIsModalNewPayment(true);
                  }}
                >
                  Add New Payment Method
                </Button>
              </S.EmptyCardActions>
            </S.CopyBox>
          )}

          <Modal
            width={700}
            isOpen={isModalNewPayment}
            onClose={() => {
              setIsModalNewPayment(false);
              setCurrentStep(0);
              setActiveMethod(null);
            }}
            title="Add A New Payment Method"
            description="Please insert modal description here."
            footer={renderFooter()}
          >
            <div style={{ padding: 8 }}>
              <Stepper currentStep={currentStep} steps={getSteps()} />
              {renderStepContent()}
            </div>
          </Modal>
        </S.AccountInformation>
        {cards.length > 0 && (
          <S.LookingAccountInformation>
            <Button type="default" width="170px">
              See All Invoices
            </Button>
            <Button
              width="270px"
              type="primary"
              icon={<Image src={iconCard} alt="" preview={false} />}
              iconPosition="left"
            >
              Add New Payment Method
            </Button>
          </S.LookingAccountInformation>
        )}
      </div>
    </S.AccountInformationContainer>
  );
};

export default BillingCard;
