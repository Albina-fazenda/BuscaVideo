var VideoContainer = document.getElementById("video_info");

var digitado  = document.getElementById("text-to-find");

entrou = true;

nachou = true;

arrtags = [];

alltags = [];

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://raw.githubusercontent.com/Albina-fazenda/repo2/master/R2.json');

ourRequest.onload = function() {
OurData=JSON.parse(ourRequest.responseText);
criaArray(OurData);
naoPesquisa(OurData);
autocomplete(document.getElementById("text-to-find"), alltags);

};

ourRequest.send();

digitado.addEventListener("keyup", function(event) {
   
        if (event.keyCode === 13) {
            nachou =true;
            pesquisar(digitado.value);
           
            };
      
  });

function coletatags(data){

    for (i = 0; i < data.length; i++) {      

    arrtags = data[i].tg;

    alltags = alltags.concat(arrtags);

    };

};

function pesquisar (item){  

    limpar();
    
    item = digitado.value.toLowerCase();
        for (i=0; i<OurData.length; i++) { 

        for (d=0; d<OurData[i].tg.length; d++){

         
    if (item === OurData[i].tg[d]) {

    mostrarvideo(OurData);    
    nachou = false;

    } else {  
     
      };
    
        };

        };

        if (nachou) {
            alert("Nenhum video foi encontrado");
            digitado.value = "";
            item = digitado.value.toLowerCase();
            naoPesquisa();
          
        };

};

function mostrarvideo(data){

   var htmlString = '<a href="' + data[i].name +'"> <img src="' + data[i].thumb + '" style="width:640px;height:360px;border:0;"></a>'+"<br>"+data[i].label + "<br>";
  
   var h = document.createElement('DIV');
      h.setAttribute("class", "videobox");
      VideoContainer.appendChild(h);
      h.insertAdjacentHTML('beforeend', htmlString);
 
};

function autocomplete(inp,arr) {

    var currentFocus;
    inp.addEventListener("input", function(e) {

        var a, b, i, ii, val = this.value;
        val = val.toLowerCase();
        var palavrasArray = [];

        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        
        this.parentNode.appendChild(a);
       
        for (i = 0; i < arr.length; i++) {
          
          for (ii = 0; ii < arr[i].length-1; ii++) {

              if (arr[i].trim().substr(ii, val.length).toUpperCase() ==  val.toUpperCase()) {                      
               
               b = document.createElement("DIV");                              
               
               var inPal = "";
               var finPal = "";
            
               inPal = arr[i].substr(0,arr[i].indexOf(val));
               finPal = arr[i].substr(arr[i].indexOf(val)+val.length, arr[i].length-inPal.length-val.length);
              
               b.innerHTML = inPal + "<strong>" + val + "</strong>" + finPal;
               b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
               b.addEventListener("click", function(e) {
                
                inp.value = this.getElementsByTagName("input")[0].value;
                
                closeAllLists();
           
            });

          if (palavrasArray[i] != b.innerText) {
              a.appendChild(b); 
              palavrasArray[i]= b.innerText;

            } else {
              
            };
           
          } 


          }
       }
    });
   
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
       
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          
          currentFocus++;
          addActive(x);

        } else if (e.keyCode == 38) { 
          currentFocus--;
          addActive(x);

        } else if (e.keyCode == 13) {
          e.preventDefault();

          if (currentFocus > -1) {
            
            if (x) x[currentFocus].click();
            pesquisar(OurData);
          } else if (currentFocus = -1) {
            
            limpar();
            naoPesquisa(OurData);

          };

    
          };
        
    });

    function addActive(x) {
      
      if (!x) return false;
      removeActive(x);

      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
      
    }
    function removeActive(x) {
     
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        nachou = true;
        
    });
  };

function limpar() {

    for (i=0; i<myElement.childNodes.length; i=i) {
    myElement.removeChild(myElement.childNodes[i]);
    };
   
    for (i=0; i<VideoContainer.childNodes.length; i=i) {
    VideoContainer.removeChild(VideoContainer.childNodes[i]);
    }; 
};

function naoPesquisa (data) {

    for (i=0; i<OurData.length; i++) { 
      
      mostrarvideo(OurData);
      
    };

};

function criaArray (data) {

  for (i = 0; i < data.length; i++) {      
   
    for (ii=0;  ii < data[i].tg.length; ii++ ) {
        
      function findInArray(tag) {
      return tag === data[i].tg[ii];
  
      };

      if (alltags.find(findInArray)) {
        
      } else {
        alltags = alltags.concat(data[i].tg[ii]);
        };

    };

  };

};