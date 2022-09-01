import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Question } from '../appmodel/question';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  addQuestion:Question = new Question();
  form1: FormGroup;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.form1 = new FormGroup(
      {
        course_id : new FormControl('', [Validators.required,
          Validators.pattern('/^\d{10}$/')]),

        level_id : new FormControl('', [Validators.required,
          Validators.pattern('/^\d{10}$/')]),

        question : new FormControl('', [Validators.required]),

        option_1 : new FormControl('', [Validators.required]),
          
        option_2 : new FormControl('', [Validators.required]),
           
        option_3 : new FormControl('', [Validators.required]),
          
        option_4 : new FormControl('', [Validators.required]),
          
        correct_option : new FormControl('', [Validators.required])
         
      }
    )
  }

  addingQuestion(){
    this.adminService.addquestion(this.addQuestion).subscribe(response =>{
      Swal.fire(
        'Question Added!'
      )
    })
  
  }

}
