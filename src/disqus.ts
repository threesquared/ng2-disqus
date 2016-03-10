import { Component, Input } from 'angular2/core';
import { Location } from 'angular2/router';
import { BrowserDomAdapter } from 'angular2/platform/browser';

@Component({
  selector: 'disqus',
  template: '<div id="disqus_thread"></div>',
  properties: ['identifier', 'shortname'],
  providers: [BrowserDomAdapter]
})

export class Disqus {

  constructor(private _location: Location, private _dom: BrowserDomAdapter) {
  }

  /**
   * The unique identifier for the page
   */
  @Input() public identifier: string;

  /**
   * Your Disqus shortname
   */
  @Input() public shortname: string;

  /**
   * Component on init
   */
  ngOnInit() {
    if ((<any>window).DISQUS === undefined) {
      this._addScriptTag();
    } else {
      this._reset();
    }
  }

  /**
   * Reset Disqus with new information.
   */
  _reset() {
    (<any>window).DISQUS.reset({
      reload: true,
      config: this._getConfig()
    });
  }

  /**
   * Add the Disqus script to the document.
   */
  _addScriptTag() {
    (<any>window).disqus_config = this._getConfig();
    let container = this._getScriptContainer(),
    scriptSrc = '//' + this.shortname + '.disqus.com/embed.js';
    this._dom.appendChild(container, this._buildScriptTag(scriptSrc));
  }

  /**
   * Get Disqus config
   */
  _getConfig() {
    let _self = this;
    return function () {
      this.page.url = _self._location.path();
      this.page.identifier = _self.identifier;
      this.language = 'en';
    }
  }

  /**
   * Get the HEAD element
   * @return {HTMLHeadElement}
   */
  _getScriptContainer(): HTMLHeadElement {
    return this._dom.query('head');
  }

  /**
   * Build the Disqus script element.
   * @param  {string} src
   * @return {HTMLScriptElement}
   */
  _buildScriptTag(src: string): HTMLScriptElement {
    let script = this._dom.createScriptTag('src', src);
    script.async = true;
    script.type = 'text/javascript';
    script.setAttribute('data-timestamp', new Date().getTime().toString());
    return script;
  }
}
