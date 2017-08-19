import { ProjectList } from './ProjectList'
import { connect } from 'react-redux'
// import { Dispatch } from 'redux'

export class ActionDispatcher {

}

const mapStateToProps = (state: {}) => ({
})

const mapDispatchToProps = {
}

const ProjectListContainer: React.ComponentClass<{}> =  connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList)

export { ProjectListContainer as ProjectList }
