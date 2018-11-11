// We have to call this LabelList as we're importing Label from the API

import * as React from 'react';

import { Button, Dimmer, Form, Header, Icon, Loader, Message, Modal, Segment, Table } from 'semantic-ui-react';

import { withRouter } from 'react-router';

import { api } from '../API';

import { Label, LabelInfo, LabelPostRequest } from '../gen/api';

export interface ILabelState {
    labels: Label[];
    formErrorMessage: string;
    formFailed: boolean;
    formLoading: boolean;
    isLoading: boolean;
    uploadModalOpen: boolean;
    phoneticLabel?: string;
}

class LabelList extends React.Component<any, ILabelState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formErrorMessage: "No error.",
            formFailed: false,
            formLoading: false,
            isLoading: true,
            labels: [],
            uploadModalOpen: false
        };
        this.getData = this.getData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handlePhoneticLabelChange = this.handlePhoneticLabelChange.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.labelGet().then(labels => {
            console.log(labels)
            this.setState({
                isLoading: false,
                labels
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public openModal() {
        this.setState({
            formErrorMessage: "No error.",
            formFailed: false,
            formLoading: false,
            uploadModalOpen: true
        })
    }

    public closeModal() {
        this.setState({
            uploadModalOpen: false
        })
    }

    public handlePhoneticLabelChange(event: any) {
        this.setState({phoneticLabel: event.target.value});
    }

    public submitForm() {
        this.setState({formLoading: true})
        if (this.state.phoneticLabel) {
            const labelInfo: LabelInfo = {
                phoneticLabel: this.state.phoneticLabel.toString(),
            }
            const requestData: LabelPostRequest = {
                labelInfo
            }
            api.labelPost(requestData).then(res => {
                this.setState({uploadModalOpen: false});
                this.getData();
            }).catch(res => res.text()).then(err => {
                console.error(err);
                this.setState({formLoading: false, formFailed: true, formErrorMessage: "The error message is: " + err});
            });
        } else {
            this.setState({formLoading: false, formFailed: true, formErrorMessage: "The error message is: \"Invalid phonetic label\""});
        }
    }

    public render() {
        return (
            <div>
                <Header as='h1'>All Labels</Header>
                <Button primary={true} onClick={this.openModal}>
                    <Icon name='plus' />
                    Create new label
                </Button>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Phonetic label</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {this.state.labels.map((label) => (
                            <Table.Row key={label.id!.toString()}>
                                <Table.Cell>{label.id}</Table.Cell>
                                <Table.Cell>{label.label}</Table.Cell>
                                <Table.Cell><Button circular={true} icon='angle right' onClick={() => this.props.history.push("/label/" + label.id)} /><Button circular={true} icon='download' onClick={() => { window.open(label.id!.toString(), '_blank'); }} /></Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </Segment>
                <Modal
                    open={this.state.uploadModalOpen}
                    onClose={this.closeModal}>
                    <Modal.Header>Create label</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form loading={this.state.formLoading} error={this.state.formFailed}>
                                <Header>Label details</Header>
                                <Form.Field>
                                    <Form.Input label="Phonetic label" type="text" name="phonetic_label" value={this.state.phoneticLabel} placeholder="1" onChange={this.handlePhoneticLabelChange} />
                                </Form.Field>
                                <Message id="errormessage" error={true} header='Corpus creation failed' content={this.state.formErrorMessage} />
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary={true} onClick={this.submitForm}>
                            <Icon name='plus' />
                            Create
                        </Button>
                        <Button negative={true} onClick={this.closeModal}>
                            <Icon name='remove' />
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default withRouter(LabelList);