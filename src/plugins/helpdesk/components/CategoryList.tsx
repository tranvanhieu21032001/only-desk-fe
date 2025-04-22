import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Typography,
  Divider,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Category } from "../types";
import { helpDeskService } from "../services";

const { Title, Text } = Typography;
const { TextArea } = Input;

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await helpDeskService.getCategories();
      setCategories(data);
    } catch (error) {
      message.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const showAddModal = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const showEditModal = (category: Category) => {
    setEditingId(category.id);
    form.setFieldsValue({
      name: category.name,
      description: category.description || "",
    });
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (editingId) {
        // Update existing category
        const updated = await helpDeskService.updateCategory(editingId, values);
        if (updated) {
          message.success("Category updated successfully");
          fetchCategories();
          setModalVisible(false);
        }
      } else {
        // Create new category
        const created = await helpDeskService.createCategory(values);
        if (created) {
          message.success("Category created successfully");
          fetchCategories();
          setModalVisible(false);
        }
      }
    } catch (error) {
      message.error("Failed to save category");
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const success = await helpDeskService.deleteCategory(id);
      if (success) {
        message.success("Category deleted successfully");
        fetchCategories();
      } else {
        message.error("Failed to delete category");
      }
    } catch (error) {
      message.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => text || "-",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this category?"
            description="All articles in this category will also be deleted."
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="helpdesk-category-list">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={3}>Categories</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Add Category
        </Button>
      </div>

      <Divider />

      <Table
        dataSource={categories}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingId ? "Edit Category" : "Add Category"}
        open={modalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText={editingId ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please enter a category name" },
            ]}
          >
            <Input placeholder="Category name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} placeholder="Category description (optional)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryList;
