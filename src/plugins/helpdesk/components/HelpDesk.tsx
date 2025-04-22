import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Typography, Tabs } from "antd";
import { QuestionCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { CategoryList, ArticleList, ArticleForm } from "./";

const { Title } = Typography;
const { TabPane } = Tabs;

const HelpDesk: React.FC = () => {
  return (
    <div className="helpdesk-container">
      <Title level={2}>Help Desk</Title>

      <Routes>
        <Route
          path="/"
          element={
            <Tabs defaultActiveKey="articles">
              <TabPane
                tab={
                  <span>
                    <FileTextOutlined /> Articles
                  </span>
                }
                key="articles"
              >
                <ArticleList />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <QuestionCircleOutlined /> Categories
                  </span>
                }
                key="categories"
              >
                <CategoryList />
              </TabPane>
            </Tabs>
          }
        />
        <Route path="/articles/new" element={<ArticleForm />} />
        <Route path="/articles/:id/edit" element={<ArticleForm isEditing />} />
        <Route path="*" element={<Navigate to="/helpdesk" replace />} />
      </Routes>
    </div>
  );
};

export default HelpDesk;
