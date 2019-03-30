import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


const backendUrl = environment.backendUrl + 'users';
const backendUrlCart = environment.backendUrl + 'carts';
@Injectable({providedIn: 'root'})
export class UserService {

  private AuthLoggedInListener = new Subject<boolean>();
  private allUsers: UserInterface[] = [];
  private UsersSubject = new Subject<UserInterface[]>();

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  RegisterNewUser(userData: UserInterface) {

    return this.http.post<{userCreate: any}>(backendUrl, userData);

  }

  LoginToSystem(userLoginInfo: any) {

    this.http.post<{_id: string, token: string}>(backendUrl + '/login', userLoginInfo).subscribe(response => {

      const token = response.token;
      const id = response._id;

      if (token) {

        this.AuthLoggedInListener.next(true);
        this.router.navigate(['managment/' + id]);
      }

    });

  }

  LogOutNow() {

    this.AuthLoggedInListener.next(false);
    this.router.navigate(['']);
  }

  GetAllUsers() {

    this.http.get<{users: any}>(backendUrl)
    .pipe(map((userResponse) => {

      return userResponse.users.map(user => {
        return  {

            id: user._id,
            email: user.email,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address
        };
      });
      })).subscribe(transfomredData => {

        this.allUsers = transfomredData;
        this.UsersSubject.next([...this.allUsers]);
      });

    }



GetConnectedUser(id: string) {

      return this.http.get<{user: any}>(backendUrl + '/' + id);
  }


  UpdateCartOfUser(ProductInformation: any, userid: string) {


    this.http.put(backendUrlCart + '/' + userid, ProductInformation).subscribe(response => {


    });

  }


  UpdateUserData(UserData: UserInterface, id: string) {

    return this.http.put<{user: any}>(backendUrl + '/' + id, UserData);


  }
  GetAuthLoggedInListener() {

    return this.AuthLoggedInListener.asObservable();
  }

}
