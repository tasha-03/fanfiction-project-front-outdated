import { Card, Container } from "react-bootstrap"

const Work = ({ isLoggedIn }) => {
    return <Container>
    <Card>
        <Card.Body>
            <Card.Title>Work Title</Card.Title>
            <Card.Subtitle>Author</Card.Subtitle>
        </Card.Body>
    </Card>
</Container>
}

export default Work