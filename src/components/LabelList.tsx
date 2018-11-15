// We have to call this LabelList as we're importing Label from the API

import * as React from 'react';

import { Button, Dimmer, Form, Header, Icon, Loader, Modal, Segment, Table } from 'semantic-ui-react';

import ErrorMessageComponent from './ErrorMessageComponent';

import { withRouter } from 'react-router';

import { api } from '../API';

import { ErrorMessage, Label, LabelInfo, LabelPostRequest } from '../gen/api';

export interface ILabelState {
    labels: Label[];
    formError?: ErrorMessage;
    formLoading: boolean;
    isLoading: boolean;
    uploadModalOpen: boolean;
    phoneticLabel?: string;
}

class LabelList extends React.Component<any, ILabelState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formLoading: false,
            isLoading: true,
            labels: [],
            uploadModalOpen: false
        };
        this.getData = this.getData.bind(this);
        this.clearForm = this.clearForm.bind(this);
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

    public clearForm() {
        this.setState({
            formError: undefined,
            formLoading: false
        })
    }

    public openModal() {
        this.clearForm();
        this.setState({
            uploadModalOpen: true
        })
    }

    public closeModal() {
        this.clearForm();
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
            }).catch(err => {
                this.setState({formLoading: false, formError: err})
            });
        } else {
            this.setState({
                formError: {
                    errorMessage: "Invalid phonetic label",
                    reason: "Invalid phonetic label",
                    status: -1,
                    userErrorMessage: "Invalid phonetic label",
                } as ErrorMessage,
                formLoading: false,
            })
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
                            <Form loading={this.state.formLoading}>
                                <Header>Label details</Header>
                                <Form.Input label="Phonetic label" type="text" name="phonetic_label" value={this.state.phoneticLabel} placeholder="1" onChange={this.handlePhoneticLabelChange} />
                                <ErrorMessageComponent error={this.state.formError} header='Label creation failed' />
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