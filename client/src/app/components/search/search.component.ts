import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SpotifyService],
    standalone: false
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];

  resultCategory:string;//puts the results into a category.
  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    //TODO: call search function in spotifyService and parse response
    if (!this.searchString) { //if search box is empty, nothing is done
      return;
    }

    const category = this.searchCategory; //saves the category that was saved

    //gets the result, and saves it so it can get displayed 
    this.spotifyService.searchFor(category, this.searchString).then((data) => {
      this.resources = data;
      this.resultCategory = category;
    });
  }

  //only used if the category is a track 
  get tracks():TrackData[] {
    return this.resources as TrackData[];
  }

}
