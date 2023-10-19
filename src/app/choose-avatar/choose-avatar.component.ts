import { Component, ViewChild } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { updateProfile } from "firebase/auth";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-choose-avatar',
  templateUrl: './choose-avatar.component.html',
  styleUrls: ['./choose-avatar.component.scss']
})
export class ChooseAvatarComponent {
  userData = this.userDataService.getUserData();
  name: string = '';
  email = this.userData.email;
  password = this.userData.email;
  user = new User();
  showNotification = false;


  constructor(private userDataService: UserDataService, private router: Router, private firestore: Firestore, public appComponent: AppComponent) { }

  createUserWithFirebase() {
    let usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, this.user.toJSON())
      .then(() => {
        console.log('User added to Firestore successfully!');
      })
      .catch((error) => {
        console.error('Error adding user to Firestore', error);
      });
  }

  register() {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        this.appComponent.showFeedback('Du hast dich erfolgreich registriert!');
        const user = userCredential.user;
        // Registrierung erfolgreich
        
        console.log('User registered successfully');
        // Die Werte für Benutzerobjekt
        this.user.name = this.name;
        this.user.email = this.email;
        this.user.avatar = ''; // Setzen Sie den Avatar nach Bedarf

        // Fügt Nutzer bei Firebase hinzu ( Collection )
        this.createUserWithFirebase();

        this.router.navigate(['']);
        
        // Aktualisiert den Anzeigenamen vom User in der Authentication
        updateProfile(auth.currentUser, {
          displayName: this.name
        })
          .then(() => {
            // Anzeigenamen aktualisiert
            console.log('Display name updated successfully');
          })
          .catch((error) => {
            // Bei einem Fehler die Fehlermeldung anzeigen
            console.error('Error updating display name', error);
          });
      })
      .catch((error) => {
        // Bei einem Fehler die Fehlermeldung anzeigen
        console.error('Error during registration', error);
      });
  }

  ngOnInit() {
    const userData = this.userDataService.getUserData();
    this.email = userData.email;
    this.name = userData.name
    this.password = userData.password;
    console.log('User name:', userData);
  }

  @ViewChild('fileInput') fileInput: any;

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Hier kannst du die ausgewählte Datei weiterverarbeiten, z.B. hochladen oder anzeigen
      console.log('Ausgewählte Datei:', selectedFile);
    }
  }
}
