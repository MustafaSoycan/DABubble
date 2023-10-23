import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-main-thread',
  templateUrl: './main-thread.component.html',
  styleUrls: ['./main-thread.component.scss']
})
export class MainThreadComponent {
  showAddDataPopup: boolean;
  showEmojiPopup: boolean;
  showPersonPopup: boolean;
  copiedText: any;
  threadContainerVisible: boolean; // Declare the property

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.threadContainerVisibility$.subscribe(
      (visibility) => {
        this.threadContainerVisible = visibility;
      }
    );
  }

  toggleAddDataPopup(): void {
    this.showAddDataPopup = !this.showAddDataPopup;
  }

  toggleEmojiPopup(): void {
    this.showEmojiPopup = !this.showEmojiPopup;
  }

  togglePersonPopup(): void {
    this.showPersonPopup = !this.showPersonPopup;
  }
}
