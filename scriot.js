let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-IN";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}

window.addEventListener("load", () => {
  wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

recognition.onerror = (event) => {
  speak("Sorry, I couldn't hear you. Please try again.");
  console.error("Speech recognition error:", event.error);
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello sir, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am a virtual assistant, created by Jyoti Patel.");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com/", "_blank");
  } else if (message.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://www.facebook.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.co.in/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com/", "_blank");
  } else if (message.includes("open calculator")) {
    speak("Opening calculator...");
    window.open("https://www.google.com/search?q=online+calculator", "_blank");
  } else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp...");
    window.open("https://web.whatsapp.com/", "_blank");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    speak(`The time is ${time}`);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short" });
    speak(`Today's date is ${date}`);
  } else {
    if (message.trim() === "") {
      speak("Sorry, I didn't catch that. Please try again.");
    } else {
      let finalText = `Here's what I found on the internet regarding ${message}`;
      speak(finalText);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
    }
  }
}
