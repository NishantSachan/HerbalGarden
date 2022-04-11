import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges{
  @Input()
  rating!:number
  cropWidth!:number;
  @Output()
  ratingClicked:EventEmitter<string>=new EventEmitter();
  constructor() { }

  ngOnChanges(): void {
    this.cropWidth=this.rating *90/5
  }
 onClick():void{
   this.ratingClicked.emit(`The rating is ${this.rating}, You have clicked`)
 }
}
