const inputext=document.getElementById('inputext');
const submitbtn=document.getElementById('submitbtn');
const resultdiv=document.querySelector('.result');

submitbtn.addEventListener('click',(e)=>{
  
    e.preventDefault();
    getwordinfo(inputext.value)
})
//get a word form input and fetch data form API and making HTML elements by javascript


    

const getwordinfo= async(word)=>{

    resultdiv.innerHTML="<p>Fetching Data...</p>";
    try {
   const response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word} `);
    const data= await response.json();
    let definitions=data[0].meanings[0].definitions[0];
    resultdiv.innerHTML=`<h2> <strong>word:</strong>${data[0].word}</h2>
    <p><strong></strong>${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meanings:</strong>${definitions.definition===undefined?"Not Found":definitions.definition}</p>
    <p><strong>Example:</strong>${definitions.example===undefined?"Not found":definitions.example}</p>

    `;
    // synonyms and Antonyms for all by using for loop.
    resultdiv.innerHTML+=`<p><strong>Synonyms:</strong></p>`
    if(definitions.synonyms.length===0)
    {
        resultdiv.innerHTML += `<span>Not Found</span>`;
    }
    else{
    for(let i=0;i<definitions.synonyms.length;i++)
    {
        resultdiv.innerHTML+=`<li> ${definitions.synonyms[i]}</li>`
    }
}
     resultdiv.innerHTML+=`<p><strong>Antonyms:</strong></p>`
    if(definitions.antonyms.length===0)
    {
        resultdiv.innerHTML += `<span>Not Found</span>`;
    }
    else{
    for(let i=0;i<definitions.antonyms.length;i++)
    {
        resultdiv.innerHTML+=`<li> ${definitions.antonyms[i]}</li>`
    }
}   
  // for Read more content link
   resultdiv.innerHTML+= `<a href="${data[0].sourceUrls}" target="_blank">Read More</a>`;
} catch (error) {

    resultdiv.innerHTML=`<h2>Sorry The Word Could Not Found!</h2>`;
}

}
