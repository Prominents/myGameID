// Designed by: Leonhardt

// Object Items
const items = [
  {
    img: "1.png",
    job: "Guardian",
    naming: "Bianca",
    desc: "A medieval mercenary was a skilled and often ruthless fighter who would offer their services to various lords or armies for pay, often fighting in wars or battles far from their own lands.",
    bgColor: "#ffe474",
    stripe1: '#FFB4B4',
    stripe2: '#FFDEB4',
  },
  {
    img: "2.png",
    job: "Knight",
    naming: "Fiona",
    desc: "A knight is a member of a medieval European warrior class who would typically serve a lord and wear armor while fighting on horseback.",
    bgColor: "#d2e2d7",
    stripe1: '#CEEDC7',
    stripe2: '#86C8BC',
  },
  {
    img: "3.png",
    job: "Princess",
    naming: "Cornelia",
    desc: "A princess is a female member of a royal family, usually a daughter or granddaughter of a king or queen, who holds a high social rank and may have ceremonial or symbolic duties.",
    bgColor: "#f3c3be",
    stripe1: '#FFAACF',
    stripe2: '#EA8FEA',
  },
  {
    img: "4.png",
    job: "Knight",
    naming: "Aurora",
    desc: "A knight is a member of a medieval European warrior class who would typically serve a lord and wear armor while fighting on horseback.",
    bgColor: "#ADE4DB",
    stripe1: '#FFF6BD',
    stripe2: '#FFD4B2',
  },
  {
    img: "5.png",
    job: "Guardian",
    naming: "Lumina",
    desc: "A medieval mercenary was a skilled and often ruthless fighter who would offer their services to various lords or armies for pay, often fighting in wars or battles far from their own lands.",
    bgColor: "#dedede",
    stripe1: '#FFDCA9',
    stripe2: '#FAAB78',
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
    const { img, job, naming, desc } = this.items[this.active];

    const sliderContent = `
       <img class="slider__img" src="${img}" alt="${naming}" />
       <div class="title">
         <p >${job}</p>
         <strong >${naming}</strong><br/>
         <code >${desc}</code>
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

    document.querySelector(".slider__content").innerHTML = sliderContent;
    document.querySelector(".slider__index").innerHTML = sliderIndex;
  }

  // GSAP Animation
  basicAimation(dir, delay) {
    timeLine.to(".slider", {
      delay,
      duration: 0.2,
      backgroundColor: `${items[this.active].bgColor}`,
    });
    timeLine.to(".line-one", {
      duration: 0.2,
      backgroundColor: `${items[this.active].stripe1}`,
    });
    timeLine.to(".line-two", {
      duration: 0.2,
      backgroundColor: `${items[this.active].stripe2}`,
    });
    timeLine.fromTo(
      ".slider__img",
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
    timeLine.to(".slider__img", {
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

TweenMax.from(".line-one", 1, {
  opacity: 0,
  delay: 2,
  y: -800,
  ease: Expo.easeInOut
})
TweenMax.from(".line-two", 1, {
  opacity: 0,
  delay: 2.5,
  y: -800,
  ease: Expo.easeInOut
})