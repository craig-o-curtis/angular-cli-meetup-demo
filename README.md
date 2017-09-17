# Angular-CLI Meetup Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2.

The following are the steps according to commit how the app was created.

## Commit Step-01-HMR

1. (Un)Install Angular-CLI

  // command line
  ```bash
  npm uninstall -g @angular/cli
  npm install -g @angular/cli@latest
  ng -v
  ```

2. Generate project

  // command line
  ```bash
  ng new myapp --routing --style scss --prefix craigc --dry-run
  ng new myapp --routing --style scss --prefix craigc -d
  cd myapp
  ```

3. Confirm styles and prefix

  // .angular-cli.json
  ```json
  ...
  "styles": [
    "styles.scss"
  ],
  ...
  "defaults": {
    "styleExt": "scss"
    ...
  }
  ```

  // app.component.ts
  ```ts
  ...
  @Component({
    selector: 'craigc-root', // confirm selector
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'] // confirm scss
  })
  export class AppComponent {
    title = 'craigc'; // confirm title
  }
  ```

  // index.html
  ```html
  ...
  <body>
    <craigc-root></craigc-root>
  </body>
  ```

4. Add environments/environment.hmr.ts

  // command line
  ```bash
  touch environments/environment.hmr.ts
  ```

  // environment.hmr.ts
  ```ts
  export const environment = {
    production: false,
    hmr: true
  }
  ```

  // environment.prod.ts
  ```ts
  export const environment = {
    production: true,
    hmr: false
  }
  ```

  // environment.ts
  ```ts
  export const environment = {
    production: false,
    hmr: false
  }
  ```

5. Update .angular-cli.json with new enviroments

  // .angular-cli.json
  ```json
  ...
    "environmentSource": "environments/environment.ts",
    "environments": {
      "dev": "environments/environment.ts",
      "hmr": "environments/environment.hmr.ts",
      "prod": "environments/environment.prod.ts"
    }
  ```

6. Add new npm run hmr script in package.json

  // package.json
  ```json
  ...
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "hmr": "ng serve --hmr -e=hmr",
    ...
  ```

  // command line
  ```bash
  npm run hmr // check localhost:4200
  ```

  // styles.scss
  ```scss
  * {
    background: lime;
  }
  ```

## Commit Step-02-Assets

1. Move favicon to assets folder

2. Add .angular-cli.json glob pattern

  // .angular-cli.json
  ```json
  ...
  "assets": [
    { "glob": "**/*", "input": "./assets/", "output": "./assets/" },
    { "glob": "favicon.ico", "input": "./assets/", "output": "./" }
  ],
  ```

## Commit Step-03-Mod-Cmp

1. Generate a main module

  // command line
  ```bash
  ng g m main --dry-run
  OR
  ng g main -d
  ng g m main -m app.module --routing
  ```

2. Generate Component

