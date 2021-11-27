const app = Vue.createApp({
  data() {
    return {
      search: "",
      person: {
        name: null,
        phone: null,
      },
      filters: [
        {
          id: 1,
          name: "Subject",
          checked: true,
        },
        {
          id: 2,
          name: "Location",
          checked: false,
        },
        {
          id: 3,
          name: "Price",
          checked: false,
        },
        {
          id: 4,
          name: "Availability",
          checked: false,
        },
      ],
      secondary_filters: [
        {
          id: 1,
          name: "Ascending",
          sign: "",
          checked: true,
        },
        {
          id: 2,
          name: "Descending",
          checked: false,
          sign: "-",
        },
      ],
      lessons: [
        {
          id: 1,
          img: "assets/img/science.png",
          subject: "BIOLOGY",
          location: "NIGERIA",
          price: 100,
          spaces: 5,
        },
        {
          id: 2,
          img: "assets/img/maths.png",
          subject: "MATHS",
          location: "OXFORD",
          price: 79,
          spaces: 5,
        },
        {
          id: 3,
          img: "assets/img/chemistry.png",
          subject: "CHEMISTRY",
          location: "LONDON",
          price: 76,
          spaces: 5,
        },
        {
          id: 4,
          img: "assets/img/english.png",
          subject: "ENGLISH",
          location: "NEW YORK",
          price: 80,
          spaces: 5,
        },
        {
          id: 5,
          img: "assets/img/music.png",
          subject: "MUSIC",
          location: "BRISTOL",
          price: 90,
          spaces: 5,
        },
        {
          id: 6,
          img: "assets/img/chemistry.png",
          subject: "CHEMISTRY",
          location: "LIECESTER",
          price: 70,
          spaces: 5,
        },
        {
          id: 7,
          img: "assets/img/football.png",
          subject: "FOOTBALL",
          location: "GERMANY",
          price: 22,
          spaces: 5,
        },
        {
          id: 8,
          img: "assets/img/baseball.png",
          subject: "CRICKET",
          location: "INDIA",
          price: 50,
          spaces: 5,
        },
        {
          id: 9,
          img: "assets/img/camera.png",
          subject: "PHOTOGRAPHY",
          location: "WATFORD",
          price: 200,
          spaces: 5,
        },
        {
          id: 10,
          img: "assets/img/yara.png",
          subject: "MUKARANTA",
          location: "SOKOTO",
          price: 40,
          spaces: 5,
        },
        {
          id: 11,
          img: "assets/img/football.png",
          subject: "FOOTBALL",
          location: "CYPRUS",
          price: 60,
          spaces: 5,
        },
        {
          id: 12,
          img: "assets/img/music.png",
          subject: "MUSIC",
          location: "ABUJA",
          price: 20,
          spaces: 5,
        },
      ],
      cart: [],
      total: 0,
    };
  },

  methods: {
    addToCart(course) {
      /*if (this.cart.indexOf(course) == -1) {
        this.cart.push(course);
        this.total += course.price;
      }*/
      //this.cart.push(course);
      //course.spaces--;
      if(course.spaces > 0){
        this.cart.push(course);
        this.total += course.price;
        course.spaces--;
      }
    },

    searching(event) {
      let value = event.target.value.toLowerCase();

      $(".single-lesson").each((i, ele) => {
        let filterableText = "";
        let hide = false;
        $(ele).addClass("d-none");

        $(ele)
          .find(".filterable-attribute")
          .each((i, ele2) => {
            filterableText +=
              " " + ele2.innerText.toLowerCase().replace(/\s\s+/g, " ");
          });

        show = filterableText.includes(value);

        if (show) {
          console.clear();
          $(ele).removeClass("d-none");
        }
      });
    },

    removeFromCart(course) {
      /*this.total -= course.price;

      this.cart = this.cart.filter((e) => {
        console.log(e.id + " != " + course.id);
        return e.id != course.id;
      });*/

      let index = this.cart.indexOf(course)
      this.cart.splice(index, 1)
      course.spaces++;
      this.total = this.total - course.price
    },

    resetVariable() {
      this.cart = [];
      this.total = 0;
    },

    checkout() {
      let msg = `Thanks ${this.person.name} your total price is .. (₦ ${this.total} naira only)`;
      alert(msg);
      this.resetVariable();
    },

    stopNumericInput(event) {
      let keyCode = event.keyCode ? event.keyCode : event.which;
      if (keyCode > 47 && keyCode < 58) {
        event.preventDefault();
      }
    },

    stopAlphabetsInput(event) {
      let keyCode = event.keyCode ? event.keyCode : event.which;
      console.log(keyCode);
      if (keyCode >= 48 && keyCode <= 58) {
        // Allow
      } else {
        event.preventDefault();
      }
    },

    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },

    toggleMainFilter(filter) {
      this.filters.map((e) => {
        e.checked = false;
        if (e == filter) {
          // Change State
          e.checked = true;

          this.applyFilter();
        }
      });
    },

    toggleSecondaryFilter(sfilter) {
      this.secondary_filters.map((e) => {
        e.checked = false;
        if (e == sfilter) {
          // Change State
          e.checked = true;

          this.applyFilter();
        }
      });
    },

    applyFilter() {
      let sign = this.secondary_filters.filter((obj) => {
        return obj.checked;
      })[0].sign;

      let filter = this.filters
        .filter((obj) => {
          return obj.checked;
        })[0]
        .name.toLowerCase();

      if (filter == "availability") {
        filter = "spaces";
      }

      this.lessons = this.lessons.sort(this.dynamicSort(sign + filter));
    },
  },
  
});

app.mount("#app");
