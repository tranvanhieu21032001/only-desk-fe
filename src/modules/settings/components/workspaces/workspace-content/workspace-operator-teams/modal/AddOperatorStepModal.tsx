import React from 'react';
import iconArrowRight from '@/assets/icons/icon-arrow-right.svg';
import iconPassword from '@/assets/icons/icon-password.svg';
import icon2FA from '@/assets/icons/icon-2fa.svg';
import iconGoogle from '@/assets/icons/icon-google.svg';
import iconApple from '@/assets/icons/icon-apple.svg';
import iconCheckDefault from '@/assets/icons/icon-check-default.svg';
import * as S from './modal.styles';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import { Image } from 'antd';

interface AddOperatorStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  authStep: 'select' | 'password' | '2fa' | 'google' | 'apple';
  setAuthStep: (step: 'select' | 'password' | '2fa' | 'google' | 'apple') => void;
  password: string;
  setPassword: (val: string) => void;
  twoFA: string[];
  setTwoFA: (arr: string[]) => void;
}

const AddOperatorStepModal: React.FC<AddOperatorStepModalProps> = ({
  isOpen,
  onClose,
  authStep,
  setAuthStep,
  password,
  setPassword,
  twoFA,
  setTwoFA,
}) => {
  return (
    <Modal
      width={700}
      isOpen={isOpen}
      title="Add Operator"
      description="Please insert modal description here."
      onClose={() => {
        onClose();
        setAuthStep('select');
        setPassword('');
      }}
      footer={
        <S.ModalEmptyFooter>
          <Button
            type="default"
            onClick={() => {
              onClose();
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
              Please verify your OnlyChat credentials with one of the following
              methods
            </div>
            <S.AuthModalGrid>
              <S.AuthBox style={{ cursor: 'pointer' }} onClick={() => setAuthStep('password')}>
                <img src={iconPassword} alt="" style={{ width: 32, height: 32 }} />
                <div>
                  <S.AuthBoxTitle>Password</S.AuthBoxTitle>
                  <S.AuthBoxDesc>Your OnlyChat account password</S.AuthBoxDesc>
                </div>
              </S.AuthBox>
              <S.AuthBox style={{ cursor: 'pointer' }} onClick={() => setAuthStep('2fa')}>
                <img src={icon2FA} alt="" style={{ width: 32, height: 32 }} />
                <div>
                  <S.AuthBoxTitle>Two-Factor</S.AuthBoxTitle>
                  <S.AuthBoxDesc>Provide a 6 digits 2FA code</S.AuthBoxDesc>
                </div>
              </S.AuthBox>
              <S.AuthBox style={{ cursor: 'pointer' }} onClick={() => setAuthStep('google')}>
                <img src={iconGoogle} alt="" style={{ width: 32, height: 32 }} />
                <div>
                  <S.AuthBoxTitle>Google Sign-in</S.AuthBoxTitle>
                  <S.AuthBoxDesc>With your Google account</S.AuthBoxDesc>
                </div>
              </S.AuthBox>
              <S.AuthBox style={{ cursor: 'pointer' }} onClick={() => setAuthStep('apple')}>
                <img src={iconApple} alt="" style={{ width: 32, height: 32 }} />
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
            <p>Now, generate OnlyChat account password to verify your identity.</p>
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
                icon={<img src={iconCheckDefault} alt="" />}
                iconPosition="right"
              >
                Submit
              </Button>
            </S.PasswordInputWrapper>
          </S.AuthPassword>
        ) : authStep === 'google' ? (
          <S.SignInWrapper>
            <S.SignInTitle>This is a sensitive action!</S.SignInTitle>
            <S.SignInDesc>Now, authenticate with Google to verify your identity.</S.SignInDesc>
            <S.SignInButton>
              <img src={iconGoogle} alt="" style={{ width: 32, height: 32 }} />
              Google Sign-in
            </S.SignInButton>
          </S.SignInWrapper>
        ) : authStep === 'apple' ? (
          <S.SignInWrapper>
            <S.SignInTitle>This is a sensitive action!</S.SignInTitle>
            <S.SignInDesc>Now, authenticate with Apple to verify your identity.</S.SignInDesc>
            <S.SignInButton>
              <img src={iconApple} alt="" style={{ width: 32, height: 32 }} />
              Apple Sign-in
            </S.SignInButton>
          </S.SignInWrapper>
        ) : authStep === '2fa' ? (
          <S.TwoFAWrapper>
            <S.TwoFATitle>This is a sensitive action!</S.TwoFATitle>
            <S.TwoFADesc>
              Now, generate a Two-Factor 6 digits token to verify your identity.
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
                    const next = document.getElementById(`twofa-input-${idx + 1}`);
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
                        const prev = document.getElementById(`twofa-input-${idx - 1}`);
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
  );
};

export default AddOperatorStepModal;
