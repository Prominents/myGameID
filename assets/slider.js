// Designed by: Leonhardt

// Object Items
const items = [
  {
    logo: "assets/logo-HSR.png",
    naming: "Honkai Star Rail",
    bgImg: "assets/HSR.jpg",
    server: "Asia",
    ign: "Levin",
    idg: "800039374",
  },
  {
    logo: "assets/logo-BA.png",
    naming: "Blue Archive",
    bgImg: "assets/BA.jpg",
    server: "Global",
    ign: "Leonhardt",
    idg: "415006",
  },
  {
    logo: "assets/logo-GI.png",
    naming: "Genshin Impact",
    bgImg: "assets/GI.jpg",
    server: "Asia",
    ign: "Levin",
    idg: "801777776",
  },
  {
    logo: "assets/logo-HI3.png",
    naming: "Honkai Impact",
    bgImg: "assets/HI3.jpg",
    server: "Asia",
    ign: "Leonhardt",
    idg: "14985692",
  },
  {
    logo: "assets/logo-GT.png",
    naming: "Guardian Tales",
    bgImg: "assets/GT.jpg",
    server: "Asia - World 2",
    ign: "Leonhardt",
    idg: "#R9D5W",
  },
  {
    logo: "assets/logo-ZZZ.png",
    naming: "Zenless Zone Zero",
    bgImg: "assets/ZZZ.webp",
    server: "Asia",
    ign: "Levin",
    idg: "1300079872",
  },
];

const timeLine = gsap.timeline();

class Slider {
  constructor(items) {
    this.active = 0;
    this.items = items;
    document
      .querySelectorAll(".slider__btn-switch[data-type]")
      .forEach((btn) => {
        btn.onclick = () => this.handleClick(btn.dataset.type);
      });
  }

  // Item Property
  renderItem() {
    const { logo, naming, server, ign } = this.items[this.active];

    const sliderContent = `
       <img class="slider-image" src="${logo}" alt="${naming}" />
       <div class="server">
       <h5>Server: ${server}</h5>
       </div>
       <div class="title">
       <p>IGN: ${ign}</p>
       </div>
     `;
    const sliderIndex = `
       <span>${
         this.active < 10 ? "0" + (this.active + 1) : this.active + 1
       }</span>
       <span>${
         this.items.length < 10 ? "0" + this.items.length : this.items.length
       }</span>
     `;

    document.querySelector("code").textContent = this.items[this.active].idg;
    document.querySelector(".slider__content").innerHTML = sliderContent;
    document.querySelector(".slider__index").innerHTML = sliderIndex;
  }

  // GSAP Animation
  basicAimation(dir, delay) {
    timeLine.to(".slider", {
      delay,
      duration: 0.2,
      backgroundSize: "cover",
      background: `url(${items[this.active].bgImg}) no-repeat center fixed`,
      ease: "power2.in",
    });
    timeLine.fromTo(
      ".slider-image",
      {
        x: 150 * dir,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
    timeLine.fromTo(
      ".slider__context *",
      {
        x: 50 * dir,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      },
      "<"
    );
    TweenMax.from(".title", {
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut,
    });
  }

  // Button Arrow
  handleClick(type) {
    const dir = type === "next" ? 1 : -1;
    timeLine.to(".slider-image", {
      x: -250 * dir,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",

      onComplete: () => {
        if (type === "next") {
          this.active = this.active === items.length - 1 ? 0 : this.active + 1;
        } else {
          this.active = this.active <= 0 ? items.length - 1 : this.active - 1;
        }

        this.renderItem();
        this.basicAimation(dir);
      },
    });
    timeLine.to(
      " .slider__context *",
      {
        x: -100 * dir,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.inOut",
      },
      "<"
    );
  }
}

const slider = new Slider(items);
slider.renderItem();
slider.basicAimation(1, 1);

// Function Copy Clipboard
async function copyTargetText(e) {
  try {
    await navigator.clipboard.writeText(e.target.innerText);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

//event after copying
document.querySelector("code").addEventListener("click", (e) => {
  e.preventDefault();
  copyTargetText(e);

  flash();
});

//Simple Flash message
function flash() {
  let body = document.querySelector("body");
  body.classList.add("special");
  setTimeout(() => {
    body.classList.remove("special");
  }, 2000);
}
