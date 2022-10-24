import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-owner-block',
  templateUrl: './owner-block.component.html',
  styleUrls: ['./owner-block.component.scss']
})
export class OwnerBlockComponent implements OnInit {

  @Input() data:any = {};

  constructor() { }

  ngOnInit(): void {
    
  }

}
