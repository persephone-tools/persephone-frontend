import * as React from 'react';

import { Placeholder } from 'semantic-ui-react';

import { api } from '../API';

import { AudioAudioIDGetRequest, AudioFileInformation, AudioURI } from '../gen/api';

export interface IAudioNameProps {
    audioId: AudioURI;
}

export interface IAudioNameState {
    audio?: AudioFileInformation;
    isLoading: boolean;
}

export default class AudioName extends React.Component<IAudioNameProps, IAudioNameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        const requestData: AudioAudioIDGetRequest = {
            audioID: this.props.audioId as number
        }
        api.audioAudioIDGet(requestData).then(audio => {
            console.log(audio)
            this.setState({
                audio,
                isLoading: false,
            })
        }).catch(console.error);
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.isLoading && !this.state.audio ?
                    <Placeholder>
                        <Placeholder.Line />
                    </Placeholder>
                :
                    this.state.audio!.fileInfo!.name
                }
            </React.Fragment>
        )
    }
}