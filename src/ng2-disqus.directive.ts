import { Injectable, Component, Input, OnInit, Inject, Provider } from '@angular/core';
import { Location } from '@angular/common';
import { __platform_browser_private__ as _, DOCUMENT } from '@angular/platform-browser';
import { Window, DisqusWindow } from './window';

@Component({
  selector: 'disqus',
  template: '<div id="disqus_thread"></div>',
})

@Injectable()
export class Disqus implements OnInit {

  /**
   * The unique identifier for the page
   */
  @Input()
  public identifier: string;

  /**
   * Your Disqus shortname
   */
  @Input()
  public shortname: string;

  /**
   * Create new Disqus script
   * @param {Document}     document
   * @param {DisqusWindow} window
   * @param {Location}     location
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(Window) private window: DisqusWindow,
    private location: Location
  ) {}

  /**
   * Component on init
   */
  ngOnInit() {
    if (this.window.DISQUS === undefined) {
      this.addScriptTag();
    } else {
      this.reset();
    }
  }

  /**
   * Reset Disqus with new information.
   */
  private reset() {
    this.window.DISQUS.reset({
      reload: true,
      config: this.getConfig()
    });
  }

  /**
   * Add the Disqus script to the document.
   */
  private addScriptTag() {
    this.window.disqus_config = this.getConfig();
    let container = this.getScriptContainer();
    let script = this.buildScriptTag(`//${this.shortname}.disqus.com/embed.js`);
    _.getDOM().insertBefore(container.lastChild, script);
  }

  /**
   * Get Disqus config
   * @return {Function}
   */
  public getConfig(): () => void {
    let _self = this;
    return function () {
      this.page.url = _self.location.path();
      this.page.identifier = _self.identifier;
      this.language = 'en';
    };
  }

  /**
   * Get the HEAD element
   * @return {HTMLHeadElement}
   */
  private getScriptContainer(): HTMLHeadElement {
    return this.document.head;
  }

  /**
   * Build the Disqus script element.
   * @param  {string} src
   * @return {HTMLElement}
   */
  private buildScriptTag(src: string): HTMLElement {
    let script = _.getDOM().createElement('script');
    _.getDOM().setAttribute(script, 'src', src);
    _.getDOM().setAttribute(script, 'async', 'true');
    _.getDOM().setAttribute(script, 'type', 'text/javascript');
    _.getDOM().setAttribute(script, 'data-timestamp', new Date().getTime().toString());
    return script;
  }
}
