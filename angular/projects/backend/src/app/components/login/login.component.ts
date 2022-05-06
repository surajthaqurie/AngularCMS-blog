import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private message: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  userLogin(login: NgForm) {
    if (login.invalid) {
      return;
    }

    const loginData = {
      email: login.value.email,
      password: login.value.password,
    };

    // api service for authentication
    this.apiService.login(loginData.email, loginData.password).subscribe(
      (res) => {
        if (res.user.roles === 'Admin' && res.success) {
          this.message.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Authentication Successful',
            life: 2000,
          });

          setTimeout(() => {
            this.router.navigateByUrl('/').then();
          }, 1500);
        } else {
          this.message.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Authentication successfully',
            life: 2000,
          });
          setTimeout(() => {
            window.location.href = 'http://localhost:4200';
          }, 1500);
        }
      },
      (error: HttpErrorResponse) => {
        this.message.add({
          severity: 'error',
          summary: `Failed ${error.status}`,
          detail: `${error.statusText}`,
          life: 1500,
        });
      }
    );
  }
}
