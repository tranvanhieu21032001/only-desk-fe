import { useEffect, useMemo, useState } from 'react';
import { Col, Image, Skeleton } from 'antd';

import Button from '@/shared/components/common/Button';
import Modal from '@/shared/components/common/Modal';
import Input from '@/shared/components/common/Input';
import Select from '@/shared/components/common/Select';

// import { mockOperators } from '@/core/settings/options';
import avatarDefault from '@/assets/images/avatar-default.png';

import * as S from './WorkspaceOperatorTeams.styles';

import addHeader from '@/assets/icons/common/ic-add-header.svg';
import iconCheck from '@/assets/icons/setting/ic-check-operator.svg';
import iconInvited from '@/assets/icons/setting/ic-invited.svg';
import iconEdit from '@/assets/icons/setting/ic-edit.svg';
import iconDelete from '@/assets/icons/setting/ic-delete.svg';
import iconLogout from '@/assets/icons/setting/ic-out.svg';
import iconInfo from '@/assets/icons/setting/ic-info-red.svg';
import iconArrowRight from '@/assets/icons/setting/ic-arr-right.svg';
import iconPassword from '@/assets/icons/setting/ic-password.svg';
import icon2FA from '@/assets/icons/setting/ic-2fa.svg';
import iconGoogle from '@/assets/icons/setting/ic-google.svg';
import iconApple from '@/assets/icons/setting/ic-apple-operator.svg';
import iconCheckDefault from '@/assets/icons/setting/ic-tick-white.svg';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { fetchOperators } from '@/modules/settings/store/features/operators';
import Cookies from 'js-cookie';

