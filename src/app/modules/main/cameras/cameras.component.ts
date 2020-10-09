import { Component, OnInit } from '@angular/core';
import { CameraService } from './cameras.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss'],
})
export class CamerasComponent implements OnInit {
  public camers = [];
  constructor(private cameraService: CameraService) {}

  ngOnInit() {
    this.cameraService.getCamers().subscribe((res) => {
      console.log(res.camers);
      this.camers = res.camers;
    });
  }
}
