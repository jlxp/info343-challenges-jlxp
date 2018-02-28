import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        modal: false,
        newMessage: ""
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }

    handleEdit(messageSnap) {
        if (this.state.newMessage !== "") {
            let editText = {
                body: this.state.newMessage
            }
            messageSnap.ref.update(editText);
        }
        this.toggle();
    }

    render() {
        return (
        <div>
            <Button className="btn btn-outline-primary btn-sm" onClick={this.toggle}>Edit</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalBody>
                <FormGroup>
                    <Label for="exampleText">Edit your message</Label>
                    <Input type="textarea" name="text" id="exampleText" defaultValue={this.props.messageSnap.val().body} onInput={evt => this.setState({newMessage: evt.target.value})} />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => this.handleEdit(this.props.messageSnap)}>Save Changes</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export default EditModal;