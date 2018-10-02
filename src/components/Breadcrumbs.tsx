import * as React from 'react';

import { Breadcrumb } from 'semantic-ui-react';

import { withRouter } from 'react-router';

class Breadcrumbs extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            sections: []
        }
        this.onRouteChanged = this.onRouteChanged.bind(this);
        this.onRouteChanged();
    }

    componentDidUpdate(prevProps: any) {
        // Some hack from some forgotten corner of the internet
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        this.setState({
            sections: this.props.location.pathname.split("/").filter((x: string) => x !== "").map((x: string) => {
                return {
                    content: x,
                    key: x,
                    link: true
                }
            })
        })
    }

    public render() {
        return (
            <Breadcrumb icon='right angle' sections={this.state.sections} />
        )
    }
}

export default withRouter(Breadcrumbs);