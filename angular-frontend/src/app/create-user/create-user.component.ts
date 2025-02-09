import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  save() {
    this.user.phoneNum = this.user.phoneNum.toString();
    this.userService.createUser(this.user).subscribe({
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
    this.save();
  }
}
