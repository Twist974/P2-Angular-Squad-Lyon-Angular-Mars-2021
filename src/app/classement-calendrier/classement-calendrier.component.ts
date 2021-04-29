import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CalendrierClassementService } from '../common/calendrier-classement.service';

// Définition de l'interface
export interface ClassementElement {
  P: number
  CLUBS: string;
  PTS: number;
  J: number;
  DIFF: number;
}

@Component({
  selector: 'app-classement-calendrier',
  templateUrl: './classement-calendrier.component.html',
  styleUrls: ['./classement-calendrier.component.css']
})
export class ClassementCalendrierComponent implements AfterViewInit, OnInit {
  // Nécessaire pour la pagination matchesDuJour
  page = 1;
  matchesToDisplay: any[]
  journee: string

  // Définition des colonnes du classement
  displayedColumns: string[] = ['P', 'CLUBS', 'PTS', 'J', 'DIFF'];
  ELEMENT_DATA: ClassementElement[] = []



  public dataSource: any;
  constructor(private service: CalendrierClassementService) { }

  ngOnInit(): void {
    this.service.getCalendar().subscribe((api_matchs) => {
      this.matchesToDisplay = api_matchs;
      this.journee = this.matchesToDisplay[0].league.round.slice(17, 20)
      console.log(this.matchesToDisplay)
    })
  }


  // Nécessaire pour la pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    // Appel du service
    this.service.getStanding().subscribe((api_standing) => {
      // Remplissage du tableau pour chaque équipe présente dans la ligue
      api_standing.forEach(equipe => {
        this.ELEMENT_DATA.push({ P: equipe.rank, CLUBS: equipe.team.name, PTS: equipe.points, J: equipe.all.played, DIFF: equipe.goalsDiff })
      });
      // JSP PAS TROP ENCORE
      this.dataSource = new MatTableDataSource<ClassementElement>(this.ELEMENT_DATA)
      // Nécessaire pour la pagination
      this.dataSource.paginator = this.paginator;
    })



  }







}
