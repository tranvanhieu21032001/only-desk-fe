import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Button,
  Switch,
  Card,
  Space,
  message,
  Spin,
  Tag,
  Divider,
  Typography,
} from "antd";
import type { InputRef } from "antd";
import {
  SaveOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { Article, Category } from "../types";
import { helpDeskService } from "../services";

const { Title } = Typography;
const { Option } = Select;

interface ArticleFormProps {
  isEditing?: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ isEditing = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [article, setArticle] = useState<Article | null>(null);
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = React.useRef<InputRef>(null);

  // Load data on component mount
  useEffect(() => {
    fetchCategories();

    if (isEditing && id) {
      fetchArticle(id);
    }
  }, [isEditing, id]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const fetchCategories = async () => {
    try {
      const data = await helpDeskService.getCategories();
      setCategories(data);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };

  const fetchArticle = async (articleId: string) => {
    setLoading(true);
    try {
      const data = await helpDeskService.getArticle(articleId);
      if (data) {
        setArticle(data);
        setContent(data.content);
        setTags(data.tags || []);

        form.setFieldsValue({
          title: data.title,
          categoryId: data.categoryId,
          author: data.author,
          published: data.published,
        });
      } else {
        message.error("Article not found");
        navigate("/helpdesk/articles");
      }
    } catch (error) {
      message.error("Failed to fetch article");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const articleData = {
        ...values,
        content,
        tags,
      };

      if (isEditing && id) {
        // Update existing article
        const updated = await helpDeskService.updateArticle(id, articleData);
        if (updated) {
          message.success("Article updated successfully");
          navigate("/helpdesk/articles");
        } else {
          message.error("Failed to update article");
        }
      } else {
        // Create new article
        const created = await helpDeskService.createArticle(articleData);
        if (created) {
          message.success("Article created successfully");
          navigate("/helpdesk/articles");
        } else {
          message.error("Failed to create article");
        }
      }
    } catch (error) {
      message.error("Please check the form for errors");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/helpdesk/articles");
  };

  // Tag handling functions
  const handleTagClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showTagInput = () => {
    setInputVisible(true);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTagInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  if (loading && isEditing) {
    return <Spin size="large" tip="Loading article..." />;
  }

  return (
    <div className="helpdesk-article-form">
      <Title level={3}>
        {isEditing ? "Edit Article" : "Create New Article"}
      </Title>
      <Divider />

      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Article title" />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select a category">
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Please enter an author name" }]}
        >
          <Input placeholder="Article author" />
        </Form.Item>

        <Form.Item label="Tags">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: 8,
            }}
          >
            {tags.map((tag) => (
              <Tag key={tag} closable onClose={() => handleTagClose(tag)}>
                {tag}
              </Tag>
            ))}

            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleTagInputChange}
                onBlur={handleTagInputConfirm}
                onPressEnter={handleTagInputConfirm}
              />
            ) : (
              <Tag onClick={showTagInput} style={{ borderStyle: "dashed" }}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </div>
        </Form.Item>

        <Form.Item label="Content" required>
          <Card style={{ marginBottom: 16 }}>
            <MDEditor
              value={content}
              onChange={(val: string | undefined) => setContent(val || "")}
              height={400}
            />
          </Card>
        </Form.Item>

        <Form.Item
          name="published"
          valuePropName="checked"
          initialValue={false}
        >
          <Space>
            <Switch
              checkedChildren={<CheckCircleOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
            <span>Publish this article</span>
          </Space>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              loading={loading}
            >
              {isEditing ? "Update" : "Create"}
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ArticleForm;
