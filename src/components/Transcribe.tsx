import * as React from 'react';

import { Button, Dimmer, Form, Header, Icon, Loader, Modal, Radio, Segment, Table } from 'semantic-ui-react';

import ErrorMessageComponent from './ErrorMessageComponent';

import { api } from '../API';

import { AudioFileInformation, ErrorMessage, ModelInformation, PersephoneApiApiEndpointsModelTranscribeRequest } from '../gen/api';

export interface ITranscribeState {
    audio: AudioFileInformation[];
    models: ModelInformation[];
    isLoadingAudio: boolean;
    isLoadingModels: boolean;
    formError?: ErrorMessage;
    formLoading: boolean;
    modalOpen: boolean;
    selectedAudio: number;
    selectedModel: number;
}

export default class Transcribe extends React.Component<{}, ITranscribeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            audio: [],
            formLoading: false,
            isLoadingAudio: true,
            isLoadingModels: true,
            modalOpen: false,
            models: [],
            selectedAudio: -1,
            selectedModel: -1,
        };
        this.getData = this.getData.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.clickTranscribe = this.clickTranscribe.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.startTranscribe = this.startTranscribe.bind(this);
    }

    public getData() {
        this.setState({isLoadingAudio: true, isLoadingModels: true, selectedAudio: -1, selectedModel: -1});
        api.modelGet().then(models => {
            console.log(models)
            this.setState({
                isLoadingModels: false,
                models,
            })
        });
        api.audioGet().then(audio => {
            console.log(audio)
            this.setState({
                audio,
                isLoadingAudio: false,
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

    public closeModal() {
        this.clearForm();
        this.setState({
            modalOpen: false
        })
    }

    public clickTranscribe() {
        this.setState({
            formLoading: false,
            modalOpen: true
        } as Pick<ITranscribeState, any>)
    }

    handleAudioSelection = (audioID: number) => (event: any) => {
        this.setState({selectedAudio: audioID});
    }

    handleModelSelection = (modelID: number) => (event: any) => {
        this.setState({selectedModel: modelID});
    }

    public startTranscribe() {
        this.setState({formLoading: true})
        const requestData: PersephoneApiApiEndpointsModelTranscribeRequest = {
            audioID: this.state.selectedAudio,
            modelID: this.state.selectedModel,
        }
        api.persephoneApiApiEndpointsModelTranscribe(requestData).then(res => {
            this.setState({modalOpen: false, selectedModel: -1});
            this.getData()
        }).catch(err => {
            this.setState({formLoading: false, formError: err})
        });
    }

    public render() {
        return (
            <div>
                <Header as='h1'>Transcribe Audio</Header>
                <Button primary={true} onClick={this.clickTranscribe}>
                    <Icon name='translate' />
                    Transcribe
                </Button>
                <Header as='h2'>Select model</Header>
                <Segment>
                    <Dimmer active={this.state.isLoadingModels}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Corpus ID</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        {this.state.models.map((model) => (
                            <Table.Row key={model.id}>
                                <Table.Cell>{model.id}</Table.Cell>
                                <Table.Cell>{model.name}</Table.Cell>
                                <Table.Cell>{model.corpusID}</Table.Cell>
                                <Table.Cell>
                                    <Form.Field>
                                        <Radio label='Select' name="modelChoice" value='this' checked={model.id === this.state.selectedModel} onChange={this.handleModelSelection(model.id!)}/>
                                    </Form.Field>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </Segment>
                <Header as='h2'>Select audio</Header>
                <Segment>
                    <Dimmer active={this.state.isLoadingAudio}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Audio ID</Table.HeaderCell>
                            <Table.HeaderCell>File name</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        {this.state.audio.map((audio) => (
                            <Table.Row key={audio.id as number}>
                                <Table.Cell>{audio.id}</Table.Cell>
                                <Table.Cell>{audio.fileInfo!.name}</Table.Cell>
                                <Table.Cell>
                                    <Form.Field>
                                        <Radio label='Select' name="audioChoice" value='this' checked={audio.id === this.state.selectedAudio} onChange={this.handleAudioSelection(audio.id! as number)}/>
                                    </Form.Field>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </Segment>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.closeModal}>
                    <Modal.Header>Confirm operation</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form loading={this.state.formLoading}>
                                <Header>Are you sure you want to transcribe this?</Header>
                                {this.state.models && this.state.selectedModel !== -1 &&
                                    <React.Fragment>
                                        {this.state!.selectedModel !== -1 &&
                                            <React.Fragment>
                                                <Form.Input label="Model ID" type="text" name="id" value={this.state.models!.find(model => model!.id === this.state!.selectedModel)!.id} readOnly={true} />
                                                <Form.Input label="Model Name" type="text" name="name" value={this.state.models!.find(model => model!.id === this.state!.selectedModel)!.name} readOnly={true} />
                                            </React.Fragment>
                                        }
                                        {this.state!.selectedAudio !== -1 &&
                                            <Form.Input label="Audio ID" type="text" name="name" value={this.state.audio!.find(audio => audio!.id === this.state!.selectedAudio)!.id!} readOnly={true} />
                                        }
                                    </React.Fragment>
                                }
                                <ErrorMessageComponent error={this.state.formError} />
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary={true} onClick={this.startTranscribe}>
                            <Icon name='check' />
                            Confirm
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