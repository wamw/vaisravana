import { Action } from 'redux'

enum ActionNames {
  PUSH = 'project-list/push',
}

interface PushAction extends Action {
  type: ActionNames.PUSH
}
export const pushItem = (): PushAction => ({
  type: ActionNames.PUSH,
})

export interface ProjectListState {
  hoge: number
}

export type ProjectListActions = PushAction

const initialState: ProjectListState = {
  hoge: 0
}

type S = ProjectListState
type A = ProjectListActions

export function reducer(state: S = initialState, action: A): S {
  switch (action.type) {
    case ActionNames.PUSH:
      return { ...state }
    default:
      return state
  }
}
