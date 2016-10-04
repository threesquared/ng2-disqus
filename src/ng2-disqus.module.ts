import { NgModule } from '@angular/core';

import { Disqus } from './ng2-disqus.directive';
import { WindowProviders } from './window';

@NgModule({
    declarations: [Disqus],
    exports: [Disqus],
    providers: WindowProviders
})
export class Ng2DisqusModule {
}
