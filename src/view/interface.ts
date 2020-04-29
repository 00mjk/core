/** @packageDocumentation @publicapi @module view */
import { UIRouterPlugin } from '../interface';
import { UIRouter } from '../router';
import { StateObject } from '../state';
import { _ViewDeclaration } from '../state/interface';
import { PathNode } from '../path/pathNode';

/** @internalapi */
export type ViewContext = StateObject;

/**
 * @internalapi
 *
 * The metadata around a ui-view component that registered itself with the view service.
 */
export interface RegisteredUIViewPortal {
  /** ui-view portal component type, e.g., 'react' or 'angular' */
  type: string;
  /** the id of the ui-view portal */
  id: string;
  /** the id of the parent ui-view portal, or null if the view is rendered at the root */
  parentId: string;
  /** the state which rendered the ui-view portal */
  portalState: StateObject;
  /**
   * The state of the content component currently loaded into the portal,
   * or null if no component is loaded into the portal
   */
  contentState?: StateObject;
  /** The ui-view short name, for named ui-views.  $default for unnamed ui-views */
  name: string;
  /** The fully qualified ui-view address, (i.e., `${parentview.fqn}.${name}` */
  fqn: string;
  /** The type of content that should be loaded into the portal */
  currentPortalContentType: PortalContentType;
  /** The ViewConfig object when content type is ROUTED_COMPONENT */
  currentPortalViewConfig: ViewConfig;
  /** The HtmlDivElement when content type is INTEROP_DIV */
  currentPortalInteropDiv: HTMLDivElement;
  /**
   * A callback that instructs the uiview portal what to render.
   * This function will be called whenever the uiview portal should change its contents, e.g., after a Transition.
   */
  renderContentIntoUIViewPortal(portalContent: 'DEFAULT_CONTENT'): void;
  renderContentIntoUIViewPortal(portalContent: 'ROUTED_COMPONENT', config?: ViewConfig): void;
  renderContentIntoUIViewPortal(portalContent: 'INTEROP_DIV', giveDiv: (divElement: HTMLDivElement) => void);
}

export declare type PortalContentType = 'DEFAULT_CONTENT' | 'ROUTED_COMPONENT' | 'INTEROP_DIV';
export declare type RenderContentCallback = RegisteredUIViewPortal['renderContentIntoUIViewPortal'];

/** @internalapi */
export interface ActiveUIView {
  /** type of framework, e.g., "ng1" or "ng2" */
  $type: string;
  /** An auto-incremented id */
  id: number | string;
  /** The ui-view short name */
  name: string;
  /** The ui-view's fully qualified name */
  fqn: string;
  /** The ViewConfig that is currently loaded into the ui-view */
  config: ViewConfig;
  /** The state context in which the ui-view tag was created. */
  creationContext: ViewContext;
  /** A callback that should apply a ViewConfig (or clear the ui-view, if config is undefined) */
  configUpdated: RenderContentCallback;
}

/**
 * This interface represents a [[_ViewDeclaration]] that is bound to a [[PathNode]].
 *
 * A `ViewConfig` is the runtime definition of a single view.
 *
 * During a transition, `ViewConfig`s are created for each [[_ViewDeclaration]] defined on each "entering" [[StateObject]].
 * Then, the [[ViewService]] finds any matching `ui-view`(s) in the DOM, and supplies the ui-view
 * with the `ViewConfig`.  The `ui-view` then loads itself using the information found in the `ViewConfig`.
 *
 * A `ViewConfig` if matched with a `ui-view` by finding all `ui-view`s which were created in the
 * context named by the `uiViewContextAnchor`, and finding the `ui-view` or child `ui-view` that matches
 * the `uiViewName` address.
 */
export interface ViewConfig {
  /* The unique id for the ViewConfig instance */
  $id: number;
  /** The normalized view declaration from [[State.views]] */
  viewDecl: _ViewDeclaration;

  /** The node the ViewConfig is bound to */
  path: PathNode[];

  loaded: boolean;

  /** Fetches templates, runs dynamic (controller|template)Provider code, lazy loads Components, etc */
  load(): Promise<ViewConfig>;
}

export interface ViewPlugin extends UIRouterPlugin {
  type: 'view';
  renderUIViewIntoDivElement(router: UIRouter, viewConfig: ViewConfig);
}
