import * as React from 'react';

import { Dimmer, Header, Loader, Segment } from 'semantic-ui-react';

import IAudio from '../interfaces/Audio';

export interface IAudioDetailState {
    audio: IAudio;
    isLoading: boolean;
}

export default class Audio extends React.Component<any, IAudioDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            audio: {
                filename: "",
                id: -1,
                in_utterances: [],
                url: "",
            },
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        console.log(this.props)
        fetch(`http://127.0.0.1:8080/v0.1/audio/${this.props.match.params.audioId}`)
            .then(res => res.json())
            .then(audio => {
                this.setState({
                    audio,
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
                <Segment basic={true}>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Header as='h2'>{this.state.audio.filename} (id: {this.state.audio.id})</Header>
                    <Header.Subheader>{this.state.audio.url}</Header.Subheader>
                </Segment>
            </div>
        )
    }
}