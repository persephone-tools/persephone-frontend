import * as React from 'react';

import { Icon, Menu } from 'semantic-ui-react';

import VersionBadge from './VersionBadge';

export default class MainMenu extends React.Component<any, any> {
    public render() {
        return (
            <Menu vertical={true} secondary={true} pointing={true} fixed="left">
                <Menu.Item header={true}>Persephone frontend</Menu.Item>
                <Menu.Item>
                    <Menu.Header>Introduction</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item onClick={() => this.props.history.push("/")}>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push("/intro")}>
                            <Icon name='info' />
                            Introduction
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push("/howto")}>
                            <Icon name='help' />
                            How-to
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Data</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item onClick={() => this.props.history.push("/model/")}>
                            <Icon name='box' />
                            Models
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push("/corpus/")}>
                            <Icon name='book' />
                            Corpuses
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push("/audio/")}>
                            <Icon name='music' />
                            Audio
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push("/transcription/")}>
                            <Icon name='pencil alternate' />
                            Transcriptions
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push("/utterance/")}>
                            <Icon name='talk' />
                            Utterances
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push("/label/")}>
                            <Icon name='tag' />
                            Labels
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Operations</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item onClick={() => this.props.history.push("/preprocess/")}>>
                            <Icon name='filter' />
                            Preprocess
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push("/train/")}>>
                            <Icon name='hourglass start' />
                            Train
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push("/transcribe/")}>>
                            <Icon name='language' />
                            Transcribe
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Community</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item href="https://lists.persephone-asr.org/postorius/lists/announce.lists.persephone-asr.org/" target='_blank'>
                            <Icon name='announcement' />
                            Announcements
                        </Menu.Item>
                        <Menu.Item href="https://lists.persephone-asr.org/postorius/lists/discuss.lists.persephone-asr.org/" target='_blank'>
                            <Icon name='discussions' />
                            Discussion
                        </Menu.Item>
                        <Menu.Item href="https://persephone-asr.org/" target='_blank'>
                            <Icon name='external' />
                            Website
                        </Menu.Item>
                        <Menu.Item href="https://github.com/persephone-tools/" target='_blank'>
                            <Icon name='github' />
                            GitHub
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Support</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item href="https://lists.persephone-asr.org/" target='_blank'>
                            <Icon name='mail' />
                            Community mailing lists
                        </Menu.Item>
                        <Menu.Item href="https://persephone.readthedocs.io/en/latest/" target='_blank'>
                            <Icon name='book' />
                            Documentation
                        </Menu.Item>
                        <Menu.Item href="https://www.customprogrammingsolutions.com/" target='_blank'>
                            <Icon name='dollar' />
                            Enterprise support
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Version information</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item>
                            <VersionBadge />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        )
    }
}