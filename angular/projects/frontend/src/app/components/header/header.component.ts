import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  user: any;
  ngOnInit(): void {
   
  }
}
