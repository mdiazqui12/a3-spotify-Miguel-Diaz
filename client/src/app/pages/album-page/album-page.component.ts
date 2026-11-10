import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-album-page',
    templateUrl: './album-page.component.html',
    styleUrls: ['./album-page.component.css'],
    standalone: false
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];

  //reads the id from URL and Spotify service gets the data
  constructor(private route: ActivatedRoute, 
    private spotifyService: SpotifyService) { }

    //runs again to get the id when the URL changes. Page updates if the album is changed
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.albumId = params.get('id');
    //TODO: inject spotifyService and use it to get the album data and the tracks for the album
      this.loadAlbum();
    });
  }

  //retrives the album with the tracks and saves them as they come
  loadAlbum(){
    this.spotifyService.getAlbum(this.albumId).then((data) =>{
      this.album = data;
    });

    this.spotifyService.getTracksForAlbum(this.albumId).then((data) =>{
      this.tracks= data;
    });
  }

}
