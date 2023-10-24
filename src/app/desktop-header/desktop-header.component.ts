import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEdituserLogoutComponent } from '../dialog-edituser-logout/dialog-edituser-logout.component';
import { UserDataService } from '../user-data.service';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-desktop-header',
  templateUrl: './desktop-header.component.html',
  styleUrls: ['./desktop-header.component.scss']
})
export class DesktopHeaderComponent implements OnInit {
  currentUserName: string = '';
  userData = [];

  constructor(public dialog: MatDialog, public userDataService: UserDataService) {

  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.userData = this.userDataService.getCurrentUser();
    //   // console.log('UserData:', this.userData);
    //   this.userDataService.saveToLocalStorage('userData',this.userData);
    // }, 750);

  }

  openDialog() {
    const dialog = this.dialog.open(DialogEdituserLogoutComponent, { position: { top: '100px', right: '50px' }, panelClass: 'custom-logout-dialog' });
  }
}
