import { Icon } from '@blueprintjs/core'
import _ from 'lodash'
import reject from 'lodash/reject'
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { SidePanel, SidePanelSection } from '~/components/Shared/Interface'

import FlowsList from './FlowsList'
import FlowTools from './FlowTools'
import Toolbar from './Toolbar'

type Props = {
  flowsNames: string[]
  onCreateFlow: (flowName: string) => void
  flows: any
  deleteFlow: (flowName: string) => void
  renameFlow: any
  history: any
  readOnly: boolean
  dirtyFlows: any
  duplicateFlow: any
  currentFlow: any
} & RouteComponentProps

export default class PanelContent extends Component<Props> {
  createFlow = () => {
    let name = prompt('Enter the name of the new flow')

    if (!name) {
      return
    }

    name = name.replace(/\.flow\.json$/i, '')

    if (/[^A-Z0-9-_\/]/i.test(name)) {
      return alert('ERROR: The flow name can only contain letters, numbers, underscores and hyphens.')
    }

    if (_.includes(this.props.flowsNames, name + '.flow.json')) {
      return alert('ERROR: This flow already exists')
    }

    this.props.onCreateFlow(name)
  }

  goToFlow = flow => this.props.history.push(`/flows/${flow.replace(/\.flow\.json/, '')}`)

  render() {
    const normalFlows = reject(this.props.flows, x => x.name.startsWith('skills/'))
    const flowsName = normalFlows.map(x => {
      return { name: x.name }
    })
    const createFlowAction = {
      icon: <Icon icon="add" />,
      key: 'create',
      tooltip: 'Create new flow',
      onClick: this.createFlow
    }

    return (
      <SidePanel>
        <Toolbar />

        <SidePanelSection label={'Flows'} actions={!this.props.readOnly && [createFlowAction]}>
          <FlowsList
            readOnly={this.props.readOnly}
            flows={flowsName}
            dirtyFlows={this.props.dirtyFlows}
            goToFlow={this.goToFlow}
            deleteFlow={this.props.deleteFlow}
            duplicateFlow={this.props.duplicateFlow}
            renameFlow={this.props.renameFlow}
            currentFlow={this.props.currentFlow}
          />
        </SidePanelSection>

        <SidePanelSection label="Tools">
          <FlowTools />
        </SidePanelSection>
      </SidePanel>
    )
  }
}
