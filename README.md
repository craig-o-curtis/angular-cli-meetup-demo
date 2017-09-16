# Angular-CLI Meetup Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2.

The following are the steps according to commit how the app was created.

## Commit Step-01-HMR

1. (Un)Install Angular-CLI

  ```bash
  npm uninstall -g @angular/cli
  npm install -g @angular/cli@latest
  ng -v
  ```

2. Generate project

  ```bash
  ng new myapp --routing --style scss --prefix craigc --dry-run
  ng new myapp --routing --style scss --prefix craigc -d
  cd myapp
  ```

3. Confirm styles and prefix

  ```scss
  // .angular-cli.scss
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

  ```bash
  ng g m main --dry-run
  OR
  ng g main -d
  ng g m main -m app.module --routing
  ```

2. Generate Component

Note - Current bug - default generates css file, need to specify with style flag. Opened up [Github Issue #7715](https://github.com/angular/angular-cli/issues/7715).

  ```bash
  ng g c main -d // confirm generated to correct path
  ng g c main -m main --export --style=scss
  ```

## Commit Step-04-Child-Routes

1. Generate home and blog modules and components

  ```bash
  ng g m home -d
  ng g m home -m main
  ng g c home --style=scss
  ng g m blog -d
  ng g m blog -m main
  ng g c blog --style=scss
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

  ```bash
  ng g m main/topnav -d
  ng g m main/topnav -m main
  ng g c main/topnav -d
  ng g c main/topnav --export --style=scss
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

  ```bash
  ng g m dashboard -d
  ng g m dashboard -m main
  ng g c dashboard -d
  ng g c dashboard --style=scss
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

  ```bash
  ng g m dashboard/repos -d // CAREFUL - module not included...
  ng g m dashboard/repos -m dashboard
  ng g c dashboard/repos -d
  ng g c dashboard/repos --export --style=scss
  ```

4. Generate a repos service

  ```bash
  ng g s dashboard/repos -d
  ng g s dashboard/repos -m repos
  ```

5. Add HttpClientModule to repos.module.ts
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


