export default abstract class TicketMachineBase  {
  protected currency: string;
  protected pricePerMinute: number;

  constructor(_currency: string, _pricePerMinute: number) {
    this.currency = _currency;
    this.pricePerMinute = _pricePerMinute;
  }

  abstract startInteraction(): Promise<void>;

  abstract endInteraction(): void;

  /**
   * Calculates the price for a given parking duration.
   * @param duration - Duration of parking in minutes.
   * @returns The price for parking in the currency set when the ticket machine was created.
   */
  protected calculatePrice(duration: number): number {
    return duration * this.pricePerMinute;
  }

  /**
   * Displays the calculated parking price to the console.
   * @param price - The total price for the parking duration in the specified currency.
   */
  protected displayPrice(price: number): void {
    console.log(`Total price will be ${price} ${this.currency}`);
  }
}
