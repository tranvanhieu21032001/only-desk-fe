# HelpDesk Plugin

A plugin for creating and managing a knowledge base with categories and articles.

## Features

- **Category Management**: Create, update, delete, and list categories
- **Article Management**: Create, update, delete, and list articles with rich markdown content
- **Filtering**: Filter articles by category
- **Tagging**: Add tags to articles for better organization
- **Publishing Control**: Publish or unpublish articles as needed

## Components

- **HelpDesk**: Main component that provides tabs for accessing articles and categories
- **CategoryList**: Component for listing and managing categories
- **ArticleList**: Component for listing and filtering articles
- **ArticleForm**: Component for creating and editing articles with markdown support

## Usage

The plugin will appear in the application's menu once registered and enabled through the Plugin Manager.

### Data Storage

Currently, the plugin uses mock data stored in memory. In a production environment, you would replace the service functions with API calls to a backend service.

## Dependencies

- React
- React Router
- Ant Design
- Markdown Editor

## Future Improvements

- Search functionality for articles
- User permissions for article editing
- Article versioning
- Article comments
- Article ratings
