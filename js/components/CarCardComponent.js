class CarCardComponent {
  static USD_EUR = 0.87;

  constructor(props) {
    this.props = props;

    this.init();
  }

  init = () => {
    const { brand, model, year, fuelType, price, imgSrc, onDelete } = this.props;
    const { amount, currency } = price;

    const finalPrice = currency === '$' ? amount * CarCardComponent.USD_EUR : amount;
    const formatedPrice = Math.round(100 * finalPrice) / 100 + ' €';

    this.htmlElement = document.createElement('article');
    this.htmlElement.className = 'card shadow';
    this.htmlElement.innerHTML = `
    <img src="${imgSrc}" class="card-img-top"/ height="200px" style="object-fit: cover">
    <div class="card-body">
      <h2 class="h5">${brand} ${model}</h2>
      <ul>
        <li>
          <span>year</span>:
          <strong>${year}</strong>
        </li>
        <li>
          <span>fuel type</span>:
          <strong>${fuelType}</strong>
        </li>
        <li>
          <span>price</span>:
          <strong>${formatedPrice}</strong>
        </li>
      </ul>
      <div class="text-center">
        <button class="btn btn-danger">Ištrinti</button>
      </div>
    </div>`;
    const btn = this.htmlElement.querySelector('.btn');
    btn.addEventListener('click', onDelete);
  }
}