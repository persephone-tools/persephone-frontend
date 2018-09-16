import * as React from 'react';

import { Button, Card, Container, Dimmer, Header, Loader, Segment } from 'semantic-ui-react';

import ICorpus from '../interfaces/Corpus';

import CorpusCard from './CorpusCard';

export interface ICorpusState {
    corpuses: ICorpus[];
    isLoading: boolean;
}

export default class Corpus extends React.Component<{}, ICorpusState> {
    constructor(props: any) {
        super(props);
        this.state = {
            corpuses: [],
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        fetch('http://127.0.0.1:8080/v0.1/corpus')
            .then(res => res.json())
            .then(corpuses => {
                this.setState({
                    corpuses,
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
                <Header as='h1'>Corpuses</Header>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Card.Group>
                        {this.state.corpuses.map((corpus) => (
                            <CorpusCard key={corpus.id} corpus={corpus} />
                        ))}
                        <Card>
                            <Card.Content>
                                <Card.Header>New corpus</Card.Header>
                            </Card.Content>
                            <Card.Content extra={true}>
                                <Container textAlign='center'><Button centered="true" circular={true} primary={true} icon='plus' /></Container>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Segment>
            </div>
        )
    }
}