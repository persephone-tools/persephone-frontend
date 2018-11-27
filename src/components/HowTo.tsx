import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Header, Icon, List, Step } from 'semantic-ui-react'

class HowTo extends React.Component<RouteComponentProps<any>, React.Props<any>> {
    public render() {
        return (
            <div>
                <Header as='h1'>How do I?</Header>
                TODO: howto
            </div>
        )
    }
}

export default withRouter(HowTo);