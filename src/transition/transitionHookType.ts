import {TransitionHookScope, TransitionHookPhase} from "./interface";
import {PathNode} from "../path/node";
import {Transition} from "./transition";
import {isString} from "../common/predicates";
import {GetErrorHandler, GetResultHandler, TransitionHook} from "./transitionHook";
/**
 * This class defines a type of hook, such as `onBefore` or `onEnter`.
 * Plugins can define custom hook types, such as sticky states does for `onInactive`.
 *
 * @interalapi
 * @module transition
 */
export class TransitionHookType {

  public resolvePath: (trans: Transition) => PathNode[];

  constructor(public name:               string,
              public hookPhase:          TransitionHookPhase,
              public hookScope:          TransitionHookScope,
              public hookOrder:          number,
              public criteriaMatchPath:  string,
              resolvePath:        ((trans: Transition) => PathNode[]) | string,
              public reverseSort:        boolean = false,
              public getResultHandler:      GetResultHandler = TransitionHook.HANDLE_RESULT,
              public getErrorHandler:       GetErrorHandler = TransitionHook.REJECT_ERROR,
              public rejectIfSuperseded: boolean = true,
  ) {
    this.resolvePath = isString(resolvePath) ? (trans: Transition) => trans.treeChanges(resolvePath) : resolvePath;
  }
}
