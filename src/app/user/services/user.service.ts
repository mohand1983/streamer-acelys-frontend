import { Injectable } from '@angular/core';
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
      return this._user !== undefined
  }
 
}
