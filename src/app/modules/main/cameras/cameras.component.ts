import { Component, OnDestroy, OnInit } from '@angular/core';
import { MathService } from 'src/app/core/services/math.service';
import { CamerasAnimation } from './cameras.animation';
import { CameraService } from './cameras.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss'],
  animations: [CamerasAnimation],
})
export class CamerasComponent implements OnInit, OnDestroy {
  public isCameraData = false;
  public camers = [];
  public index = 0;
  public updateInterval;
  private autoUpdateCamersInterval;
  constructor(
    private cameraService: CameraService,
    public mathService: MathService
  ) {}

  ngOnInit(): void {
    this.cameraService.updateCamers();
    this.cameraService.getCamers().subscribe((res) => {
      console.log(res);
      this.camers = res;
      console.log(this.camers);
      this.isCameraData = true;
    });
    this.autoUpdateCadr();
    this.autoUpdateCamers();
  }
  ngOnDestroy(): void {
    clearInterval(this.autoUpdateCamersInterval);
    this.stopCadrUpdate();
  }

  private autoUpdateCamers(): void {
    this.autoUpdateCamersInterval = setInterval(() => {
      this.isCameraData = false;
      this.stopCadrUpdate();
      this.cameraService.updateCamers();
      this.autoUpdateCadr();
      this.index = 0;
    }, 5000);
  }

  private stopCadrUpdate(): void {
    clearInterval(this.updateInterval);
  }
  private autoUpdateCadr(): void {
    this.updateInterval = setInterval(() => {
      this.camers.forEach((camera) => {
        // this.updateIntervals.push(
        camera.active = this.mathService.getRandomInt(this.camers.length);
        // );
      });
    }, 1000);
  }
}
