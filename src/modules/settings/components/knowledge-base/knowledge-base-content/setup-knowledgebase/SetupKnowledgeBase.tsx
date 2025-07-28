import React from 'react';
import * as S from './SetupKnowledgeBase.styles';
import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';
import iconTickCircle from '@/assets/icons/setting/ic-tick.svg';
import icCircle from '@/assets/icons/common/ic-circle-tick.svg';
import icMinitor from '@/assets/icons/common/ic-minitor.svg';
import Input from '@/shared/components/common/Input';
import Button from '@/shared/components/common/Button';
import { ReactSVG } from 'react-svg';

const SetupKnowledgeBase = () => {
  return (
    <S.KnowledgeBaseInformationContainer>
      <S.KnowledgeBaseInformation>
        <S.KnowledgeBaseInformationLabel>
          <Typography
            fontWeight={fontWeight?.semiBold}
            color={themeColors?.secondaryDarker}
          >
            Setup Knowledge Base
          </Typography>
        </S.KnowledgeBaseInformationLabel>
        <S.GroupInput>
          <S.FormField>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                Basic domain
                <span style={{ color: 'red' }}>*</span>
              </S.FormInput>
            </Typography>
            <S.WrapInput>
              <Input value="t2bo" disabled={true} placeholder="" size="large" />
              <S.Domain>.en.onlychat.email</S.Domain>
            </S.WrapInput>
          </S.FormField>
          <S.FormField>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                Basic domain
                <span style={{ color: 'red' }}>*</span>
              </S.FormInput>
            </Typography>
            <S.WrapInput>
              <Input
                value="help.t2bo.com"
                disabled={true}
                placeholder=""
                size="large"
              />
            </S.WrapInput>
          </S.FormField>
        </S.GroupInput>

        <S.SectionBox>
          <Typography fontWeight={fontWeight.semiBold}>
            Custom domain setup instruction
          </Typography>
          <S.WrapSection>
            <S.Ordinal>1</S.Ordinal>
            <S.Content>Login to your DNS manager for help.t2bo.com</S.Content>
          </S.WrapSection>
          <S.WrapSection>
            <S.Ordinal>2</S.Ordinal>
            <S.Content>
              Login to your DNS manager <S.Detail>_onlychat.help</S.Detail>{' '}
              .t2bo.com with value{' '}
              <S.Detail>
                onlychat-website-id=a048e736-b92c-49a8-b2b2-970b429ff6d3
              </S.Detail>
            </S.Content>
          </S.WrapSection>
          <S.WrapSection>
            <S.Ordinal>3</S.Ordinal>
            <S.Content>
              Add CNAME DNS entry for <S.Detail>help</S.Detail> .t2bo.com with
              value <S.Detail>custom.onlychat.help</S.Detail>
            </S.Content>
          </S.WrapSection>
          <S.WrapSection>
            <S.Ordinal>1</S.Ordinal>
            <S.Content>
              Wait for DNS to propagate (this way take a few hours). Use the
              Verify domain setup button below
            </S.Content>
          </S.WrapSection>
        <S.WrapButton>
          <Button disabled icon={<ReactSVG src={icCircle}/>}>Verify Domain Setup</Button>
             <Button type='primary' icon={<ReactSVG src={icMinitor}/>}>View Online</Button>
        </S.WrapButton>
        </S.SectionBox>
      </S.KnowledgeBaseInformation>
      <S.KnowledgeBaseInformation2>
        <S.AutoSaveIndicator>
          <img src={iconTickCircle} alt="auto-save" />
          <p>Automatically saved</p>
        </S.AutoSaveIndicator>
      </S.KnowledgeBaseInformation2>
    </S.KnowledgeBaseInformationContainer>
  );
};

export default SetupKnowledgeBase;
