import * as React from 'react';

import { Dimmer, Label, Loader, Segment } from 'semantic-ui-react';

import { api } from '../API';

import { BackendInformation } from '../gen/api';

export interface IVersionBadgeState {
    backend?: BackendInformation;
    isLoading: boolean;
}

export default class VersionBadge extends React.Component<{}, IVersionBadgeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.backendGet().then(backend => {
            console.log(backend)
            this.setState({
                backend,
                isLoading: false,
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <Segment basic={true}>
                {this.state.backend && 
                    <Label as="a" image={true} onClick={() => { window.open(this.state.backend!.projectURL, '_blank'); }}>
                        <Dimmer active={this.state.isLoading}>
                            <Loader />
                        </Dimmer>
                        {this.state.backend.name}
                        <Label.Detail>{this.state.backend.version}</Label.Detail>
                    </Label>
                }
            </Segment>
        )
    }
}