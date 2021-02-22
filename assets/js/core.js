window.onload = function(event) {

    'use strict';

    //main data
    let data=[
        { 
          url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/4a864049-816a-479e-8736-51740e8b724b.jpg",
          question:"Which ocean lies on the east coast of the United States?",
          choice:["Eastern","Pacific","Indian","Atlantic"],
          answer:"Atlantic"
        },
        { 
          url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/4d101ba1-9275-4fb5-ba2c-5606e6c0274e.jpg",
          question:"Which is the world's highest mountain?",
          choice:["K2","Makalu","Mount Everest","Kilimanjaro"],
          answer:"Mount Everest"
        },
        { 
          url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/07121a24-b34b-4711-9bfa-5287163e65ce.jpg",
          question:"Which of these cities is not in Europe?",
          choice:["Prague","Moscow","Barcelona","Reykjavik"],
          answer:"Moscow"
        },
        { 
          url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/467a486b-be3a-4183-90ed-dd6867d5852d.jpg",
          question:"True or False: Iceland is covered in ice.",
          choice:[true,false],
          answer:false
        },
        { 
          url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/ecf8af7b-8541-4572-b63b-ee7d7f9fc4cc.jpg",
          question:"The United Kingdom is comprised of how many countries?",
          choice:[1,2,3,4],
          answer:4
        },
        { 
          url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/ecf8af7b-8541-4572-b63b-ee7d7f9fc4cc.jpg",
          question:"Which of the following countries do not border France?",
          choice:["Germany","Netherlands","Spain","Italy"],
          answer:"Netherlands"
        },
          { 
          url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/6e99b817-7be7-4f8a-9146-3f602ac81fad.jpg",
          question:"Which U.S. state is the Grand Canyon located in?",
          choice:["Wyoming","Arizona","New Mexico","Nevada"],
          answer:"Arizona"
        },
       { 
          url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/866f119d-e5e2-45ca-846c-b6d10a59d1e4.jpg",
          question:"Which is the smallest country, measured by total land area?",
          choice:["Maldives","Monaco","Vatican"],
          answer:"Vatican"
        },
       { 
          url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/13efaf72-d695-4f65-b043-2b805b6a88eb.jpg",
          question:"Which is the longest river in the world?",
          choice:["Amazon River","Congo River","Yellow River","Nile River"],
          answer:"Nile River"
        },
       { 
          url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/1226f177-dc1a-4142-8875-bdaa177717d7.jpg",
          question:"Which is the largest body of water?",
          choice:["indian Ocean","Pacific Ocean","Atlantic Ocean","Nile River"],
          answer:"Pacific Ocean"
        }
    ]


    const quizContainer = document.querySelector("#content");
 
     //function
    //build the quiz
    let buildQuiz = () => {

        const output = [];
        // counter for scroll down link
        let counter = 1;

        // for each for questions
        data.forEach((currentQuestion, questionNumber) => {

            const choices = [];

            // for each for choices
            for(let choice in currentQuestion.choice){
                // ...add an html button
                choices.push('<button class="choice" data-value="' + currentQuestion.choice[choice] + '" data-group-id="'+ questionNumber +'">' + currentQuestion.choice[choice] + '</button>');
            }

            // build quiz item // add questions and its answers to the output
            output.push(
              '<section id="quiz-section-'+ counter + '">'
              + '<div class="container">'
              + '<div class="quiz-item" data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom">'
              +'<div class="image"><img src="' + currentQuestion.url +'" /></div>'
              + '<div class="question">' + currentQuestion.question + '</div>'
              + '<div class="choices">' + choices.join('') + '</div>'
              + (counter < data.length ? '<a href="#quiz-section-' + (counter + 1) +'" class="next">Next question</a>': "")
              + (counter == data.length ? '<a href="#your-result" class="next">See result</a>': "")
              +'</div>'
              +'</div>'
              + '</section>'
            );

            counter++;

        });

        output.push(
          '<section id="your-result">'
          + '<div class="container">'
          + '<div class="output"></div>'
          + '</div>'
          + '</section>'
        );

        quizContainer.innerHTML = output.join('');

    }

    buildQuiz();


    
    const myChoices = document.querySelectorAll(".choice"); 
    const myChoicesContainer = document.querySelectorAll(".choices"); 
    // keep track of user's answers
    let numCorrect = 0;
    let flag = 0;

    //check answer function
    let checkAnswer = function(e){

      const selectedChoice = e.target;
      const selectedChoiceGroup = e.target.dataset.groupId;
      let userAnswer = e.target.dataset.value;
      let currentAnswer = data[selectedChoiceGroup].answer;
      currentAnswer = currentAnswer.toString();

      //right answer
      if(userAnswer == currentAnswer){
        selectedChoice.classList.add("correct");
        selectedChoice.disabled = true;
        numCorrect++;

        //call correctScroll function
        let currentelement = e.target;
        correctScroll(currentelement);

      }
      
      //wrong answer
      if(userAnswer != currentAnswer){
        selectedChoice.classList.add("wrong");
        selectedChoice.classList.add("apply-shake");
        selectedChoice.disabled = true;
      } 

      // add text for currently corret answers
      if(numCorrect > 0){
        document.querySelector("#your-result .output").innerHTML = "You have answered " + numCorrect + " of 10 questions correctly";
      }

      // add text for all answers correct
      if(numCorrect == 10){
        document.querySelector("#your-result .output").innerHTML = '<svg viewBox="0 0 512.002 512.002" xmlns="http://www.w3.org/2000/svg"><circle cx="480.002" cy="193.485" fill="#ffcd69" r="22"/><circle cx="315.11" cy="137.854" fill="#d5ea79" r="22"/><circle cx="128.002" cy="32" fill="#ff7d97" r="22"/><path d="M361.909 379.259L29.578 501.081c-11.626 4.262-22.918-7.031-18.657-18.657l121.822-332.331c3.656-9.973 16.423-12.788 23.934-5.277l210.51 210.51c7.51 7.51 4.695 20.277-5.278 23.933z" fill="#98eaf9"/><path d="M39.614 404.878l-.422.422-28.271 77.124c-4.262 11.626 7.031 22.918 18.657 18.657l77.742-28.498z" fill="#ff7d97"/><path d="M59.136 356.889l95.976 95.977 88.481-32.937-151.52-151.52z" fill="#ffcd69"/><g fill="#fff"><path d="M107.854 472.387l-68.24-68.239 19.522-47.259 95.976 95.977zM243.593 419.929l-151.52-151.52 17.328-49.452 183.644 183.644z"/></g><g><path d="M492.25 285.422c2.591-4.877.738-10.931-4.139-13.523-56.033-29.776-124.386-22.635-172.942 17.266l-16.157-16.157 26.387-26.387c3.905-3.905 3.905-10.237 0-14.143-3.906-3.905-10.236-3.905-14.143 0l-26.387 26.387-64.381-64.381c14.644-19.639 23.857-42.707 26.762-67.27 3.347-28.316-1.98-56.64-15.408-81.907-2.591-4.877-8.647-6.729-13.523-4.138-4.877 2.592-6.729 8.646-4.138 13.523 21.538 40.53 18.167 88.656-8.007 125.478l-42.427-42.427c-5.953-5.953-14.415-8.423-22.637-6.612-8.222 1.813-14.86 7.614-17.758 15.519L1.532 478.982c-3.327 9.077-1.148 18.963 5.689 25.799 4.721 4.721 10.894 7.221 17.253 7.221 2.85 0 5.737-.503 8.546-1.532l332.33-121.821c7.905-2.897 13.706-9.536 15.52-17.757 1.812-8.222-.659-16.684-6.612-22.637l-44.86-44.861c42.253-33.714 101.034-39.497 149.329-13.833 4.876 2.592 10.93.738 13.523-4.139zM159.276 442.887l-90.161-90.161 24.982-68.151 133.33 133.33zM110.409 460.8l-59.207-59.207 10.326-28.169 77.05 77.05zm-84.273 30.891c-2.37.869-4.007-.287-4.774-1.052-.766-.766-1.921-2.404-1.052-4.773l23.304-63.575 46.096 46.096zm335.203-125.106c-.2.907-.839 2.54-2.871 3.285l-61.477 22.535-56.877-56.878c-3.905-3.906-10.237-3.905-14.142-.001-3.905 3.905-3.906 10.237-.001 14.142l50.322 50.323-28.169 10.326-146.44-146.44 10.326-28.169 50.323 50.322c1.952 1.953 4.512 2.929 7.071 2.929s5.119-.977 7.071-2.929c3.905-3.905 3.905-10.237-.001-14.142l-56.877-56.877 22.535-61.477c.745-2.032 2.378-2.671 3.286-2.872a4.823 4.823 0 011.034-.113c.919 0 2.09.272 3.154 1.337l210.51 210.51c1.53 1.531 1.423 3.282 1.223 4.189zM301.597 79.804c5.523 0 10-4.477 10-10 0-8.375 6.814-15.188 15.189-15.188 19.402 0 35.188-15.785 35.188-35.188 0-5.523-4.478-10-10-10s-10 4.477-10 10c0 8.375-6.814 15.188-15.188 15.188-19.403 0-35.189 15.785-35.189 35.188 0 5.523 4.478 10 10 10zM390.319 174.195c20.039 0 36.342-16.303 36.342-36.341 0-9.01 7.33-16.341 16.341-16.341 5.522 0 10-4.477 10-10s-4.478-10-10-10c-20.038 0-36.341 16.303-36.341 36.341 0 9.01-7.331 16.341-16.342 16.341-5.522 0-10 4.477-10 10s4.478 10 10 10zM448.002 193.485c0 17.645 14.355 32 32 32s32-14.355 32-32-14.355-32-32-32-32 14.355-32 32zm32-12c6.617 0 12 5.383 12 12s-5.383 12-12 12-12-5.383-12-12 5.383-12 12-12z"/><path d="M315.11 169.854c17.645 0 32-14.355 32-32s-14.355-32-32-32-32 14.355-32 32 14.356 32 32 32zm0-44c6.617 0 12 5.383 12 12s-5.383 12-12 12-12-5.383-12-12 5.383-12 12-12zM128.002 64c17.645 0 32-14.355 32-32s-14.355-32-32-32-32 14.355-32 32 14.355 32 32 32zm0-44c6.617 0 12 5.383 12 12s-5.383 12-12 12-12-5.383-12-12 5.383-12 12-12zM452.505 351.058c-3.904-3.905-10.234-3.905-14.143-.001-3.905 3.905-3.905 10.237 0 14.142l9.428 9.428c1.953 1.953 4.512 2.929 7.071 2.929s5.118-.977 7.071-2.929c3.905-3.905 3.905-10.237 0-14.142zM499.645 398.198c-3.906-3.905-10.236-3.905-14.143 0-3.905 3.905-3.905 10.237 0 14.143l9.428 9.428c1.953 1.953 4.512 2.929 7.071 2.929s5.118-.976 7.071-2.929c3.905-3.905 3.905-10.237 0-14.143zM494.93 351.058l-9.428 9.428c-3.905 3.905-3.905 10.237 0 14.142 1.953 1.953 4.512 2.929 7.071 2.929s5.119-.977 7.071-2.929l9.428-9.428c3.905-3.905 3.905-10.237 0-14.142-3.905-3.906-10.237-3.905-14.142 0zM447.79 398.198l-9.428 9.428c-3.905 3.905-3.905 10.237 0 14.143a9.968 9.968 0 007.071 2.929c2.56 0 5.118-.976 7.071-2.929l9.428-9.428c3.905-3.905 3.905-10.237 0-14.143-3.906-3.905-10.236-3.905-14.142 0zM492.574 29.428a9.966 9.966 0 007.071-2.929l9.428-9.428c3.905-3.905 3.905-10.237 0-14.142-3.906-3.905-10.238-3.905-14.143 0l-9.428 9.428c-3.905 3.905-3.905 10.237 0 14.142a9.97 9.97 0 007.072 2.929zM445.433 76.568c2.56 0 5.118-.976 7.071-2.929l9.428-9.428c3.905-3.905 3.905-10.237 0-14.143-3.906-3.905-10.236-3.905-14.143 0l-9.428 9.428c-3.905 3.905-3.905 10.237 0 14.143a9.972 9.972 0 007.072 2.929zM499.645 50.069c-3.906-3.905-10.236-3.905-14.143 0-3.905 3.905-3.905 10.237 0 14.143l9.428 9.428c1.953 1.953 4.512 2.929 7.071 2.929s5.118-.976 7.071-2.929c3.905-3.905 3.905-10.237 0-14.143zM447.79 26.499c1.953 1.953 4.512 2.929 7.071 2.929s5.118-.976 7.071-2.929c3.905-3.905 3.905-10.237 0-14.142l-9.428-9.428c-3.904-3.905-10.234-3.905-14.143 0-3.905 3.905-3.905 10.237 0 14.142zM201.221 300.78c-2.63 0-5.21 1.07-7.07 2.93s-2.93 4.44-2.93 7.07 1.07 5.21 2.93 7.07 4.44 2.93 7.07 2.93 5.21-1.07 7.07-2.93 2.93-4.44 2.93-7.07-1.07-5.21-2.93-7.07-4.44-2.93-7.07-2.93zM347.118 196.616l-7.25 7.25c-3.905 3.905-3.905 10.237 0 14.143 1.953 1.953 4.512 2.929 7.071 2.929s5.118-.976 7.071-2.929l7.25-7.25c3.905-3.905 3.905-10.237 0-14.143-3.906-3.905-10.236-3.905-14.142 0z"/></g></svg><h1>Congratulations</h1> You have answered all questions correctly';
      }

      renderCurrentScore(numCorrect, userAnswer, currentAnswer);
      
  }

    document.querySelector("#your-result .output").innerHTML = "<h1>Sorry</h1> You have not (yet) answered any question correctly";

    myChoices.forEach((choice, index )=> {
      choice.addEventListener('click', checkAnswer, false);
    })


    //function
    //scroll on correct answer to next question
    let correctScroll = (e) => {

      console.log("test");

      //scroll to next section
      let currentSectionID = e.closest("section").id;
      //get numbers of currentSectionID String and parse it to integer
      currentSectionID = parseInt(currentSectionID.replace(/\D/g, ""));
      let nextSectionID = currentSectionID +1;

      if(nextSectionID < 11 && currentSectionID != 0){
        scroll({
          top: document.querySelector('#quiz-section-' + nextSectionID).offsetTop,
          behavior: "smooth"
        });
      }

    }

    //function
    //render current score item
    let renderCurrentScore = (numCorrect, userAnswer, currentAnswer) => {
        //add current score element
      if(numCorrect > 0 && userAnswer == currentAnswer){

        if(flag == 0){
          const currentScore = document.createElement("div");
          currentScore.classList.add("current-score");
          quizContainer.appendChild(currentScore);
        }
        flag++;

        document.querySelector(".current-score").innerHTML = "Correct answers <br/>" + numCorrect + "/10";
      }

    }


    //function
    //smooth scroll function and no hash in url
    let acnhorTagsLinks = document.querySelectorAll("a");

    acnhorTagsLinks.forEach(link => {
      link.addEventListener("click", e => {

        e.preventDefault();
        const href = e.target.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop;
      
        scroll({
          top: offsetTop,
          behavior: "smooth"
        });

      })

    })


    // init aos 
    AOS.init();



};
