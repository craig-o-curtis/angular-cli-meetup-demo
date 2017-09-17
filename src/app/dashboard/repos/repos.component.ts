import { ReposService } from './repos.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'craigc-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ReposComponent implements OnInit {
  repos: any[] = [];
  errorMessage: string;

  constructor(private _repoService: ReposService) { }

  ngOnInit() {
    this._repoService.getRepos()
    .subscribe( repos => {
      // this.repos = repos;
      // this.repos.sort( (repo, nextRepo) => ( repo.name > nextRepo.name) ? 1 : -1 );
      this.repos = repos.sort( (repo, nextRepo) => ( repo.name > nextRepo.name) ? 1 : -1 );
    }, error => {
      this.errorMessage = <any>error.message;
    });
  }

}
