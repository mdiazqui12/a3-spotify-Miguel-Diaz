import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-artist-page',
    templateUrl: './artist-page.component.html',
    styleUrls: ['./artist-page.component.css'],
    standalone: false
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	topTracks:TrackData[];
	albums:AlbumData[];

  //combines the route and spotify service
  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    //The page updates from one artist to another whenever the id in the URL changes 
    this.route.paramMap.subscribe((parameter) => {
      this.artistId = parameter.get('id');
      this.loadArtist();

    });
    //TODO: Inject the spotifyService and use it to get the artist data, top tracks for the artist, and the artist's albums
  }
  loadArtist() {
    this.spotifyService.getArtist(this.artistId).then((data) =>{
      this.artist = data;
    });

    this.spotifyService.getTopTracksForArtist(this.artistId).then((data) => {
      this.topTracks = data;
    });
    this.spotifyService.getAlbumsForArtist(this.artistId).then((data) => {
      this.albums = data;
    });
  }
  

}