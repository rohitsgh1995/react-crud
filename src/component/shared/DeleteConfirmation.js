import { Button, Modal } from "react-bootstrap";

function DeleteConfimation(props) {
    return (
        <>
            <Modal
                show={props.showModal}
                onHide={() => {
                    props.hideDeleteModalHandler();
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            props.hideDeleteModalHandler();
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            props.confirmDeleteHandler();
                        }}
                    >
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteConfimation;