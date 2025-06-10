import React, { useState } from 'react';
import { Input, Select, Divider } from 'antd';
import styled from 'styled-components';

import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import { handleCreateShortcut } from '@/modules/settings/api/chatbox';
import { useAppSelector } from '@/shared/hooks';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';

const { TextArea } = Input;

const Row = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;
const Col = styled.div`
  flex: 1;
`;
const Label = styled.p`
  font-weight: 600;
  margin-bottom: 8px;
  color: #23272e;
`;
const Required = styled.span`
  color: #e53935;
  margin-left: 2px;
`;

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
  // Tag state
  const [tags, setTags] = useState<string[]>(['Tag 1', 'Tag 2']);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [openAddTagModal, setOpenAddTagModal] = useState(false);
  const [newTagValue, setNewTagValue] = useState('');
  const [addTagLoading, setAddTagLoading] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  // New states for form
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

  // Add API call logic here
  const handleSubmit = async () => {
    if (!shortcut.trim() || !workspaceId) {
      // Optionally show error
      return;
    }
    setLoading(true);
    try {
      await handleCreateShortcut({
        workspaceId,
        shortcut: shortcut.trim(),
        message: message.trim(),
        tag: selectedTag || '',
      });
      onSubmit();
      // Reset form
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
        <Row>
          <Col>
            <Label>
              Shortcut<Required>*</Required>
            </Label>
            <Input
              placeholder="!bang"
              value={shortcut}
              onChange={(e) => setShortcut(e.target.value)}
              disabled={loading}
            />
          </Col>
          <Col>
            <Label>In tag</Label>
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
          </Col>
        </Row>
        <div style={{ marginBottom: 24 }}>
          <Label>Message</Label>
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
          <Label>
            Value for the tag<Required>*</Required>
          </Label>
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
