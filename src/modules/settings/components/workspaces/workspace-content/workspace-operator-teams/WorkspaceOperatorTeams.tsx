import { useState } from 'react';
import { Col, Image } from 'antd';

import Button from '@/shared/components/common/Button';

import * as S from './WorkspaceOperatorTeams.styles';

import addHeader from '@/assets/icons/common/ic-add-header.svg';
import avatarDefault from '@/assets/images/avatar-default.png';
import iconCheck from '@/assets/icons/setting/ic-check-operator.svg';
import iconInvited from '@/assets/icons/setting/ic-invited.svg';
import iconEdit from '@/assets/icons/setting/ic-edit.svg';
import iconDelete from '@/assets/icons/setting/ic-delete.svg';
import iconLogout from '@/assets/icons/setting/ic-out.svg';

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
              <Button type="default">Empty Last Active</Button>
              <Button
                icon={
                  <Image
                    src={addHeader}
                    preview={false}
                    width={20}
                    height={20}
                  />
                }
                iconPosition="left"
                type="primary"
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
                <img src={iconEdit} alt="" />

                <S.OperatorBoxIcon>
                  {op.role === 'Owner' ? (
                    <S.OperatorIcon>
                      <img src={iconLogout} alt="" />
                    </S.OperatorIcon>
                  ) : (
                    <>
                      <img src={iconDelete} alt="" />
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
    </S.AccountInformationContainer>
  );
};

export default WorkspaceOperatorTeams;
