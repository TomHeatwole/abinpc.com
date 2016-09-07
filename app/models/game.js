import DS from 'ember-data';

export default DS.Model.extend({
  //team1 and team2 will be referred to by their code, not their team name. ex. A1, C14, etc
  season: DS.attr('string'), // Determines which season of abinpc this data belongs to
  team1: DS.attr('string'),
  team2: DS.attr('string'),  
  /*
  gameNumber starts at 1 and counts up as you read down the bracket. Start at the top left corner
  where team A1 plays team A16, then go down. Then read down the other side of the brakcet. For example, 
  game #17 is C1 against C16. The repeat for each round. Round 2 starts with game #33.. etc.
  */
  gameNumber: DS.attr('number'),
  //Winner will take the team code. ex. A2, D9, ect...
  winner: DS.attr('string')
});
