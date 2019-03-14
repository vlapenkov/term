import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shareddata/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  
  model: any = {};
  loading = false;
  error = '';
  public redirectToUrl: string ;
  private static redirectToDefault: string = '/';

  _subscription :Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    this.route.queryParams.subscribe(params => {
      
      this.redirectToUrl = params['redirectToUrl'] || LoginComponent.redirectToDefault;      
    });
  }

  ngOnDestroy(): void {
    if (this._subscription)    this._subscription.unsubscribe();
  }

  login() {
    this.loading = true;
  this._subscription=  this.authenticationService.login2(this.model.username, this.model.password)
      .subscribe(result => {
        if (result) {         
          // login successful

          if (this.redirectToUrl !== LoginComponent.redirectToDefault) this.router.navigateByUrl(this.redirectToUrl);
        else  this.router.navigateByUrl(LoginComponent.redirectToDefault);

        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }
    )
  }
}