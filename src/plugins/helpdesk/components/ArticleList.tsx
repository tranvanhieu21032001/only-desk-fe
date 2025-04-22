import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Typography,
  Divider,
  Select,
  Tag,
  Badge,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Article, Category } from "../types";
import { helpDeskService } from "../services";

const { Title } = Typography;
const { Option } = Select;

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  // Load data on component mount
  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  // Reload articles when category filter changes
  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const data = await helpDeskService.getCategories();
      setCategories(data);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };

  const fetchArticles = async (categoryId?: string) => {
    setLoading(true);
    try {
      const data = await helpDeskService.getArticles(categoryId);
      setArticles(data);
    } catch (error) {
      message.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const success = await helpDeskService.deleteArticle(id);
      if (success) {
        message.success("Article deleted successfully");
        fetchArticles(selectedCategory);
      } else {
        message.error("Failed to delete article");
      }
    } catch (error) {
      message.error("Failed to delete article");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (article: Article) => {
    setLoading(true);
    try {
      const updated = await helpDeskService.updateArticle(article.id, {
        published: !article.published,
      });

      if (updated) {
        message.success(
          `Article ${
            updated.published ? "published" : "unpublished"
          } successfully`
        );
        fetchArticles(selectedCategory);
      } else {
        message.error("Failed to update article");
      }
    } catch (error) {
      message.error("Failed to update article");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? undefined : value);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Article) => (
        <Link to={`/helpdesk/articles/${record.id}`}>
          {text}
          {!record.published && (
            <Badge
              count="Draft"
              style={{ backgroundColor: "#b7b7b7", marginLeft: 8 }}
            />
          )}
        </Link>
      ),
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId: string) => getCategoryName(categoryId),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags?: string[]) => (
        <span>
          {tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </span>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Article) => (
        <Space size="middle">
          <Link to={`/helpdesk/articles/${record.id}/edit`}>
            <Button icon={<EditOutlined />} size="small">
              Edit
            </Button>
          </Link>

          <Button
            icon={record.published ? <StopOutlined /> : <CheckCircleOutlined />}
            size="small"
            onClick={() => handleTogglePublish(record)}
          >
            {record.published ? "Unpublish" : "Publish"}
          </Button>

          <Popconfirm
            title="Delete this article?"
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
    <div className="helpdesk-article-list">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={3}>Articles</Title>
        <Link to="/helpdesk/articles/new">
          <Button type="primary" icon={<PlusOutlined />}>
            New Article
          </Button>
        </Link>
      </div>

      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Filter by category:</span>
        <Select
          style={{ width: 200 }}
          onChange={handleCategoryChange}
          defaultValue="all"
        >
          <Option value="all">All Categories</Option>
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>

      <Divider />

      <Table
        dataSource={articles}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "No articles found" }}
      />
    </div>
  );
};

export default ArticleList;
