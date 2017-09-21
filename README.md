# Angular-CLI Meetup Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2.

The following are the steps according to commit how this app was created.
This demo app uses Angular Material, HammerJS, Angular Flex-layout, Basscss, and ngx-toastrs.

## Commit Step-01-HMR

### 1. (Un)Install Angular-CLI

**command line**
  ```bash
  npm uninstall -g @angular/cli
  npm install -g @angular/cli@latest
  npm list @angular/cli  --depth=0
  ng -v
  ```

### 2. Generate project

  **command line**
  ```bash
  ng new myapp --routing --style scss --prefix craigc --dry-run
  ng new myapp --routing --style scss --prefix craigc -d
  ng new myapp --routing --style scss --prefix craigc
  cd myapp && code .
  ```

### 3. Confirm styles and prefix

  **Check .angular-cli.json**
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

  **Check app.component.ts**
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

  **Check index.html**
  ```html
  ...
  <body>
    <craigc-root></craigc-root>
  </body>
  ```

### 4. Add `environments/environment.hmr.ts`

  **command line**
  ```bash
  touch src/environments/environment.hmr.ts
  ```

  **Add environment.hmr.ts**
  ```ts
  export const environment = {
    production: false,
    hmr: true
  }
  ```

  **Update environment.prod.ts**
  ```ts
  export const environment = {
    production: true,
    hmr: false
  }
  ```

  **Update Uenvironment.ts**
  ```ts
  export const environment = {
    production: false,
    hmr: false
  }
  ```

### 5. Update `.angular-cli.json` with new enviroments

  **Update .angular-cli.json**
  ```json
  ...
    "environmentSource": "environments/environment.ts",
    "environments": {
      "dev": "environments/environment.ts",
      "hmr": "environments/environment.hmr.ts",
      "prod": "environments/environment.prod.ts"
    }
  ```

### 6. Add new `npm run hmr` script in `package.json`

  **Update package.json**
  ```json
  ...
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "hmr": "ng serve --hmr -e=hmr",
    ...
  ```

  **command line**
  ```bash
  npm run hmr // check localhost:4200
  ```

  **Add to styles.scss**
  ```scss
  * {
    background: lime;
  }
  ```

## Commit Step-02-Assets

### 1. Move `favicon.ico` to `assets` folder

### 2. Add .angular-cli.json glob pattern

  **Update .angular-cli.json**
  ```json
  ...
  "assets": [
    { "glob": "**/*", "input": "./assets/", "output": "./assets/" },
    { "glob": "favicon.ico", "input": "./assets/", "output": "./" }
  ],
  ```

## Commit Step-03-Mod-Cmp

### 1. Generate a main module

  **command line**
  ```bash
  ng g m main --dry-run
  OR
  ng g main -d
  ng g m main -m app.module --routing
  ```

### 2. Generate Component

