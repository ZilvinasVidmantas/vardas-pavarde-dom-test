class CarGridComponent {
  constructor() {
    this.state = {
      loading: false,
      cars: []
    }
    this.init();
  }

  initFetch = () => setTimeout(() => {
    API.fetchCars(
      (cars) => {
        this.state.loading = false;
        this.saveCars(cars);
      },
      (err) => {
        alert(err);
        this.state.loading = false;
        this.render();
      }
    );
  }, 1000);

  saveCars = (cars) => {
    this.state.cars = cars;

    this.render();
  }

  deleteCar = (id) => {
    API.deleteCar(
      id,
      () => API.fetchCars(this.saveCars, alert),
      alert
    );
  }

  init = () => {
    this.state.loading = true;
    this.initFetch();
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'row g-3';

    this.render();
  }

  wrapInColumn = (element) => {
    const column = document.createElement('div');
    column.className = 'col-12 col-sm-6 col-lg-4 col-xl-3';
    column.appendChild(element);
    return column;
  }

  render = () => {
    const { loading, cars } = this.state;
    if (loading) {
      this.htmlElement.innerHTML = `<div class="text-center"><img src="assets/loading.gif"/></div>`;
    } else if (cars.length > 0) {
      this.htmlElement.innerHTML = '';
      const carElements = cars
        .map(({ id, ...props }) => new CarCardComponent({
          ...props,
          onDelete: () => this.deleteCar(id)
        }))
        .map(x => x.htmlElement)
        .map(this.wrapInColumn);
      this.htmlElement.append(...carElements)
    } else {
      this.htmlElement.innerHTML = `<h2>Šiuo metu mašinų nėra</h2>`;
    }
  }
}