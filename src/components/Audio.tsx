import * as React from 'react';

import { Button, Dimmer, Header, Loader, Segment, Table } from 'semantic-ui-react';

import { withRouter } from 'react-router';
import IAudio from '../interfaces/Audio';

export interface IAudioState {
    audios: IAudio[];
    isLoading: boolean;
}

class Audio extends React.Component<any, IAudioState> {
    constructor(props: any) {
        super(props);
        this.state = {
            audios: [],
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        fetch('http://127.0.0.1:8080/v0.1/audio')
            .then(res => res.json())
            .then(audios => {
                this.setState({
                    audios,
                    isLoading: false
                })
            });
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <div>
                <Header as='h2'>Audio</Header>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Filename</Table.HeaderCell>
                            <Table.HeaderCell>Utterances</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {this.state.audios.map((audio) => (
                            <Table.Row>
                                <Table.Cell>{audio.id}</Table.Cell>
                                <Table.Cell>{audio.filename}</Table.Cell>
                                <Table.Cell>{audio.in_utterances.join(", ")}</Table.Cell>
                                <Table.Cell><Button circular={true} icon='angle right' onClick={() => this.props.history.push("/audio/" + audio.id)} /><Button circular={true} icon='download' onClick={() => { window.open(audio.url, '_blank'); }} /></Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </Segment>
            </div>
        )
    }
}

export default withRouter(Audio);