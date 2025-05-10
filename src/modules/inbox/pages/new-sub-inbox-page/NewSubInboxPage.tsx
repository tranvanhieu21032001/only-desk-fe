import { Image } from 'antd';
import { useState } from 'react';

import Modal from '@/shared/components/common/Modal';
import StepProgress from '@/shared/components/common/Steps';
import Button from '@/shared/components/common/Button';

import * as S from './NewSubInboxPage.styles';

import info from '@/assets/icons/inbox/ic-detail.svg';
import key from '@/assets/icons/inbox/ic-key.svg';
import document from '@/assets/icons/inbox/ic-document.svg';
import arrRight from '@/assets/icons/inbox/ic-arr-right.svg';
import emoji from '@/assets/images/inbox/emoji.png';
import icKeyActive from '@/assets/icons/inbox/ic-key-active.svg';
import check from '@/assets/icons/inbox/ic-check.svg';
import search from '@/assets/icons/common/ic-search.svg';
import message from '@/assets/icons/inbox/ic-message.svg';
import close from '@/assets/icons/inbox/ic-close-circle.svg';
import add from '@/assets/icons/inbox/ic-add-circle.svg';
import closePlus from '@/assets/icons/inbox/ic-close.svg';
import arrowDown from '@/assets/icons/common/ic-arrow-down.svg';
import austria from '@/assets/images/inbox/austria.png';
import denmark from '@/assets/images/inbox/denmark.png';
import finland from '@/assets/images/inbox/finland.png';
import france from '@/assets/images/inbox/france.png';
import germany from '@/assets/images/inbox/germany.png';
import nothing from '@/assets/icons/inbox/ic-nothing.svg';

const getSteps = (currentStep: number) => [
  {
    label: 'Information',
    icon: <Image src={info} preview={false} />,
  },
  {
    label: 'Access',
    icon: <Image src={currentStep === 1 ? icKeyActive : key} preview={false} />,
  },
  {
    label: 'Conditions',
    icon: <Image src={document} preview={false} />,
  },
];

const countryOptions = [
  { label: 'Austria', value: 'austria', icon: austria },
  { label: 'Denmark', value: 'denmark', icon: denmark },
  { label: 'Finland', value: 'finland', icon: finland },
  { label: 'France', value: 'france', icon: france },
  { label: 'Germany', value: 'germany', icon: germany },
];

