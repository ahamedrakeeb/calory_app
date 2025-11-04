class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayRemainingCalories();
    this._displayCaloriesTotal();
    this._displayProgressBar();
  }

  // Public methods / API
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._displayMeals(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._displayWorkouts(workout);
    this._render();
  }

  // remove meal
  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);
    if (index !== -1) {
      const meal = this._meals[index];
      this._meals.splice(index, 1);
      this._totalCalories -= meal.calories;
      this._render();
    }
  }

  // remove workout
  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);
    if (index !== -1) {
      const workout = this._workouts[index];
      this._workouts.splice(index, 1);
      this._totalCalories += workout.calories;
      this._render();
    }
  }

  // Private methods / API
  _displayCaloriesTotal() {
    const caloriesTotalEl = document.getElementById('calories-total');
    caloriesTotalEl.textContent = this._totalCalories;
  }
  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById('calories-limit');
    caloriesLimitEl.textContent = this._calorieLimit;
  }

  // display calories consumed
  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const caloriesConsumed = this._meals.reduce(
      (sum, meal) => sum + meal.calories,
      0
    );
    caloriesConsumedEl.textContent = caloriesConsumed;
  }

  // display calories burned
  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const caloriesBurned = this._workouts.reduce(
      (sum, workout) => sum + workout.calories,
      0
    );
    caloriesBurnedEl.textContent = caloriesBurned;
  }

  // display remaining calories
  _displayRemainingCalories() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const progressBarEl = document.getElementById('calorie-progress');
    const caloriesRemaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingEl.textContent = caloriesRemaining;

    // change text color based on remaining calories
    if (caloriesRemaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );
      progressBarEl.classList.remove('bg-success');
      progressBarEl.classList.add('bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      progressBarEl.classList.remove('bg-danger');
      progressBarEl.classList.add('bg-success');
    }
  }
  // Display progress bar
  _displayProgressBar() {
    const progressBarEl = document.getElementById('calorie-progress');
    const progress = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(progress, 100);
    progressBarEl.style.width = `${width}%`;
  }

  // Display meals
  _displayMeals(meal) {
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');
    mealEl.classList.add('card', 'my-2');
    mealEl.setAttribute('data-id', meal.id);
    mealEl.innerHTML = `<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories} 
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
    mealsEl.appendChild(mealEl);
  }

  // Display workouts
  _displayWorkouts(workout) {
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');

    workoutEl.classList.add('card', 'my-2');
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML = `<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
    workoutsEl.appendChild(workoutEl);
  }

  // Render when the app state changes
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayRemainingCalories();
    this._displayProgressBar();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    // catch the input from meal form
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal'));

    // catch the input from workout form
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));

    // target the element to delete meal
    document
      .getElementById('meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal'));

    // target the element to delete workout
    document
      .getElementById('workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout'));
  }

  _newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    if (name.value === '' || calories.value === '') {
      alert('Please fill in all fields');
      return;
    }
    if (type === 'meal') {
      const meal = new Meal(name.value, parseInt(calories.value));
      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, parseInt(calories.value));
      this._tracker.addWorkout(workout);
    }

    name.value = '';
    calories.value = '';

    // collapse the item form after submission
    const ItemCollapse = document.getElementById(`collapse-${type}`);
    const bsItemCollapse = new bootstrap.Collapse(ItemCollapse, {
      toggle: true,
    });
    bsItemCollapse.hide();
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      if (confirm('Are you sure?')) {
        const id = e.target.closest('.card').getAttribute('data-id');
        type === 'meal'
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);
        e.target.closest('.card').remove();
      }
    }
  }
}

const app = new App();
