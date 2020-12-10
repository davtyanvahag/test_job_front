import {Component, ElementRef, OnInit} from '@angular/core';
import {User} from './interfaces/user.interface';
import {File} from './interfaces/file.interface';
import {UserEntity} from './entities/user.entity';
import {UsersService} from './services/users.service';
import {environment} from '../environments/environment';
import {ValidationsService} from './services/validation.service';
import {FilesService} from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  search: any;
  allFiles: File[];
  imgSize: number;
  imgType: string;
  formData: any;
  showModal: any;
  imageSrc: string;
  deleteUser: boolean;
  filesPage: boolean;
  fileCount: number;
  validation: any;
  imageId: number;
  showDeleteImgModal: boolean;
  userId: number;
  users: User[];
  user: User;
  files: File[];
  apiUrl: string;

  constructor(private usersSerives: UsersService,
              private validationsService: ValidationsService,
              private filesService: FilesService,
              private el: ElementRef) {
    this.apiUrl = environment.apiUrl;
  }
  ngOnInit(): void {
    this.imgSize = 0;
    this.formData = new FormData();
    this.deleteUser = false;
    this.filesPage = false;
    this.showDeleteImgModal = false;
    this.showModal = {
      show: false,
      addOrEdit: false
    };
    this.search = {
      name: '',
      email: '',
      dobMax: '',
      dobMin: '',
      status: ''
    };
    this.setValidation();
    this.getUsers();
  }

  getUsers(): void {
    this.usersSerives.getList().subscribe((res: {error: boolean, data: User[]}) => {
      if (!res.error) {
        this.users = res.data;
      } else {
        this.users = [];
      }
    });
  }

  searchUsers(): void {
    this.usersSerives.search(this.search).subscribe((res: {error: boolean, data: User[]}) => {
      if (!res.error) {
        this.users = res.data;
      } else {
        this.users = [];
      }
    });
  }

  getUser(): void {
    this.usersSerives.getOne(this.userId).subscribe((res: {error: boolean, data: User}) => {
      if (!res.error) {
        res.data.birthDate = new Date(res.data.birthDate).getMonth() +
          '/' + new Date(res.data.birthDate).getDate() +
          '/' + new Date(res.data.birthDate).getFullYear();
        this.user = res.data;
        console.log(this.user.birthDate);
      } else {
        this.setNewUser();
      }
    });
  }

  getFiles(): void {
    this.usersSerives.getFiles(this.search.status).subscribe((res: any) => {
      if (!res.error) {
        this.allFiles = res.data;
      } else {
        this.setNewUser();
      }
    });
  }

  createUser(): void {
    if (!this.validationsService.validation(this.validation, this.user).error && this.imgSize < 10000000) {
      if (!this.showModal.addOrEdit) {
        this.usersSerives.create(this.user).subscribe((res: {error: boolean, data: User}) => {
          if (!res.error) {
            if (this.fileCount > 0) {
              this.filesService.upload(res.data.id, this.formData).subscribe( ( resp: any) => {
                if (!resp.error) {
                }
              });
            }
            this.setValidation();
            this.setNewUser();
          }
        });
      } else {
        this.usersSerives.update(this.user).subscribe((res: {error: boolean, data: User}) => {
          if (!res.error) {
            if (this.fileCount > 0) {
              this.filesService.upload(this.userId, this.formData).subscribe( ( resp: any) => {
                if (!resp.error) {
                }
              });
            }
            this.setValidation();
            this.setNewUser();
          }
        });
      }
      this.showModal.show = false;
      this.getUsers();
    } else {
      this.validation = this.validationsService.returndObj;
      console.log(this.validation);

    }
  }

  setNewUser(): void {
    this.user = new UserEntity('', '', '', '', new Date(), '', 'load');
  }

  setValidation(): void {
    this.validation = {
      firstName: false,
      lastName: false,
      email: false,
      birthDate: false,
      registrationDate: false,
      ipAddress: false,
      status: false
    };
  }

  upload(): void {

  }

  onChange(evt: any): void {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    this.fileCount = inputEl.files.length;
    if (this.fileCount > 0) { // a file was selected
      this.formData.append('file', inputEl.files.item(0));
    }
    const reader = new FileReader();
    this.files = evt.target.files;
    this.imgType = evt.target.files[0].type;
    console.log(evt.target.files[0]);
    this.imgSize = evt.target.files[0].size;
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }


  deletImage(): void {
    this.filesService.delete(this.imageId).subscribe((res: any) => {
      if (!res.error) {
        const files = this.user.Files.filter(el => el.id !== this.imageId);
        this.user.Files = files;
      }
    });
  }
}
