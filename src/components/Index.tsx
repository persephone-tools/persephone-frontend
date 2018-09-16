import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Button } from 'semantic-ui-react'

class Index extends React.Component<RouteComponentProps<any>, React.Props<any>> {
    public render() {
        return (
            <div>
                <Button primary={true} onClick={() => this.props.history.push("/corpus/")}>See corpuses</Button>
            </div>
        )
    }
}

const routerIndex = withRouter(Index);

export default routerIndex;