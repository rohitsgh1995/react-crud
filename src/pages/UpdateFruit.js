import axios from "axios";
import { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function UpdateFruit () {
    const name = useRef("");
    const quantity = useRef("");
    const price = useRef("");
    const imageUrl = useRef("");

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/fruits/${id}`).then((response) => {
            // console.log(response.data);
            name.current.value = response.data.name;
            quantity.current.value = response.data.quantity;
            price.current.value = response.data.price;
            imageUrl.current.value = response.data.imageUrl;
        });
    }, []);

    const updateFruitHandler = () => {
        var payload = {
            name: name.current.value,
            quantity: quantity.current.value ? Number(quantity.current.value) : 0,
            price: price.current.value ? Number(price.current.value) : 0,
            imageUrl: imageUrl.current.value,
        };

        axios.put(`http://localhost:4000/fruits/${id}`, payload).then(() => {
            navigate("/");
        });
    }

    return (
        <>
            <legend>Update</legend>
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
                <Button variant="warning" type="button" onClick={updateFruitHandler}>Update</Button>
                <Button className="ms-5" variant="secondary" onClick={() => navigate(`/`)}>Home</Button>
            </Form>
        </>
    );
}

export default UpdateFruit;