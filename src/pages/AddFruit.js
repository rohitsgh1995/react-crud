import axios from "axios";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddFruit() {
    const name = useRef("");
    const quantity = useRef("");
    const price = useRef("");
    const imageUrl = useRef("");

    const navigate = useNavigate();

    const addFruitHandler = () => {
        var payload = {
            name: name.current.value,
            quantity: quantity.current.value ? Number(quantity.current.value) : 0,
            price: price.current.value ? Number(price.current.value) : 0,
            imageUrl: imageUrl.current.value,
        };

        axios.post("http://localhost:4000/fruits", payload).then(() => {
            navigate("/");
        });
    }

    return (
        <>
            <legend>Create</legend>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={name} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formQuantity">
                    <Form.Label>Quantity (kg)</Form.Label>
                    <Form.Control type="number" ref={quantity} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" ref={price} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formImageUrl">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control type="text" ref={imageUrl} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={addFruitHandler}>Add</Button>
                <Button className="ms-5" variant="secondary" onClick={() => navigate(`/`)}>Home</Button>
            </Form>
        </>
    );
}

export default AddFruit;