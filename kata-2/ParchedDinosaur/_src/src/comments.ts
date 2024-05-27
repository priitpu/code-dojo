import { IComment } from './models/comment';

class Comment {
  id: number = Math.random();
  name = 'Scuderia Ferrari';
  comment =
    `Prendete delle melanzane, tagliatele a fettine dello spessore di un centimetro, salatele e mettetele a riposare per mezzora circa sotto un peso. Friggetele in abbondante olio d’oliva.
    Preparare in una padella una salsa semplice, con polpa di pomodoro, olio d’oliva, sale, spicchi d’aglio e basilico; cuocere a fuoco basso per un quarto d’ora.
    Cuocete le penne al dente in acqua salata. Scolare e aggiungete nel piatto di portata la salsa di pomodoro, con le melanzane fritte, cospargere abbondantemente il tutto di ricotta salata grattugiata.`;
}

export const comments: IComment[] = [
  {
    ...new Comment(),
    replies: [
      {
        ...new Comment(),
        replies: [
          {
            ...new Comment(),
            replies: [],
          },
          {
            ...new Comment(),
            replies: [],
          },
        ],
      },
      {
        ...new Comment(),
        replies: [],
      },
      {
        ...new Comment(),
        replies: [],
      },
    ],
  },
];
