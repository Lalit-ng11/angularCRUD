import { Component,OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIf,NgFor } from '@angular/common';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule,CommonModule,NgIf,NgFor,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  books:any;
  currentBook:any;
  cureentIndex=-1;
  searchTitle='';

  constructor(private booksService:BooksService){}
  
  ngOnInit(): void {
  this.getAllBooks();
  }

  // Get List of Books 
  getAllBooks():void{
    this.booksService.list().subscribe((books:any)=>{
      this.books=books;
    },
    (error:any)=>{
      console.log(error);
      
    })
  }

  // Delete Books data 
  deleteBook(id:number){
    this.booksService.delete(id).subscribe(
      response=>{
        this.getAllBooks();
      },(error:any)=>{
        console.log(error);
        
      }

    )
  }

  // Search Book 
  searchByTitle():void{
    this.booksService.filterByTitle(this.searchTitle)
    .subscribe(
      (books:any)=>{
        this.books=books;
      },(error:any)=>{
        console.log(error);
        
      }

    )
  }

}