const WorkspaceOperatorTeams = () => {
  // const [isPublic, setIsPublic] = useState(true);
  // const [disableConditions] = useState(false);
  const dispatch = useAppDispatch();
  const { operators, isLoading } = useAppSelector((state) => state.operators);
  useEffect(() => {
    dispatch(fetchOperators());
  }, [dispatch]);

  console.log('operators', operators);
  const { userInfo } = useAppSelector((state) => state.auth);
  const dataSource = useMemo(() => {
    return operators.map((op) => ({
      id: op.id,
      email: op.user.email,
      name: `${op.user.firstName} ${op.user.lastName}`.trim(),
      role: op.role === 'ADMIN' ? 'Owner' : op.role,
      status: op.status === 'APRROVED' ? 'Active' : 'Invited',
      avatar: op.user.avatar,
      isYou: userInfo?.email === op.user.email,
    }));
  }, [operators]);

  const [isOpenEmptyModal, setIsOpenEmptyModal] = useState(false);
  const [isOpenAddOperator, setIsOpenAddOperator] = useState(false);
  const [isOpenAddOperatorStep, setIsOpenAddOperatorStep] = useState(false);
  const [isOpenEditOperator, setIsOpenEditOperator] = useState(false);
  const [isOpenLeaveWorkspace, setIsOpenLeaveWorkspace] = useState(false);
  const [isOpenRemoveOperator, setIsOpenRemoveOperator] = useState(false);
  const [authStep, setAuthStep] = useState<
    'select' | 'password' | 'google' | 'apple' | '2fa'
  >('select');
  const [password, setPassword] = useState('');
  const [twoFA, setTwoFA] = useState(['', '', '', '', '', '']);

  return (
    <S.AccountInformationContainer>
      <div style={{ padding: 16 }}>
        <S.BoxTitle>Operator & Teams</S.BoxTitle>
        {/* <S.Box>
          <S.BoxRow>
            <img src={iconCheck} alt="" />
            <span>Support is Online as at least one operator is online</span>
          </S.BoxRow>
        </S.Box> */}
        {/* <S.Box>
          <S.BoxRowOptions>
            <S.BoxSubTitle>Options</S.BoxSubTitle>
            <S.AccessSwitchWrapper>
              <S.AccessSwitchInput checked={disableConditions} />
              <S.AccessSwitchSlider />
            </S.AccessSwitchWrapper>
          </S.BoxRowOptions>

          <S.BoxCol>
            <S.FlexBetween>
              <span>
                Prevent non-owner operators to remove data (conversations &
                contacts)
              </span>
              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.FlexBetween>
            <S.FlexBetween>
              <span>
                Force operators to have Two Factor Authentication enabled
              </span>
              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.FlexBetween>
          </S.BoxCol>
        </S.Box> */}
        <S.Box>
          <S.FlexRowBetween>
            <S.BoxSubTitle>Operators</S.BoxSubTitle>
            <S.OperatorBoxRow>
              {/* <Button type="default" onClick={() => setIsOpenEmptyModal(true)}>
                Empty Last Active
              </Button> */}
              <Button
                type="primary"
                onClick={() => setIsOpenAddOperator(true)}
                icon={
                  <Image
                    src={addHeader}
                    preview={false}
                    width={20}
                    height={20}
                  />
                }
                iconPosition="left"
              >
                Add Operator
              </Button>
            </S.OperatorBoxRow>
          </S.FlexRowBetween>
          {isLoading ? (
            <>
              {[1, 2, 3].map((key) => (
                <S.OperatorRow key={key}>
                  <Skeleton.Avatar active size="large" />
                  <Col flex="auto">
                    <Skeleton paragraph={{ rows: 1 }} active />
                  </Col>
                </S.OperatorRow>
              ))}
            </>
          ) : (
            dataSource.map((op, idx) => (
              <S.OperatorRow
                key={op.id}
                $hasBorder={idx !== dataSource.length - 1}
              >
                <S.OperatorAvatar
                  src={op.avatar || avatarDefault}
                  alt={op.name}
                />

                <Col flex="auto">
                  <S.OperatorName>
                    {op.name} {op.isYou && <S.OperatorYou>(you)</S.OperatorYou>}
                  </S.OperatorName>
                  <S.OperatorRole $isOwner={op.role === 'Owner'}>
                    {op.role}
                  </S.OperatorRole>
                </Col>

                <Col>
                  {op.status === 'Active' ? (
                    <S.StatusActive>
                      <img src={iconCheck} alt="" />
                      Active
                    </S.StatusActive>
                  ) : (
                    <S.StatusInvited>
                      <img src={iconInvited} alt="" />
                      Invited
                    </S.StatusInvited>
                  )}
                </Col>

                <S.OperatorEmail>{op.email}</S.OperatorEmail>

                <S.ActionsWrapper>
                  <img
                    src={iconEdit}
                    alt=""
                    onClick={() => setIsOpenEditOperator(true)}
                  />

                  <S.OperatorBoxIcon>
                    {op.role === 'Owner' ? (
                      <S.OperatorIcon>
                        <img
                          src={iconLogout}
                          alt=""
                          onClick={() => setIsOpenLeaveWorkspace(true)}
                        />
                      </S.OperatorIcon>
                    ) : (
                      <img
                        src={iconDelete}
                        alt=""
                        onClick={() => setIsOpenRemoveOperator(true)}
                      />
                    )}
                  </S.OperatorBoxIcon>
                </S.ActionsWrapper>
              </S.OperatorRow>
            ))
          )}
        </S.Box>
        <S.FooterSaved>
          <S.FooterSavedCheck>
            <img src={iconCheck} alt="" />
            <span style={{ color: '#333' }}>Automatically saved</span>
          </S.FooterSavedCheck>
        </S.FooterSaved>
      </div>

      <Modal
        isOpen={isOpenEmptyModal}
        onClose={() => setIsOpenEmptyModal(false)}
        hideHeader={true}
        footer={
          <S.ModalEmptyFooter>
            <Button type="default" onClick={() => setIsOpenEmptyModal(false)}>
              Cancel
            </Button>
            <Button
              type="danger"
              width="180px"
              onClick={() => setIsOpenEmptyModal(false)}
            >
              Empty Last Active
            </Button>
          </S.ModalEmptyFooter>
        }
      >
        <S.ModalEmpty>
          <img src={iconInfo} alt="" />
          <S.ModalEmptyColumn>
            <p>Empty Last Active</p>
            <span>
              Are you sure to empty last active operators? The list of last
              operators in the chatbox will be cleaned.
            </span>
          </S.ModalEmptyColumn>
        </S.ModalEmpty>
      </Modal>

      <Modal
        isOpen={isOpenAddOperator}
        title="Add Operator"
        description="Please insert modal description here."
        onClose={() => setIsOpenAddOperator(false)}
        footer={
          <S.ModalEmptyFooter>
            <Button type="default" onClick={() => setIsOpenAddOperator(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              width="180px"
              onClick={() => {
                setIsOpenAddOperatorStep(true);
                setIsOpenAddOperator(false);
              }}
              icon={
                <Image src={addHeader} preview={false} width={20} height={20} />
              }
              iconPosition="left"
            >
              Add Operator
            </Button>
          </S.ModalEmptyFooter>
        }
      >
        <S.ModalAddOperatorSelect>
          <Select
            label="Operator role"
            isRequired
            colorLabel="#111"
            placeholder="Choose operator role"
            options={[
              { label: 'Owner', value: 'owner' },
              { label: 'Member', value: 'member' },
            ]}
          />
          <Input
            label="Operator email"
            isRequired
            placeholder="Enter email to send invite to"
            type="email"
          />
          <Input
            label="Operator job title"
            placeholder="Enter operator job title"
          />
        </S.ModalAddOperatorSelect>
      </Modal>

      <Modal
        width={700}
        isOpen={isOpenAddOperatorStep}
        title="Add Operator"
        description="Please insert modal description here."
        onClose={() => {
          setIsOpenAddOperatorStep(false);
          setAuthStep('select');
          setPassword('');
        }}
        footer={
          <S.ModalEmptyFooter>
            <Button
              type="default"
              onClick={() => {
                setIsOpenAddOperatorStep(false);
                setAuthStep('select');
                setPassword('');
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              width="180px"
              onClick={() => {}}
              icon={
                <Image
                  src={iconArrowRight}
                  preview={false}
                  width={20}
                  height={20}
                />
              }
              iconPosition="right"
            >
              Continue
            </Button>
          </S.ModalEmptyFooter>
        }
      >
        <S.ModalAddOperatorWrapper>
          {authStep === 'select' ? (
            <>
              <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>
                This is a sensitive action!
              </div>
              <div style={{ color: '#888', fontSize: 16, marginBottom: 24 }}>
                Please verify you OnlyChat credentials with one of the following
                methods
              </div>
              <S.AuthModalGrid>
                <S.AuthBox
                  style={{ cursor: 'pointer' }}
                  onClick={() => setAuthStep('password')}
                >
                  <img
                    src={iconPassword}
                    alt=""
                    style={{ width: 32, height: 32 }}
                  />
                  <div>
                    <S.AuthBoxTitle>Password</S.AuthBoxTitle>
                    <S.AuthBoxDesc>
                      Your OnlyChat account password
                    </S.AuthBoxDesc>
                  </div>
                </S.AuthBox>
                <S.AuthBox
                  style={{ cursor: 'pointer' }}
                  onClick={() => setAuthStep('2fa')}
                >
                  <img src={icon2FA} alt="" style={{ width: 32, height: 32 }} />
                  <div>
                    <S.AuthBoxTitle>Two-Factor</S.AuthBoxTitle>
                    <S.AuthBoxDesc>Provide a 6 digits 2FA code</S.AuthBoxDesc>
                  </div>
                </S.AuthBox>
                <S.AuthBox
                  style={{ cursor: 'pointer' }}
                  onClick={() => setAuthStep('google')}
                >
                  <img
                    src={iconGoogle}
                    alt=""
                    style={{ width: 32, height: 32 }}
                  />
                  <div>
                    <S.AuthBoxTitle>Google Sign-in</S.AuthBoxTitle>
                    <S.AuthBoxDesc>With your Google account</S.AuthBoxDesc>
                  </div>
                </S.AuthBox>
                <S.AuthBox
                  style={{ cursor: 'pointer' }}
                  onClick={() => setAuthStep('apple')}
                >
                  <img
                    src={iconApple}
                    alt=""
                    style={{ width: 32, height: 32 }}
                  />
                  <div>
                    <S.AuthBoxTitle>Apple Sign-in</S.AuthBoxTitle>
                    <S.AuthBoxDesc>With your Apple account</S.AuthBoxDesc>
                  </div>
                </S.AuthBox>
              </S.AuthModalGrid>
            </>
          ) : authStep === 'password' ? (
            <S.AuthPassword>
              <h2>This is a sensitive action!</h2>
              <p>
                Now, generate OnlyChat account password to verify your identity.
              </p>

              <span>
                Verify your password <S.RequiredAsterisk>*</S.RequiredAsterisk>
              </span>
              <S.PasswordInputWrapper>
                <S.PasswordInput
                  type="password"
                  placeholder="Enter your OnlyChat account password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="default"
                  width="100px"
                  icon={
                    <>
                      <img src={iconCheckDefault} alt="" />
                    </>
                  }
                  iconPosition="right"
                >
                  Submit
                </Button>
              </S.PasswordInputWrapper>
            </S.AuthPassword>
          ) : authStep === 'google' ? (
            <S.SignInWrapper>
              <S.SignInTitle>This is a sensitive action!</S.SignInTitle>
              <S.SignInDesc>
                Now, authentic with Google to verify your identity.
              </S.SignInDesc>
              <S.SignInButton>
                <img
                  src={iconGoogle}
                  alt=""
                  style={{ width: 32, height: 32 }}
                />
                Google Sign-in
              </S.SignInButton>
            </S.SignInWrapper>
          ) : authStep === 'apple' ? (
            <S.SignInWrapper>
              <S.SignInTitle>This is a sensitive action!</S.SignInTitle>
              <S.SignInDesc>
                Now, authentic with Apple to verify your identity.
              </S.SignInDesc>
              <S.SignInButton>
                <img src={iconApple} alt="" style={{ width: 32, height: 32 }} />
                Apple Sign-in
              </S.SignInButton>
            </S.SignInWrapper>
          ) : authStep === '2fa' ? (
            <S.TwoFAWrapper>
              <S.TwoFATitle>This is a sensitive action!</S.TwoFATitle>
              <S.TwoFADesc>
                Now, generate a Two-Factor 6 digits token to verify your
                identity.
              </S.TwoFADesc>
              <S.TwoFAInputGroup>
                {twoFA.map((val, idx) => (
                  <S.TwoFAInputBox
                    key={idx}
                    maxLength={1}
                    value={val}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9]/g, '');
                      if (!v) return;
                      const newArr = [...twoFA];
                      newArr[idx] = v;
                      setTwoFA(newArr);
                      const next = document.getElementById(
                        `twofa-input-${idx + 1}`,
                      );
                      if (next) next.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace') {
                        if (twoFA[idx]) {
                          const newArr = [...twoFA];
                          newArr[idx] = '';
                          setTwoFA(newArr);
                          e.preventDefault();
                        } else if (idx > 0) {
                          const prev = document.getElementById(
                            `twofa-input-${idx - 1}`,
                          );
                          if (prev) prev.focus();
                        }
                      }
                    }}
                    id={`twofa-input-${idx}`}
                    autoFocus={idx === 0}
                  />
                ))}
              </S.TwoFAInputGroup>
            </S.TwoFAWrapper>
          ) : null}
        </S.ModalAddOperatorWrapper>
      </Modal>

      <Modal
        isOpen={isOpenEditOperator}
        title="Edit Operator"
        description="Please insert modal description here."
        onClose={() => setIsOpenEditOperator(false)}
        footer={
          <S.ModalEmptyFooter>
            <Button type="default" onClick={() => setIsOpenEditOperator(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              width="180px"
              onClick={() => {
                setIsOpenEditOperator(false);
              }}
            >
              Save change
            </Button>
          </S.ModalEmptyFooter>
        }
      >
        <S.ModalAddOperatorSelect>
          <Select
            label="Operator role"
            isRequired
            colorLabel="#111"
            placeholder="Choose operator role"
            options={[
              { label: 'Owner', value: 'owner' },
              { label: 'Member', value: 'member' },
            ]}
          />
          <Input
            label="Operator email"
            isRequired
            placeholder="Enter email to send invite to"
            type="email"
          />
          <Input
            label="Operator job title"
            placeholder="Enter operator job title"
          />
        </S.ModalAddOperatorSelect>
      </Modal>

      <Modal
        isOpen={isOpenLeaveWorkspace}
        onClose={() => setIsOpenLeaveWorkspace(false)}
        hideHeader={true}
        footer={
          <S.ModalEmptyFooter>
            <Button
              type="default"
              onClick={() => setIsOpenLeaveWorkspace(false)}
            >
              Cancel
            </Button>
            <Button
              type="danger"
              width="180px"
              onClick={() => setIsOpenLeaveWorkspace(false)}
            >
              Leave Workspace
            </Button>
          </S.ModalEmptyFooter>
        }
      >
        <S.ModalEmpty>
          <img src={iconInfo} alt="" />
          <S.ModalEmptyColumn>
            <p>Are you sure you want to leave the workspace?</p>
            <span>You will not be able to access the workspace anymore.</span>
          </S.ModalEmptyColumn>
        </S.ModalEmpty>
      </Modal>

      <Modal
        isOpen={isOpenRemoveOperator}
        onClose={() => setIsOpenRemoveOperator(false)}
        hideHeader={true}
        footer={
          <S.ModalEmptyFooter>
            <Button
              type="default"
              onClick={() => setIsOpenRemoveOperator(false)}
            >
              Cancel
            </Button>
            <Button
              type="danger"
              width="180px"
              onClick={() => setIsOpenRemoveOperator(false)}
            >
              Remove Operator
            </Button>
          </S.ModalEmptyFooter>
        }
      >
        <S.ModalEmpty>
          <img src={iconInfo} alt="" />
          <S.ModalEmptyColumn>
            <p>Are you sure you want to remove this operator?</p>
            <span>
              This operator will not be able to access the workspace anymore.
            </span>
          </S.ModalEmptyColumn>
        </S.ModalEmpty>
      </Modal>
    </S.AccountInformationContainer>
  );
};

export default WorkspaceOperatorTeams;