const NewSubInboxPage = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedModalFilter, setSelectedModalFilter] = useState<string | null>(
    null,
  );
  const [isMainFilterDropdownOpen, setIsMainFilterDropdownOpen] =
    useState(false);
  const [filterSearchTerm, setFilterSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(
    null,
  );
  const [conditionSearchTerm, setConditionSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [conditionValues, setConditionValues] = useState<string[]>([]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<{
    label: string;
    value: string;
    icon: string;
  } | null>(null);
  const [disableConditions, setDisableConditions] = useState(false);

  const filtersDropdown = [
    'Country',
    'User language',
    'Conversation data',
    'Conversation segments',
    'Conversation channel',
    'User email',
  ];

  const renderFooter = () => {
    if (currentStep === 0) {
      return (
        <Button
          type="primary"
          icon={<Image src={arrRight} preview={false} />}
          iconPosition="right"
          onClick={() => setCurrentStep(1)}
          width="276px"
        >
          Continue To Sub-inbox Access
        </Button>
      );
    }
    if (currentStep === 1) {
      return (
        <S.FooterWrapper>
          <Button
            type="default"
            onClick={() => setCurrentStep(0)}
            width="120px"
          >
            Back
          </Button>
          <Button
            type="primary"
            icon={<Image src={arrRight} preview={false} />}
            iconPosition="right"
            onClick={() => setCurrentStep(2)}
            width="276px"
          >
            Continue To Sub-inbox Access
          </Button>
        </S.FooterWrapper>
      );
    }
    if (currentStep === 2) {
      return (
        <S.FooterWrapper>
          <Button
            type="default"
            onClick={() => setCurrentStep(1)}
            width="120px"
          >
            Back
          </Button>
          <Button
            type="primary"
            icon={<Image src={arrRight} preview={false} />}
            iconPosition="right"
            onClick={onClose}
            width="276px"
          >
            Continue To Sub-inbox Access
          </Button>
        </S.FooterWrapper>
      );
    }
    return null;
  };

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <S.StepContent>
          <div>
            <S.Label>Pick an icon and a name for your sub-inbox</S.Label>
            <S.LabelP>
              The name helps you identify this specific sub-inbox among all your
              sub-inboxes.
            </S.LabelP>
            <S.IconNameRow>
              <S.LabelColumn>
                <S.LabelText>Icon</S.LabelText>
                <S.IconBox>
                  <Image
                    src={emoji}
                    preview={false}
                    style={{ width: '15px', height: '15px' }}
                  />
                </S.IconBox>
              </S.LabelColumn>

              <S.LabelInput>
                <S.LabelText>
                  Name of the Sub-inbox
                  <S.LabelRequiredStar>*</S.LabelRequiredStar>
                </S.LabelText>
                <S.NameInput placeholder="Enter the name of the sub-inbox" />
              </S.LabelInput>
            </S.IconNameRow>
          </div>
        </S.StepContent>
      );
    }
    if (currentStep === 1) {
      return (
        <S.StepContent>
          <div style={{ marginBottom: 16 }}>
            <S.AccessBox>
              <S.AccessIcon src={check} alt="" />
              <div>
                <S.AccessTitle>Public access</S.AccessTitle>
                <S.AccessDesc>
                  Anyone will have access to the sub-inbox, including new
                  operators to come.
                </S.AccessDesc>
              </div>
            </S.AccessBox>
            <S.AccessRadioRow>
              <S.AccessRadioLabel>
                Public - Any operator in the workspace
              </S.AccessRadioLabel>
              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.AccessRadioRow>
            <S.AccessRadioRow>
              <S.AccessRadioLabel>
                Private - Only some operators of the workspace
              </S.AccessRadioLabel>
              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.AccessRadioRow>
          </div>
        </S.StepContent>
      );
    }
    if (currentStep === 2) {
      return (
        <S.StepContent isStep2>
          <S.StepContentInner>
            <S.ConditionsBox>
              <S.ConditionsIcon>
                <Image src={nothing} preview={false} />
              </S.ConditionsIcon>
              <div>
                <S.ConditionsTitle>
                  Don't forget to adjust the sub-inbox priority once created
                </S.ConditionsTitle>
                <S.ConditionsDesc>
                  In case there are conditions overlapping with other
                  sub-inboxes. Inboxes with the most specific conditions should
                  have higher priority.
                </S.ConditionsDesc>
              </div>
            </S.ConditionsBox>

            <S.FilterBox isOpen={true}>
              <S.FilterDropdown>
                <S.ModalFilterWrapper>
                  {!selectedModalFilter && (
                    <S.MainFilterDropdownWrapper>
                      <S.ButtonModalDropdown
                        onClick={() =>
                          setIsMainFilterDropdownOpen((prev) => !prev)
                        }
                      >
                        {selectedModalFilter || 'Select a crioterion'}{' '}
                        <Image
                          src={arrowDown}
                          alt="Arrow down icon"
                          preview={false}
                        />
                      </S.ButtonModalDropdown>
                      {isMainFilterDropdownOpen && (
                        <S.ModalDropdownBorder>
                          <S.SearchWrapper>
                            <S.SearchIconDropdown>
                              <Image
                                src={search}
                                alt="Arrow down icon"
                                preview={false}
                                style={{
                                  width: '16px',
                                  position: 'relative',
                                  top: '-2px',
                                }}
                              />
                            </S.SearchIconDropdown>
                            <S.SearchInputDropdown
                              placeholder="Search... "
                              value={filterSearchTerm}
                              onChange={(e) =>
                                setFilterSearchTerm(e.target.value)
                              }
                            />
                          </S.SearchWrapper>
                          {filtersDropdown
                            .filter((opt) =>
                              opt
                                .toLowerCase()
                                .includes(filterSearchTerm.toLowerCase()),
                            )
                            .map((option) => (
                              <S.DropdownBorder
                                key={option}
                                onClick={() => {
                                  setIsMainFilterDropdownOpen(false);
                                  setSelectedModalFilter(option);
                                  setSelectedFilters((prev) => [
                                    ...prev,
                                    option,
                                  ]);
                                  setFilterSearchTerm('');
                                }}
                              >
                                <Image src={message} preview={false} />
                                {option}
                              </S.DropdownBorder>
                            ))}
                        </S.ModalDropdownBorder>
                      )}
                    </S.MainFilterDropdownWrapper>
                  )}

                  {selectedFilters.map((filterLabel, index) => (
                    <S.NestedFilterBox key={index}>
                      <S.ModalWrapper>
                        <span>
                          <Image src={message} preview={false} />
                          {filterLabel}
                        </span>
                        <S.FilterLabelClearWrapper
                          onClick={() => {
                            setSelectedModalFilter(null);
                            setSelectedFilters([]);
                            setSelectedCondition(null);
                            setInputValue('');
                            setConditionValues([]);
                            setIsMainFilterDropdownOpen(true);
                          }}
                        >
                          <Image
                            src={closePlus}
                            alt="Clear filter"
                            preview={false}
                            style={{ width: 16, height: 16 }}
                          />
                        </S.FilterLabelClearWrapper>
                      </S.ModalWrapper>
                      <S.ModalFilterWrapper>
                        <S.ConditionDropdownWrapper>
                          <S.ButtonModalDropdown
                            onClick={() =>
                              setIsConditionDropdownOpen((prev) => !prev)
                            }
                          >
                            {selectedCondition || 'Select...'}{' '}
                            <Image
                              src={arrowDown}
                              alt="Arrow down icon"
                              preview={false}
                            />
                          </S.ButtonModalDropdown>

                          {isConditionDropdownOpen && (
                            <S.ModalDropdownBox>
                              <S.ConditionSearchBox>
                                <S.ConditionSearchWrapper>
                                  <S.ConditionSearchIcon>
                                    <Image
                                      src={search}
                                      alt="Search icon"
                                      preview={false}
                                      style={{ width: '16px' }}
                                    />
                                  </S.ConditionSearchIcon>
                                  <S.ConditionSearchInput
                                    placeholder="Search..."
                                    value={conditionSearchTerm}
                                    onChange={(e) =>
                                      setConditionSearchTerm(e.target.value)
                                    }
                                  />
                                </S.ConditionSearchWrapper>
                              </S.ConditionSearchBox>

                              {['Equals to', 'Differs to']
                                .filter((condition) =>
                                  condition
                                    .toLowerCase()
                                    .includes(
                                      conditionSearchTerm.toLowerCase(),
                                    ),
                                )
                                .map((condition) => (
                                  <S.DropdownItem
                                    key={condition}
                                    onClick={() => {
                                      setSelectedCondition(condition);
                                      setIsConditionDropdownOpen(false);
                                      setConditionSearchTerm('');
                                    }}
                                  >
                                    {condition}
                                  </S.DropdownItem>
                                ))}
                            </S.ModalDropdownBox>
                          )}
                        </S.ConditionDropdownWrapper>

                        {selectedCondition && (
                          <S.CountryInputWrapper>
                            <S.CountrySelectBox
                              onClick={() =>
                                setIsCountryDropdownOpen((prev) => !prev)
                              }
                              isSelected={!!selectedCountry}
                            >
                              <S.CountryWrapper>
                                {selectedCountry ? (
                                  <>
                                    <S.CountryFlagImg
                                      src={selectedCountry.icon}
                                      alt="flag"
                                    />
                                    {selectedCountry.label}
                                  </>
                                ) : (
                                  'Select...'
                                )}
                              </S.CountryWrapper>
                              <Image src={arrowDown} preview={false} />
                            </S.CountrySelectBox>
                            {isCountryDropdownOpen && (
                              <S.CountryDropdownContainer>
                                <S.CountryDropdownInput
                                  placeholder="Search..."
                                  value={countrySearch}
                                  onChange={(e) =>
                                    setCountrySearch(e.target.value)
                                  }
                                />
                                {countryOptions
                                  .filter((opt) =>
                                    opt.label
                                      .toLowerCase()
                                      .includes(countrySearch.toLowerCase()),
                                  )
                                  .map(
                                    (opt: {
                                      label: string;
                                      value: string;
                                      icon: string;
                                    }) => (
                                      <S.CountryDropdownItem
                                        key={opt.value}
                                        onClick={() => {
                                          setSelectedCountry(opt);
                                          setIsCountryDropdownOpen(false);
                                        }}
                                      >
                                        <S.CountryFlagImg
                                          src={opt.icon}
                                          alt="flag"
                                        />
                                        {opt.label}
                                      </S.CountryDropdownItem>
                                    ),
                                  )}
                              </S.CountryDropdownContainer>
                            )}
                          </S.CountryInputWrapper>
                        )}

                        {conditionValues.map((val, idx) => (
                          <S.InputWrapperAdd key={idx}>
                            <span>{val}</span>
                            <S.CloseIconWrapper>
                              <S.CloseIconImg
                                src={close}
                                alt="Clear value"
                                onClick={() => {
                                  setConditionValues((prev) =>
                                    prev.filter((_, index) => index !== idx),
                                  );
                                }}
                              />
                            </S.CloseIconWrapper>
                          </S.InputWrapperAdd>
                        ))}
                      </S.ModalFilterWrapper>
                    </S.NestedFilterBox>
                  ))}
                </S.ModalFilterWrapper>

                {selectedCondition && (
                  <S.AddConditionWrapper>
                    <Button
                      icon={
                        <Image
                          src={add}
                          preview={false}
                          style={{ width: 20, height: 20 }}
                        />
                      }
                      width="229px"
                      onClick={() => {
                        if (inputValue.trim()) {
                          setConditionValues((prev) => [
                            ...prev,
                            inputValue.trim(),
                          ]);
                          setInputValue('');
                        }
                      }}
                    >
                      Add Another Conditions
                    </Button>
                  </S.AddConditionWrapper>
                )}
              </S.FilterDropdown>
            </S.FilterBox>

            <S.ConditionsRow>
              <span style={{ color: '#222', fontSize: 15 }}>
                Disable conditions (manual sub-inbox)
              </span>
              <S.AccessSwitchWrapper>
                <S.AccessSwitchInput
                  checked={disableConditions}
                  onChange={() => setDisableConditions((prev) => !prev)}
                />
                <S.AccessSwitchSlider />
              </S.AccessSwitchWrapper>
            </S.ConditionsRow>
          </S.StepContentInner>
        </S.StepContent>
      );
    }
    return null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Sub-inbox"
      description="Please insert modal description here."
      footer={renderFooter()}
      width={700}
    >
      <S.Wrapper>
        <StepProgress currentStep={currentStep} steps={getSteps(currentStep)} />
        {renderStepContent()}
      </S.Wrapper>
    </Modal>
  );
};

export default NewSubInboxPage;
