import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Space, Row, Col, Card, Avatar, Rate } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

import { AUTH_ROUTES } from "@/routes/constants";
import styled from "styled-components";

// Import default avatar from assets
import defaultAvatar from "@/assets/images/avatar-default.png";
// Import logo
import reactLogo from "@/assets/react.svg";

const { Title, Paragraph, Text } = Typography;

// Styled components
const StyledHeader = styled.header`
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const HeroSection = styled.section`
  padding: 80px 0 60px;
  background: linear-gradient(135deg, #f9f9ff 0%, #f5f7ff 100%);
  position: relative;
  overflow: hidden;
`;

const HeroImage = styled.div`
  margin-top: 60px;
  position: relative;
  img {
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    max-width: 100%;
  }
`;

const FeatureSection = styled.section`
  padding: 100px 0;
`;

const FeatureCard = styled.div`
  margin-bottom: 80px;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #f0f5ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 28px;
  color: #2563eb;
`;

const UseCasesSection = styled.section`
  padding: 100px 0;
  background: #f9fafb;
`;

const TestimonialsSection = styled.section`
  padding: 100px 0;
`;

const TestimonialCard = styled(Card)`
  height: 100%;
  .ant-card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const VideoThumbnail = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 20px;

  &:before {
    content: "";
    display: block;
    padding-top: 56.25%;
  }

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    color: white;
    opacity: 0.9;
  }
`;

const CTASection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: white;
  position: relative;
`;

const Footer = styled.footer`
  padding: 80px 0 40px;
  background: #1f2937;
  color: white;
`;

const FooterTitle = styled(Title)`
  color: white !important;
  margin-bottom: 24px !important;
`;

const FooterLink = styled(Link)`
  color: #9ca3af;
  display: block;
  margin-bottom: 16px;
  &:hover {
    color: white;
  }
`;

const SocialIcon = styled.a`
  color: #9ca3af;
  font-size: 20px;
  margin-right: 16px;
  &:hover {
    color: white;
  }
`;

// Mock image data - replace with your own images
const mockScreenshot = `
<svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="500" fill="#f5f7ff"/>
  <text x="400" y="250" font-family="Arial" font-size="30" text-anchor="middle" fill="#2563eb">App Dashboard</text>
</svg>
`;

const mockFeature1 = `
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#f0f5ff"/>
  <text x="300" y="200" font-family="Arial" font-size="30" text-anchor="middle" fill="#2563eb">Inbox Feature</text>
</svg>
`;

const mockFeature2 = `
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#f0f5ff"/>
  <text x="300" y="200" font-family="Arial" font-size="30" text-anchor="middle" fill="#2563eb">Automations Feature</text>
</svg>
`;

const mockFeature3 = `
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#f0f5ff"/>
  <text x="300" y="200" font-family="Arial" font-size="30" text-anchor="middle" fill="#2563eb">CRM Feature</text>
</svg>
`;

const mockTestimonial = `
<svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="225" fill="#eef2ff"/>
  <text x="200" y="112" font-family="Arial" font-size="20" text-anchor="middle" fill="#2563eb">Testimonial Video</text>
</svg>
`;

const mockLogo = `
<svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="40" fill="#f0f5ff"/>
  <text x="60" y="25" font-family="Arial" font-size="14" text-anchor="middle" fill="#2563eb">Company Logo</text>
</svg>
`;

const mockBadge = `
<svg width="120" height="50" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="50" fill="#ffffff"/>
  <text x="60" y="30" font-family="Arial" font-size="12" text-anchor="middle" fill="#2563eb">Award Badge</text>
</svg>
`;

// Convert SVG string to Data URL
const svgToDataURL = (svg: string) => {
  const encodedSvg = encodeURIComponent(svg);
  return `data:image/svg+xml,${encodedSvg}`;
};

// Image data URLs
const DASHBOARD_IMAGE = svgToDataURL(mockScreenshot);
const FEATURE1_IMAGE = svgToDataURL(mockFeature1);
const FEATURE2_IMAGE = svgToDataURL(mockFeature2);
const FEATURE3_IMAGE = svgToDataURL(mockFeature3);
const TESTIMONIAL_IMAGE = svgToDataURL(mockTestimonial);
const LOGO_IMAGE = svgToDataURL(mockLogo);
const BADGE_IMAGE = svgToDataURL(mockBadge);

