import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Button, Container, Header, Icon } from 'semantic-ui-react'

class Index extends React.Component<RouteComponentProps<any>, React.Props<any>> {
    public render() {
        return (
            <div>
                <Container text={true} fluid={true}>
                    <Header as='h1' icon={true} textAlign='center'>
                        <Icon name='home' circular={true} />
                        <Header.Content>Welcome to Persephone</Header.Content>
                        <Button primary={true} onClick={() => this.props.history.push("/intro")}>Getting started</Button>
                    </Header>
                    <p>Welcome to the Persephone. Persephone is a suite of tools for Automatic Speech Recognition (ASR).</p>
                </Container>
            </div>
        )
    }
}

const routerIndex = withRouter(Index);

export default routerIndex;