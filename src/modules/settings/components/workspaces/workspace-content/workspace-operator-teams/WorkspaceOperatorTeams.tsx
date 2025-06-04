import { useState } from 'react';
import { Col, Image } from 'antd';

import Button from '@/shared/components/common/Button';
import Modal from '@/shared/components/common/Modal';
import Input from '@/shared/components/common/Input';
import Select from '@/shared/components/common/Select';

import * as S from './WorkspaceOperatorTeams.styles';

import addHeader from '@/assets/icons/common/ic-add-header.svg';
import avatarDefault from '@/assets/images/avatar-default.png';
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

const mockOperators = [
  {
    avatar: avatarDefault,
    name: 'ChauLB',
    email: 'misa.le.dn@gmail.com',
    role: 'Owner',
    status: 'Active',
    isYou: true,
  },
  {
    avatar: avatarDefault,
    name: 'MisaLe',
    email: 'misa.le.dn@gmail.com',
    role: 'Member',
    status: 'Active',
    isYou: false,
  },
  {
    avatar: avatarDefault,
    name: 'LeBaoChau',
    email: 'misa.le.dn@gmail.com',
    role: 'Member',
    status: 'Invited',
    isYou: false,
  },
];

const WorkspaceOperatorTeams = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [disableConditions] = useState(false);
  const [isOpenEmptyModal, setIsOpenEmptyModal] = useState(false);
  const [isOpenAddOperator, setIsOpenAddOperator] = useState(false);
  const [isOpenAddOperatorStep, setIsOpenAddOperatorStep] = useState(false);
  const [isOpenEditOperator, setIsOpenEditOperator] = useState(false);
  const [isOpenLeaveWorkspace, setIsOpenLeaveWorkspace] = useState(false);
  const [isOpenRemoveOperator, setIsOpenRemoveOperator] = useState(false);

  return (
    <S.AccountInformationContainer>
      <div style={{ padding: 16 }}>
        <S.BoxTitle>Operator & Teams</S.BoxTitle>
        <S.Box>
          <S.BoxRow>
            <img src={iconCheck} alt="" />
            <span>Support is Online as at least one operator is online</span>
          </S.BoxRow>
        </S.Box>
        <S.Box>
          <S.BoxRowOptions>
            <S.BoxSubTitle>Options</S.BoxSubTitle>
            <S.AccessSwitchWrapper>
              <S.AccessSwitchInput checked={disableConditions} />
              <S.AccessSwitchSlider />
            </S.AccessSwitchWrapper>
          </S.BoxRowOptions>

          <S.BoxCol>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
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
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
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
            </div>
          </S.BoxCol>
        </S.Box>
        <S.Box>
          <S.FlexRowBetween>
            <S.BoxSubTitle>Operators</S.BoxSubTitle>
            <S.OperatorBoxRow>
              <Button type="default" onClick={() => setIsOpenEmptyModal(true)}>
                Empty Last Active
              </Button>
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
          {mockOperators.map((op, idx) => (
            <S.OperatorRow
              key={op.email}
              $hasBorder={idx !== mockOperators.length - 1}
            >
              <S.OperatorAvatar src={op.avatar} alt={op.name} />
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
                    <>
                      <img
                        src={iconDelete}
                        alt=""
                        onClick={() => setIsOpenRemoveOperator(true)}
                      />
                    </>
                  )}
                </S.OperatorBoxIcon>
              </S.ActionsWrapper>
            </S.OperatorRow>
          ))}
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
        onClose={() => setIsOpenAddOperatorStep(false)}
        footer={
          <S.ModalEmptyFooter>
            <Button
              type="default"
              onClick={() => setIsOpenAddOperatorStep(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              width="180px"
              onClick={() => setIsOpenAddOperatorStep(false)}
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
          <S.AuthModalTitle>This is a sensitive action!</S.AuthModalTitle>
          <S.AuthModalDesc>
            Please verify you OnlyChat credentials with one of the following
            methods
          </S.AuthModalDesc>
          <S.AuthModalGrid>
            <S.AuthBox>
              <img
                src={iconPassword}
                alt=""
                style={{ width: 32, height: 32 }}
              />
              <div>
                <S.AuthBoxTitle>Password</S.AuthBoxTitle>
                <S.AuthBoxDesc>Your OnlyChat account password</S.AuthBoxDesc>
              </div>
            </S.AuthBox>
            <S.AuthBox>
              <img src={icon2FA} alt="" style={{ width: 32, height: 32 }} />
              <div>
                <S.AuthBoxTitle>Two-Factor</S.AuthBoxTitle>
                <S.AuthBoxDesc>Provide a 6 digits 2FA code</S.AuthBoxDesc>
              </div>
            </S.AuthBox>
            <S.AuthBox>
              <img src={iconGoogle} alt="" style={{ width: 32, height: 32 }} />
              <div>
                <S.AuthBoxTitle>Google Sign-in</S.AuthBoxTitle>
                <S.AuthBoxDesc>With your Google account</S.AuthBoxDesc>
              </div>
            </S.AuthBox>
            <S.AuthBox>
              <img src={iconApple} alt="" style={{ width: 32, height: 32 }} />
              <div>
                <S.AuthBoxTitle>Apple Sign-in</S.AuthBoxTitle>
                <S.AuthBoxDesc>With your Apple account</S.AuthBoxDesc>
              </div>
            </S.AuthBox>
          </S.AuthModalGrid>
        </S.ModalAddOperatorWrapper>
      </Modal>

      <Modal
        isOpen={isOpenEditOperator}
        title="Add Operator"
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
