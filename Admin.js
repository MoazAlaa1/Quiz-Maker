Quiz = {
    lstQuestions : [],
    numOpt : 4,

    SaveDataQuestion : () =>
    {
        let txtQuestion = document.getElementById("question-text");
        let options = document.getElementsByClassName("Opt");
        let answer = document.getElementById("correct-option");
        let explanation = document.getElementById("explanation");
        
        Question = {
            QuestionId : Quiz.GetNewId(),
            Question : txtQuestion.value,
            lstOptions : Array.from(options).map(input => input.value),
            Answer : answer.options[answer.selectedIndex].value,
            Explanation : explanation.value,
        }
        if(Question.QuestionId === "" || Question.Answer === "")
        {
            return;
        }
        for (let index = 0; index < Question.lstOptions.length; index++) {
            if(Question.lstOptions[index] === "")
            {
                return;
            }
            
        }
        Quiz.lstQuestions.push(Question);
        Quiz.SaveInStorage();
        Quiz.ShowData();
        txtQuestion.value = "";
        Array.from(options).map(input => input.value="");
        answer.value = "";
        explanation.value ="";
    },
    SaveInStorage:() =>
    {
        localStorage.setItem("Questions",JSON.stringify(Quiz.lstQuestions));
    },
    GetDataFromStorage:() =>
    {
        let SavedArray=JSON.parse(localStorage.getItem("Questions"));
        Quiz.lstQuestions=SavedArray;
        return SavedArray;
    },
    ShowData : () =>
    {
       let SavedArray = Quiz.GetDataFromStorage();
       let ExistingQuestions = document.getElementById("Existing-Questions"); 
       ExistingQuestions.innerHTML = "";      
       for (let i = 0; i < SavedArray.length; i++) {
        let Q = "";
        Q +="<div class='question-item'>";
        Q +="<div style='display: flex;'>";
        Q +="<h3 style='width: 80%;'>"+SavedArray[i].Question+"</h3>";
        Q +="<button style='background-color: crimson;' class='btn btn-primary btn-sm' onclick='Quiz.Delete(this,"+SavedArray[i].QuestionId+")'>Delete</button>";
        Q +="</div>";
        Q +="<ul class='question-options'>";
        for (let j = 0; j < SavedArray[i].lstOptions.length; j++) {
            if(SavedArray[i].Answer === String(j+1))
            {
                Q += "<li class='correct'>"+SavedArray[i].lstOptions[j]+"</li>"
            }
            else
            {
                Q += "<li>"+SavedArray[i].lstOptions[j]+"</li>"
            }
        }
        Q += "</ul></div>"
        ExistingQuestions.innerHTML += Q;
       }
    },
    AddOption : () =>
    {
        Quiz.numOpt +=1;
        let ContainerHtmlOpt = document.getElementById("newOption");
        let ContainerHtmlAnswer = document.getElementById("correct-option");
        let htmlOpt = "";
        htmlOpt += "<div class='option-row'>";
        htmlOpt += "<div class='option-input'>";
        htmlOpt += "<input type='text' class='Opt' placeholder='Option "+Quiz.numOpt+"'>";
        htmlOpt += "</div></div>";
        ContainerHtmlOpt.innerHTML += htmlOpt;
        let htmlAns = "";
        htmlAns += "<option value='"+Quiz.numOpt+"'>Option "+Quiz.numOpt+"</option>";
        ContainerHtmlAnswer.innerHTML += htmlAns;
    },
    GetNewId:()=>
    {
        if(Quiz.lstQuestions.length===0)
            return 1;
        else
            return Quiz.lstQuestions[Quiz.lstQuestions.length-1].QuestionId+1;
    },
    Delete:(element,id)=> 
    {
       for (let index = 0; index <= Quiz.lstQuestions.length;index++) 
        {
            console.log(Quiz.lstQuestions[index].QuestionId)
           if (id === Quiz.lstQuestions[index].QuestionId) 
            {
                Quiz.lstQuestions.splice(index,1);
                Quiz.SaveInStorage();
                element.parentNode.parentNode.remove();
                return;
            }
        }
    },
    ClearAll:()=>
    {
        Quiz.lstQuestions = [];
        Quiz.SaveInStorage()
        Quiz.ShowData();
    }
};
window.onload = Quiz.ShowData();
document.getElementById("Save").addEventListener("click",function(){
    Quiz.SaveDataQuestion();
});
document.getElementById("AddOption").addEventListener("click",function(){
    Quiz.AddOption();
});
// document.getElementById("test").addEventListener("click",function(){
//     console.log(localStorage.getItem("Questions"));
// });

