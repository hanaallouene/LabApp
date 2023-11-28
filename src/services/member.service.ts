import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { Member } from 'src/model/Member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  // Quand on refreche le page , le conteneur d'instance (injector) cherche l'existance d'instance avant de le cree , si il le trouve il l'envoie sinon il la cree
  // on cache les instance dans l'injector
export class MemberService {
  tab: Member[] = GLOBAL._DB.members;
  
  constructor(private httpclient: HttpClient) {

  }
  ONSAVE(member: Member): Observable<void>{
    //return this.httpclient.post<void>("localhost:9000/MEMBRE-SERVICE/membres"/// link eli testi bih fil postman , member);
    this.tab=[member,...this.tab.filter(item=>item.id !=member.id)]
    return new Observable((observer) => { observer.next() })
  }
  getMemberbyID(idcourant:string) :Observable<Member>
  {
      //return this.httpclient.get<Member>("localhost:9000/MEMBRE-SERVICE/membres"/// link eli testi bih fil postman );
    this.tab.find(item=>item.id==idcourant)
    return new Observable((observer) => {observer.next(this.tab.find(item=>item.id==idcourant))})
  }
  // // quand tu lance une requete le type de retour observable /promise
  // saveMember(member: any): Observable<void> {
  //   //return this.httpclient.post<Member>("localhost:9000/MEMBRE-SERVICE/membres",member)
  //   const membertosave = {
  //     ...member, id: Math.ceil(Math.random() * 10000),
  //     createdDate: new Date().toISOString()
  //   }
  //   this.tab = [membertosave, ...this.tab.filter(item => item.id != membertosave.id)]
  //   return new Observable((observer) => { observer.next() })
  // }

  DeleteMember(id :string): Observable<void>
  {
    this.tab=this.tab.filter(item=>item.id!==id)
    return new Observable((observer)=> {observer.next()})
  }

  
}
