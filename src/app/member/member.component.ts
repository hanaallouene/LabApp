import { MemberService } from './../../services/member.service';
import { Component } from '@angular/core';
import { Member } from 'src/model/Member';
import { Router } from '@angular/router';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent  {
  constructor(private MS: MemberService,private router: Router) { };
  dataSource: Member[] = this.MS.tab;

  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'cv', 'createdDate', 'action'];


  Delete(id :string): void{
    this.MS.DeleteMember(id).subscribe(()=>{this.dataSource=this.MS.tab})
      
    }
  
  
}
