import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Header, Icon, List, Step } from 'semantic-ui-react'

class HowTo extends React.Component<RouteComponentProps<any>, React.Props<any>> {
    public render() {
        return (
            <div>
                <Header as='h1'>How do I?</Header>
                <Header as='h2'>Create a basic transcription workflow</Header>
                Here's how you can use this web frontend to define and train a transcription model.
                <Header as='h3'>Introduction</Header>
                <Step.Group widths={5}>
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>...</p>
                <Header as='h3'>Model creation</Header>
                <Step.Group size="mini">
                    <Step active={true}>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>Explain here.</p>
                <Header as='h3'>Data upload</Header>
                <Step.Group size="mini">
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>Explain here.</p>
                <Header as='h3'>Preprocessing</Header>
                <Step.Group size="mini">
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>Explain here.</p>
                <Header as='h3'>Training</Header>
                <Step.Group size="mini">
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>Explain here.</p>
                <Header as='h3'>Transcription</Header>
                <Step.Group size="mini">
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>Explain here.</p>
            </div>
        )
    }
}

export default withRouter(HowTo);