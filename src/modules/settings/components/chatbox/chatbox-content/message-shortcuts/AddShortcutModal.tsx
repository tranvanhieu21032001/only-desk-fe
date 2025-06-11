import React, { useState } from 'react';
import { Input, Select, Divider } from 'antd';

import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import { handleCreateShortcut } from '@/modules/settings/api/chatbox';
import { useAppSelector } from '@/shared/hooks';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';

import * as S from './MessageShortcuts.styles';

const { TextArea } = Input;

interface AddShortcutModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const AddShortcutModal: React.FC<AddShortcutModalProps> = ({
  open,
  onCancel,
  onSubmit,
}) => {
  const [tags, setTags] = useState<string[]>(['tag', 'Tag 2']);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [openAddTagModal, setOpenAddTagModal] = useState(false);
  const [newTagValue, setNewTagValue] = useState('');
  const [addTagLoading, setAddTagLoading] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [shortcut, setShortcut] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const workspaceId = useAppSelector(selectCurrentWorkspaceId);

  const handleAddTag = () => {
    if (!newTagValue.trim()) return;
    setAddTagLoading(true);
    setTimeout(() => {
      setTags((prev) => [...prev, newTagValue.trim()]);
      setSelectedTag(newTagValue.trim());
      setNewTagValue('');
      setOpenAddTagModal(false);
      setAddTagLoading(false);
    }, 500);
  };

  const handleOpenAddTagModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectOpen(false);
    setTimeout(() => setOpenAddTagModal(true), 0);
  };

  const handleSubmit = async () => {
    if (!shortcut.trim() || !workspaceId) {
      // Optionally show error
      return;
    }
    setLoading(true);
    try {
      await handleCreateShortcut({
        shortcut: shortcut.trim(),
        message: message.trim(),
        tag: selectedTag || '',
      });
      onSubmit();
      setShortcut('');
      setMessage('');
      setSelectedTag(undefined);
    } catch (e) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={onCancel}
        title="Add A New Shortcut"
        description="Please insert modal description here."
        width={600}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <Button
              type="default"
              width="100px"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              width="180px"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Add A New Shortcut
            </Button>
          </div>
        }
      >
        <S.CreateShortcutRow>
          <S.CreateShortcutCol>
            <S.CreateShortcutLabel>
              Shortcut<S.CreateShortcutRequired>*</S.CreateShortcutRequired>
            </S.CreateShortcutLabel>
            <Input
              placeholder="!bang"
              value={shortcut}
              onChange={(e) => setShortcut(e.target.value)}
              disabled={loading}
            />
          </S.CreateShortcutCol>
          <S.CreateShortcutCol>
            <S.CreateShortcutLabel>In tag</S.CreateShortcutLabel>
            <Select
              placeholder="Select tag"
              style={{ width: '100%' }}
              value={selectedTag}
              onChange={setSelectedTag}
              open={selectOpen}
              onDropdownVisibleChange={setSelectOpen}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <div style={{ padding: '8px', textAlign: 'center' }}>
                    <Button
                      type="primary"
                      width="100%"
                      onClick={handleOpenAddTagModal}
                    >
                      + Add A New Tag
                    </Button>
                  </div>
                </>
              )}
              disabled={loading}
            >
              {tags.map((tag) => (
                <Select.Option key={tag} value={tag}>
                  {tag}
                </Select.Option>
              ))}
            </Select>
          </S.CreateShortcutCol>
        </S.CreateShortcutRow>
        <div style={{ marginBottom: 24 }}>
          <S.CreateShortcutLabel>Message</S.CreateShortcutLabel>
          <TextArea
            placeholder="Enter a message for this shortcut"
            autoSize={{ minRows: 3, maxRows: 3 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
        </div>
      </Modal>
      {/* Modal Add Tag */}
      <Modal
        isOpen={openAddTagModal}
        onClose={() => setOpenAddTagModal(false)}
        title="Add A New Tag"
        description="Please insert modal description here."
        width={500}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <Button
              type="default"
              width="100px"
              onClick={() => setOpenAddTagModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              width="180px"
              onClick={handleAddTag}
              disabled={!newTagValue.trim()}
              isLoading={addTagLoading}
            >
              Add A New Tag
            </Button>
          </div>
        }
      >
        <div style={{ marginBottom: 24 }}>
          <S.CreateShortcutLabel>
            Value for the tag
            <S.CreateShortcutRequired>*</S.CreateShortcutRequired>
          </S.CreateShortcutLabel>
          <Input
            placeholder="Enter value for the tag"
            value={newTagValue}
            onChange={(e) => setNewTagValue(e.target.value)}
            maxLength={50}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddShortcutModal;
