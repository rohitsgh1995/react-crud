import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteConfimation from "../component/shared/DeleteConfirmation";

function AllFruits() {
    const [allFruits, setAllFruits] = useState([]);
    const navigate = useNavigate();


    const [showModal, setShowModal] = useState(false);
    const [itemToDeleteId, setItemToDeleted] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:4000/fruits").then((response) => {
            setAllFruits(response.data);
        });
    }, []);

    const openConfirmDeleteModalHandler = (id) => {
        setShowModal(true);
        setItemToDeleted(id);
    };

    const hideDeleteModalHandler = () => {
        setShowModal(false);
        setItemToDeleted(0);
    };

    const confirmDeleteHandler = () => {
        axios
        .delete(`http://localhost:4000/fruits/${itemToDeleteId}`)
        .then((response) => {
            setAllFruits((previousState) => {
                return previousState.filter((_) => _.id !== itemToDeleteId);
            });
            setItemToDeleted(0);
            setShowModal(false);
        });
    };

    return (
        <>
            <DeleteConfimation
                showModal={showModal}
                hideDeleteModalHandler={hideDeleteModalHandler}
                title="Delete Confirmation"
                body="Are you sure?"
                confirmDeleteHandler={confirmDeleteHandler}
            ></DeleteConfimation>
            <Row className="mt-2">
                <Col md={{ span: 4, offset: 4 }}>
                    <Button variant="primary" onClick={() => navigate("/add-fruit")}>
                        Add New Fruit
                    </Button>
                </Col>
            </Row>
            <Row xs={1} md={3} className="mt-2 g-2">
                {allFruits.map((item) => (
                    <Col key={item.id}>
                        <Card>
                            <Card.Img className="Fruit-img" variant="top" src={item.imageUrl}/>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>Quantity (kg) - {item.quantity}</Card.Text>
                                <Card.Text>Price - {item.price}</Card.Text>
                                <Button variant="warning" onClick={() => navigate(`/update-fruit/${item.id}`)}>
                                    Edit
                                </Button>
                                <Button className="ms-3" variant="danger" onClick={() => {openConfirmDeleteModalHandler(item.id)}}>
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default AllFruits;