Note - Current bug - default generates css file, need to specify with style flag. Opened up [Github Issue #7715](https://github.com/angular/angular-cli/issues/7715).

  **command line**
  ```bash
  ng g c main -d // confirm generated to correct path
  ng g c main -m main --style=scss -ve=Emulated
  ```

## Commit Step-04-Child-Routes

### 1. Generate home and blog modules and components

  **command line**
  ```bash
  ng g m home -d
  ng g m home -m main
  ng g c home --style=scss -ve=Emulated
  ng g m blog -d
  ng g m blog -m main
  ng g c blog --style=scss -ve=Emulated
  ```

### 2. Setup default routing in `app-routing.module`

  **Update app-routing.module.ts**
  ```ts
  ...
  const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'main' },
  ];
  ```

### 3. Add only `<router-outlet>` tags to `main.component.html` and app.component.html

  **Replace main.component.html with:**
  ```html
  <router-outlet></router-outlet>
  ```

  **Replace app.component.html with:**
  ```html
  <router-outlet></router-outlet>
  ```

### 4. Add child routes to `main-routing.module.ts`

  **Update main-routing.module.ts**
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

### 1. Generate a topnav module and component into main

  **command line**
  ```bash
  ng g m main/topnav -d
  ng g m main/topnav -m main
  ng g c main/topnav -d
  ng g c main/topnav --export --style=scss -ve=Emulated
  ```

### 2. Add `RouterModule` to `topnav.module.ts`

  **Update main/topnav.module.ts**
  ```ts
  ...
  import { RouterModule } from '@angular/router';
  ...
  imports: [
    CommonModule,
    RouterModule
  ],
  ```

### 3. Add `[routerLink]` to `main/topnav.component.html`

  **Add to main/topnav.component.html**
  ```html
  <a [routerLink]="['/']">HOME</a>
  <br />
  <a [routerLink]="['/blog']">BLOG</a>
  ```

### 4. Add `<craigc-topnav>` tag to `main.component.html`

  **Update main.component.html**
  ```html
  <craigc-topnav></craigc-topnav>

  <router-outlet></router-outlet>
  ```

### 5. Confirm working in browser


## Commit Step-06-Github-Service

### 1. Guickly generate a dashboard module and component

  **command line**
  ```bash
  ng g m dashboard -d
  ng g m dashboard -m main
  ng g c dashboard -d
  ng g c dashboard --style=scss -ve=Emulated
  ```

### 2. Quick hookup as another child route

  **Update main-routing.module.ts**
  ```ts
  ...
  // add next route
  { path: 'dashboard', component: DashboardComponent },
  ```

  **Update new routerLink in topnav.component.html**
  ```html
  ...
  <br />
  <a [routerLink]="['/dashboard']">DASHBOARD</a>
  ```

### 3. Quick generate interal dashboard/repos module and component

  **command line**
  ```bash
  ng g m dashboard/repos -d // CAREFUL - module not included...
  ng g m dashboard/repos -m dashboard
  ng g c dashboard/repos -d
  ng g c dashboard/repos --export --style=scss -ve=Emulated
  ```

### 4. Generate a repos service

  **command line**
  ```bash
  ng g s dashboard/repos/repos -d
  ng g s dashboard/repos/repos -m repos
  ```

### 5. Add `HttpClientModule` to `repos.module.ts`

  **Update repos.module.ts**
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

### 6. Build the Repos Service

  **Add to repos.service.ts:**
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

### 7. Add `ReposService` to `repos.component.ts`

  **Update repos.component.ts**
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

### 8. Add markup to `repos.component.html`

  **Add to repos.component.html**
  ```html
  <div *ngFor="let repo of repos">
	  {{ repo | json }}
  </div>
  ```

### 9. Add `<craigc-repos>` tag to `dashboard.component.hmtl`

  **Add to dashboard.component.html**
  ```html
  <craigc-repos></craigc-repos>
  ```

## Commit Step-07-Angular-Material

### 1. Install `Angular Material`

  **command line**
  ```bash
  npm install --save @angular/material@latest @angular/cdk@latest material-design-icons
  ng -v // check version (4.4.3 is latest version tested with these steps)
  npm install --save @angular/animations@4.4.3
  ```

### 2. Generate a `SharedModule` to house `MaterialModule`

  **command line**
  ```bash
  ng g m shared -d
  ng g m shared -m app
  ```

### 3. Manually add `BroswerAnimationsModule`, export this and `MaterialModule`

  **Add to shared.module.ts**
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

### 4. Import `SharedModule` into `main.module.ts`, `topnav.module.ts`, `main.module.ts`, `home.module.ts`, `blog.module.ts`, `dashboard.module.ts`, `repos.module.ts`
  
  **Update main.module.ts, topnav.module.ts, main.module.ts, home.module.ts, blog.module.ts, dashboard.module.ts, repos.module.ts**
  ```ts
  import { SharedModule } from '../../shared/shared.module';
  ...
  imports: [
   	...
   	SharedModule,
	],
  ```

### 5. Import icons and theme in `styles.scss`

  **Add to styles.scss**
  ```scss
  @import '~@angular/material/prebuilt-themes/deeppurple-amber.css';

	@import '~material-design-icons/iconfont/material-icons.css';
  ```

### 6. Change topnav markup

  **Replace topnav.component.html with:**
  ```html
  <md-toolbar color="primary">
    <button md-raised-button color="primary" [routerLink]="['/']">Home<md-icon>home</md-icon></button>
    <button md-raised-button color="primary" [routerLink]="['/blog']">Blog<md-icon>list</md-icon></button>
    <button md-raised-button color="primary" [routerLink]="['/dashboard']">Dashboard<md-icon>dashboard</md-icon></button>
  </md-toolbar>
  ```

## Commit Step-08-HammerJS-Support

### 1. Install `hammerjs`

  **command line**
  ```bash
  npm install --save hammerjs
  ```

### 2. Setup `hammerjs` configuration in `shared.module.ts`

  **Replace shared.module.ts with**
  ```ts
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { MaterialModule } from '@angular/material';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import 'hammerjs';
  import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

  export class MyHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20}
    };
  }

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
    providers: [
      {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: MyHammerConfig
      }
    ],
    declarations: []
  })
  export class SharedModule { }
  ```

### 3. Refactor `main.component.html` to have a `<md-sidenav-container>`

  **Replace main.component.html with:**
  ```html
  <md-sidenav-container>
    <md-sidenav #sidenav
      (swipeleft)="sidenav.close()">
      SidenavSidenavSidenavSidenavSidenav
    </md-sidenav>

    <craigc-topnav></craigc-topnav>
    <router-outlet></router-outlet>
  </md-sidenav-container>
  ```

### 4. Use `ViewChild` API inside `main.component.ts`

  **Replace main.component.ts with:**
  ```ts
  import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
  import { MdSidenav } from '@angular/material';

  @Component({
    selector: 'craigc-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
  })
  export class MainComponent implements OnInit {
    @ViewChild('sidenav') sidenav: MdSidenav;

    constructor() { }
    ngOnInit() { }

    toggleSidenav($event): void {
      this.sidenav.opened ? this.sidenav.close() : this.sidenav.open();
    }
  }
  ```

  ### 5. Update `main.component.html` for event listener
  
  **Update main.component.html**
  ```html
  ...
    <craigc-topnav (menuClicked)="toggleSidenav($event)"></craigc-topnav>
  ```

### 6. Update topnav to have menu button

  **Replace topnav.component.html with:**
  ```html
  <md-toolbar color="primary">
    <button md-fab color="primary" (click)="toggleNav()">
      <md-icon>menu</md-icon>
    </button>

    <button md-raised-button color="primary" [routerLink]="['/']">Home<md-icon>home</md-icon></button>
    <button md-raised-button color="primary" [routerLink]="['/blog']">Blog<md-icon>list</md-icon></button>
    <button md-raised-button color="primary" [routerLink]="['/dashboard']">Dashboard<md-icon>dashboard</md-icon></button>
  </md-toolbar>
  ```

### 7. Create `Output` and `Event Emitter` inside `topnav.component.ts`

  **Replace topnav.component.ts with:**
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

### 8. Styles Cleanup

  **Replace styles.scss with:**
  ```scss
  @import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
  @import '~material-design-icons/iconfont/material-icons.css';

  body { 
    margin: 0;
  }

  md-sidenav-container {
    min-height: 100vh;
  }
  ```

### 9. Test swiping left action
// should close sidebar


## Commit Step-09-@angular/flex-layout

### 1. Install `@angular/flex-layout`

  **command line**
  ```bash
  npm install --save @angular/flex-layout@latest
  ```

### 2. Import/Export into `SharedModule`

  **Update shared.module.ts**
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

### 3. Refactor `topnav.component.ts` and `topnav.component.html`

  **Update home.component.ts**
  ```ts
  ...
  export class HomeComponent implements OnInit {
    boxes = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}];
    ...
  ```

  **Replace topnav.component.html with:**
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

### 4. Refactor `home.component.html` to use `@angular/flex-Layout` responsive API

  **Replace home.component.html with:**
  ```html
  <div fxLayout="column"
    fxLayout.gt-xs="row"
    fxLayoutAlign="space-around stretch"
    fxLayoutAlign.gt-xs="space-around center"
    fxLayoutWrap
    class="container">

    <md-card *ngFor="let box of boxes;trackBy:id" fxFlex="30">
      <md-card-header>
        <div md-card-avatar></div>
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

### 1. Install `Basscss` modules

  **command line**
  ```bash
  npm install --save basscss-padding basscss-margin basscss-position basscss-utility-typography basscss-background-images
  ```

### 2. Add to .angular-cli styles array
  // WARNING - don't trust intellisense path here, must use ../..

  **Update .angular-cli.json**
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

### 3. Test Utility Classes - Margin utility classes

  **Update home.component.html**
  ```html
  ...
  <md-card *ngFor="let box of boxes;trackBy:id" fxFlex="30"
    class="my2 mx1"
    class.gt-xs="my3 mx0">
  ```

  **Restart server**
  ```bash
  [Ctrl] + C
  npn run hmr
  ```

## Commit Step-11-Snazz-up-Repos

### 1. Refactor Repos

  **Replace repos.component.html with:**
  ```html
  <div *ngIf="repos && repos.length">

    <div fxLayout="column" fxLayoutAlign="center center">
      <h3>Total Repos: {{repos.length }}</h3>

      <md-expansion-panel color="primary">
          <md-expansion-panel-header>
            <md-panel-title>
              About this Author
            </md-panel-title>
          </md-expansion-panel-header>
          <div fxLayout="column" fxLayoutAlign="center stretch">
            <div fxLayout="row" fxLayoutAlign="space-between stretch">
              <h1>{{ repos[0].owner.login }}</h1>
              <a [href]="repos[0].html_url" target="_blank" md-fab color="accent">
                <md-icon>link</md-icon>
              </a>
            </div>

            <img fxFlex="25" class="" [src]="repos[0].owner.avatar_url" [alt]="" />
          </div>
        </md-expansion-panel>
    </div>

    <div>
      <md-tab-group>
        <md-tab label="{{ repo.name }}" *ngFor="let repo of repos">
          <div class="p2">
            <h1>{{ repo.name }}</h1>
            <h3>Created at: {{ repo.created_at | date }}</h3>
            <p>Description: {{ repo.description }}</p>
            <a md-button [href]="repo.html_url" target="_blank">
              <md-icon>link</md-icon>
            </a>
            <a [href]="repo.html_url" target="_blank">{{ repo.html_url }}</a>
            <p *ngIf="repos.language">Language: {{ repos.language }}</p>
          </div>
        </md-tab>
      </md-tab-group>
    </div>

  </div>
  ```


## Commit Step-12-Toastrs

1. Install `ngx-toastr`

  **command line**
  ```bash
  npm install --save ngx-toastr 
  ```

2. Add css path to styles array in `.angular-cli.json`
  **Update .angular-cli.json**
  ```json
  "styles": [
    ...
    "../node_modules/ngx-toastr/toastr.css"
  ],
  ```

3. Add `ToastrModule` to `shared.module.ts`

  **Update shared.module.ts**
  ```ts
  ...
  import { ToastrModule } from 'ngx-toastr';
  ...
    imports: [
      ...
      ToastrModule.forRoot()
    ]
  ```

4. Hook up `ToastrService` to `repos.component.ts`

  **Update repos.component.ts**
  ```ts
  ...
  import { ToastrService } from 'ngx-toastr';
  ...
    constructor(
      private _repoService: ReposService,
      private _toastr: ToastrService
    ) { }

    ngOnInit() {
      this._repoService.getRepos()
      .subscribe( repos => {
        this._toastr.success('Yes', 'You connected to Github!');
        this.repos = repos.sort( (repo, nextRepo) => ( repo.name > nextRepo.name) ? 1 : -1 );
      }, error => {
        this._toastr.error('Sorry', 'You maxed out Github\'s API calls for the hour!');
        this.errorMessage = <any>error.message;
      });
    }
  ```

5. Stop server and rerun `npm run hmr`.
