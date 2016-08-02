/// <reference path="./window.ts" />
import { Injectable, Component, Input, OnInit, Inject, provide } from '@angular/core';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { Window } from './window';

@Component({
  selector: 'disqus',
  template: '<div id="disqus_thread"></div>',
  properties: ['identifier', 'shortname'],
  providers: [provide(Window, {useValue: window})]
})

@Injectable()
export class Disqus implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: any,
    private window: Window,
    private location: Location
  ) {}

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
    getDOM().insertBefore(container.lastChild, script);
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
    let script = getDOM().createElement('script');
    getDOM().setAttribute(script, 'src', src);
    getDOM().setAttribute(script, 'async', 'true');
    getDOM().setAttribute(script, 'type', 'text/javascript');
    getDOM().setAttribute(script, 'data-timestamp', new Date().getTime().toString());
    return script;
  }
}
