import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const users: Array<any> = [
  {
    login: 'user1',
    password: '12345'
  },
  {
    login: 'user2',
    password: '12345'
  }
]


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: any = undefined

  constructor(
  ) { }

  public get user():any{
    const jsonUser: string | null=sessionStorage.getItem('auth-key')
    if(jsonUser!==null){
      this._user=JSON.parse(jsonUser)
    }
    return this._user
  }

  /**
   * 
   * @param credentials 
   * @returns user is correct
   */

  public authenticate(credentials: any): boolean {
    this._user= users.find(
      (user: any) =>
      user.login === credentials.login && user.password === credentials.password)

      if(this._user){
        sessionStorage.setItem('auth-key', JSON.stringify(credentials))
      }
      return this._user !== undefined
  }
 
}
