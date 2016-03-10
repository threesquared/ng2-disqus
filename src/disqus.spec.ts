import {
  describe,
  expect,
  it,
  inject,
  injectAsync,
  TestComponentBuilder,
  ComponentFixture,
  setBaseTestProviders,
  beforeEachProviders,
} from 'angular2/testing';

import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS } from 'angular2/platform/testing/browser';
import { SpyLocation } from 'angular2/src/mock/location_mock';
import { provide } from 'angular2/core';
import { Location } from 'angular2/router';
import { BrowserDomAdapter } from 'angular2/platform/browser';
import { Disqus } from './disqus';

setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

beforeEachProviders(() => [
  Disqus,
  provide(Location, {useClass: SpyLocation}),
  BrowserDomAdapter
]);

describe('Disqus Component', () => {

  it('should render the disqus thread element', injectAsync([TestComponentBuilder], (_testComponentBuilder: TestComponentBuilder) => {
    return _testComponentBuilder.createAsync(Disqus).then((_componentFixture: ComponentFixture) => {
      const element = _componentFixture.nativeElement;
      _componentFixture.detectChanges();

      expect(element.querySelectorAll('#disqus_thread').length).toBe(1);
    });
  }));

  it('should have correct config variables', inject([Disqus, Location], (disqus: Disqus, _location: Location) => {
    (<any>_location).setInitialPath('http://test.com');
    disqus.identifier = 'identifier';
    disqus.ngOnInit();

    let config = disqus._getConfig();
    let configObj = {
      page: {
        identifier: <string> null,
        url: <string> null
      },
      language: <string> null
    };
    config.call(configObj)

    expect(configObj.language).toBe('en');
    expect(configObj.page.identifier).toBe('identifier');
    expect(configObj.page.url).toBe('http://test.com');

  }));

  it('should add embed.js to the document if it is not present', inject([Disqus], (disqus: Disqus) => {
    disqus.shortname = 'shortname';
    disqus.ngOnInit();

    expect(document.querySelector('script[src="//shortname.disqus.com/embed.js"]')).not.toBe(null);
  }));

  it('should call reset if script already loaded', inject([Disqus], (disqus: Disqus) => {
    (<any>window).DISQUS = {
      reset: () => {}
    };
    spyOn((<any>window).DISQUS, 'reset');

    disqus.shortname = 'shortname';
    disqus.identifier = 'identifier';
    disqus.ngOnInit();

    expect((<any>window).DISQUS.reset).toHaveBeenCalledWith({
      reload: true,
      config: jasmine.any(Function)
    });
  }));

});
