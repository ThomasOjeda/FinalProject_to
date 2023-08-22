import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
  @Input() memberId!: string;

  name!: string;
  lastName!: string;
  email!: string;
  username!: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser$(this.memberId).subscribe((response) => {
      if (response.data.name?.first) this.name = response.data.name?.first;
      if (response.data.name?.last) this.lastName = response.data.name?.last;

      this.username = response.data.username;
      this.email = response.data.email;
    });
  }
}
