import { ReposService } from './repos.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'craigc-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ReposComponent implements OnInit {
  repos: any[] = [];
  errorMessage: string;

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

}
