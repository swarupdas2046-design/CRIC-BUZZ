export class PlayerDto {
  constructor({ name, image, role, country, battingStyle, bowlingStyle }) {
    this.name = name;
    this.image = image;
    this.role = role;
    this.country = country;
    this.battingStyle = battingStyle;
    this.bowlingStyle = bowlingStyle;
  }
}
