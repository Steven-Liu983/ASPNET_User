import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users!: Observable<User[]>;

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.userService.getUsersList();
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: "Are you sure you want to delete this user's record?" }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteUser(id).subscribe({
          next: (data) => {
            console.log(data);
            this.reloadData();
          },
          error: (e) => {
            console.log(e);
          }
        });
      }
    });
  }

  updateUser(id: string){
    this.router.navigate(['update', id]);
  }
  
  userDetails(id: string){
    this.router.navigate(['details', id]);
  }
}
