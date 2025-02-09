import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
  id!: string;
  user!: User;

  constructor(private route: ActivatedRoute,private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.user = new User();
    this.id = this.route.snapshot.params['id'];
    
    this.userService.getUser(this.id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  updateUser() {
    this.user.phoneNum = this.user.phoneNum.toString();
    this.userService.updateUser(this.id, this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.user = new User();
        this.router.navigate(['/users']);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  onSubmit() {
    this.updateUser();    
  }

  userList(){
    this.router.navigate(['users']);
  }
}
