import * as React from 'react'
// import { ProjectList } from './ProjectList'
import { connect } from 'react-redux'
// import { Dispatch } from 'redux'

interface ProjectListProps {

}

interface ProjectListState {

}

class ProjectList extends React.Component<ProjectListProps, ProjectListState> {
  render() {
    return (
      <div>
        <ul>
          <li>project1</li>
          <li>project1</li>
          <li>project1</li>
          <li>project1</li>
          <li>project1</li>
          <li>project1</li>
          <li>project1</li>
          <li>project1</li>
          <li>project1</li>
          <li>project1</li>
          <li>project2</li>
        </ul>
        <p><input type="text" /></p>
      </div>
    )
  }
}



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
