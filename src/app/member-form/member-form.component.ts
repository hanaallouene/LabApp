import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from "@angular/core"
import { MemberService } from 'src/services/member.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/model/Member';
@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;
  membreGlobal: Member |undefined;
  constructor(private MS: MemberService, private router: Router, private activatedRoute: ActivatedRoute) { };
  initForm(): void {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required])
    })
  }

  initForm2(member:Member): void {
    this.form = new FormGroup({
      cin: new FormControl(member.cin, [Validators.required]),
      name: new FormControl(member.name, [Validators.required]),
      cv: new FormControl(member.cv, [Validators.required]),
      type: new FormControl(member.type, [Validators.required])
    })
  }
  ngOnInit(): void {

    // récurperer id de l'url si on id dans l'URL donc on a dans situation d'Edit donc on a des valeurs dans la formulaire si non je suis dans le cas de la situation de la create et je veux initialiser tous les valeurs à null avec la fonction this.initForm()
    //cette constante recupere l'URL courant , snapshot taaml capture d'image 
    const idcourant= this.activatedRoute.snapshot.params['id']
    if(!! idcourant) // !! truly : existe et a une valeur
    {
      //déclarer membereGlobal :pour récuperer le contenu de member eli jeni mel obserber car member:variable local
      this.MS.getMemberbyID(idcourant).subscribe((member)=>{this.membreGlobal=member;this.initForm2(member)})
    }
    else{
      this.initForm();
    }
    
  }
  OnSub(): void {
    console.log(this.form.value);
    // const member = this.form.value;
    // //() retour de l'observable
    // // {} l'action a faire apres le travail du tread
    // this.MS.saveMember(member).subscribe(() => {
    //   //redirection vers la page des membres
    // })
    //appeler une fonction ans la service
    // qui envoie la requete POST vers le back
    const member={...this.membreGlobal,...this.form.value}


    const member2 = {
      ...member,
      id: member.id ?? Math.ceil(Math.random() * 10000),// id is auto increment in the DB , we don't need to generated when working with the DB
      createdDate: new Date().toISOString().toString()
    }
    this.MS.ONSAVE(member2).subscribe(() => {
      this.router.navigate(["/members"])
    })
    

  }
};


