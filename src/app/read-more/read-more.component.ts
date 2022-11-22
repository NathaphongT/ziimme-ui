import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit {

  @Input() content: string;
  @Input() limit: number;
  @Input() completeWords: boolean;
  @Input() query: string;
  isContentToggled: boolean;
  nonEditedContent: string;
 
  constructor() {

  }

  ngOnInit() {
   
    this.nonEditedContent = this.content;
    this.content = this.formatContent(this.content);
  }

  toggleContent() {
    this.isContentToggled = !this.isContentToggled;
    this.content = this.isContentToggled ? this.nonEditedContent : this.formatContent(this.content);
  }

  formatContent(content: string) {
    if (this.completeWords) {
      this.limit = content.substr(0, this.limit).lastIndexOf(' ');
    }
    return `${content.substr(0, this.limit)}...`;
  }

  
  highlight() {
    // console.log(this.query);
    if(!this.query) {
        return this.content;
    }
    return this.content.replace(new RegExp(this.query, "gi"), match => {
        return '<span class="highlightText">' + match + '</span>';
    });
  }
}
