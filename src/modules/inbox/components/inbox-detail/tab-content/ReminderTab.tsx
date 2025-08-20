// ReminderTab.tsx
import React, { useState, useRef } from 'react';
import * as S from '../InboxDetail.styles';
import dayjs, { Dayjs } from 'dayjs';
import { Modal, DatePicker, TimePicker, Button } from 'antd';

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
  inputRef,
  inputValue,
  setActiveTab,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [customDate, setCustomDate] = useState<Dayjs | null>(dayjs());
  const [customTime, setCustomTime] = useState<Dayjs | null>(dayjs());

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
    setInputValue(reminderText);
    setSelectedReminder(reminderText);
    setSelectedIndex(index);
    setActiveTab(null);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.selectionEnd = reminderText.length;
      }
    }, 0);
  };

  const handleSetCustomDate = () => {
    if (!customDate || !customTime) return;
    const dateWithTime = customDate
      .hour(customTime.hour())
      .minute(customTime.minute());
    const reminderText = dateWithTime.format('MM/DD/YYYY HH:mm');
    setInputValue(reminderText);
    setSelectedReminder(reminderText);
    setSelectedIndex(null);
    setModalVisible(false);
    setActiveTab(null);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.selectionEnd = reminderText.length;
      }
    }, 0);
  };

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

      <S.ShortcutItem onClick={() => setModalVisible(true)}>
        <p>At provided date and time</p>
      </S.ShortcutItem>

      <Modal
        title="Select date and time"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
         getContainer={false}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="set" type="primary" onClick={handleSetCustomDate}>
            Set Date
          </Button>,
        ]}
      >
        <DatePicker
          value={customDate}
          onChange={(d) => setCustomDate(d)}
          style={{ width: '100%', marginBottom: 12 }}
        />
        <TimePicker
          value={customTime}
          onChange={(t) => setCustomTime(t)}
          format="HH:mm"
          style={{ width: '100%' }}
        />
      </Modal>
    </S.TabPanel>
  );
};

export default ReminderTab;
