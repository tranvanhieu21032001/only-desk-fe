import React, { useState } from 'react';
import * as S from '../InboxDetail.styles';
import dayjs, { Dayjs } from 'dayjs';
import { Modal, DatePicker, Button, Select } from 'antd';

interface ReminderTabProps {
  t: (key: string) => string;
  setInputValue: (value: string | ((prev: string) => string)) => void;
  setSelectedReminder: (reminder: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputValue: string;
  setActiveTab: (tab: string | null) => void;
}

const ReminderTab: React.FC<ReminderTabProps> = ({
  t,
  setInputValue,
  setSelectedReminder,
  inputRef
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [customDate, setCustomDate] = useState<Dayjs | null>(null);
  const [customHour, setCustomHour] = useState<number | null>(null);
  const [customMinute, setCustomMinute] = useState<number | null>(null);

  const reminders = [
    { label: t('inboxDetail.reminder1'), offset: { hours: 1 } },
    { label: t('inboxDetail.reminder2'), offset: { hours: 2 } },
    { label: t('inboxDetail.reminderTomorrow'), offset: { days: 1 } },
    { label: t('inboxDetail.reminder2Days'), offset: { days: 2 } },
    { label: t('inboxDetail.reminder1Week'), offset: { weeks: 1 } },
  ];

  const handleReminderClick = (
    index: number,
    offset: { hours?: number; days?: number; weeks?: number },
  ) => {
    let date = dayjs();
    if (offset.hours) date = date.add(offset.hours, 'hour');
    if (offset.days) date = date.add(offset.days, 'day');
    if (offset.weeks) date = date.add(offset.weeks, 'week');

    const reminderText = date.format('MM/DD/YYYY HH:mm');
    // setInputValue(reminderText);
    setSelectedReminder(reminderText);
    setSelectedIndex(index);
    // setActiveTab(null);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          reminderText.length;
      }
    }, 0);
  };

  const handleOpenModal = () => {
    const now = dayjs();
    setCustomDate(now);
    setCustomHour(now.hour());
    setCustomMinute(now.minute());
    setModalVisible(true);
  };

  const handleSetCustomDate = () => {
    if (!customDate || customHour === null || customMinute === null) return;
    const dateWithTime = customDate.hour(customHour).minute(customMinute);
    const reminderText = dateWithTime.format('MM/DD/YYYY HH:mm');
    // setInputValue(reminderText);
    setSelectedReminder(reminderText);
    setSelectedIndex(null);
    setModalVisible(false);
    // setActiveTab(null);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          reminderText.length;
      }
    }, 0);
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, '0'),
  }));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, '0'),
  }));

  const isDisabled =
    !customDate || customHour === null || customMinute === null;

  return (
    <S.TabPanel data-tab-panel="true">
      <S.TabTitle>{t('inboxDetail.reminder')}</S.TabTitle>

      {reminders.map((reminder, idx) => (
        <S.ShortcutItem
          key={idx}
          onClick={() => handleReminderClick(idx, reminder.offset)}
          $selected={selectedIndex === idx}
        >
          <p>{reminder.label}</p>
        </S.ShortcutItem>
      ))}

      <S.ShortcutItem onClick={handleOpenModal}>
        <p>At provided date and time</p>
      </S.ShortcutItem>

      <Modal
        title="Reminder date"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        getContainer={false}
        width={580}
        footer={[
          <Button
            key="cancel"
            onClick={() => setModalVisible(false)}
            style={{ height: 40 }}
          >
            Cancel
          </Button>,
          <Button
            key="set"
            type="primary"
            onClick={handleSetCustomDate}
            style={{ height: 40 }}
            disabled={isDisabled}
          >
            Set Date
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <DatePicker
            value={customDate}
            onChange={(d) => setCustomDate(d)}
            style={{ flex: 1, height: 40 }}
            allowClear
          />
          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              
            }}
          >
            <Select
              placeholder="HH"
              allowClear
              value={customHour}
              onChange={(val) => setCustomHour(val)}
              options={hourOptions}
              style={{ flex: 1, height: 40 }}
            />
            <span>:</span>
            <Select
              placeholder="MM"
              allowClear
              value={customMinute}
              onChange={(val) => setCustomMinute(val)}
              options={minuteOptions}
              style={{ flex: 1, height: 40 }}
            />
          </div>
        </div>
      </Modal>
    </S.TabPanel>
  );
};

export default ReminderTab;
