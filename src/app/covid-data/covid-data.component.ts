import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-covid-data',
  templateUrl: './covid-data.component.html',
  styleUrls: ['./covid-data.component.css']
})
export class CovidDataComponent implements OnInit {
  covidData: any[] = [];
  selectedState: string = 'az';

  constructor(private covidService: CovidService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.covidService.getDailyData(this.selectedState).subscribe(data => {
      this.covidData = data.slice(0,7);
    });
  }

  onStateChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedState = target.value;
    this.fetchData();
  }

  formatDate(dateString: any): string {
    const dateStr = dateString.toString();
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${month}-${day}-${year}`;
  }
  
}
