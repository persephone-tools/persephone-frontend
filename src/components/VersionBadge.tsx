import * as React from 'react';

import { Dimmer, Label, Loader, Segment } from 'semantic-ui-react';

import IBackend from '../interfaces/Backend';

export interface IVersionBadgeState {
    backend: IBackend;
    isLoading: boolean;
}

export default class VersionBadge extends React.Component<{}, IVersionBadgeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            backend: {
                name: "Loading",
                projectURL: "",
                version: "?"
            },
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        fetch('http://127.0.0.1:8080/v0.1/backend')
            .then(res => res.json())
            .then(backend => {
                this.setState({
                    backend,
                    isLoading: false
                })
            });
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <Segment basic={true}>
                <Label as="a" image={true} onClick={() => console.log(this.state.backend.projectURL)}>
                    <Dimmer active={this.state.isLoading}>
                        <Loader />
                    </Dimmer>
                    {this.state.backend.name}
                    <Label.Detail>{this.state.backend.version}</Label.Detail>
                </Label>
            </Segment>
        )
    }
}