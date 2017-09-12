import * as React from 'react'
import { connect } from 'react-redux'
import { ProjectList } from './component'

export class ActionDispatcher {

}

const mapStateToProps = (state: {}) => ({

})

const mapDispatchToProps = {
}

const ProjectListContainer: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList)

export { ProjectListContainer as ProjectList }
