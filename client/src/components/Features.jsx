import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Chat, CameraVideo, Envelope, GeoAlt, Wallet } from "react-bootstrap-icons";
import "../App.css"; 

const features = [
    {
        title: "Real-time Chat",
        description: "Instantly connect with your friends through fast, reliable messaging.",
        icon: <Chat size={40} />,
    },
    {
        title: "Video Calling",
        description: "High-quality video calls that bring your social interactions to life.",
        icon: <CameraVideo size={40} />,
    },
    {
        title: "Email Messaging",
        description: "Stay in touch the traditional way with built-in email messaging.",
        icon: <Envelope size={40} />,
    },
    {
        title: "Friend Location Tracking",
        description: "Locate your friends and stay informed about their whereabouts in real time.",
        icon: <GeoAlt size={40} />,
    },
    {
        title: "Expense Management",
        description: "Easily track shared expenses with your contacts for hassle-free financial management.",
        icon: <Wallet size={40} />,
    },
];

const Features = () => {
    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">FusionFLOW Features</h2>
            <Row className="g-4">
                {features.map((feature, index) => (
                    <Col xs={12} sm={6} md={4} key={index}>
                        <Card className="feature-card text-center h-100 border-0 shadow-sm rounded-lg">
                            <Card.Body className="d-flex flex-column align-items-center p-4">
                                <div className="feature-icon mb-3 text-primary">
                                    {feature.icon}
                                </div>
                                <Card.Title className="fw-bold">{feature.title}</Card.Title>
                                <Card.Text className="text-muted">{feature.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Features;
