import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  id!: string;
  user!: User;
  
  constructor(private route: ActivatedRoute,private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe({
      next: (data) => {
        console.log(data)
        this.user = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  userList(){
    this.router.navigate(['users']);
  }
}