Note - Current bug - default generates css file, need to specify with style flag. Opened up [Github Issue #7715](https://github.com/angular/angular-cli/issues/7715).

  // command line
  ```bash
  ng g c main -d // confirm generated to correct path
  ng g c main -m main --export --style=scss -ve=Emulated
  ```

## Commit Step-04-Child-Routes

1. Generate home and blog modules and components

  // command line
  ```bash
  ng g m home -d
  ng g m home -m main
  ng g c home --style=scss -ve=Emulated
  ng g m blog -d
  ng g m blog -m main
  ng g c blog --style=scss -ve=Emulated
  ```

2. Setup default routing in main-routing.module

  // main-routing.module.ts
  ```ts
  ...
  const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'main' },
  ];
  ```

3. Add only <router-outlet> tags to main.component.html and app.component.html

  // main.component.html
  ```html
  <router-outlet></router-outlet>
  ```

  // app.component.html
  ```html
  <router-outlet></router-outlet>
  ```

4. Add child routes to main-routing.module.ts

  // main-routing.module.ts
  ```ts
  ...
  const routes: Routes = [
    { path: '', component: MainComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'blog', component: BlogComponent } ] },
    { path: '**', redirectTo: 'home'}
  ];
  ```

## Commit Step-05-Topnav

1. Generate a topnav module and component into main

  // command line
  ```bash
  ng g m main/topnav -d
  ng g m main/topnav -m main
  ng g c main/topnav -d
  ng g c main/topnav --export --style=scss -ve=Emulated
  ```

2. Add RouterModule to topnav.module.ts

  // main/topnave.module.ts
  ```ts
  ...
  import { RouterModule } from '@angular/router';
  ...
  imports: [
    CommonModule,
    RouterModule
  ],
  ```

3. Add [routerLink] to main/topnav.component.html

  // main/topnav.component.html
  ```html
  <a [routerLink]="['/']">HOME</a>
  <br />
  <a [routerLink]="['/blog']">BLOG</a>
  ```

4. Add <craigc-topnav> tag to main.component.html

  // main.component.html
  ```html
  <craigc-topnav></craigc-topnav>
  ```

5. Confirm working in browser


## Commit Step-06-Github-Service

1. Guickly generate a dashboard module and component

  // command line
  ```bash
  ng g m dashboard -d
  ng g m dashboard -m main
  ng g c dashboard -d
  ng g c dashboard --style=scss -ve=Emulated
  ```

2. Quick hookup as another child route

  // main-routing.module.ts
  ```ts
  ...
  // add next route
  { path: 'dashboard', component: DashboardComponent },
  ```

  // add routerLink in topnav.component.html
  ```html
  ...
  <a [routerLink]="['/dashboard']">DASHBOARD</a>
  ```

3. Quick generate interal dashboard/repos modue and component

  // command line
  ```bash
  ng g m dashboard/repos -d // CAREFUL - module not included...
  ng g m dashboard/repos -m dashboard
  ng g c dashboard/repos -d
  ng g c dashboard/repos --export --style=scss -ve=Emulated
  ```

4. Generate a repos service

  // command line
  ```bash
  ng g s dashboard/repos -d
  ng g s dashboard/repos -m repos
  ```

5. Add HttpClientModule to repos.module.ts

  // repos.module.ts
  ```ts
  ...
  // import { HttpClientModule } from '@angular/common/http/src/module'; // previous import
  import { HttpClientModule } from '@angular/common/http';
  ...
  imports: [
    ...
    'HttpClientModule'
  ]

  ```

6. Build the Repos Service

  // repos.service.ts
  ```ts
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/observable/throw';
  import 'rxjs/add/operator/do';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/catch';

  @Injectable()
  export class ReposService {
    private _repourl = 'https://api.github.com/users/craig-o-curtis/repos';

    constructor(private _http: HttpClient) { }

    getRepos(): Observable<any[]> {
      return this._http.get<any[]>(this._repourl)
        .map( (res) => res)
        .catch( this._handleError);
    }

    private _handleError(err: HttpErrorResponse) {
      return Observable.throw(err);
    }
  }
  ```

7. Add ReposService to repos.component.ts

  // repos.component.ts
  ```ts
  ...
  import { ReposService } from './repos.service';
  ...
  export class ReposComponent implements OnInit {
    repos: any[] = [];
    errorMessage: string;

    constructor(private _repoService: ReposService) { }

    ngOnInit() {
      this._repoService.getRepos()
      .subscribe( repos => { 
        this.repos = repos.sort( (repo, nextRepo) => ( repo.name > nextRepo.name) ? 1 : -1 );
      }, error => { this.errorMessage = <any>error.message;});
    }
    ...
  ```

8. Add markup to repos.component.html

  // repos.component.html
  ```html
  <div *ngFor="let repo of repos">
	  {{ repo | json }}
  </div>
  ```

9. Add <craigc-repos> tag to dashboard.component.hmtl

  // dashboard.component.html
  ```html
  <craigc-repos></craigc-repos>
  ```

## Commit Step-07-Angular-Material

1. Install Angular Material

  // command line
  ```bash
  npm install --save @angular/material@latest
  npm install --save @angular/cdk@latest
  npm install --save material-design-icons
  ng -v // check version (4.4.1)
  npm install --save @angular/animations@4.4.1
  ```
2. Generate a SharedModule to house MaterialModule

  // command line
  ```bash
  ng g m shared -d
  ng g m shared -m app
  ```

3. Manually add BroswerAnimationsModule, export this and MaterialModule

  // shared.module.ts
  ```ts
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { MaterialModule } from '@angular/material';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

  @NgModule({
    imports: [
      CommonModule,
      MaterialModule,
      BrowserAnimationsModule
    ],
    exports: [
      MaterialModule,
      BrowserAnimationsModule
    ],
    declarations: []
  })
  export class SharedModule { }
  ```

4. Import SharedModule into topnav.module.ts, main.module.ts, home.module.ts, blog.module.ts, dashboard.module.ts
  
  // topnav.module.ts, main.module.ts, home.module.ts, blog.module.ts, dashboard.module.ts
  ```ts
  import { SharedModule } from '../../shared/shared.module';
  ...
  imports: [
   	...
   	SharedModule,
	],
  ```

5. Import icons and theme in styles.scss

  // styles.scss
  ```scss
  @import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
	@import '~material-design-icons/iconfont/material-icons.css';
  ```

6. Change topnav markup

  // topnav.component.html
  ```html
  <md-toolbar color="primary">
    <button md-raised-button color="primary" [routerLink]="['/']">Home<md-icon>home</md-icon></button>
    <button md-raised-button color="primary" [routerLink]="['/blog']">Blog<md-icon>list</md-icon></button>
    <button md-raised-button color="primary" [routerLink]="['/dashboard']">Dashboard<md-icon>dashboard</md-icon></button>
  </md-toolbar>
  ```

## Commit Step-08-HammerJS-Support

1. Install hammerjs

  // command line
  ```bash
  npm install --save hammerjs
  ```

2. Setup HammerJS configuration in shared.module.ts

  // shared.module.ts
  ```ts
  ...
  import 'hammerjs';
  import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

  export class MyHammerConfig extends HammerGestureConfig  {
		overrides = <any>{
			'swipe': {velocity: 0.4, threshold: 20}
		};
	}
  ...
    providers: [
      {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: MyHammerConfig
      }
    ],
  ```

3. Refactor main.component.html to have md-sidenav-container

  // main.component.html
  ```html
  <md-sidenav-container>
    <md-sidenav #sidenav
      (swipeleft)="sidenav.close()">
      Sidenav
    </md-sidenav>

    <craigc-topnav></craigc-topnav>
    <router-outlet></router-outlet>
  </md-sidenav-container>
  ```

4. Use ViewChild API inside main.component.ts

  // main.component.ts
  ```ts
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MdSidenav } from '@angular/material';
  ...
  export class MainComponent implements OnInit {
    @ViewChild('sidenav') sidenav: MdSidenav;
    
    constructor() { }
    ngOnInit() { }
    
    toggleSidenav($event): void {
      this.sidenav.opened ? this.sidenav.close() : this.sidenav.open();
    }
  }
  ```

  5. Upudate main.component.html for event litener
  
  // main.component.html
  ```html
  ...
    <craigc-topnav (menuClicked)="toggleSidenav($event)"></craigc-topnav>
  ```

6. Update topnav to have menu button

  // topnav.component.html
  ```html
  ...
    <button md-fab
      color="primary"
      (click)="toggleNav()">
      <md-icon>menu</md-icon>
    </button>
  ```

7. Create Output and Event Emitter inside topnav.component.ts

  // topnav.component.ts
  ```ts
  import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

  @Component({
    selector: 'craigc-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
  })
  export class TopnavComponent implements OnInit {
    @Output() menuClicked: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }
    ngOnInit() { }

    onMenuClick(): void {
      this.menuClicked.emit('clicked');
    }
    toggleNav(): void {
      this.onMenuClick();
    }
  }
  ```

8. Styles Cleanup

  // styles.scss
  ```scss
  body { 
    margin: 0 
  }
	md-sidenav-container {
		min-height: 100vh;
	}
  ```

9. Test swiping left action
// should close sidebar


## Commit Step-09-@angular/flex-layout

1. Install @angular/flex-layout

  // command line
  ```bash
  npm install --save @angular/flex-layout@latest
  ```

2. Import/Export into SharedModule

  // shared.module.ts
  ```ts
  ...
  import { FlexLayoutModule } from '@angular/flex-layout';
  ...
  imports: [
    ...
    FlexLayoutModule
  ],
  exports: [
    ...
    FlexLayoutModule
  ],
  ```

3. Refactor topnav.component.html

  // topnav.component.html
  ```html
  <md-toolbar color="primary">
    <div fxFill fxLayout="row" fxLayoutAlign="space-between center">
      <button md-fab
        color="primary"
        (click)="toggleNav()">
        <md-icon>menu</md-icon>
      </button>

      <div>
        <button md-raised-button color="primary" [routerLink]="['/']">Home<md-icon>home</md-icon></button>
        <button md-raised-button color="primary" [routerLink]="['/blog']">Blog<md-icon>list</md-icon></button>
        <button md-raised-button color="primary" [routerLink]="['/dashboard']">Dashboard<md-icon>dashboard</md-icon></button>
      </div>
    </div>
  </md-toolbar>
  ```

4. Refactor home.component.html to use Flex-Layout Responsive API

  // home.component.html
  ```html
  <div fxLayout="column"
    fxLayout.gt-xs="row"
    fxLayoutAlign="space-around stretch"
    fxLayoutAlign.gt-xs="space-around center"
    fxLayoutWrap
    class="container">
    <!-- <div *ngFor="let box of boxes" fxFlex="30" class="box">1</div> -->

    <md-card *ngFor="let box of boxes;trackBy:id" fxFlex="30" class="example-card">
      <md-card-header>
        <div md-card-avatar class="example-header-image"></div>
        <md-card-title>Shiba Inu</md-card-title>
        <md-card-subtitle>Dog Breed</md-card-subtitle>
      </md-card-header>
      <img md-card-image [src]="'http://lorempixel.com/400/200/city/' + box.id" alt="Photo of a Shiba Inu">
      <md-card-content>
        <p>
          {{ box.id}}---
          The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
          A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
          bred for hunting.
        </p>
      </md-card-content>
      <md-card-actions fxLayout="row" fxLayoutAlign="space-around center">
        <button md-raised-button color="warn">LIKE</button>
        <button md-raised-button color="accent">SHARE</button>
      </md-card-actions>
    </md-card>
  </div>
  ```

## Commit Step-10-Basscss

1. Install Basscss modules

  // console
  ```bash
  npm install --save basscss-padding basscss-margin basscss-position basscss-utility-typography basscss-background-images
  ```

2. Add to .angular-cli styles array
  // WARNING - don't trust intellisense path here, must use ../..

  // .angular-cli.json
  ```json
  "styles": [
    "styles.scss",
    "../node_modules/basscss-background-images/index.css",
    "../node_modules/basscss-margin/index.css",
    "../node_modules/basscss-padding/index.css",
    "../node_modules/basscss-position/index.css",
    "../node_modules/basscss-utility-typography/index.css"
  ],
  ```

3. Test Utility Classes - Margin utility classes

  // home.component.html
  ```html
  ...
  <md-card *ngFor="let box of boxes;trackBy:id" fxFlex="30"
    class="example-card my2 mx1"
    class.gt-xs="my3 mx0
  ```
