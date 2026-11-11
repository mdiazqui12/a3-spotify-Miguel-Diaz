import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-track-page',
    templateUrl: './track-page.component.html',
    styleUrls: ['./track-page.component.css'],
    standalone: false
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;

    //reads the id from the URL and the Spotify sevice gets the data
  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    //runs whenever the id int he URL changes
  	this.route.paramMap.subscribe((params) => {
      this.trackId = params.get('id');
      this.loadTrack();
    });
  	//TODO: Inject the spotifyService and use it to get the track data
  
  }
  //gets the track and saves it as it comes
  loadTrack(){
    this.spotifyService.getTrack(this.trackId).then((data) => {
      this.track = data;
    });
  }

}