const LandingPage: React.FC = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* Header */}
      <StyledHeader>
        <div
          className="container"
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Title
                level={3}
                style={{ margin: 0, display: "flex", alignItems: "center" }}
              >
                <img
                  src={reactLogo}
                  alt="Logo"
                  style={{ height: 30, marginRight: 10 }}
                />
                Your Product
              </Title>
            </Col>
            <Col xs={0} md={16} lg={12}>
              <Space
                size={30}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <a href="#features">Features</a>
                <a href="#use-cases">Use Cases</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#pricing">Pricing</a>
              </Space>
            </Col>
            <Col>
              <Space>
                <Link to={AUTH_ROUTES.SIGN_IN}>Log In</Link>
                <Link to={AUTH_ROUTES.SIGN_UP}>
                  <Button type="primary" shape="round">
                    Start Free Trial
                  </Button>
                </Link>
              </Space>
            </Col>
          </Row>
        </div>
      </StyledHeader>

      {/* Hero Section */}
      <HeroSection>
        <div
          className="container"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          <Title style={{ fontSize: "2.5rem", marginBottom: 24 }}>
            The future of customer support is here
          </Title>
          <Paragraph
            style={{
              fontSize: "1.25rem",
              maxWidth: 800,
              margin: "0 auto 40px",
            }}
          >
            The all-in-one AI-powered business messaging platform that gathers
            teams, conversations, data and knowledge, around one place.
          </Paragraph>
          <Link to={AUTH_ROUTES.SIGN_UP}>
            <Button
              type="primary"
              shape="round"
              size="large"
              style={{ height: 56, fontSize: 18, padding: "0 40px" }}
            >
              Use Product for free
            </Button>
          </Link>
          <Paragraph style={{ marginTop: 16, color: "#6b7280" }}>
            14 days free trial — No commitment
          </Paragraph>

          <HeroImage>
            <img src={DASHBOARD_IMAGE} alt="Product dashboard" />
          </HeroImage>
        </div>
      </HeroSection>

      {/* Features Section */}
      <FeatureSection id="features">
        <div
          className="container"
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}
        >
          <Title
            style={{ fontSize: "2rem", textAlign: "center", marginBottom: 80 }}
          >
            Meet the workspace that delights your teams & customers
          </Title>

          {/* Feature 1 */}
          <FeatureCard>
            <Row gutter={[60, 60]} align="middle">
              <Col xs={24} md={12}>
                <FeatureIcon>
                  <i className="feature-icon">📥</i>
                </FeatureIcon>
                <Title level={3}>Inbox</Title>
                <Title level={4} style={{ marginTop: 0 }}>
                  Centralize your inbound messages
                </Title>
                <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
                  Centralize all your inbound conversations from emails, website
                  chat, WhatsApp, Messenger, phone, and more into one
                  collaborative inbox. This allows multiple team members to
                  access, manage, and respond to messages efficiently.
                </Paragraph>
                <a
                  href="#learn-more"
                  style={{ color: "#2563eb", fontWeight: 500 }}
                >
                  Learn more
                </a>
              </Col>
              <Col xs={24} md={12}>
                <img
                  src={FEATURE1_IMAGE}
                  alt="Inbox feature"
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Col>
            </Row>
          </FeatureCard>

          {/* Feature 2 */}
          <FeatureCard>
            <Row gutter={[60, 60]} align="middle">
              <Col xs={24} md={12} style={{ order: { xs: 2, md: 1 } as any }}>
                <img
                  src={FEATURE2_IMAGE}
                  alt="Automations feature"
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Col>
              <Col xs={24} md={12} style={{ order: { xs: 1, md: 2 } as any }}>
                <FeatureIcon>
                  <i className="feature-icon">🤖</i>
                </FeatureIcon>
                <Title level={3}>Automations</Title>
                <Title level={4} style={{ marginTop: 0 }}>
                  Build powerful, AI‑native, workflows
                </Title>
                <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
                  Earn more time with automated workflows that makes your teams'
                  life way easier. Fed with artificial intelligence, automations
                  help to streamline internal tasks and respond to users
                  automatically, enhancing efficiency.
                </Paragraph>
                <a
                  href="#learn-more"
                  style={{ color: "#2563eb", fontWeight: 500 }}
                >
                  Learn more
                </a>
              </Col>
            </Row>
          </FeatureCard>

          {/* Feature 3 */}
          <FeatureCard>
            <Row gutter={[60, 60]} align="middle">
              <Col xs={24} md={12}>
                <FeatureIcon>
                  <i className="feature-icon">📊</i>
                </FeatureIcon>
                <Title level={3}>CRM</Title>
                <Title level={4} style={{ marginTop: 0 }}>
                  Allow your teams to leverage customer's data
                </Title>
                <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
                  Synchronize leads' and customers' data in one unified view
                  gathered from one or multiple sources. This ensures whenever
                  you communicate with someone, you have access to their data
                  and past interactions.
                </Paragraph>
                <a
                  href="#learn-more"
                  style={{ color: "#2563eb", fontWeight: 500 }}
                >
                  Learn more
                </a>
              </Col>
              <Col xs={24} md={12}>
                <img
                  src={FEATURE3_IMAGE}
                  alt="CRM feature"
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Col>
            </Row>
          </FeatureCard>
        </div>
      </FeatureSection>

      {/* Use Cases Section */}
      <UseCasesSection id="use-cases">
        <div
          className="container"
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}
        >
          <Title
            style={{ fontSize: "2rem", textAlign: "center", marginBottom: 60 }}
          >
            Built for customer support, marketing, and sales. All together.
          </Title>

          <Row gutter={[32, 32]}>
            <Col xs={24} sm={24} md={8}>
              <Card style={{ height: "100%" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>🎯</div>
                <Title level={4}>Customer Support</Title>
                <Paragraph>
                  Cross-channel customer support experiences using modern
                  messaging
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Card style={{ height: "100%" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>💼</div>
                <Title level={4}>Inbound Sales</Title>
                <Paragraph>
                  Sell more by automating your sales pipeline using bots
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Card style={{ height: "100%" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>📣</div>
                <Title level={4}>Marketing</Title>
                <Paragraph>
                  Retarget customers by sending targeted emails and in-app
                  messages
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </UseCasesSection>

      {/* Testimonials Section */}
      <TestimonialsSection id="testimonials">
        <div
          className="container"
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}
        >
          <Title
            style={{ fontSize: "2rem", textAlign: "center", marginBottom: 60 }}
          >
            600,000 companies have already made the move
          </Title>

          <Row gutter={[32, 32]}>
            {/* Testimonial 1 */}
            <Col xs={24} sm={24} md={8}>
              <TestimonialCard>
                <div style={{ marginBottom: 20 }}>
                  <img
                    src={LOGO_IMAGE}
                    alt="Company logo"
                    style={{ height: 40 }}
                  />
                </div>
                <VideoThumbnail>
                  <img src={TESTIMONIAL_IMAGE} alt="Testimonial video" />
                  <div className="play-button">
                    <PlayCircleOutlined />
                  </div>
                </VideoThumbnail>
                <div style={{ marginBottom: 16 }}>
                  <Rate disabled defaultValue={5} />
                </div>
                <Paragraph style={{ flex: 1 }}>
                  "Crisp has been amazing and the first thing that really
                  attracted me to, as a techy, was the size of the chat widget."
                </Paragraph>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  <Avatar src={defaultAvatar} size={50} />
                  <div style={{ marginLeft: 16 }}>
                    <Text strong>Chris Sees</Text>
                    <div>Hoxton Mix</div>
                  </div>
                </div>
              </TestimonialCard>
            </Col>

            {/* Testimonial 2 */}
            <Col xs={24} sm={24} md={8}>
              <TestimonialCard>
                <div style={{ marginBottom: 20 }}>
                  <img
                    src={LOGO_IMAGE}
                    alt="Company logo"
                    style={{ height: 40 }}
                  />
                </div>
                <VideoThumbnail>
                  <img src={TESTIMONIAL_IMAGE} alt="Testimonial video" />
                  <div className="play-button">
                    <PlayCircleOutlined />
                  </div>
                </VideoThumbnail>
                <div style={{ marginBottom: 16 }}>
                  <Rate disabled defaultValue={5} />
                </div>
                <Paragraph style={{ flex: 1 }}>
                  "We chose this product from the beginning because of its
                  flexibility and level of automations it allowed. We really
                  enjoy being able to play with the API possibilities."
                </Paragraph>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  <Avatar src={defaultAvatar} size={50} />
                  <div style={{ marginLeft: 16 }}>
                    <Text strong>Emma Johnson</Text>
                    <div>Tech Solutions</div>
                  </div>
                </div>
              </TestimonialCard>
            </Col>

            {/* Testimonial 3 */}
            <Col xs={24} sm={24} md={8}>
              <TestimonialCard>
                <div style={{ marginBottom: 20 }}>
                  <img
                    src={LOGO_IMAGE}
                    alt="Company logo"
                    style={{ height: 40 }}
                  />
                </div>
                <VideoThumbnail>
                  <img src={TESTIMONIAL_IMAGE} alt="Testimonial video" />
                  <div className="play-button">
                    <PlayCircleOutlined />
                  </div>
                </VideoThumbnail>
                <div style={{ marginBottom: 16 }}>
                  <Rate disabled defaultValue={5} />
                </div>
                <Paragraph style={{ flex: 1 }}>
                  "This platform has become a central asset for our business,
                  empowering the team to provide fast, personalized responses
                  and make customer support more effective through AI-powered
                  solutions."
                </Paragraph>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  <Avatar src={defaultAvatar} size={50} />
                  <div style={{ marginLeft: 16 }}>
                    <Text strong>Alex Chen</Text>
                    <div>Innovate Inc</div>
                  </div>
                </div>
              </TestimonialCard>
            </Col>
          </Row>
        </div>
      </TestimonialsSection>

      {/* CTA Section */}
      <CTASection>
        <div
          className="container"
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "0 20px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ marginBottom: 30 }}>
            <Space size={16}>
              <img src={BADGE_IMAGE} alt="Badge" style={{ height: 50 }} />
              <img src={BADGE_IMAGE} alt="Badge" style={{ height: 50 }} />
            </Space>
          </div>
          <Title style={{ color: "white", marginBottom: 40, fontSize: "2rem" }}>
            Ready to improve your customer experience?
          </Title>
          <Space size={16} wrap style={{ justifyContent: "center" }}>
            <Link to={AUTH_ROUTES.SIGN_UP}>
              <Button
                size="large"
                style={{ height: 50, padding: "0 30px", fontSize: 16 }}
              >
                Get started for free
              </Button>
            </Link>
            <Button
              ghost
              size="large"
              style={{ height: 50, padding: "0 30px", fontSize: 16 }}
            >
              Book a demo
            </Button>
          </Space>
        </div>
      </CTASection>

      {/* Footer */}
      <Footer>
        <div
          className="container"
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}
        >
          <Row gutter={[60, 40]}>
            <Col xs={24} md={6}>
              <div style={{ marginBottom: 20 }}>
                <select
                  style={{
                    padding: "8px 12px",
                    background: "#374151",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    width: 200,
                  }}
                >
                  <option>English (United States)</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <SocialIcon href="#facebook">
                  <i className="social-icon">Facebook</i>
                </SocialIcon>
                <SocialIcon href="#twitter">
                  <i className="social-icon">Twitter</i>
                </SocialIcon>
                <SocialIcon href="#youtube">
                  <i className="social-icon">YouTube</i>
                </SocialIcon>
              </div>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <FooterTitle level={5}>Product</FooterTitle>
              <FooterLink to="#">Testimonials</FooterLink>
              <FooterLink to="#">Comparisons</FooterLink>
              <FooterLink to="#">Integrations</FooterLink>
              <FooterLink to="#">Developer Hub</FooterLink>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <FooterTitle level={5}>Company</FooterTitle>
              <FooterLink to="#">About us</FooterLink>
              <FooterLink to="#">Contact us</FooterLink>
              <FooterLink to="#">Careers</FooterLink>
              <FooterLink to="#">Partnerships</FooterLink>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <FooterTitle level={5}>Resources</FooterTitle>
              <FooterLink to="#">Blog</FooterLink>
              <FooterLink to="#">Help Center</FooterLink>
              <FooterLink to="#">Security</FooterLink>
              <FooterLink to="#">Terms of use</FooterLink>
            </Col>
          </Row>

          <div
            style={{
              marginTop: 60,
              paddingTop: 20,
              borderTop: "1px solid #374151",
            }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Text style={{ color: "#9ca3af" }}>
                  © 2023 Your Company Name
                </Text>
              </Col>
              <Col>
                <Text style={{ color: "#9ca3af" }}>
                  Made with ❤️ in Your Location
                </Text>
              </Col>
            </Row>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default LandingPage;
